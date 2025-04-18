
import { Music, Store, Plane, Paintbrush } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CulturalActivities = () => {
  const activities = [
    {
      title: "Downtown Stephenville",
      description: "A short drive to live music, local art, coffee, and shopping.",
      icon: <Music className="h-10 w-10 text-rvolive" />,
    },
    {
      title: "Eastland Antique Shops",
      description: "Small-town Texas charm and vintage treasures in every store.",
      icon: <Store className="h-10 w-10 text-rvolive" />,
    },
    {
      title: "Historic Ranger Airport",
      description: "A cool local landmark for aviation and history fans.",
      icon: <Plane className="h-10 w-10 text-rvolive" />,
    },
    {
      title: "Public Art & Murals (Stephenville)",
      description: "Explore colorful murals and rotating displays from local artists.",
      icon: <Paintbrush className="h-10 w-10 text-rvolive" />,
    },
  ];

  return (
    <section className="section-container">
      <div className="text-center mb-8">
        <h2 className="section-title">Arts & Culture</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Immerse yourself in the rich culture of the region.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity, index) => (
          <Card key={index} className="border-t-4 border-rvolive hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-rvolive/10">
                  {activity.icon}
                </div>
                <h3 className="font-display text-lg text-rvmaroon mb-2">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CulturalActivities;
