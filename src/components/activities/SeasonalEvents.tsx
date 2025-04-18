
import { Calendar } from "lucide-react";

const SeasonalEvents = () => {
  const events = [
    {
      season: "Spring",
      events: ["Wildflower Festivals", "Local Rodeos"],
      color: "bg-green-100 border-green-300",
      textColor: "text-green-800",
    },
    {
      season: "Summer",
      events: ["Live Music Nights", "Cookouts by the Lake"],
      color: "bg-rvyellow/20 border-rvyellow",
      textColor: "text-yellow-800",
    },
    {
      season: "Fall",
      events: ["Harvest Markets", "Classic Car Shows"],
      color: "bg-orange-100 border-orange-300",
      textColor: "text-orange-800",
    },
    {
      season: "Winter",
      events: ["Ranger Christmas Parade", "Holiday Light Drives"],
      color: "bg-blue-100 border-blue-300",
      textColor: "text-blue-800",
    },
  ];

  return (
    <section className="section-container bg-rvyellow/5">
      <div className="text-center mb-8">
        <h2 className="section-title">Seasonal Events Calendar</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Exciting events happening throughout the year near Lone Ranger RV Park & Lodge.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {events.map((item, index) => (
          <div key={index} className={`rounded-lg border ${item.color} p-6 text-center`}>
            <div className="flex justify-center mb-3">
              <Calendar className="h-8 w-8 text-rvmaroon" />
            </div>
            <h3 className="font-display text-xl text-rvmaroon mb-3">{item.season}</h3>
            <ul className={`space-y-2 ${item.textColor}`}>
              {item.events.map((event, idx) => (
                <li key={idx} className="flex items-center justify-center gap-1">
                  <span>•</span> {event}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 italic">
          Ask our front desk for more information on upcoming events during your stay!
        </p>
      </div>
    </section>
  );
};

export default SeasonalEvents;
