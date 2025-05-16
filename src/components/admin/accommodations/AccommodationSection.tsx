
import React from "react";
import { useAccommodationsContext } from "./AccommodationsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Edit } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import FeaturesList from "./FeaturesList";
import LinkSelector from "@/components/admin/LinkSelector";

const AccommodationSection: React.FC = () => {
  const { 
    formData, 
    addAccommodation, 
    removeAccommodation, 
    handleAccommodationChange,
    handleAccommodationImageChange,
    handleAccommodationLinkTypeChange
  } = useAccommodationsContext();
  
  return (
    <div className="space-y-8">
      {formData.accommodations.map((accommodation) => (
        <Card
          key={accommodation.id}
          className="border rounded-lg overflow-hidden bg-gray-50"
        >
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Edit className="h-4 w-4 mr-2 text-gray-500" />
                Accommodation Type
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeAccommodation(accommodation.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove Accommodation Type</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`title-${accommodation.id}`}>Title</Label>
                  <Input
                    id={`title-${accommodation.id}`}
                    value={accommodation.title}
                    onChange={(e) => handleAccommodationChange(accommodation.id, 'title', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor={`description-${accommodation.id}`}>Description</Label>
                  <Textarea
                    id={`description-${accommodation.id}`}
                    value={accommodation.description}
                    onChange={(e) => handleAccommodationChange(accommodation.id, 'description', e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor={`button-text-${accommodation.id}`}>Button Text</Label>
                  <Input
                    id={`button-text-${accommodation.id}`}
                    value={accommodation.buttonText}
                    onChange={(e) => handleAccommodationChange(accommodation.id, 'buttonText', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <LinkSelector
                  value={accommodation.buttonLink}
                  linkType={accommodation.linkType}
                  onValueChange={(value) => handleAccommodationChange(accommodation.id, 'buttonLink', value)}
                  onLinkTypeChange={(type) => handleAccommodationLinkTypeChange(accommodation.id, type as 'internal' | 'external')}
                  label={`${accommodation.title} Button`}
                />

                <ImageUploader
                  currentImageUrl={accommodation.imageUrl}
                  onImageUploaded={(url) => handleAccommodationImageChange(accommodation.id, url)}
                  label="Accommodation Image"
                  bucket="content_images"
                  folder="accommodations"
                />
              </div>
              
              <div className="bg-white p-4 rounded-md border">
                <FeaturesList accommodation={accommodation} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={addAccommodation} className="mt-4">
        <Plus className="h-4 w-4 mr-2" />
        Add Accommodation Type
      </Button>
    </div>
  );
};

export default AccommodationSection;
