
import React from "react";
import { cn } from "@/lib/utils";

interface RecreationAmenityBlockProps {
  image: string;
  title: string;
  description: string;
  reverse?: boolean;
}

const maroon = "#804F58";

const RecreationAmenityBlock = ({
  image,
  title,
  description,
  reverse = false,
}: RecreationAmenityBlockProps) => (
  <div className={cn(
    "flex flex-col md:flex-row items-center gap-6 py-10 md:py-14 px-3 md:px-6 rounded-2xl bg-white shadow transition",
    reverse && "md:flex-row-reverse"
  )}>
    <div className="md:w-1/2 w-full flex-shrink-0 flex justify-center items-center">
      <img
        src={image}
        alt={title}
        className="rounded-lg object-cover shadow-md w-full max-w-xl h-56 md:h-72"
        loading="lazy"
        style={{background: "#F1F1F1"}}
      />
    </div>
    <div className="md:w-1/2 w-full flex flex-col justify-center items-center md:items-start text-center md:text-left px-0 md:px-4">
      <h3 className="text-2xl md:text-3xl font-display mb-2" style={{ color: maroon }}>
        {title}
      </h3>
      <p className="text-gray-700 text-lg">{description}</p>
    </div>
  </div>
);

export default RecreationAmenityBlock;
