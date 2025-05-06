
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionDivider from "@/components/SectionDivider";
import ClickableAttractionSection from "@/components/attractions/ClickableAttractionSection";
import FrontDeskRecommendations from "@/components/activities/FrontDeskRecommendations";
import { toast } from "@/hooks/use-toast";

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

const Activities = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headerImage, setHeaderImage] = useState<string>(defaultImage);

  // Fetch images from Supabase
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const { data, error } = await supabase
          .from('activity_images')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          // Set header image to the first outdoor activity image
          const outdoorImages = data.filter(item => item.category === 'outdoor');
          if (outdoorImages.length > 0) {
            setHeaderImage(outdoorImages[0].image_url);
          }
          
          // Process attractions data
          const processedData = data.map(item => ({
            ...item,
            title: item.title || extractTitleFromKey(item.key),
            description: item.description || "",
            learnMore: item.learnMore || ""
          }));
          
          setAttractions(processedData);
        }
      } catch (error) {
        console.error("Error fetching attractions:", error);
        toast({
          title: "Failed to load attractions",
          description: "Using default images instead. Please refresh to try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttractions();
  }, []);

  const extractTitleFromKey = (key: string) => {
    // Convert key like "hiking-trail" to "Hiking Trail"
    return key
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleImageUpdate = (key: string, newUrl: string) => {
    setAttractions(prev => 
      prev.map(item => 
        item.key === key ? { ...item, image_url: newUrl } : item
      )
    );
  };

  // Filter attractions by category
  const outdoorActivities = attractions.filter(a => a.category === 'outdoor');
  const familyFun = attractions.filter(a => a.category === 'family');
  const artsCulture = attractions.filter(a => a.category === 'culture');
  const recommendations = attractions.filter(a => a.category === 'recommendations');

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p>Loading activities...</p>
        </div>
      </Layout>
    );
  }

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
