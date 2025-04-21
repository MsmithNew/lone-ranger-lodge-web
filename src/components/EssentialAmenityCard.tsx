
// Updated imports and icon usage to fix build errors, replaced "Laundry" with "WashingMachine"

import React from "react";

interface EssentialAmenityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const maroon = "#804F58";

const EssentialAmenityCard = ({
  icon,
  title,
  description,
}: EssentialAmenityCardProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-2 h-full hover:shadow-md transition box-border">
    <div className="mb-2">{icon}</div>
    <h3 className="font-semibold text-lg md:text-xl text-[color:#804F58] mb-1">{title}</h3>
    <p className="text-gray-700 text-base">{description}</p>
  </div>
);

export default EssentialAmenityCard;

