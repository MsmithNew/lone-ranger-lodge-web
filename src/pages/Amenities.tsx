
import React from 'react';
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import AmenityCard from "@/components/AmenityCard";
import ImageGallery from "@/components/ImageGallery";
import { 
  Wifi, Dog, ShowerHead, Car, Waypoints, 
  WashingMachine, ParkingCircle, 
  Tent, Beer, UtensilsCrossed, 
  Music2, Gamepad2, Building, BadgePercent, Film, IceCream, Landmark, 
  Waves, House
} from "lucide-react";

// Use brand colors as before
const maroon = "#804F58";

const Amenities = () => {
  // SECTION 1: Essential Amenities
  const essentialAmenities = [
    {
      icon: <Wifi size={36} />,
      title: "Free High-Speed Wi-Fi",
      description: "Reliable, park-wide high-speed internet access for all guests."
    },
    {
      icon: <Dog size={36} />,
      title: "Dog Park",
      description: "Fenced-in, off-leash dog park for your furry companions to run and play."
    },
    {
      icon: <WashingMachine size={36} />,
      title: "Laundry Facilities",
      description: "Coin-operated washers and dryers available on-site for your convenience."
    },
    {
      icon: <ShowerHead size={36} />,
      title: "Private Showers & Bathrooms",
      description: "Modern, accessible facilities open 24/7 for guests."
    },
    {
      icon: <Waypoints size={36} />,
      title: "Full RV Hookups",
      description: "All sites offer water, electric, and sewer hookups for RVs."
    },
    {
      icon: <ParkingCircle size={36} />,
      title: "On-Site Parking",
      description: "Parking space for RVs and personal vehicles included with every stay."
    },
    {
      icon: <Car size={36} />,
      title: "Pull-Through & Back-In Sites",
      description: "Choose from spacious pull-through or back-in RV sites to suit your setup."
    }
  ];

  // SECTION 2: Recreation & Activities
  const recreationAmenities = [
    {
      icon: <Waves size={36} />,
      title: "Resort-Style Swimming Pool",
      description: "Enjoy a large, hilltop pool with panoramic park views."
    },
    {
      icon: <UtensilsCrossed size={36} />,
      title: "Gulf Burgers Restaurant",
      description: "On-site burgers, beer, and wine at our guest-favorite eatery."
    },
    {
      icon: <Gamepad2 size={36} />,
      title: "Pickleball Court",
      description: "Family-friendly court for a fun and active game of pickleball."
    },
    {
      icon: <Building size={36} />,
      title: "Lounge & Game Area",
      description: "Chill space with a pool table and games for all ages."
    },
    {
      icon: <Music2 size={36} />,
      title: "Weekend Live Music",
      description: "Enjoy live music every weekend during our seasonal event series."
    },
    {
      icon: <House size={36} />,
      title: "Horse Hotel",
      description: "Shaded stalls with water and electric for your equine friends."
    }
  ];

  // SECTION 3: Special Features
  const specialFeatures = [
    {
      icon: <Tent size={36} />,
      title: "Renovated 1930s Lodges",
      description: "Vintage exteriors with fully modern, comfortable interiors."
    },
    {
      icon: <BadgePercent size={36} />,
      title: "Vintage Neon Sign Collection",
      description: "Stunning restored signage displayed throughout the park."
    },
    {
      icon: <Film size={36} />,
      title: "Outdoor Drive-In Cinema",
      description: "COMING SOON: Classic movies outdoors on select nights."
    },
    {
      icon: <IceCream size={36} />,
      title: "Candy & Ice Cream Shop",
      description: "A sweet stop inside our restored Texaco station."
    },
    {
      icon: <Landmark size={36} />,
      title: "Retro Americana Vibe",
      description: "Nostalgia and retro details woven into every corner of the park."
    }
  ];

  // SECTION 4: Amenities Gallery — no captions or text, visual grid only
  // Replace these sample URLs with real images of your amenities if available
  const amenityImages = [
    { src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21", alt: "" }, // pool
    { src: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843", alt: "" }, // trees/trails
    { src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", alt: "" }, // lounge
    { src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", alt: "" }, // dog/park
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", alt: "" }, // park signage
    { src: "/placeholder.svg", alt: "" } // fallback
  ];

  return (
    <Layout>
      <PageHeader
        title="Amenities & Features"
        description="Discover real amenities and unique features that make Lone Ranger RV Park & Lodge the perfect getaway destination."
      />

      {/* Essential Amenities */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Essential Amenities</h2>
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialFeatures.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="mb-4 text-rvblue">{feature.icon}</div>
              <h3 className="text-xl font-display text-rvmaroon mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Amenities Gallery – visual only */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="section-title">Amenities Gallery</h2>
        </div>
        <div>
          {/* Use ImageGallery, but ensure no captions/text are provided */}
          <ImageGallery
            images={amenityImages}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Amenities;
