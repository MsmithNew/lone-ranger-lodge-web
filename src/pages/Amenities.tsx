import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import AmenityCard from "@/components/AmenityCard";
import ImageGallery from "@/components/ImageGallery";
import { 
  Wifi, SwimmingPool, UtensilsCrossed, Dog, ShowerHead, Waypoints,
  Dumbbell, Car, Tent, Baby, TreePine, Coffee 
} from "lucide-react";

const Amenities = () => {
  const essentialAmenities = [
    {
      icon: <Wifi size={36} />,
      title: "Free Wi-Fi",
      description: "High-speed wireless internet available throughout the property to keep you connected."
    },
    {
      icon: <ShowerHead size={36} />,
      title: "Modern Bathhouses",
      description: "Clean, spacious bathhouses with private shower stalls, dressing areas, and laundry facilities."
    },
    {
      icon: <Car size={36} />,
      title: "Pull-Through Sites",
      description: "Easy access pull-through RV sites with full hookups, including 50/30/20 amp service."
    },
    {
      icon: <UtensilsCrossed size={36} />,
      title: "On-Site Dining",
      description: "Our 50's-style diner serves breakfast and dinner daily, plus a general store for supplies."
    },
    {
      icon: <Waypoints size={36} />,
      title: "Central Location",
      description: "Conveniently located near popular attractions, hiking trails, and shopping areas."
    },
    {
      icon: <Dog size={36} />,
      title: "Pet Friendly",
      description: "Dedicated dog park and pet-friendly accommodations so your furry friends can join the fun."
    }
  ];
  
  const recreationAmenities = [
    {
      icon: <SwimmingPool size={36} />,
      title: "Swimming Pool",
      description: "Heated pool with lounge area, splash pad for kids, and seasonal poolside service."
    },
    {
      icon: <Dumbbell size={36} />,
      title: "Fitness Trail",
      description: "Scenic 1-mile fitness trail with workout stations throughout the property."
    },
    {
      icon: <Tent size={36} />,
      title: "Community Campfire",
      description: "Nightly community campfires with complimentary s'mores and storytelling."
    },
    {
      icon: <Baby size={36} />,
      title: "Playground",
      description: "Vintage-inspired playground with modern safety features for children of all ages."
    },
    {
      icon: <TreePine size={36} />,
      title: "Nature Trails",
      description: "Explore our network of nature trails with guided walks available on weekends."
    },
    {
      icon: <Coffee size={36} />,
      title: "Community Lounge",
      description: "Indoor community lounge with games, books, TV, and complimentary coffee and tea."
    }
  ];
  
  const amenityImages = [
    { src: "/placeholder.svg", alt: "Swimming pool" },
    { src: "/placeholder.svg", alt: "50's style diner" },
    { src: "/placeholder.svg", alt: "Modern bathhouse" },
    { src: "/placeholder.svg", alt: "Community campfire" },
    { src: "/placeholder.svg", alt: "Dog park" },
    { src: "/placeholder.svg", alt: "Nature trail" }
  ];

  return (
    <Layout>
      <PageHeader
        title="Amenities & Features"
        description="Discover all the amenities and features that make Lone Ranger RV Park & Lodge the perfect getaway destination."
      />
      
      {/* Essential Amenities */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Essential Amenities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide all the essentials needed for a comfortable and convenient stay.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {essentialAmenities.map((amenity, index) => (
            <AmenityCard
              key={index}
              icon={amenity.icon}
              title={amenity.title}
              description={amenity.description}
            />
          ))}
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Recreation & Activities */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="section-title">Recreation & Activities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Plenty of on-site activities to keep you entertained throughout your stay.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recreationAmenities.map((amenity, index) => (
            <AmenityCard
              key={index}
              icon={amenity.icon}
              title={amenity.title}
              description={amenity.description}
            />
          ))}
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Special Features */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Special Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unique offerings that set Lone Ranger RV Park & Lodge apart.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-display text-rvmaroon mb-3">50's Style Roadside Diner</h3>
            <p className="text-gray-600 mb-4">
              Step back in time at our authentic 50's inspired diner serving classic American comfort food. Enjoy daily breakfast specials, hand-dipped milkshakes, and hearty dinners in a nostalgic setting complete with jukebox and vintage decor.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Breakfast served 7am-11am
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Dinner served 5pm-9pm
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Friday night all-you-can-eat fish fry
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Saturday classic car meet-ups (seasonal)
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-display text-rvmaroon mb-3">Vintage Game Arcade</h3>
            <p className="text-gray-600 mb-4">
              Our vintage game arcade features classic pinball machines, arcade games from the 70s and 80s, and table games for all ages. The perfect rainy day activity or evening entertainment.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Classic pinball collection
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Restored arcade machines
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Air hockey and shuffleboard
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Weekly tournaments with prizes
              </li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-display text-rvmaroon mb-3">Vintage Trailer Museum</h3>
            <p className="text-gray-600 mb-4">
              Explore our small but impressive collection of restored vintage trailers from the 1940s-1970s. Learn about the history of American road travel and see how camping has evolved over the decades.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Guided tours available on weekends
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Interactive exhibits on RV history
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Photo opportunities in restored settings
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Free admission for park guests
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-display text-rvmaroon mb-3">Ranger's General Store</h3>
            <p className="text-gray-600 mb-4">
              Our well-stocked general store offers everything from camping essentials to local crafts and souvenirs. Forgot something at home? We've got you covered!
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                RV supplies and essentials
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Local products and crafts
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Grocery basics and ice
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                Lone Ranger branded merchandise
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Amenities Gallery */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="section-title">Amenities Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a visual tour of some of our favorite amenities and features.
          </p>
        </div>
        
        <ImageGallery images={amenityImages} />
      </section>
      
      {/* Seasonal Amenities */}
      <section className="section-container bg-rvblue/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">Seasonal Amenities & Events</h2>
          
          <div className="space-y-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-display text-rvmaroon mb-2">Summer (June - August)</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Outdoor movie nights every Friday
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Ice cream social every Saturday
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Extended pool hours with poolside service
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Annual 4th of July vintage car parade and barbecue
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-display text-rvmaroon mb-2">Fall (September - November)</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Harvest festival weekend in October
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Guided fall foliage hikes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Halloween weekend with trick-or-treating and costume contest
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Thanksgiving potluck dinner
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-display text-rvmaroon mb-2">Winter & Spring (December - May)</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Holiday light display and Christmas celebration
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Indoor game tournaments in the community center
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Spring wildflower walks and bird watching excursions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-rvred rounded-full mr-2"></span>
                  Easter egg hunt and pancake breakfast
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Amenities;
