
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface SectionDividerProps {
  className?: string;
}

const SectionDivider = ({ className }: SectionDividerProps) => {
  return (
    <div className={cn("py-6 md:py-10", className)}>
      <Separator className="bg-gray-200" />
    </div>
  );
};

export default SectionDivider;
