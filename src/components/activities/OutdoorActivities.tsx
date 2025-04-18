
import { Mountain, Fish, Flower2, Warehouse } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const OutdoorActivities = () => {
  const activities = [
    {
      title: "Palo Pinto Mountains State Park",
      description: "Hike, ride, or explore this newly opened Texas state park just one exit away.",
      icon: <Mountain className="h-10 w-10 text-rvblue" />,
    },
    {
      title: "Lake Leon",
      description: "Fish, kayak, or relax by the water — a perfect afternoon escape.",
      icon: <Fish className="h-10 w-10 text-rvblue" />,
    },
    {
      title: "Scenic Drives & Wildflower Trails",
      description: "Explore seasonal wildflower routes and open Texas skies.",
      icon: <Flower2 className="h-10 w-10 text-rvblue" />,
    },
    {
      title: "Horseback Riding Trails",
      description: "Ideal for guests using our horse hotel — direct access nearby.",
      icon: <Warehouse className="h-10 w-10 text-rvblue" />,
    },
  ];

  return (
    <section className="section-container">
      <div className="text-center mb-8">
        <h2 className="section-title">Outdoor Activities</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the natural beauty of the surrounding area.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity, index) => (
          <Card key={index} className="border-t-4 border-rvblue hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-rvblue/10">
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

export default OutdoorActivities;
