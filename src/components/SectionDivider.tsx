
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

const SectionDivider = ({ className }: SectionDividerProps) => {
  return (
    <div className={cn("flex items-center justify-center py-8 md:py-12", className)}>
      <div className="w-16 h-1 bg-rvyellow rounded-full mx-2"></div>
      <div className="w-4 h-4 bg-rvred rounded-full mx-2"></div>
      <div className="w-16 h-1 bg-rvyellow rounded-full mx-2"></div>
    </div>
  );
};

export default SectionDivider;
