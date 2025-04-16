
import { ReactNode } from "react";

interface AmenityCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const AmenityCard = ({ icon, title, description }: AmenityCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="text-rvblue mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-display text-rvmaroon mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default AmenityCard;
