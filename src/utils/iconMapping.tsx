
import React from 'react';
import { 
  Waves, 
  Building, 
  Power, 
  Warehouse, 
  PlayIcon,
  Dog,
  Music,
  Utensils,
  IceCream,
  ShowerHead,
  Sofa,
  Wifi
} from "lucide-react";

// Map the icon name string to the actual icon component
export const getIconByName = (iconName: string): React.ReactElement => {
  const iconMap: Record<string, React.ReactElement> = {
    Waves: <Waves size={24} className="text-rvblue" />,
    Building: <Building size={24} className="text-rvblue" />,
    Power: <Power size={24} className="text-rvblue" />,
    Warehouse: <Warehouse size={24} className="text-rvblue" />,
    PlayIcon: <PlayIcon size={24} className="text-rvblue" />,
    Dog: <Dog size={24} className="text-rvblue" />,
    Music: <Music size={24} className="text-rvblue" />,
    Utensils: <Utensils size={24} className="text-rvblue" />,
    IceCream: <IceCream size={24} className="text-rvblue" />,
    ShowerHead: <ShowerHead size={24} className="text-rvblue" />,
    Sofa: <Sofa size={24} className="text-rvblue" />,
    Wifi: <Wifi size={24} className="text-rvblue" />
  };

  return iconMap[iconName] || <Waves size={24} className="text-rvblue" />;
};

// Default amenities for fallback
export const defaultAmenities = [
  { name: "Resort-Style Swimming Pool", icon: <Waves size={24} className="text-rvblue" /> },
  { name: "Historic 1930s Lodges", icon: <Building size={24} className="text-rvblue" /> },
  { name: "Full RV Hookups", icon: <Power size={24} className="text-rvblue" /> },
  { name: "Horse Hotel with Stalls", icon: <Warehouse size={24} className="text-rvblue" /> },
  { name: "Pickleball Court", icon: <PlayIcon size={24} className="text-rvblue" /> },
  { name: "Dog Park", icon: <Dog size={24} className="text-rvblue" /> },
  { name: "Live Music on Weekends", icon: <Music size={24} className="text-rvblue" /> },
  { name: "Gulf Burgers Restaurant", icon: <Utensils size={24} className="text-rvblue" /> },
  { name: "Candy & Ice Cream Shop", icon: <IceCream size={24} className="text-rvblue" /> },
  { name: "Laundry + Shower Facilities", icon: <ShowerHead size={24} className="text-rvblue" /> },
  { name: "Lounge with Pool Table", icon: <Sofa size={24} className="text-rvblue" /> },
  { name: "Free Wi-Fi", icon: <Wifi size={24} className="text-rvblue" /> }
];

// Default accommodations for fallback
export const defaultAccommodations = [
  {
    title: "RV Sites",
    description: "Spacious pull-through and back-in sites with full hookups and scenic views.",
    imageUrl: "/placeholder.svg"
  },
  {
    title: "Horse Hotel",
    description: "RV sites with additional horse stalls — perfect for trail riders and rodeo travelers.",
    imageUrl: "/placeholder.svg"
  },
  {
    title: "Lodges",
    description: "Renovated 1930s cabins with vintage exteriors and modern interiors.",
    imageUrl: "/placeholder.svg"
  },
  {
    title: "Tent Sites",
    description: "Peaceful, no-frills outdoor experience perfect for adventurous guests seeking a rustic camping experience.",
    imageUrl: "/placeholder.svg"
  }
];
