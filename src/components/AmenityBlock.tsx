
import React from "react";
import { cn } from "@/lib/utils";

interface AmenityBlockProps {
  image: string;
  title: string;
  description: string;
  imageAlt?: string;
  reverse?: boolean; // To alternate layout
}

const maroon = "#804F58";

const AmenityBlock = ({
  image,
  title,
  description,
  imageAlt = "",
  reverse = false,
}: AmenityBlockProps) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center gap-6 md:gap-12 py-4 md:py-8 animate-fade-in",
        reverse && "md:flex-row-reverse"
      )}
    >
      <div className="flex-shrink-0 w-full md:w-1/3">
        <div className="rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white">
          <img
            src={image}
            alt={imageAlt || title}
            className="object-cover w-full h-48 md:h-56"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-display mb-2" style={{ color: maroon }}>
          {title}
        </h3>
        <p className="text-gray-700 text-lg">{description}</p>
      </div>
    </div>
  );
};

export default AmenityBlock;
