
import React from "react";
import { cn } from "@/lib/utils";
import {
  Wifi,
  Dog,
  Laundry,
  ShowerHead,
  Plug,
  CarFront,
  Bed
} from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  "wifi": <Wifi color="#FF1F47" size={32} strokeWidth={2.3}/>,
  "dog": <Dog color="#FF1F47" size={32} strokeWidth={2.3}/>,
  "laundry": <Laundry color="#FF1F47" size={32} strokeWidth={2.3}/>,
  "shower-head": <ShowerHead color="#FF1F47" size={32} strokeWidth={2.3}/>,
  "plug": <Plug color="#FF1F47" size={32} strokeWidth={2.3}/>,
  "car-front": <CarFront color="#FF1F47" size={32} strokeWidth={2.3}/>,
  "bed": <Bed color="#FF1F47" size={32} strokeWidth={2.3}/>,
};

interface EssentialAmenityCardProps {
  icon: keyof typeof ICONS;
  title: string;
  description: string;
}

const maroon = "#804F58";

const EssentialAmenityCard = ({
  icon,
  title,
  description
}: EssentialAmenityCardProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-2 h-full hover:shadow-md transition box-border">
    <div className="mb-2">
      {ICONS[icon]}
    </div>
    <h3 className="font-semibold text-lg md:text-xl text-[color:#804F58] mb-1">{title}</h3>
    <p className="text-gray-700 text-base">{description}</p>
  </div>
);

export default EssentialAmenityCard;
