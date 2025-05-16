
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  linkType: 'internal' | 'external';
  imageUrl?: string;
}

const CTABanner = ({ 
  title = "Turn your next road trip into a real adventure.",
  description = "Reserve your stay at Lone Ranger RV Park & Lodge and experience retro Americana with all the comforts of today.",
  buttonText = "Book Now",
  buttonLink = "/reservations",
  linkType = "internal",
  imageUrl
}: CTABannerProps) => {
  const backgroundStyle = imageUrl ? {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};
  
  const textColorClass = imageUrl ? "text-white" : "text-rvmaroon";
  const bgColorClass = imageUrl ? "" : "bg-[#F1F0FB]";
  
  return (
    <section 
      className={`py-16 mt-8 ${bgColorClass}`}
      style={backgroundStyle}
    >
      <div className="section-container text-center max-w-4xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-display ${textColorClass} mb-4`}>
          {title}
        </h2>
        <p className={`text-lg ${imageUrl ? 'text-gray-200' : 'text-gray-700'} mb-8`}>
          {description}
        </p>
        
        {linkType === 'internal' ? (
          <Button 
            asChild
            className="bg-rvblue hover:bg-rvblue/90 text-white px-8 py-6 text-lg"
            size="lg"
          >
            <Link to={buttonLink}>{buttonText}</Link>
          </Button>
        ) : (
          <Button 
            className="bg-rvblue hover:bg-rvblue/90 text-white px-8 py-6 text-lg"
            size="lg"
            onClick={() => window.open(buttonLink, '_blank')}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </section>
  );
};

export default CTABanner;
