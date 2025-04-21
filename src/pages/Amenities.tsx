import React from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import EssentialAmenityCard from "@/components/EssentialAmenityCard";
import AmenityBlock from "@/components/AmenityBlock";
import FeatureCard from "@/components/FeatureCard";
import {
  Wifi,
  Dog,
  WashingMachine,
  ShowerHead,
  Plug,
  CarFront,
  Bed,
  House,
  Candy,
  BedDouble,
  Film,
} from "lucide-react";

const maroon = "#804F58";
const lightBg = "#F9F8F6";
const lightAltBg = "#F1F0FB";

// Essential amenities list with images
const essentialAmenities = [
  {
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    title: "Free High-Speed Wi-Fi",
    description: "Reliable, park-wide high-speed internet access for all guests.",
  },
  {
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    title: "Dog Park",
    description: "Fenced-in, off-leash dog park for your furry companions to run and play.",
  },
  {
    image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b",
    title: "Laundry Facilities",
    description: "Coin-operated washers and dryers available on-site.",
  },
  {
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
    title: "Private Showers & Bathrooms",
    description: "Modern, accessible facilities open 24/7.",
  },
  {
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c",
    title: "Full RV Hookups",
    description: "Water, electric, and sewer included at all RV sites.",
  },
  {
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    title: "On-Site Parking",
    description: "Parking space for RVs, trailers, and personal vehicles.",
  },
];

// Recreation amenities with image + text layout (using AmenityBlock for spacing & alternating bg)
const recreationAmenities = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Resort-Style Swimming Pool",
    description: "Hilltop pool with scenic views and lounge seating.",
  },
  {
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    title: "Gulf Burgers Restaurant",
    description: "On-site dining offering burgers, beer, and wine.",
  },
  {
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    title: "Pickleball Court",
    description: "Guest-accessible court for casual and family games.",
  },
  {
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    title: "Lounge & Game Area",
    description: "Includes pool table and seating for relaxing indoors.",
  },
  {
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    title: "Weekend Live Music",
    description: "Seasonal performances from local musicians.",
  },
  {
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
    title: "Horse Hotel",
    description: "RV sites with adjacent shaded stalls for horse travelers.",
  },
];

// Feature cards with icons, as requested
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
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="#AAA54D"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth={2}
      >
        <path d="M4 6h16v12H4z" fill="#AAA54D" />
        <path
          d="M4 6l8 6 8-6"
          stroke="#804F58"
          strokeWidth={1.5}
          fill="none"
        />
      </svg>
    ),
    title: "Retro Americana Atmosphere",
    description: "Every detail celebrates the charm of roadside America.",
  },
];

const Amenities = () => {
  return (
    <Layout>
      <PageHeader
        title="Amenities &amp; Features"
        description="Real comfort and memorable experiences — discover what makes Lone Ranger RV Park &amp; Lodge the perfect getaway."
      />

      {/* Section 1 - Essential Amenities: Grid/Card layout with images */}
      <section
        className="section-container"
        style={{ background: lightBg, borderRadius: 18 }}
      >
        <div className="text-center mb-10">
          <h2 className="section-title" style={{ color: maroon }}>
            Essential Amenities
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {essentialAmenities.map(({ image, title, description }) => (
            <div className="w-full max-w-sm">
              <EssentialAmenityCard
                key={title}
                image={image}
                title={title}
                description={description}
              />
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Section 2 - Recreation & Activities: Image and text side by side with alternating layout and backgrounds */}
      <section className="section-container bg-white rounded-2xl">
        <div className="text-center mb-10">
          <h2 className="section-title" style={{ color: maroon }}>
            Recreation &amp; Activities
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          {recreationAmenities.map(({ image, title, description }, idx) => (
            <AmenityBlock
              key={title}
              image={image}
              title={title}
              description={description}
              reverse={idx % 2 !== 0}
              alternateBg={idx % 2 === 1}
              showDivider={idx !== recreationAmenities.length - 1}
            />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Section 3 - Special Features: three card layout with icons and center-aligned text */}
      <section
        className="section-container"
        style={{ background: lightBg, borderRadius: 18 }}
      >
        <div className="text-center mb-10">
          <h2 className="section-title" style={{ color: maroon }}>
            Special Features
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featureCards.map(({ icon, title, description }) => (
            <FeatureCard
              key={title}
              icon={icon}
              title={title}
              description={description}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Amenities;
