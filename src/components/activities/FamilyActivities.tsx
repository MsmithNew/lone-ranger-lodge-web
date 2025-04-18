
import { Film, Candy, Salad, Dog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FamilyActivities = () => {
  const activities = [
    {
      title: "Historic Ranger Drive-In Theater (Coming Soon)",
      description: "A retro movie night under the stars — reopening soon!",
      icon: <Film className="h-10 w-10 text-rvmaroon" />,
    },
    {
      title: "Candy & Ice Cream Shop",
      description: "A vintage-style sweet shop inside a restored Texaco station.",
      icon: <Candy className="h-10 w-10 text-rvmaroon" />,
    },
    {
      title: "Pickleball in Town",
      description: "Local courts available — great for families and casual players.",
      icon: <Salad className="h-10 w-10 text-rvmaroon" />,
    },
    {
      title: "Dog-Friendly Trails",
      description: "Grab a leash and explore open spaces perfect for pups.",
      icon: <Dog className="h-10 w-10 text-rvmaroon" />,
    },
  ];

  return (
    <section className="section-container bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="section-title">Family Fun</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Activities perfect for visitors of all ages.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity, index) => (
          <Card key={index} className="border-t-4 border-rvmaroon hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-rvmaroon/10">
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

export default FamilyActivities;
