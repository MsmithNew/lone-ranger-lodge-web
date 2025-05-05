
import React from "react";
import ClickableAttractionCard from "./ClickableAttractionCard";

interface ClickableAttractionSectionProps {
  title: string;
  activities: {
    title: string;
    description: string;
    imageUrl: string;
    learnMore: string;
    imageKey: string;
  }[];
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
        {activities.map((activity, idx) => (
          <ClickableAttractionCard 
            key={idx} 
            {...activity} 
            onImageUpdate={onImageUpdate}
          />
        ))}
      </div>
    </section>
  );
};

export default ClickableAttractionSection;
