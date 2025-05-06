import React from "react";
import { ArrowLeft, ArrowRight, MapPin, Store, Utensils, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface Attraction {
  id: number;
  key: string;
  image_url: string;
  title?: string | null;
  description?: string | null;
  learnMore?: string | null;
  category?: string;
  display_order?: number | null;
}

interface FrontDeskRecommendationsProps {
  recommendations?: Attraction[];
}

// Default recommendations as fallback
const defaultRecommendations = [
  {
    id: 1,
    key: "paloPinto",
    title: "Palo Pinto Mountains State Park",
    description: "Our top pick for hiking, horseback riding, and incredible views.",
    image_url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    learnMore: "https://tpwd.texas.gov/state-parks/palo-pinto-mountains",
    category: "recommendations",
    display_order: 0
  },
  {
    id: 2,
    key: "lakeLeon",
    title: "Lake Leon",
    description: "A guest favorite for early morning fishing or kayaking.",
    image_url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716", 
    learnMore: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/leon/",
    category: "recommendations",
    display_order: 1
  },
  {
    id: 3,
    key: "marysCafe",
    title: "Mary's Café (Strawn, TX)",
    description: "Local legend for its massive chicken-fried steak.",
    image_url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    learnMore: "https://www.tripadvisor.com/Restaurant_Review-g56719-d1141351-Reviews-Mary_s_Cafe-Strawn_Texas.html",
    category: "recommendations",
    display_order: 2
  },
  {
    id: 4,
    key: "downtownStephenville",
    title: "Downtown Stephenville",
    description: "Great for dining, shopping, and soaking up small-town charm.",
    image_url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716", 
    learnMore: "https://www.stephenvilletx.gov/administrative-services/page/stephenville-main-street",
    category: "recommendations",
    display_order: 3
  },
  {
    id: 5,
    key: "gordonCenter",
    title: "W.K. Gordon Center",
    description: "Educational and visually immersive — guests often rave about it.",
    image_url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    learnMore: "https://www.tarleton.edu/gordoncenter/",
    category: "recommendations",
    display_order: 4
  },
];

const getIconForRecommendation = (index: number) => {
  const icons = [
    <MapPin className="h-7 w-7 text-rvblue" aria-label="Park" key="mappin" />,
    <Star className="h-7 w-7 text-rvyellow" aria-label="Lake" key="star" />,
    <Utensils className="h-7 w-7 text-rvmaroon" aria-label="Cafe" key="utensils" />,
    <Store className="h-7 w-7 text-rvolive" aria-label="Shops" key="store" />,
    <MapPin className="h-7 w-7 text-rvblue" aria-label="Museum" key="mappin2" />
  ];
  
  return icons[index % icons.length];
};

const getCardsPerPage = () => {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3; // lg+
  if (window.innerWidth >= 640) return 2; // sm/md
  return 1; // xs
};

const FrontDeskRecommendations: React.FC<FrontDeskRecommendationsProps> = ({ recommendations }) => {
  const [startIdx, setStartIdx] = React.useState(0);
  const [cardsPerPage, setCardsPerPage] = React.useState(getCardsPerPage());
  
  // Use provided recommendations or fall back to defaults
  const recList = recommendations || defaultRecommendations;

  React.useEffect(() => {
    function handleResize() {
      setCardsPerPage(getCardsPerPage());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxStartIdx = Math.max(0, recList.length - cardsPerPage);

  React.useEffect(() => {
    if (startIdx > maxStartIdx) setStartIdx(maxStartIdx);
  }, [cardsPerPage, startIdx, maxStartIdx]);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(0, prev - cardsPerPage));
  };

  const handleNext = () => {
    setStartIdx((prev) => Math.min(maxStartIdx, prev + cardsPerPage));
  };

  const visibleCards = recList.slice(startIdx, startIdx + cardsPerPage);

  return (
    <section className="section-container bg-gray-50 rounded-xl mb-10 relative">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display mb-2 text-rvmaroon font-bold tracking-wide">
          Front Desk Recommendations
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 font-medium">
          Top picks from our team—explore guest favorites across the area!
        </p>
      </div>
      <div className="relative flex items-center">
        <button
          onClick={handlePrev}
          disabled={startIdx === 0}
          aria-label="Previous"
          className={`absolute left-0 z-10 bg-white border-2 border-rvblue text-rvblue rounded-full p-2 shadow-md transition hover:bg-rvblue hover:text-white disabled:opacity-40 disabled:cursor-not-allowed -translate-x-1/2`}
          style={{ top: "50%", transform: "translateY(-50%) translateX(-50%)" }}
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <div className="flex-1 flex justify-center gap-6">
          {visibleCards.map((rec, idx) => (
            <Card
              key={rec.id || rec.key}
              className="min-w-[250px] max-w-xs flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border-2 border-rvyellow animate-fade-in"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <CardContent className="flex flex-col items-center gap-3 pt-8 pb-5 px-5">
                <span className="rounded-full p-3 bg-rvblue/10 mb-2">
                  {getIconForRecommendation(idx)}
                </span>
                <h3 className="font-display text-lg md:text-xl font-bold text-rvmaroon text-center">{rec.title}</h3>
                <p className="text-gray-700 text-center text-base">{rec.description}</p>
              </CardContent>
              <div className="flex justify-center pb-5">
                <a
                  href={rec.learnMore}
                  className="text-rvblue font-semibold hover:underline transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More &rarr;
                </a>
              </div>
            </Card>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={startIdx >= maxStartIdx}
          aria-label="Next"
          className={`absolute right-0 z-10 bg-white border-2 border-rvblue text-rvblue rounded-full p-2 shadow-md transition hover:bg-rvblue hover:text-white disabled:opacity-40 disabled:cursor-not-allowed translate-x-1/2`}
          style={{ top: "50%", transform: "translateY(-50%) translateX(50%)" }}
        >
          <ArrowRight className="h-7 w-7" />
        </button>
      </div>
    </section>
  );
};

export default FrontDeskRecommendations;
