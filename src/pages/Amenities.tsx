import React from 'react';
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import { 
  Wifi, Dog, ShowerHead, Car, Waypoints, 
  WashingMachine, ParkingCircle, 
  Tent, Beer, UtensilsCrossed, 
  Music2, Gamepad2, Building, BadgePercent, Film, IceCream, Landmark, 
  Waves, House
} from "lucide-react";
import AmenityBlock from "@/components/AmenityBlock";

const maroon = "#804F58";

const Amenities = () => {
  const essentialAmenities = [
    {
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
      title: "Free High-Speed Wi-Fi",
      description: "Reliable, park-wide high-speed internet access for all guests."
    },
    {
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      title: "Dog Park",
      description: "Fenced-in, off-leash dog park for your furry companions to run and play."
    },
    {
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      title: "Laundry Facilities",
      description: "Coin-operated washers and dryers available on-site for your convenience."
    },
    {
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      title: "Private Showers & Bathrooms",
      description: "Modern, accessible facilities open 24/7 for guests."
    },
    {
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
      title: "Full RV Hookups",
      description: "All sites offer water, electric, and sewer hookups for RVs."
    },
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "On-Site Parking",
      description: "Parking space for RVs and personal vehicles included with every stay."
    },
    {
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      title: "Pull-Through & Back-In Sites",
      description: "Choose from spacious pull-through or back-in RV sites to suit your setup."
    }
  ];

  const recreationAmenities = [
    {
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      title: "Resort-Style Swimming Pool",
      description: "Enjoy a large, hilltop pool with panoramic park views."
    },
    {
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      title: "Gulf Burgers Restaurant",
      description: "On-site burgers, beer, and wine at our guest-favorite eatery."
    },
    {
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      title: "Pickleball Court",
      description: "Family-friendly court for a fun and active game of pickleball."
    },
    {
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      title: "Lounge & Game Area",
      description: "Chill space with a pool table and games for all ages."
    },
    {
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
      title: "Weekend Live Music",
      description: "Enjoy live music every weekend during our seasonal event series."
    },
    {
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
      title: "Horse Hotel",
      description: "Shaded stalls with water and electric for your equine friends."
    }
  ];

  const specialFeatures = [
    {
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
      title: "Renovated 1930s Lodges",
      description: "Vintage exteriors with fully modern, comfortable interiors."
    },
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Vintage Neon Sign Collection",
      description: "Stunning restored signage displayed throughout the park."
    },
    {
      image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
      title: "Outdoor Drive-In Cinema",
      description: "COMING SOON: Classic movies outdoors on select nights."
    },
    {
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      title: "Candy & Ice Cream Shop",
      description: "A sweet stop inside our restored Texaco station."
    },
    {
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
      title: "Retro Americana Vibe",
      description: "Nostalgia and retro details woven into every corner of the park."
    }
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
        <div className="flex flex-col gap-0">
          {essentialAmenities.map((amenity, index) => (
            <AmenityBlock
              key={index}
              image={amenity.image}
              title={amenity.title}
              description={amenity.description}
              reverse={index % 2 === 1}
              alternateBg={index % 2 === 0}
              showDivider={index !== essentialAmenities.length - 1}
            />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Recreation & Activities */}
      <section className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-title">Recreation & Activities</h2>
        </div>
        <div className="flex flex-col gap-0">
          {recreationAmenities.map((amenity, index) => (
            <AmenityBlock
              key={index}
              image={amenity.image}
              title={amenity.title}
              description={amenity.description}
              reverse={index % 2 === 0}
              alternateBg={index % 2 === 1}
              showDivider={index !== recreationAmenities.length - 1}
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
        <div className="flex flex-col gap-0">
          {specialFeatures.map((feature, index) => (
            <AmenityBlock
              key={index}
              image={feature.image}
              title={feature.title}
              description={feature.description}
              reverse={index % 2 === 1}
              alternateBg={index % 2 === 0}
              showDivider={index !== specialFeatures.length - 1}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Amenities;
