
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ParkingCircle, 
  Droplets, 
  TablePicnic, 
  Wifi, 
  Dog, 
  Warehouse,
  Building, 
  Coffee,
  ArrowRight,
  Bed,
  ShowerHead,
  Thermometer
} from "lucide-react";

const Accommodations = () => {
  // RV site features with icons
  const rvFeatures = [
    { text: "Full hookups (water, electric, sewer)", icon: <Droplets className="text-rvblue" size={18} /> },
    { text: "Pull-through and back-in options", icon: <ParkingCircle className="text-rvblue" size={18} /> },
    { text: "Picnic table at every site", icon: <TablePicnic className="text-rvblue" size={18} /> },
    { text: "Free high-speed Wi-Fi", icon: <Wifi className="text-rvblue" size={18} /> },
    { text: "Access to pool, laundry, and restrooms", icon: <ShowerHead className="text-rvblue" size={18} /> },
    { text: "Pet-friendly with nearby dog park", icon: <Dog className="text-rvblue" size={18} /> },
    { text: "Walking distance to Gulf Burgers and Pickleball", icon: <ArrowRight className="text-rvblue" size={18} /> }
  ];

  // Horse hotel features with icons
  const horseFeatures = [
    { text: "Full RV hookups", icon: <Droplets className="text-rvblue" size={18} /> },
    { text: "Individual shaded horse stalls", icon: <Warehouse className="text-rvblue" size={18} /> },
    { text: "Easy pull-through access", icon: <ParkingCircle className="text-rvblue" size={18} /> },
    { text: "Water and electric for trailers", icon: <Droplets className="text-rvblue" size={18} /> },
    { text: "Quick trail access to Palo Pinto", icon: <ArrowRight className="text-rvblue" size={18} /> },
    { text: "Access to restrooms and pool", icon: <ShowerHead className="text-rvblue" size={18} /> },
    { text: "Quiet area near pasture views", icon: <ArrowRight className="text-rvblue" size={18} /> }
  ];

  // Lodge features with icons
  const lodgeFeatures = [
    { text: "Queen bed and private bathroom", icon: <Bed className="text-rvblue" size={18} /> },
    { text: "Air conditioning and heating", icon: <Thermometer className="text-rvblue" size={18} /> },
    { text: "Retro-style decor", icon: <Building className="text-rvblue" size={18} /> },
    { text: "Mini-fridge, coffee maker, and essentials", icon: <Coffee className="text-rvblue" size={18} /> },
    { text: "Private entrance and parking", icon: <ParkingCircle className="text-rvblue" size={18} /> },
    { text: "Steps away from pool and restaurant", icon: <ArrowRight className="text-rvblue" size={18} /> }
  ];

  return (
    <Layout>
      <PageHeader
        title="Choose Your Stay in the Heart of Ranger, TX"
        description="Whether you're rolling in with your rig, traveling with horses, or looking for a cozy lodge escape, Lone Ranger RV Park offers comfort, convenience, and retro charm just minutes from Palo Pinto Mountains State Park."
        imageUrl="/placeholder.svg"
      />
      
      {/* RV Sites Section */}
      <section className="section-container">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-6">RV Sites</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="RV sites at Lone Ranger RV Park" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-6">
                Pull into one of our 18 RV sites designed for ease, shade, and a scenic stay.
              </p>
              <ul className="space-y-3">
                {rvFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Horse Hotel Section */}
      <section className="section-container bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-6">Horse Hotel</h2>
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Horse Hotel at Lone Ranger RV Park" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-6">
                Bringing your horse along? Our Horse Hotel sites offer a unique stay with comfort for you and your companion.
              </p>
              <ul className="space-y-3">
                {horseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Lodges Section */}
      <section className="section-container">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-6">Lodges</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Vintage lodges at Lone Ranger RV Park" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-6">
                Stay in one of our four fully renovated 1930s lodges, where vintage charm meets modern comfort.
              </p>
              <ul className="space-y-3">
                {lodgeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      {/* Final Banner Section - Location & Style Highlight */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-rvmaroon to-rvblue opacity-90">
          <img 
            src="/placeholder.svg" 
            alt="Scenic view of Lone Ranger RV Park" 
            className="w-full h-full object-cover mix-blend-overlay" 
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-display mb-4">
            Stay in Ranger, Texas — where retro Americana meets the wide-open Texas sky.
          </h2>
          <p className="text-xl mb-8">
            Just minutes from Palo Pinto Mountains State Park and packed with character, Lone Ranger RV Park is more than a place to sleep. It's a place to experience.
          </p>
          <Link 
            to="/reservations" 
            className="bg-rvyellow text-rvmaroon hover:bg-rvyellow/90 font-semibold py-3 px-8 rounded-md transition-all duration-300 inline-block"
          >
            Book Now
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Accommodations;
