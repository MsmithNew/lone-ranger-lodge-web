
import React from "react";

interface EssentialAmenityCardProps {
  image: string;
  title: string;
  description: string;
}

const EssentialAmenityCard = ({
  image,
  title,
  description,
}: EssentialAmenityCardProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center gap-4 h-full hover:shadow-md transition box-border">
    <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <h3 className="font-semibold text-lg md:text-xl text-[color:#804F58] mb-1 text-center">{title}</h3>
    <p className="text-gray-700 text-base text-center">{description}</p>
  </div>
);

export default EssentialAmenityCard;
