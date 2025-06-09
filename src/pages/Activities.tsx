
import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import ClickableAttractionSection from "@/components/attractions/ClickableAttractionSection";
import FrontDeskRecommendations from "@/components/activities/FrontDeskRecommendations";

// Default placeholder image
const defaultImage = "https://images.unsplash.com/photo-1433086966358-54859d0ed716";

interface Attraction {
  id: number;
  key: string;
  image_url: string;
  title?: string | null;
  description?: string | null;
  learnMore?: string | null;
  category: string;
  display_order: number | null;
}

// Static attractions data since we removed Supabase
const staticAttractions: Attraction[] = [
  {
    id: 1,
    key: "hiking-trail",
    image_url: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    title: "Hiking Trail",
    description: "Explore scenic hiking trails with beautiful mountain views",
    learnMore: "https://example.com/hiking",
    category: "outdoor",
    display_order: 1
  },
  {
    id: 2,
    key: "fishing-spot",
    image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    title: "Fishing Spot",
    description: "Enjoy peaceful fishing at our nearby lake",
    learnMore: "https://example.com/fishing",
    category: "outdoor",
    display_order: 2
  },
  {
    id: 3,
    key: "playground",
    image_url: "https://images.unsplash.com/photo-1560743173-567a3b5658b1",
    title: "Playground",
    description: "Fun playground area for kids of all ages",
    learnMore: "https://example.com/playground",
    category: "family",
    display_order: 1
  },
  {
    id: 4,
    key: "art-gallery",
    image_url: "https://images.unsplash.com/photo-1544967919-6eb31962dac3",
    title: "Local Art Gallery",
    description: "Visit the local art gallery featuring regional artists",
    learnMore: "https://example.com/gallery",
    category: "culture",
    display_order: 1
  }
];

const Activities = () => {
  const [attractions] = useState<Attraction[]>(staticAttractions);
  const [headerImage] = useState<string>(defaultImage);

  const handleImageUpdate = (key: string, newUrl: string) => {
    // Since we're using static data, this is a no-op
    console.log(`Image update requested for ${key}: ${newUrl}`);
  };

  // Filter attractions by category
  const outdoorActivities = attractions.filter(a => a.category === 'outdoor');
  const familyFun = attractions.filter(a => a.category === 'family');
  const artsCulture = attractions.filter(a => a.category === 'culture');
  const recommendations = attractions.filter(a => a.category === 'recommendations');

  return (
    <Layout>
      <PageHeader
        title="What to Do Nearby"
        description="Explore a curated selection of local outdoor adventures, family-friendly attractions, arts & culture, and our top off-site recommendations near Lone Ranger RV Park & Lodge."
        imageUrl={headerImage}
      />

      {outdoorActivities.length > 0 && (
        <div className="section-container">
          <ClickableAttractionSection
            title="Outdoor Activities"
            color="bg-rvblue"
            activities={outdoorActivities}
            onImageUpdate={handleImageUpdate}
          />
        </div>
      )}
      <SectionDivider />

      {familyFun.length > 0 && (
        <div className="section-container bg-gray-50 rounded-xl">
          <ClickableAttractionSection
            title="Family Fun"
            color="bg-rvyellow"
            activities={familyFun}
            onImageUpdate={handleImageUpdate}
          />
        </div>
      )}
      <SectionDivider />

      {artsCulture.length > 0 && (
        <div className="section-container">
          <ClickableAttractionSection
            title="Arts & Culture"
            color="bg-rvolive"
            activities={artsCulture}
            onImageUpdate={handleImageUpdate}
          />
        </div>
      )}
      <SectionDivider />

      <div className="section-container bg-gray-50 rounded-xl mb-10">
        <FrontDeskRecommendations 
          recommendations={recommendations.length > 0 ? recommendations : undefined}
        />
      </div>
    </Layout>
  );
};

export default Activities;
