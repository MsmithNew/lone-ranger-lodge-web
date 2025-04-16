
import { Link } from "react-router-dom";

interface AccommodationCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  features: string[];
  link: string;
}

const AccommodationCard = ({
  title,
  description,
  imageUrl,
  price,
  features,
  link
}: AccommodationCardProps) => {
  return (
    <div className="card group">
      <div className="relative overflow-hidden h-64">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-rvyellow text-rvmaroon font-bold py-1 px-3 rounded-md">
          {price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-display text-rvmaroon mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <span className="w-2 h-2 bg-rvblue rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
        <Link to={link} className="btn-secondary w-full text-center">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AccommodationCard;
