
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, Image as ImageIcon, RefreshCcw, AlertCircle, Wifi, WifiOff } from "lucide-react";
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
  const [networkStatus, setNetworkStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [retryCount, setRetryCount] = useState(0);
  
  // Generate a consistent ID for label association
  const inputId = `upload-${label.replace(/\s+/g, '-').toLowerCase()}`;
  
  // Check network connectivity with Supabase
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setNetworkStatus('checking');
        // Simple ping to check connection
        const { error } = await supabase.storage.from(bucket).list('', {
          limit: 1,
        });
        
        if (error) {
          console.warn("Storage connection issue:", error);
          setNetworkStatus('offline');
        } else {
          setNetworkStatus('online');
        }
      } catch (err) {
        console.error("Network error during connectivity check:", err);
        setNetworkStatus('offline');
      }
    };
    
    checkConnection();
  }, [bucket, retryCount]);
  
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
      // Check if we're online first
      if (networkStatus === 'offline') {
        throw new Error("You're currently offline. Please check your connection and try again.");
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size exceeds 5MB limit");
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${crypto.randomUUID()}.${fileExt}`;
      
      // First check bucket access
      const { error: checkError } = await supabase.storage.from(bucket).list();
      if (checkError) {
        console.error("Error checking bucket:", checkError);
        throw new Error("Storage access denied. Images can't be uploaded at this time.");
      }
      
      // If bucket is accessible, try to upload
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
      
      toast({
        title: "Image uploaded successfully",
      });
      
    } catch (error) {
      console.error("Error uploading image:", error);
      const errorMessage = error instanceof Error ? error.message : "Network error during upload";
      setUploadError(errorMessage);
      
      // Provide more specific error messages based on what we know
      if (errorMessage.includes("network") || errorMessage.includes("offline") || errorMessage.includes("Failed to fetch")) {
        toast({
          title: "Network connectivity issue",
          description: "Unable to upload image due to network problems. Please check your connection and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Upload failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
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
    setUploadError(null);
    onImageUploaded('');
  };

  const handleRetryConnection = () => {
    setRetryCount(prev => prev + 1);
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
          {networkStatus === 'checking' ? (
            <div className="text-center">
              <Loader2 className="h-10 w-10 text-gray-400 animate-spin mb-2 mx-auto" />
              <p className="text-sm text-gray-500">Checking connection...</p>
            </div>
          ) : networkStatus === 'offline' ? (
            <div className="text-center">
              <div className="flex items-center justify-center text-amber-600 mb-2">
                <WifiOff className="h-10 w-10 mb-2 mx-auto text-red-500" />
              </div>
              <p className="text-sm text-gray-700 font-medium mb-1">Storage connection unavailable</p>
              <p className="text-sm text-gray-500 mb-3">Image uploads are currently unavailable due to network issues.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={handleRetryConnection}
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Retry Connection
              </Button>
            </div>
          ) : (
            <>
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
                  disabled={isUploading || networkStatus !== 'online'}
                />
              </label>
            </>
          )}
          
          {uploadError && networkStatus === 'online' && (
            <div className="mt-2 text-red-500 text-sm">
              <p>{uploadError}</p>
            </div>
          )}
        </div>
      )}
      
      {isUploading && (
        <div className="flex items-center justify-center p-2 bg-blue-50 rounded-md border border-blue-100">
          <Loader2 className="h-4 w-4 animate-spin mr-2 text-blue-500" />
          <span className="text-sm text-blue-700">Uploading...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
