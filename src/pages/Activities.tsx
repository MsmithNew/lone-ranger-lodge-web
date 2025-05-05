
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

// Initial static image mappings as fallback
const initialImages = {
  paloPinto: "/lovable-uploads/c85eecdb-c269-482f-9697-6961b1af8ac0.png",
  lakeLeon: "/lovable-uploads/96f12b3f-0295-4f36-a9ea-6ebb02e5057b.png",
  copperasCreek: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
  stephensLake: "/lovable-uploads/ebe7aca1-8ce4-4faa-a5ce-278e467b07ae.png",
  driveIn: "/lovable-uploads/91372a14-ff20-478c-8e82-f8acdb6bf151.png",
  plazaTheatre: "/lovable-uploads/91372a14-ff20-478c-8e82-f8acdb6bf151.png",
  splashPad: "/lovable-uploads/ebe7aca1-8ce4-4faa-a5ce-278e467b07ae.png",
  stephenvillePark: "/lovable-uploads/91372a14-ff20-478c-8e82-f8acdb6bf151.png",
  downtownStephenville: "/lovable-uploads/ebe7aca1-8ce4-4faa-a5ce-278e467b07ae.png",
  grimesGarden: "/lovable-uploads/91372a14-ff20-478c-8e82-f8acdb6bf151.png",
  eastlandMuseum: "/lovable-uploads/ebe7aca1-8ce4-4faa-a5ce-278e467b07ae.png",
  gordonCenter: "/lovable-uploads/91372a14-ff20-478c-8e82-f8acdb6bf151.png",
  marysCafe: "/lovable-uploads/ebe7aca1-8ce4-4faa-a5ce-278e467b07ae.png",
  eastlandAntiques: "/lovable-uploads/91372a14-ff20-478c-8e82-f8acdb6bf151.png",
};

const Activities = () => {
  const [images, setImages] = useState<Record<string, string>>(initialImages);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch images from Supabase
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('activity_images')
          .select('key, image_url');

        if (error) throw error;

        if (data && data.length > 0) {
          const imageMap = data.reduce((acc, item) => {
            acc[item.key] = item.image_url;
            return acc;
          }, {} as Record<string, string>);
          
          setImages(prev => ({ ...prev, ...imageMap }));
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        toast({
          title: "Failed to load images",
          description: "Using default images instead. Please refresh to try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageUpdate = (key: string, newUrl: string) => {
    setImages(prev => ({
      ...prev,
      [key]: newUrl
    }));
  };

  // Define activity sections with image keys
  const outdoorActivities = [
    {
      title: "Palo Pinto Mountains State Park",
      description:
        "Just one exit away, this newly opened Texas state park offers scenic hiking trails, horseback riding, and panoramic overlooks of the surrounding mountains.",
      imageUrl: images.paloPinto || defaultImage,
      imageKey: "paloPinto",
      learnMore: "https://tpwd.texas.gov/state-parks/palo-pinto-mountains",
    },
    {
      title: "Lake Leon (Eastland County)",
      description:
        "A peaceful spot for fishing, kayaking, or swimming. Ideal for a morning on the water or a relaxed picnic by the shoreline.",
      imageUrl: images.lakeLeon || defaultImage,
      imageKey: "lakeLeon",
      learnMore: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/leon/",
    },
    {
      title: "Copperas Creek Park",
      description:
        "A day-use park near Lake Proctor with trails, shaded picnic areas, and birdwatching opportunities.",
      imageUrl: images.copperasCreek || defaultImage,
      imageKey: "copperasCreek",
      learnMore: "https://www.recreation.gov/camping/campgrounds/232557",
    },
  ];

  const familyFun = [
    {
      title: "The Majestic Theatre (Eastland, TX)",
      description:
        "A beautifully restored historic cinema still showing current films with vintage charm.",
      imageUrl: images.plazaTheatre || defaultImage,
      imageKey: "plazaTheatre",
      learnMore: "https://www.majesticeastland.com/about/",
    },
    {
      title: "Stephenville City Park",
      description:
        "One of the largest parks in the area, with playgrounds, walking trails, and plenty of green space for family fun.",
      imageUrl: images.stephenvillePark || defaultImage,
      imageKey: "stephenvillePark",
      learnMore: "https://www.stephenvilletx.gov/parks-leisure/page/stephenville-city-park",
    },
    {
      title: "Greer's Western Store",
      description:
        "Classic western wear and boots - a must-visit for authentic Texas style and souvenirs.",
      imageUrl: images.driveIn || defaultImage,
      imageKey: "driveIn",
      learnMore: "https://www.facebook.com/Greerswesternstore/",
    },
  ];

  const artsCulture = [
    {
      title: "Downtown Stephenville",
      description:
        "Known for its local shops, art galleries, coffee spots, and live music. Great for a relaxed afternoon or date night stroll.",
      imageUrl: images.downtownStephenville || defaultImage,
      imageKey: "downtownStephenville",
      learnMore: "https://www.stephenvilletx.gov/administrative-services/page/stephenville-main-street",
    },
    {
      title: "Eastland County Museum & Historical Society",
      description:
        "Explore the history of this Texas region through local artifacts, Route 66 memorabilia, and more.",
      imageUrl: images.eastlandMuseum || defaultImage,
      imageKey: "eastlandMuseum",
      learnMore: "https://eastlandcountymuseum.com/",
    },
    {
      title: "W.K. Gordon Center for Industrial History of Texas (Mingus, TX)",
      description:
        "A unique museum just off I-20 focused on ghost towns, oil booms, and Texas industrial life.",
      imageUrl: images.gordonCenter || defaultImage,
      imageKey: "gordonCenter",
      learnMore: "https://www.tarleton.edu/gordoncenter/",
    },
  ];

  const frontDeskRecommendations = [
    {
      title: "Palo Pinto Mountains State Park",
      description: "Our top pick for hiking, horseback riding, and views.",
      imageUrl: images.paloPinto || defaultImage,
      learnMore: "https://tpwd.texas.gov/state-parks/palo-pinto-mountains",
    },
    {
      title: "Lake Leon",
      description: "A guest favorite for early morning fishing or kayaking.",
      imageUrl: images.lakeLeon || defaultImage,
      learnMore: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/leon/",
    },
    {
      title: "Mary's Café (Strawn, TX)",
      description: "Local legend for its massive chicken-fried steak.",
      imageUrl: images.marysCafe || defaultImage,
      learnMore: "https://www.tripadvisor.com/Restaurant_Review-g56719-d1141351-Reviews-Mary_s_Cafe-Strawn_Texas.html",
    },
    {
      title: "Downtown Stephenville",
      description: "Great for dining, shopping, and soaking up small-town charm.",
      imageUrl: images.downtownStephenville || defaultImage,
      learnMore: "https://www.stephenvilletx.gov/administrative-services/page/stephenville-main-street",
    },
    {
      title: "W.K. Gordon Center",
      description: "Educational and visually immersive — guests often rave about it.",
      imageUrl: images.gordonCenter || defaultImage,
      learnMore: "https://www.tarleton.edu/gordoncenter/",
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="What to Do Nearby"
        description="Explore a curated selection of local outdoor adventures, family-friendly attractions, arts & culture, and our top off-site recommendations near Lone Ranger RV Park & Lodge."
        imageUrl={images.paloPinto || defaultImage}
      />

      <div className="section-container">
        <ClickableAttractionSection
          title="Outdoor Activities"
          color="bg-rvblue"
          activities={outdoorActivities}
          onImageUpdate={handleImageUpdate}
        />
      </div>
      <SectionDivider />

      <div className="section-container bg-gray-50 rounded-xl">
        <ClickableAttractionSection
          title="Family Fun"
          color="bg-rvyellow"
          activities={familyFun}
          onImageUpdate={handleImageUpdate}
        />
      </div>
      <SectionDivider />

      <div className="section-container">
        <ClickableAttractionSection
          title="Arts & Culture"
          color="bg-rvolive"
          activities={artsCulture}
          onImageUpdate={handleImageUpdate}
        />
      </div>
      <SectionDivider />

      <div className="section-container bg-gray-50 rounded-xl mb-10">
        <FrontDeskRecommendations />
      </div>
    </Layout>
  );
};

export default Activities;
