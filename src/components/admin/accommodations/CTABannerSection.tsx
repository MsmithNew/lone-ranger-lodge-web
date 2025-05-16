
import React from "react";
import { useAccommodationsContext } from "./AccommodationsContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/admin/ImageUploader";
import LinkSelector from "@/components/admin/LinkSelector";

const CTABannerSection: React.FC = () => {
  const { 
    formData, 
    handleCTAChange, 
    handleCTAImageChange,
    handleCTALinkTypeChange
  } = useAccommodationsContext();
  
  const ctaBanner = formData.ctaBanner;
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cta-title">Banner Title</Label>
        <Input
          id="cta-title"
          value={ctaBanner.title}
          onChange={(e) => handleCTAChange('title', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="cta-description">Banner Description</Label>
        <Textarea
          id="cta-description"
          value={ctaBanner.description}
          onChange={(e) => handleCTAChange('description', e.target.value)}
          className="mt-1"
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="cta-button-text">Button Text</Label>
        <Input
          id="cta-button-text"
          value={ctaBanner.buttonText}
          onChange={(e) => handleCTAChange('buttonText', e.target.value)}
          className="mt-1"
        />
      </div>
      
      <LinkSelector
        value={ctaBanner.buttonLink}
        linkType={ctaBanner.linkType}
        onValueChange={(value) => handleCTAChange('buttonLink', value)}
        onLinkTypeChange={handleCTALinkTypeChange}
        label="CTA Button"
      />

      <ImageUploader
        currentImageUrl={ctaBanner.imageUrl}
        onImageUploaded={handleCTAImageChange}
        label="Banner Background Image"
        bucket="content_images"
        folder="cta_banners"
      />
    </div>
  );
};

export default CTABannerSection;
