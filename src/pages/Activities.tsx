
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mountain,
  Fish,
  Flower2,
  Warehouse,
  Film,
  Candy,
  Tennis,
  Dog,
  Music,
  Store,
  Plane,
  Paintbrush,
  Calendar,
  Utensils,
  MapPin,
  Coffee,
} from "lucide-react";

const Activities = () => {
  const outdoorActivities = [
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
  
  const familyActivities = [
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
      icon: <Tennis className="h-10 w-10 text-rvmaroon" />,
    },
    {
      title: "Dog-Friendly Trails",
      description: "Grab a leash and explore open spaces perfect for pups.",
      icon: <Dog className="h-10 w-10 text-rvmaroon" />,
    },
  ];
  
  const culturalActivities = [
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
  
  const seasonalEvents = [
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
  
  const staffRecommendations = [
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
    <Layout>
      <PageHeader
        title="What to Do Nearby"
        description="Discover local attractions and activities within a short drive of Lone Ranger RV Park & Lodge."
        imageUrl="/placeholder.svg"
      />
      
      {/* Outdoor Activities */}
      <section className="section-container">
        <div className="text-center mb-8">
          <h2 className="section-title">Outdoor Activities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the natural beauty of the surrounding area.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outdoorActivities.map((activity, index) => (
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
      
      <SectionDivider />
      
      {/* Family Fun */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-8">
          <h2 className="section-title">Family Fun</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Activities perfect for visitors of all ages.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {familyActivities.map((activity, index) => (
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
      
      <SectionDivider />
      
      {/* Arts & Culture */}
      <section className="section-container">
        <div className="text-center mb-8">
          <h2 className="section-title">Arts & Culture</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in the rich culture of the region.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturalActivities.map((activity, index) => (
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
      
      <SectionDivider />
      
      {/* Seasonal Events Calendar */}
      <section className="section-container bg-rvyellow/5">
        <div className="text-center mb-8">
          <h2 className="section-title">Seasonal Events Calendar</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Exciting events happening throughout the year near Lone Ranger RV Park & Lodge.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {seasonalEvents.map((item, index) => (
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
      
      <SectionDivider />
      
      {/* Staff Recommendations */}
      <section className="section-container">
        <div className="text-center mb-8">
          <h2 className="section-title">Staff Recommendations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Local favorites and must-visit spots recommended by our team.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {staffRecommendations.map((item, index) => (
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
      
      {/* Find Your Adventure Banner */}
      <section className="relative bg-gradient-to-r from-rvmaroon to-rvblue text-white py-16 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-3xl mb-4">Find Your Texas Adventure</h2>
          <p className="text-lg mb-8">
            Our central location puts you within easy reach of the best that central Texas has to offer.
          </p>
          <div className="flex items-center justify-center gap-3">
            <MapPin className="h-6 w-6" />
            <span className="font-medium">Within 30 minutes of all these attractions</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </section>
    </Layout>
  );
};

export default Activities;
