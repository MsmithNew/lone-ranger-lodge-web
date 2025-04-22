import React from "react";
import { cn } from "@/lib/utils";
interface AmenityBlockProps {
  image: string;
  title: string;
  description: string;
  imageAlt?: string;
  reverse?: boolean;
  alternateBg?: boolean; // For visual separation
  showDivider?: boolean; // For amenity block divider
}
const maroon = "#804F58";
const lightBg = "#F1F0FB"; // Soft gray-beige from palette

const AmenityBlock = ({
  image,
  title,
  description,
  imageAlt = "",
  reverse = false,
  alternateBg = false,
  showDivider = false
}: AmenityBlockProps) => {
  return <div>
      <div className={cn("flex flex-col md:flex-row items-center gap-6 py-8 md:py-12 px-3 md:px-6 rounded-2xl transition-colors duration-300", reverse && "md:flex-row-reverse", alternateBg ? "" : "")} style={{
      backgroundColor: alternateBg ? lightBg : "#fff"
    }}>
        <div className="md:w-1/2 w-full flex-shrink-0 flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white w-full max-w-md">
            <img src={image} alt={imageAlt || title} className="object-cover w-full h-48 md:h-56" loading="lazy" />
          </div>
        </div>
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center md:items-start text-center md:text-left px-2 md:px-6">
          <h3 className="text-2xl md:text-3xl font-display mb-2" style={{
          color: maroon
        }}>
            {title}
          </h3>
          <p className="text-gray-700 text-lg">{description}</p>
        </div>
      </div>
      {showDivider}
    </div>;
};
export default AmenityBlock;