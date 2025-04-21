
import React from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import EssentialAmenityCard from "@/components/EssentialAmenityCard";
import RecreationAmenityBlock from "@/components/RecreationAmenityBlock";
import FeatureCard from "@/components/FeatureCard";
import { Wifi, Dog, Laundry, ShowerHead, Plug, CarFront, Bed, Pool, Restaurant, PickleballCourt, Headphones, Music, Horse, House, Candy, BedDouble, Film } from "lucide-react";

const maroon = "#804F58";
const lightBg = "#F9F8F6"; // A light, warm beige for sections

const essentialAmenities = [
  {
    icon: "wifi",
    title: "Free High-Speed Wi-Fi",
    description: "Reliable, park-wide high-speed internet access for all guests."
  },
  {
    icon: "dog",
    title: "Dog Park",
    description: "Fenced-in, off-leash dog park for your furry companions to run and play."
  },
  {
    icon: "laundry",
    title: "Laundry Facilities",
    description: "Coin-operated washers and dryers available on-site."
  },
  {
    icon: "shower-head",
    title: "Private Showers & Bathrooms",
    description: "Modern, accessible facilities open 24/7."
  },
  {
    icon: "plug",
    title: "Full RV Hookups",
    description: "Water, electric, and sewer included at all RV sites."
  },
  {
    icon: "car-front",
    title: "On-Site Parking",
    description: "Parking space for RVs, trailers, and personal vehicles."
  },
  {
    icon: "bed",
    title: "Pull-Through & Back-In Sites",
    description: "Convenient options for large and small rigs."
  }
];

const recreationAmenities = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Resort-Style Swimming Pool",
    description: "Hilltop pool with scenic views and lounge seating."
  },
  {
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    title: "Gulf Burgers Restaurant",
    description: "On-site dining offering burgers, beer, and wine."
  },
  {
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    title: "Pickleball Court",
    description: "Guest-accessible court for casual and family games."
  },
  {
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    title: "Lounge & Game Area",
    description: "Includes pool table and seating for relaxing indoors."
  },
  {
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    title: "Weekend Live Music",
    description: "Seasonal performances from local musicians."
  },
  {
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
    title: "Horse Hotel",
    description: "RV sites with adjacent shaded stalls for horse travelers."
  }
];

const featureCards = [
  {
    icon: <House color="#804F58" size={32} strokeWidth={2} />,
    title: "Restored 1930s Lodges",
    description: "Original cabins with retro exteriors and fully updated interiors.",
  },
  {
    icon: <BedDouble color="#FF1F47" size={32} strokeWidth={2} />,
    title: "Vintage Neon Sign Collection",
    description: "Rare signage installed throughout the property.",
  },
  {
    icon: <Film color="#1FBEFF" size={32} strokeWidth={2} />,
    title: "Outdoor Drive-In Cinema (Coming Soon)",
    description: "Retro-style movie nights under the stars.",
  },
  {
    icon: <Candy color="#FFF41F" size={32} strokeWidth={2} />,
    title: "Candy & Ice Cream Shop",
    description: "Located in a restored Texaco station with nostalgic snacks.",
  },
  {
    icon: <Wifi color="#AAA54D" size={32} strokeWidth={2} />,
    title: "Retro Americana Atmosphere",
    description: "Every detail celebrates the charm of roadside America.",
  }
];

const Amenities = () => {
  return (
    <Layout>
      <PageHeader
        title="Amenities &amp; Features"
        description="Real comfort and memorable experiences — discover what makes Lone Ranger RV Park &amp; Lodge the perfect getaway."
      />

      {/* Essential Amenities */}
      <section className="section-container" style={{ background: lightBg, borderRadius: 18 }}>
        <div className="text-center mb-10">
          <h2 className="section-title" style={{ color: maroon }}>Essential Amenities</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {essentialAmenities.map((a) => (
            <EssentialAmenityCard
              key={a.title}
              icon={a.icon as any}
              title={a.title}
              description={a.description}
            />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Recreation & Activities */}
      <section className="section-container bg-white rounded-2xl">
        <div className="text-center mb-10">
          <h2 className="section-title" style={{ color: maroon }}>Recreation &amp; Activities</h2>
        </div>
        <div className="flex flex-col gap-10">
          {recreationAmenities.map((a, idx) => (
            <RecreationAmenityBlock
              key={a.title}
              image={a.image}
              title={a.title}
              description={a.description}
              reverse={idx % 2 === 1}
            />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Special Features */}
      <section className="section-container" style={{ background: lightBg, borderRadius: 18 }}>
        <div className="text-center mb-10">
          <h2 className="section-title" style={{ color: maroon }}>Special Features</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featureCards.map((f) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Amenities;
