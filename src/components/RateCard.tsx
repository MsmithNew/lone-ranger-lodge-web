
import { Button } from "@/components/ui/button";

interface RateCardProps {
  label: string;
  price: string;
  note: string;
  className?: string;
}

// Pill styling refactored for a consistent appearance across cards
const RateCard = ({
  label,
  price,
  note,
  className = "",
}: RateCardProps) => (
  <div
    className={`rounded-xl shadow-md border-2 border-[#804F58] flex flex-col p-6 mb-4 w-full max-w-[340px] mx-auto bg-white ${className}`}
    style={{ minHeight: 250 }}
  >
    {/* Red pill badge for label (top-left) */}
    <div className="mb-4 flex items-start">
      <span className="inline-block px-4 py-1 rounded-full bg-[#FF1F47] text-white font-bold text-sm shadow-sm">
        {label}
      </span>
    </div>
    <div className="mb-4">
      <span className="block text-3xl font-extrabold text-rvmaroon mb-1">{price}</span>
      <span className="block text-gray-600 text-sm">{note}</span>
    </div>
    <div className="flex-grow" />
    <Button className="mt-4 w-full bg-rvblue hover:bg-rvblue/90 text-white font-bold rounded-md py-2 px-4 text-lg shadow-sm">
      Book Now
    </Button>
  </div>
);

export default RateCard;
