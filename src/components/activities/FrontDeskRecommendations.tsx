import React from "react";
import { ArrowLeft, ArrowRight, MapPin, Store, Utensils, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const recommendations = [
  {
    title: "Palo Pinto Mountains State Park",
    description: "Our top pick for hiking, horseback riding, and incredible views.",
    icon: <MapPin className="h-7 w-7 text-rvblue" aria-label="Park" />,
    learnMore: "https://tpwd.texas.gov/state-parks/palo-pinto-mountains",
  },
  {
    title: "Lake Leon",
    description: "A guest favorite for early morning fishing or kayaking.",
    icon: <Star className="h-7 w-7 text-rvyellow" aria-label="Lake" />,
    learnMore: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/leon/",
  },
  {
    title: "Mary's Café (Strawn, TX)",
    description: "Local legend for its massive chicken-fried steak.",
    icon: <Utensils className="h-7 w-7 text-rvmaroon" aria-label="Cafe" />,
    learnMore: "https://www.tripadvisor.com/Restaurant_Review-g56719-d1141351-Reviews-Mary_s_Cafe-Strawn_Texas.html",
  },
  {
    title: "Downtown Stephenville",
    description: "Great for dining, shopping, and soaking up small-town charm.",
    icon: <Store className="h-7 w-7 text-rvolive" aria-label="Shops" />,
    learnMore: "https://www.stephenvilletx.gov/administrative-services/page/stephenville-main-street",
  },
  {
    title: "W.K. Gordon Center",
    description: "Educational and visually immersive — guests often rave about it.",
    icon: <MapPin className="h-7 w-7 text-rvblue" aria-label="Museum" />,
    learnMore: "https://www.tarleton.edu/gordoncenter/",
  },
];

const getCardsPerPage = () => {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3; // lg+
  if (window.innerWidth >= 640) return 2; // sm/md
  return 1; // xs
};

const FrontDeskRecommendations = () => {
  const [startIdx, setStartIdx] = React.useState(0);
  const [cardsPerPage, setCardsPerPage] = React.useState(getCardsPerPage());

  React.useEffect(() => {
    function handleResize() {
      setCardsPerPage(getCardsPerPage());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxStartIdx = Math.max(0, recommendations.length - cardsPerPage);

  React.useEffect(() => {
    if (startIdx > maxStartIdx) setStartIdx(maxStartIdx);
  }, [cardsPerPage, startIdx, maxStartIdx]);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(0, prev - cardsPerPage));
  };

  const handleNext = () => {
    setStartIdx((prev) => Math.min(maxStartIdx, prev + cardsPerPage));
  };

  const visibleCards = recommendations.slice(startIdx, startIdx + cardsPerPage);

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
              key={rec.title}
              className="min-w-[250px] max-w-xs flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border-2 border-rvyellow animate-fade-in"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <CardContent className="flex flex-col items-center gap-3 pt-8 pb-5 px-5">
                <span className="rounded-full p-3 bg-rvblue/10 mb-2">{rec.icon}</span>
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
