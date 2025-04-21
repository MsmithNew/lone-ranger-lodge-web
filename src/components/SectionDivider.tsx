
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

const SectionDivider = ({
  className
}: SectionDividerProps) => {
  return (
    <div className={cn("w-full h-px bg-gray-200 my-16", className)} />
  );
};

export default SectionDivider;
