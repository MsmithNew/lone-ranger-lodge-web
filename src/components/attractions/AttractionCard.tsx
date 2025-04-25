
import React from "react";

interface AttractionCardProps {
  title: string;
  description: string;
  imageUrl: string;
  learnMore: string;
}

const AttractionCard = ({ title, description, imageUrl, learnMore }: AttractionCardProps) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
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

export default AttractionCard;
