
interface ActivityCardProps {
  title: string;
  description: string;
  imageUrl: string;
  distance: string;
}

const ActivityCard = ({
  title,
  description,
  imageUrl,
  distance
}: ActivityCardProps) => {
  return (
    <div className="card group h-full flex flex-col">
      <div className="relative overflow-hidden h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="text-white text-sm font-medium">{distance}</span>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-display text-rvmaroon mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
