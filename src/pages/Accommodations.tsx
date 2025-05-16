
import React from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/use-content";
import { 
  ParkingCircle, Droplets, Salad, Wifi, Dog, Warehouse, 
  Building, Coffee, ArrowRight, Bed, ShowerHead, 
  Thermometer, Tent, WashingMachine, Utensils 
} from "lucide-react";

// Default content for fallback
const defaultContent = {
  header: {
    title: "Choose Your Stay in the Heart of Ranger, TX",
    description: "Whether you're rolling in with your rig, traveling with horses, or looking for a cozy lodge escape, Lone Ranger RV Park offers comfort, convenience, and retro charm just minutes from Palo Pinto Mountains State Park.",
    imageUrl: "/placeholder.svg"
  },
  accommodations: [
    {
      title: "RV Sites",
      description: "Pull into one of our 18 RV sites designed for ease, shade, and a scenic stay.",
      imageUrl: "/lovable-uploads/a89b6df4-23bf-4df4-8dd5-dbb71fdce29c.jpg",
      features: [
        { text: "Full hookups (water, electric, sewer)", icon: "Droplets" },
        { text: "Pull-through and back-in options", icon: "ParkingCircle" },
        { text: "Picnic table at every site", icon: "Salad" },
        { text: "Free high-speed Wi-Fi", icon: "Wifi" },
        { text: "Access to pool, laundry, and restrooms", icon: "ShowerHead" },
        { text: "Pet-friendly with nearby dog park", icon: "Dog" },
        { text: "Walking distance to Gulf Burgers and Pickleball", icon: "ArrowRight" }
      ]
    },
    {
      title: "Horse Hotel",
      description: "Bringing your horse along? Our Horse Hotel sites offer a unique stay with comfort for you and your companion.",
      imageUrl: "/lovable-uploads/70c77f4c-97e1-4667-9419-667b0d4d854e.jpg",
      features: [
        { text: "Full RV hookups", icon: "Droplets" },
        { text: "Individual shaded horse stalls", icon: "Warehouse" },
        { text: "Easy pull-through access", icon: "ParkingCircle" },
        { text: "Water and electric for trailers", icon: "Droplets" },
        { text: "Quick trail access to Palo Pinto", icon: "ArrowRight" },
        { text: "Access to restrooms and pool", icon: "ShowerHead" },
        { text: "Quiet area near pasture views", icon: "ArrowRight" }
      ]
    },
    {
      title: "Lodges",
      description: "Stay in one of our four fully renovated 1930s lodges, where vintage charm meets modern comfort.",
      imageUrl: "/lovable-uploads/a32be049-78e9-4081-a5b7-86add61a2bb1.jpg",
      features: [
        { text: "Queen bed and private bathroom", icon: "Bed" },
        { text: "Air conditioning and heating", icon: "Thermometer" },
        { text: "Retro-style decor", icon: "Building" },
        { text: "Mini-fridge, coffee maker, and essentials", icon: "Coffee" },
        { text: "Private entrance and parking", icon: "ParkingCircle" },
        { text: "Steps away from pool and restaurant", icon: "ArrowRight" }
      ]
    },
    {
      title: "Tent Sites",
      description: "Enjoy a more primitive camping experience surrounded by nature. Our tent sites are perfect for guests seeking a simple, no-fuss stay with access to essential comforts.",
      imageUrl: "/placeholder.svg",
      features: [
        { text: "Shaded open areas for tents", icon: "Tent" },
        { text: "Access to restrooms and showers", icon: "ShowerHead" },
        { text: "Access to laundry facilities", icon: "WashingMachine" },
        { text: "Free high-speed Wi-Fi", icon: "Wifi" },
        { text: "Pet-friendly area", icon: "Dog" },
        { text: "Enjoy all shared park amenities", icon: "Utensils" }
      ]
    }
  ],
  ctaBanner: {
    title: "Stay in Ranger, Texas — where retro Americana meets the wide-open Texas sky.",
    description: "Just minutes from Palo Pinto Mountains State Park and packed with character, Lone Ranger RV Park is more than a place to sleep. It's a place to experience.",
    imageUrl: "/placeholder.svg",
    buttonText: "Book Now",
    buttonLink: "/reservations"
  }
};

const Accommodations = () => {
  // Fetch content from Supabase
  const { content, isLoading } = useContent({
    page: "accommodations",
    fallbackData: defaultContent
  });

  // Icon mapping
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      ParkingCircle: <ParkingCircle className="text-rvblue" size={18} />,
      Droplets: <Droplets className="text-rvblue" size={18} />,
      Salad: <Salad className="text-rvblue" size={18} />,
      Wifi: <Wifi className="text-rvblue" size={18} />,
      Dog: <Dog className="text-rvblue" size={18} />,
      Warehouse: <Warehouse className="text-rvblue" size={18} />,
      Building: <Building className="text-rvblue" size={18} />,
      Coffee: <Coffee className="text-rvblue" size={18} />,
      ArrowRight: <ArrowRight className="text-rvblue" size={18} />,
      Bed: <Bed className="text-rvblue" size={18} />,
      ShowerHead: <ShowerHead className="text-rvblue" size={18} />,
      Thermometer: <Thermometer className="text-rvblue" size={18} />,
      Tent: <Tent className="text-rvblue" size={18} />,
      WashingMachine: <WashingMachine className="text-rvblue" size={18} />,
      Utensils: <Utensils className="text-rvblue" size={18} />
    };
    
    return iconMap[iconName] || <ArrowRight className="text-rvblue" size={18} />;
  };

  // Fix for the nested data structure issue
  // Check if content.accommodations is an object with an accommodations property (nested structure from DB)
  const getAccommodationsData = () => {
    if (!content) return defaultContent.accommodations;
    
    // Check for nested structure (content.accommodations.accommodations)
    if (content.accommodations && typeof content.accommodations === 'object' && 'accommodations' in content.accommodations) {
      return content.accommodations.accommodations;
    }
    
    // Direct structure (content.accommodations is the array)
    if (Array.isArray(content.accommodations)) {
      return content.accommodations;
    }
    
    // Fallback to default
    return defaultContent.accommodations;
  };

  // Get the accommodations data using the helper function
  const accommodationsData = getAccommodationsData();

  // Use content from the database or fallback
  const header = content?.header || defaultContent.header;
  const ctaBanner = content?.ctaBanner || defaultContent.ctaBanner;

  return (
    <Layout>
      <PageHeader 
        title={header.title} 
        description={header.description} 
        imageUrl={header.imageUrl} 
      />
      
      {accommodationsData.map((accommodation, index) => (
        <React.Fragment key={index}>
          {index > 0 && <SectionDivider />}
          
          <section className={`section-container ${index % 2 !== 0 ? 'bg-gray-50' : ''}`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="section-title text-center mb-6">{accommodation.title}</h2>
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                <div className="md:w-1/2">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      alt={`${accommodation.title} at Lone Ranger RV Park`} 
                      className="w-full h-64 object-cover" 
                      src={accommodation.imageUrl || "/placeholder.svg"}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-gray-700 mb-6">
                    {accommodation.description}
                  </p>
                  <ul className="space-y-3">
                    {(accommodation.features || []).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0">{getIconComponent(feature.icon)}</span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/reservations" className="mt-6 inline-block">
                    <Button className="bg-rvblue hover:bg-rvblue/90 text-white">
                      Book {accommodation.title}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      ))}
      
      <SectionDivider />
      
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-rvmaroon to-rvblue opacity-90">
          <img 
            src={ctaBanner.imageUrl || "/placeholder.svg"} 
            alt="Scenic view of Lone Ranger RV Park" 
            className="w-full h-full object-cover mix-blend-overlay"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-display mb-4">
            {ctaBanner.title}
          </h2>
          <p className="text-xl mb-8">
            {ctaBanner.description}
          </p>
          <Link to={ctaBanner.buttonLink} className="bg-rvyellow text-rvmaroon hover:bg-rvyellow/90 font-semibold py-3 px-8 rounded-md transition-all duration-300 inline-block">
            {ctaBanner.buttonText}
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Accommodations;
