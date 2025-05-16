
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, Image as ImageIcon, RefreshCcw, AlertCircle, Wifi, WifiOff, Clock } from "lucide-react";
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
  const [lastCheckTime, setLastCheckTime] = useState(new Date());
  const [pendingUpload, setPendingUpload] = useState<File | null>(null);
  
  // Generate a consistent ID for label association
  const inputId = `upload-${label.replace(/\s+/g, '-').toLowerCase()}`;
  
  // Enhanced network connectivity check
  const checkConnection = useCallback(async (silent = false) => {
    try {
      setNetworkStatus('checking');
      console.log(`Checking storage connection for bucket '${bucket}'...`);
      
      // Simple ping to check connection
      const { error } = await supabase.storage.getBucket(bucket);
      
      if (error) {
        console.warn(`Storage connection issue for ${bucket}:`, error);
        setNetworkStatus('offline');
        
        if (!silent) {
          toast({
            title: "Storage access unavailable",
            description: `Unable to connect to image storage. Images cannot be uploaded at this time.`,
            variant: "destructive",
          });
        }
      } else {
        if (networkStatus === 'offline' && !silent) {
          toast({
            title: "Storage connection restored",
            description: "Image uploads are now available.",
          });
        }
        setNetworkStatus('online');
        
        // If there's a pending upload and connection is restored, try uploading
        if (pendingUpload && networkStatus === 'offline') {
          uploadImage(pendingUpload);
          setPendingUpload(null);
        }
      }
      
      setLastCheckTime(new Date());
    } catch (err) {
      console.error("Network error during storage connectivity check:", err);
      setNetworkStatus('offline');
      
      if (!silent) {
        toast({
          title: "Network error",
          description: "Failed to check storage connection. Please verify your internet connection.",
          variant: "destructive",
        });
      }
    }
  }, [bucket, networkStatus, pendingUpload]);
  
  // Check storage connectivity on mount and when retry count changes
  useEffect(() => {
    checkConnection(retryCount > 0);
    
    // Set up periodic connection checks (every 30 seconds)
    const intervalId = setInterval(() => {
      checkConnection(true);
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [checkConnection, retryCount]);
  
  // Normalize the image URL for display only - not for storage
  const normalizeImageUrl = (url: string): string => {
    if (!url) return '';
    return url;
  };
  
  const uploadImage = async (file: File) => {
    if (!file) return;
    
    // If we're offline, store the file for later upload
    if (networkStatus === 'offline') {
      setPendingUpload(file);
      
      toast({
        title: "Offline mode",
        description: "Your image will be uploaded when connection is restored.",
        variant: "destructive",
      });
      
      return;
    }
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size exceeds 5MB limit");
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${crypto.randomUUID()}.${fileExt}`;
      
      // Verify bucket exists before upload
      const { error: bucketCheckError } = await supabase.storage.getBucket(bucket);
      if (bucketCheckError) {
        console.error(`Error accessing bucket '${bucket}':`, bucketCheckError);
        throw new Error(`Unable to access image storage. Error: ${bucketCheckError.message}`);
      }
      
      // First check bucket access
      const { error: checkError } = await supabase.storage.from(bucket).list('', {
        limit: 1,
      });
      
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
      setPendingUpload(null);
      
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
          description: "Unable to upload image due to network problems. Your image will be uploaded when connection is restored.",
          variant: "destructive",
        });
        
        // Store the file for later upload
        setPendingUpload(file);
        setNetworkStatus('offline');
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
    setPendingUpload(null);
    onImageUploaded('');
  };

  const handleRetryConnection = () => {
    setRetryCount(prev => prev + 1);
    checkConnection(false);
  };
  
  const handleRetryUpload = () => {
    if (pendingUpload) {
      uploadImage(pendingUpload);
    }
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
          <div className="absolute top-2 right-2 flex space-x-2">
            {networkStatus === 'online' && (
              <Button 
                type="button"
                size="icon" 
                className="rounded-full bg-white hover:bg-gray-100 text-gray-700 shadow-sm"
                onClick={() => {
                  if (document.getElementById(inputId)) {
                    (document.getElementById(inputId) as HTMLInputElement).click();
                  }
                }}
              >
                <Upload className="h-4 w-4" />
              </Button>
            )}
            <Button 
              type="button"
              size="icon" 
              variant="destructive" 
              className="rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
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
              <div className="flex items-center justify-center text-red-600 mb-2">
                <WifiOff className="h-10 w-10 mb-2 mx-auto" />
              </div>
              <p className="text-sm text-gray-700 font-medium mb-1">Storage connection unavailable</p>
              <p className="text-sm text-gray-500 mb-3">Image uploads are currently unavailable due to network issues.</p>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center w-full sm:w-auto"
                  onClick={handleRetryConnection}
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Check Connection
                </Button>
                {pendingUpload && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center w-full sm:w-auto border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Upload Pending
                  </Button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Last check: {lastCheckTime.toLocaleTimeString()}
              </p>
            </div>
          ) : (
            <>
              <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">No image selected</p>
              
              <label htmlFor={inputId} className="cursor-pointer">
                <div className="btn-secondary flex items-center bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md">
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
              
              <div className="flex items-center text-xs text-green-600 mt-2">
                <Wifi className="h-3 w-3 mr-1" />
                Storage connected
              </div>
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
      
      {pendingUpload && networkStatus === 'online' && (
        <div className="flex items-center justify-between p-2 bg-amber-50 rounded-md border border-amber-100">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
            <span className="text-sm text-amber-700">Pending upload available</span>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            className="border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"
            onClick={handleRetryUpload}
          >
            Upload Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
