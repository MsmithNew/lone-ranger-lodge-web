
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

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
  
  const uploadImage = async (file: File) => {
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${uuidv4()}.${fileExt}`;
      
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
      
      // Update preview and pass the URL to parent component
      setPreview(imageUrl);
      onImageUploaded(imageUrl);
      
      toast({
        title: "Image uploaded successfully",
      });
      
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image.",
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
  
  const removeImage = () => {
    setPreview(null);
    onImageUploaded('');
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor={`upload-${label}`}>{label}</Label>
      
      {preview ? (
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={preview} 
            alt={label} 
            className="w-full h-40 object-cover"
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
          <label htmlFor={`upload-${label}`} className="cursor-pointer">
            <div className="btn-secondary flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </div>
            <Input 
              type="file" 
              id={`upload-${label}`} 
              accept="image/*" 
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
          </label>
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
