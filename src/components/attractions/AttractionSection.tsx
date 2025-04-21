
import React from "react";
import AttractionCard from "./AttractionCard";

interface AttractionSectionProps {
  title: string;
  activities: {
    title: string;
    description: string;
    imageUrl: string;
    learnMore: string;
  }[];
  color?: string;
  columns?: string;
}

const AttractionSection = ({
  title,
  activities,
  color,
  columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
}: AttractionSectionProps) => {
  return (
    <section className="">
      <div className="text-center mb-8">
        <h2 className={`section-title ${color ? color + "/80" : ""}`}>{title}</h2>
      </div>
      <div className={`grid gap-6 ${columns}`}>
        {activities.map((activity, idx) => (
          <AttractionCard key={idx} {...activity} />
        ))}
      </div>
    </section>
  );
};

export default AttractionSection;
