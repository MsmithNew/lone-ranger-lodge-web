
import React from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  image?: string; // If image is set use it, else fallback to simple colored bg
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const maroon = "#804F58";

const FeatureCard = ({
  image,
  icon,
  title,
  description,
}: FeatureCardProps) => (
  <div className="flex flex-col items-center justify-start bg-white shadow rounded-2xl p-6 h-full text-center border border-gray-100">
    {image ? (
      <div className="w-16 h-16 mb-4 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100">
        <img src={image} alt={title} className="object-cover w-full h-full" loading="lazy" />
      </div>
    ) : icon ? (
      <div className="w-16 h-16 mb-4 rounded-full bg-[#FFF41F] flex items-center justify-center">{icon}</div>
    ) : null}
    <h4 className="font-display text-lg md:text-xl mb-2" style={{ color: maroon }}>
      {title}
    </h4>
    <p className="text-gray-700 text-base">{description}</p>
  </div>
);

export default FeatureCard;
