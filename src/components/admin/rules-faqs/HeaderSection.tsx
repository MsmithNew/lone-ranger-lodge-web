
import React from "react";
import { useRulesFAQsContext } from "./RulesFAQsContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/admin/ImageUploader";

const HeaderSection: React.FC = () => {
  const { formData, handleHeaderChange, handleImageChange } = useRulesFAQsContext();
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Page Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.header.title}
          onChange={handleHeaderChange}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="description">Page Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.header.description}
          onChange={handleHeaderChange}
          className="mt-1"
          rows={3}
        />
      </div>

      <ImageUploader
        currentImageUrl={formData.header.imageUrl}
        onImageUploaded={handleImageChange}
        label="Header Background Image"
        bucket="content_images"
        folder="headers"
      />
    </div>
  );
};

export default HeaderSection;
