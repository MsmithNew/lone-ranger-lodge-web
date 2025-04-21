
import { Button } from "@/components/ui/button";

interface RateCardProps {
  title: string;
  price: string;
  note: string;
  highlightColor?: string;
  buttonColor?: string;
  border?: string;
  className?: string;
}

const RateCard = ({
  title,
  price,
  note,
  highlightColor = "bg-rvred text-white",
  buttonColor = "bg-rvblue hover:bg-rvblue/90",
  border = "border-rvred",
  className = ""
}: RateCardProps) => (
  <div
    className={`rounded-xl shadow-md border-2 ${border} flex flex-col p-6 mb-4 w-full max-w-[340px] mx-auto ${className}`}
    style={{ minHeight: 230 }}
  >
    <h4 className={`font-display text-lg font-bold mb-3 ${highlightColor} py-2 px-3 rounded-md inline-block w-fit`}>
      {title}
    </h4>
    <div className="mt-2 mb-3">
      <span className="block text-3xl font-extrabold text-rvmaroon mb-1">{price}</span>
      <span className="block text-gray-600 text-sm">{note}</span>
    </div>
    <div className="flex-grow" />
    <Button className={`mt-4 w-full ${buttonColor} text-white font-bold rounded-md py-2 px-4 text-lg shadow-sm`}>
      Book Now
    </Button>
  </div>
);

export default RateCard;
