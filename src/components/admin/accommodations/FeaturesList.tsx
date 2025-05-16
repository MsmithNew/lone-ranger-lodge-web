
import React from "react";
import { useAccommodationsContext } from "./AccommodationsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Accommodation } from "./AccommodationsContext";
import * as Icons from "lucide-react";

// List of available icons
const availableIcons = [
  "ArrowRight", "Bed", "Building", "Coffee", "Dog", "Droplets", 
  "ParkingCircle", "Salad", "ShowerHead", "Tent", "Thermometer", 
  "Utensils", "Warehouse", "WashingMachine", "Wifi"
];

interface FeaturesListProps {
  accommodation: Accommodation;
}

const FeaturesList: React.FC<FeaturesListProps> = ({ accommodation }) => {
  const { 
    addFeature,
    removeFeature,
    handleFeatureChange
  } = useAccommodationsContext();
  
  // Dynamically render the icon component
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) return <Icons.HelpCircle className="h-4 w-4 text-rvblue" />;
    return <IconComponent className="h-4 w-4 text-rvblue" />;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <Label className="text-sm font-medium">Features</Label>
      </div>
      
      {accommodation.features.map((feature) => (
        <div key={feature.id} className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
          <div className="w-16">
            <Label htmlFor={`icon-${feature.id}`} className="text-xs mb-1 block">Icon</Label>
            <Select 
              value={feature.icon} 
              onValueChange={(value) => handleFeatureChange(accommodation.id, feature.id, 'icon', value)}
            >
              <SelectTrigger className="h-9">
                <SelectValue>
                  <div className="flex items-center">
                    {renderIcon(feature.icon)}
                    <span className="ml-2 text-xs">{feature.icon}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {availableIcons.map((iconName) => (
                  <SelectItem key={iconName} value={iconName}>
                    <div className="flex items-center">
                      {renderIcon(iconName)}
                      <span className="ml-2">{iconName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 ml-2">
            <Label htmlFor={`text-${feature.id}`} className="text-xs mb-1 block">Feature Text</Label>
            <Input
              id={`text-${feature.id}`}
              value={feature.text}
              onChange={(e) => handleFeatureChange(accommodation.id, feature.id, 'text', e.target.value)}
              className="h-9"
            />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9 mt-5"
            onClick={() => removeFeature(accommodation.id, feature.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove Feature</span>
          </Button>
        </div>
      ))}
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => addFeature(accommodation.id)} 
        className="w-full mt-2"
      >
        <Plus className="h-3 w-3 mr-1" />
        Add Feature
      </Button>
    </div>
  );
};

export default FeaturesList;
