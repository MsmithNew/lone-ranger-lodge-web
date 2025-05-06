
import React from "react";
import ClickableAttractionCard from "./ClickableAttractionCard";

interface Attraction {
  id: number;
  key: string;
  image_url: string;
  title?: string | null;
  description?: string | null;
  learnMore?: string | null;
  category?: string;
  display_order?: number | null;
}

interface ClickableAttractionSectionProps {
  title: string;
  activities: Attraction[];
  color?: string;
  columns?: string;
  onImageUpdate: (key: string, newUrl: string) => void;
}

const ClickableAttractionSection = ({
  title,
  activities,
  color,
  columns = "grid-cols-1 md:grid-cols-3 lg:grid-cols-3",
  onImageUpdate
}: ClickableAttractionSectionProps) => {
  return (
    <section>
      <div className="text-center mb-8">
        <h2 className={`section-title ${color ? color + "/80" : ""}`}>{title}</h2>
      </div>
      <div className={`grid gap-6 ${columns}`}>
        {activities.map((activity) => (
          <ClickableAttractionCard 
            key={activity.id} 
            {...activity} 
            onImageUpdate={onImageUpdate}
          />
        ))}
      </div>
    </section>
  );
};

export default ClickableAttractionSection;
