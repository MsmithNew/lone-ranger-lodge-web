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

// Use brand colors as before
const maroon = "#804F58";

const Amenities = () => {
  // Images for each amenity (will use Unsplash and placeholder for now)
  // Order matches original amenities
  const essentialAmenities = [
    {
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4", // WiFi - metaphor: open skies
      title: "Free High-Speed Wi-Fi",
      description: "Reliable, park-wide high-speed internet access for all guests."
    },
    {
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", // Dog/park
      title: "Dog Park",
      description: "Fenced-in, off-leash dog park for your furry companions to run and play."
    },
    {
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07", // Laundry (symbolic, clean flowers)
      title: "Laundry Facilities",
      description: "Coin-operated washers and dryers available on-site for your convenience."
    },
    {
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21", // Showers/bathrooms (blue/clean)
      title: "Private Showers & Bathrooms",
      description: "Modern, accessible facilities open 24/7 for guests."
    },
    {
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843", // RV Hookups (trails/driveways)
      title: "Full RV Hookups",
      description: "All sites offer water, electric, and sewer hookups for RVs."
    },
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // On-site parking (wide park, driveway)
      title: "On-Site Parking",
      description: "Parking space for RVs and personal vehicles included with every stay."
    },
    {
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027", // Pull-through/back-in sites (open land)
      title: "Pull-Through & Back-In Sites",
      description: "Choose from spacious pull-through or back-in RV sites to suit your setup."
    }
  ];

  const recreationAmenities = [
    {
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21", // Pool
      title: "Resort-Style Swimming Pool",
      description: "Enjoy a large, hilltop pool with panoramic park views."
    },
    {
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", // Restaurant (food table scene)
      title: "Gulf Burgers Restaurant",
      description: "On-site burgers, beer, and wine at our guest-favorite eatery."
    },
    {
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1", // Pickleball (playful, sports)
      title: "Pickleball Court",
      description: "Family-friendly court for a fun and active game of pickleball."
    },
    {
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", // Lounge/game area (living room)
      title: "Lounge & Game Area",
      description: "Chill space with a pool table and games for all ages."
    },
    {
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac", // Music (events, gathering outdoors)
      title: "Weekend Live Music",
      description: "Enjoy live music every weekend during our seasonal event series."
    },
    {
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a", // Horse hotel (pasture, stable)
      title: "Horse Hotel",
      description: "Shaded stalls with water and electric for your equine friends."
    }
  ];

  const specialFeatures = [
    {
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f", // Renovated lodges
      title: "Renovated 1930s Lodges",
      description: "Vintage exteriors with fully modern, comfortable interiors."
    },
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Neon signs
      title: "Vintage Neon Sign Collection",
      description: "Stunning restored signage displayed throughout the park."
    },
    {
      image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937", // Drive-in cinema (imaginative, open field)
      title: "Outdoor Drive-In Cinema",
      description: "COMING SOON: Classic movies outdoors on select nights."
    },
    {
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07", // Ice cream/candy
      title: "Candy & Ice Cream Shop",
      description: "A sweet stop inside our restored Texaco station."
    },
    {
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4", // Retro/americana
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
        <div className="flex flex-col gap-10">
          {essentialAmenities.map((amenity, index) => (
            <AmenityBlock
              key={index}
              image={amenity.image}
              title={amenity.title}
              description={amenity.description}
              reverse={index % 2 === 1} // alternate image/text layout
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
        <div className="flex flex-col gap-10">
          {recreationAmenities.map((amenity, index) => (
            <AmenityBlock
              key={index}
              image={amenity.image}
              title={amenity.title}
              description={amenity.description}
              reverse={index % 2 === 0} // alternate for variety
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
        <div className="flex flex-col gap-10">
          {specialFeatures.map((feature, index) => (
            <AmenityBlock
              key={index}
              image={feature.image}
              title={feature.title}
              description={feature.description}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Amenities;
