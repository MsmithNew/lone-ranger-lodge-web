
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, Image as ImageIcon, RefreshCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  currentImageUrl: string;
  onImageUploaded: (url: string) => void;
  label?: string;
  bucket?: string;
  folder?: string;
}

const ImageUploader = ({ 
  currentImageUrl, 
  onImageUploaded, 
  label = "Image", 
  bucket = "content_images",
  folder = "content"
}: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Generate a consistent ID for label association
  const inputId = `upload-${label.replace(/\s+/g, '-').toLowerCase()}`;
  
  // Normalize the image URL for display only - not for storage
  const normalizeImageUrl = (url: string): string => {
    if (!url) return '';
    return url;
  };
  
  const uploadImage = async (file: File) => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size exceeds 5MB limit");
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${crypto.randomUUID()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);
      
      const imageUrl = publicUrlData.publicUrl;
      
      console.log("Image uploaded successfully. URL:", imageUrl);
      
      // Update preview and pass the URL to parent component with the FULL URL
      setPreview(imageUrl);
      onImageUploaded(imageUrl);
      setRetryCount(0);
      
      toast({
        title: "Image uploaded successfully",
      });
      
    } catch (error) {
      console.error("Error uploading image:", error);
      const errorMessage = error instanceof Error ? error.message : "Network error during upload";
      setUploadError(errorMessage);
      
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    uploadImage(file);
  };
  
  const handleRetry = () => {
    if (uploadError && retryCount < 3) {
      const fileInput = document.getElementById(inputId) as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        setRetryCount(prevCount => prevCount + 1);
        uploadImage(fileInput.files[0]);
      } else {
        toast({
          title: "Retry failed",
          description: "Please select a file again",
          variant: "destructive",
        });
      }
    }
  };
  
  const removeImage = () => {
    setPreview(null);
    setUploadError(null);
    onImageUploaded('');
  };
  
  const normalizedPreview = preview ? normalizeImageUrl(preview) : null;
  
  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      
      {normalizedPreview ? (
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={normalizedPreview} 
            alt={label} 
            className="w-full h-40 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
              setUploadError("Image failed to load");
            }}
          />
          <Button 
            type="button"
            size="icon" 
            variant="destructive" 
            className="absolute top-2 right-2 rounded-full"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
          <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-2">No image selected</p>
          <label htmlFor={inputId} className="cursor-pointer">
            <div className="btn-secondary flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </div>
            <Input 
              type="file" 
              id={inputId} 
              accept="image/*" 
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
          </label>
          {uploadError && (
            <div className="mt-2 text-red-500 text-sm">
              <p>{uploadError}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-1 flex items-center"
                onClick={handleRetry}
                disabled={retryCount >= 3 || isUploading}
              >
                <RefreshCcw className="h-3 w-3 mr-1" />
                Retry Upload
              </Button>
            </div>
          )}
        </div>
      )}
      
      {isUploading && (
        <div className="flex items-center justify-center p-2">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
