
import { MapPin, Store, Utensils, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const recommendations = [
  {
    title: "Palo Pinto Mountains State Park",
    description: "Our top pick for hiking, horseback riding, and incredible views.",
    icon: <MapPin className="h-7 w-7 text-rvblue" aria-label="Park" />,
    learnMore: "#",
  },
  {
    title: "Lake Leon",
    description: "A guest favorite for early morning fishing or kayaking.",
    icon: <Star className="h-7 w-7 text-rvyellow" aria-label="Lake" />,
    learnMore: "#",
  },
  {
    title: "Mary’s Café (Strawn, TX)",
    description: "Local legend for its massive chicken-fried steak.",
    icon: <Utensils className="h-7 w-7 text-rvmaroon" aria-label="Cafe" />,
    learnMore: "#",
  },
  {
    title: "Downtown Stephenville",
    description: "Great for dining, shopping, and soaking up small-town charm.",
    icon: <Store className="h-7 w-7 text-rvolive" aria-label="Shops" />,
    learnMore: "#",
  },
  {
    title: "Eastland Antique Shops",
    description: "Multiple storefronts filled with vintage finds and Texas treasures.",
    icon: <Store className="h-7 w-7 text-rvred" aria-label="Antiques" />,
    learnMore: "#",
  },
  {
    title: "W.K. Gordon Center",
    description: "Educational and visually immersive — guests often rave about it.",
    icon: <MapPin className="h-7 w-7 text-rvblue" aria-label="Museum" />,
    learnMore: "#",
  },
];

const FrontDeskRecommendations = () => (
  <section className="section-container bg-gray-50 rounded-xl mb-10">
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-display mb-2 text-rvmaroon font-bold tracking-wide">
        Front Desk Recommendations
      </h2>
      <p className="max-w-2xl mx-auto text-gray-700 font-medium">
        Top picks from our team—explore guest favorites across the area!
      </p>
    </div>
    <div className="flex gap-6 overflow-x-auto snap-x pb-4 -mx-2 px-2">
      {recommendations.map((rec, idx) => (
        <Card
          key={rec.title}
          className="min-w-[285px] max-w-xs flex-shrink-0 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border-2 border-rvyellow snap-start animate-fade-in"
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
  </section>
);

export default FrontDeskRecommendations;
