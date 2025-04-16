
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  imageUrl?: string;
}

const PageHeader = ({ 
  title, 
  description, 
  className,
  children,
  imageUrl = "/placeholder.svg" 
}: PageHeaderProps) => {
  return (
    <div className={cn(
      "relative bg-gradient-to-b from-rvblue/10 to-white py-10 md:py-16",
      className
    )}>
      <div className="absolute inset-0 z-0 opacity-25">
        <img 
          src={imageUrl} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white"></div>
      </div>
      
      <div className="section-container relative z-10">
        <h1 className="page-title">{title}</h1>
        {description && (
          <p className="text-xl md:text-2xl max-w-3xl text-gray-700 mb-8">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
