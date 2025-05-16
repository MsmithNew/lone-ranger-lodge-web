
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Waves, 
  Building, 
  Power, 
  Warehouse, 
  PlayIcon,
  Dog,
  Music,
  Utensils,
  IceCream,
  ShowerHead,
  Sofa,
  Wifi
} from "lucide-react";
import { useContent } from "@/hooks/use-content";
import { toast } from "@/hooks/use-toast";

const About = () => {
  // Get content data from database with fallback to original data
  const { content: aboutContent, isLoading, error, refresh } = useContent({
    page: "about",
    fallbackData: {}
  });

  // Default amenities (fallback)
  const defaultAmenities = [
    { name: "Resort-Style Swimming Pool", icon: <Waves size={24} className="text-rvblue" /> },
    { name: "Historic 1930s Lodges", icon: <Building size={24} className="text-rvblue" /> },
    { name: "Full RV Hookups", icon: <Power size={24} className="text-rvblue" /> },
    { name: "Horse Hotel with Stalls", icon: <Warehouse size={24} className="text-rvblue" /> },
    { name: "Pickleball Court", icon: <PlayIcon size={24} className="text-rvblue" /> },
    { name: "Dog Park", icon: <Dog size={24} className="text-rvblue" /> },
    { name: "Live Music on Weekends", icon: <Music size={24} className="text-rvblue" /> },
    { name: "Gulf Burgers Restaurant", icon: <Utensils size={24} className="text-rvblue" /> },
    { name: "Candy & Ice Cream Shop", icon: <IceCream size={24} className="text-rvblue" /> },
    { name: "Laundry + Shower Facilities", icon: <ShowerHead size={24} className="text-rvblue" /> },
    { name: "Lounge with Pool Table", icon: <Sofa size={24} className="text-rvblue" /> },
    { name: "Free Wi-Fi", icon: <Wifi size={24} className="text-rvblue" /> }
  ];

  // Default accommodations (fallback)
  const defaultAccommodations = [
    {
      title: "RV Sites",
      description: "Spacious pull-through and back-in sites with full hookups and scenic views.",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Horse Hotel",
      description: "RV sites with additional horse stalls — perfect for trail riders and rodeo travelers.",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Lodges",
      description: "Renovated 1930s cabins with vintage exteriors and modern interiors.",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Tent Sites",
      description: "Peaceful, no-frills outdoor experience perfect for adventurous guests seeking a rustic camping experience.",
      imageUrl: "/placeholder.svg"
    }
  ];

  // If there's an error loading content, show a toast and try to refresh
  useEffect(() => {
    if (error) {
      console.error("Error loading content:", error);
      toast({
        title: "Content loading issue",
        description: "Some content may not display correctly. Trying to reload.",
        variant: "destructive",
      });
      
      // Try to refresh the content after a short delay
      const timer = setTimeout(() => {
        refresh();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [error, refresh]);

  // Prepare content data with fallbacks
  const headerTitle = aboutContent?.header?.title || "Discover a One-of-a-Kind RV Destination in Ranger, TX";
  const headerDescription = aboutContent?.header?.description || "Where vintage charm meets modern comfort in the heart of Texas";
  const headerImageUrl = aboutContent?.header?.imageUrl || "/placeholder.svg";

  const texasCharmTitle = aboutContent?.texas_charm?.title || "Ten Acres of Texas Charm, All in One Park";
  const texasCharmDescription = aboutContent?.texas_charm?.description || 
    "The property spans 10 scenic acres on both sides of SH-Loop 254. Whether you're RVing, hauling horses, " +
    "or booking a lodge, you'll enjoy spacious sites, unique amenities, and views that stretch toward " +
    "the Palo Pinto Mountains.";

  // Parse amenities from JSON if available
  let amenities = defaultAmenities;
  try {
    if (aboutContent?.texas_charm?.amenities) {
      let parsedAmenities;
      
      // Handle both string and already parsed object
      if (typeof aboutContent.texas_charm.amenities === 'string') {
        parsedAmenities = JSON.parse(aboutContent.texas_charm.amenities);
      } else {
        parsedAmenities = aboutContent.texas_charm.amenities;
      }
      
      if (Array.isArray(parsedAmenities) && parsedAmenities.length > 0) {
        amenities = parsedAmenities.map((item) => {
          // Map the icon name string to the actual icon component
          const iconName = item.icon || "Waves";
          const iconMap = {
            Waves: <Waves size={24} className="text-rvblue" />,
            Building: <Building size={24} className="text-rvblue" />,
            Power: <Power size={24} className="text-rvblue" />,
            Warehouse: <Warehouse size={24} className="text-rvblue" />,
            PlayIcon: <PlayIcon size={24} className="text-rvblue" />,
            Dog: <Dog size={24} className="text-rvblue" />,
            Music: <Music size={24} className="text-rvblue" />,
            Utensils: <Utensils size={24} className="text-rvblue" />,
            IceCream: <IceCream size={24} className="text-rvblue" />,
            ShowerHead: <ShowerHead size={24} className="text-rvblue" />,
            Sofa: <Sofa size={24} className="text-rvblue" />,
            Wifi: <Wifi size={24} className="text-rvblue" />
          };
          return {
            name: item.name || "",
            icon: iconMap[iconName] || <Waves size={24} className="text-rvblue" />
          };
        });
      }
    }
  } catch (error) {
    console.error("Error parsing amenities:", error);
  }

  const accommodationsTitle = aboutContent?.accommodations?.title || "Find Your Perfect Stay";
  const accommodationsDescription = aboutContent?.accommodations?.description || 
    "Choose from a variety of accommodations designed to suit your travel style";
  const accommodationsButtonText = aboutContent?.accommodations?.buttonText || "Book Your Stay Now";
  const accommodationsButtonLink = aboutContent?.accommodations?.buttonLink || "/reservations";

  // Parse accommodation items from JSON if available
  let accommodations = defaultAccommodations;
  try {
    if (aboutContent?.accommodations?.items) {
      let parsedItems;
      
      // Handle both string and already parsed object
      if (typeof aboutContent.accommodations.items === 'string') {
        parsedItems = JSON.parse(aboutContent.accommodations.items);
      } else {
        parsedItems = aboutContent.accommodations.items;
      }
      
      if (Array.isArray(parsedItems) && parsedItems.length > 0) {
        accommodations = parsedItems;
      }
    }
  } catch (error) {
    console.error("Error parsing accommodation items:", error);
  }

  const ctaTitle = aboutContent?.cta?.title || "Experience Ranger's Vintage Roadside Getaway";
  const ctaDescription = aboutContent?.cta?.description || 
    "Where classic American road trip nostalgia meets modern comfort in the Texas countryside.";
  const ctaButtonText = aboutContent?.cta?.buttonText || "Contact Us";
  const ctaButtonLink = aboutContent?.cta?.buttonLink || "/contact";
  const ctaButtonLinkType = aboutContent?.cta?.buttonLinkType || "internal";

  // Handle external links for CTA button
  const CTAButtonComponent = ctaButtonLinkType === "external" ? 
    ({ children }) => <a href={ctaButtonLink} target="_blank" rel="noopener noreferrer" className="bg-rvyellow text-rvmaroon hover:bg-rvyellow/90 font-semibold py-3 px-8 rounded-md transition-all duration-300 inline-block text-lg">{children}</a> : 
    ({ children }) => <Link to={ctaButtonLink} className="bg-rvyellow text-rvmaroon hover:bg-rvyellow/90 font-semibold py-3 px-8 rounded-md transition-all duration-300 inline-block text-lg">{children}</Link>;

  return (
    <Layout>
      <PageHeader
        title={headerTitle}
        description={headerDescription}
        imageUrl={headerImageUrl}
        className="pb-16"
      />
      
      <SectionDivider />
      
      <section className="section-container bg-gray-50 py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="section-title">{texasCharmTitle}</h2>
          <p className="text-gray-600">
            {texasCharmDescription}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="mb-3">
                {amenity.icon}
              </div>
              <h3 className="text-sm md:text-base font-medium text-rvmaroon">{amenity.name}</h3>
            </div>
          ))}
        </div>
      </section>
      
      <SectionDivider />
      
      <section className="section-container py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="section-title">{accommodationsTitle}</h2>
          <p className="text-gray-600">
            {accommodationsDescription}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {accommodations.map((accommodation, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={accommodation.imageUrl || "/placeholder.svg"} 
                  alt={accommodation.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-display text-rvmaroon mb-2">{accommodation.title}</h3>
                <p className="text-gray-600">{accommodation.description}</p>
                <Link to="/accommodations" className="text-rvblue font-medium inline-block mt-4 hover:underline">
                  View Details →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to={accommodationsButtonLink} className="btn-primary">
            {accommodationsButtonText}
          </Link>
        </div>
      </section>
      
      <section className="py-16 bg-rvblue text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">{ctaTitle}</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            {ctaDescription}
          </p>
          <CTAButtonComponent>
            {ctaButtonText}
          </CTAButtonComponent>
        </div>
      </section>
    </Layout>
  );
};

export default About;
