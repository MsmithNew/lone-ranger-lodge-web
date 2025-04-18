
import { Mountain, Fish, Utensils, Music, Film, Store } from "lucide-react";

const StaffRecommendations = () => {
  const recommendations = [
    {
      title: "Palo Pinto Mountains State Park",
      description: "Must-see for outdoor lovers",
      icon: <Mountain className="h-6 w-6 text-rvblue" />,
    },
    {
      title: "Lake Leon",
      description: "Great for fishing and peaceful mornings",
      icon: <Fish className="h-6 w-6 text-rvblue" />,
    },
    {
      title: "Mary's Café (Strawn)",
      description: "Local favorite for hearty comfort food",
      icon: <Utensils className="h-6 w-6 text-rvmaroon" />,
    },
    {
      title: "Downtown Stephenville",
      description: "Music, food, shops",
      icon: <Music className="h-6 w-6 text-rvmaroon" />,
    },
    {
      title: "Historic Drive-In Theater",
      description: "Ask when it reopens",
      icon: <Film className="h-6 w-6 text-rvmaroon" />,
    },
    {
      title: "Eastland",
      description: "Classic small-town antique stop",
      icon: <Store className="h-6 w-6 text-rvolive" />,
    },
    {
      title: "Gulf Burgers",
      description: "(On-site) A guest favorite for burgers and beer",
      icon: <Utensils className="h-6 w-6 text-rvolive" />,
    },
  ];

  return (
    <section className="section-container">
      <div className="text-center mb-8">
        <h2 className="section-title">Staff Recommendations</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Local favorites and must-visit spots recommended by our team.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="p-2 rounded-full bg-gray-100 flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h3 className="font-display text-lg text-rvmaroon">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffRecommendations;
