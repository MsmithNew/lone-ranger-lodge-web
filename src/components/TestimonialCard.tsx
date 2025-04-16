
interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

const TestimonialCard = ({
  quote,
  author,
  location,
  rating
}: TestimonialCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-rvyellow" : "text-gray-300"
            } fill-current`}
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold text-rvmaroon">{author}</p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
