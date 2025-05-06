
import React, { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { isLovableEnvironment } from "@/utils/environment";

interface ClickableAttractionCardProps {
  id: number;
  title?: string | null;
  description?: string | null;
  image_url: string;
  learnMore?: string | null;
  key: string;
  category?: string;
  display_order?: number | null;
  onImageUpdate: (key: string, newUrl: string) => void;
}

const ClickableAttractionCard = ({ 
  id,
  title, 
  description, 
  image_url, 
  learnMore, 
  key: imageKey,
  category,
  onImageUpdate 
}: ClickableAttractionCardProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditable, setIsEditable] = useState(false);

  // Check if we're in Lovable environment when component mounts
  useEffect(() => {
    setIsEditable(isLovableEnvironment());
  }, []);

  const handleImageClick = () => {
    if (!isEditable) return;
    
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditable) return;
    
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image should be less than 2MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Upload the file to Supabase Storage
      const fileName = `${imageKey}-${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('activity_images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('activity_images')
        .getPublicUrl(fileName);

      if (!publicUrlData.publicUrl) throw new Error("Failed to get public URL");

      // Update the database with the new URL
      const { error: updateError } = await supabase
        .from('activity_images')
        .update({ image_url: publicUrlData.publicUrl })
        .eq('id', id);

      if (updateError) throw updateError;

      // Update the UI
      onImageUpdate(imageKey, publicUrlData.publicUrl);
      
      toast({
        title: "Image updated",
        description: "The image has been successfully updated.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
      <div 
        className={`relative h-48 w-full overflow-hidden ${isEditable ? 'cursor-pointer' : ''}`}
        onClick={handleImageClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {isEditable && isHovering && !isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-150">
            <span className="text-white bg-rvblue px-3 py-2 rounded-md font-medium text-sm">
              Click to change image
            </span>
          </div>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex flex-col flex-grow p-5">
        <h3 className="font-display text-lg font-bold text-rvmaroon mb-1">{title}</h3>
        <p className="text-gray-700 text-base flex-grow">{description}</p>
        <div className="mt-4">
          <a
            href={learnMore}
            className="inline-block font-semibold text-rvblue hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClickableAttractionCard;
