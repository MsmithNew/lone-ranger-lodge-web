
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useContent } from "@/hooks/use-content";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Define interfaces for the data types
export interface Feature {
  id: string;
  text: string;
  icon: string;
}

export interface Accommodation {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features: Feature[];
  buttonText: string;
  buttonLink: string;
  linkType: 'internal' | 'external';
}

export interface CTABanner {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  linkType: 'internal' | 'external';
}

export interface AccommodationsContent {
  header: {
    title: string;
    description: string;
    imageUrl: string;
  };
  accommodations: Accommodation[];
  ctaBanner: CTABanner;
}

// Default content for fallback
export const defaultContent: AccommodationsContent = {
  header: {
    title: "Choose Your Stay in the Heart of Ranger, TX",
    description: "Whether you're rolling in with your rig, traveling with horses, or looking for a cozy lodge escape, Lone Ranger RV Park offers comfort, convenience, and retro charm just minutes from Palo Pinto Mountains State Park.",
    imageUrl: "/placeholder.svg"
  },
  accommodations: [
    {
      id: uuidv4(),
      title: "RV Sites",
      description: "Pull into one of our 18 RV sites designed for ease, shade, and a scenic stay.",
      imageUrl: "/lovable-uploads/a89b6df4-23bf-4df4-8dd5-dbb71fdce29c.jpg",
      buttonText: "Book Now",
      buttonLink: "/reservations",
      linkType: "internal",
      features: [
        { id: uuidv4(), text: "Full hookups (water, electric, sewer)", icon: "Droplets" },
        { id: uuidv4(), text: "Pull-through and back-in options", icon: "ParkingCircle" },
        { id: uuidv4(), text: "Picnic table at every site", icon: "Salad" },
        { id: uuidv4(), text: "Free high-speed Wi-Fi", icon: "Wifi" },
        { id: uuidv4(), text: "Access to pool, laundry, and restrooms", icon: "ShowerHead" },
        { id: uuidv4(), text: "Pet-friendly with nearby dog park", icon: "Dog" },
        { id: uuidv4(), text: "Walking distance to Gulf Burgers and Pickleball", icon: "ArrowRight" }
      ]
    },
    {
      id: uuidv4(),
      title: "Horse Hotel",
      description: "Bringing your horse along? Our Horse Hotel sites offer a unique stay with comfort for you and your companion.",
      imageUrl: "/lovable-uploads/70c77f4c-97e1-4667-9419-667b0d4d854e.jpg",
      buttonText: "Learn More",
      buttonLink: "/accommodations",
      linkType: "internal",
      features: [
        { id: uuidv4(), text: "Full RV hookups", icon: "Droplets" },
        { id: uuidv4(), text: "Individual shaded horse stalls", icon: "Warehouse" },
        { id: uuidv4(), text: "Easy pull-through access", icon: "ParkingCircle" },
        { id: uuidv4(), text: "Water and electric for trailers", icon: "Droplets" },
        { id: uuidv4(), text: "Quick trail access to Palo Pinto", icon: "ArrowRight" },
        { id: uuidv4(), text: "Access to restrooms and pool", icon: "ShowerHead" },
        { id: uuidv4(), text: "Quiet area near pasture views", icon: "ArrowRight" }
      ]
    },
    {
      id: uuidv4(),
      title: "Lodges",
      description: "Stay in one of our four fully renovated 1930s lodges, where vintage charm meets modern comfort.",
      imageUrl: "/lovable-uploads/a32be049-78e9-4081-a5b7-86add61a2bb1.jpg",
      buttonText: "View Details",
      buttonLink: "/lodges",
      linkType: "internal",
      features: [
        { id: uuidv4(), text: "Queen bed and private bathroom", icon: "Bed" },
        { id: uuidv4(), text: "Air conditioning and heating", icon: "Thermometer" },
        { id: uuidv4(), text: "Retro-style decor", icon: "Building" },
        { id: uuidv4(), text: "Mini-fridge, coffee maker, and essentials", icon: "Coffee" },
        { id: uuidv4(), text: "Private entrance and parking", icon: "ParkingCircle" },
        { id: uuidv4(), text: "Steps away from pool and restaurant", icon: "ArrowRight" }
      ]
    },
    {
      id: uuidv4(),
      title: "Tent Sites",
      description: "Enjoy a more primitive camping experience surrounded by nature. Our tent sites are perfect for guests seeking a simple, no-fuss stay with access to essential comforts.",
      imageUrl: "/placeholder.svg",
      buttonText: "See Availability",
      buttonLink: "/reservations",
      linkType: "internal",
      features: [
        { id: uuidv4(), text: "Shaded open areas for tents", icon: "Tent" },
        { id: uuidv4(), text: "Access to restrooms and showers", icon: "ShowerHead" },
        { id: uuidv4(), text: "Access to laundry facilities", icon: "WashingMachine" },
        { id: uuidv4(), text: "Free high-speed Wi-Fi", icon: "Wifi" },
        { id: uuidv4(), text: "Pet-friendly area", icon: "Dog" },
        { id: uuidv4(), text: "Enjoy all shared park amenities", icon: "Utensils" }
      ]
    }
  ],
  ctaBanner: {
    title: "Stay in Ranger, Texas — where retro Americana meets the wide-open Texas sky.",
    description: "Just minutes from Palo Pinto Mountains State Park and packed with character, Lone Ranger RV Park is more than a place to sleep. It's a place to experience.",
    imageUrl: "/placeholder.svg",
    buttonText: "Book Now",
    buttonLink: "/reservations",
    linkType: "internal"
  }
};

// Context type
interface AccommodationsContextType {
  formData: AccommodationsContent;
  setFormData: React.Dispatch<React.SetStateAction<AccommodationsContent>>;
  isLoading: boolean;
  error: Error | null;
  isSaving: boolean;
  saveContent: () => Promise<void>;
  
  // Header operations
  handleHeaderChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleHeaderImageChange: (imageUrl: string) => void;
  
  // Accommodation operations
  addAccommodation: () => void;
  removeAccommodation: (accommodationId: string) => void;
  handleAccommodationChange: (
    accommodationId: string,
    field: keyof Omit<Accommodation, 'id' | 'features'>,
    value: string
  ) => void;
  handleAccommodationImageChange: (accommodationId: string, imageUrl: string) => void;
  handleAccommodationLinkTypeChange: (accommodationId: string, linkType: 'internal' | 'external') => void;
  
  // Feature operations
  addFeature: (accommodationId: string) => void;
  removeFeature: (accommodationId: string, featureId: string) => void;
  handleFeatureChange: (
    accommodationId: string, 
    featureId: string, 
    field: keyof Omit<Feature, 'id'>,
    value: string
  ) => void;
  
  // CTA Banner operations
  handleCTAChange: (field: keyof CTABanner, value: string) => void;
  handleCTAImageChange: (imageUrl: string) => void;
  handleCTALinkTypeChange: (linkType: 'internal' | 'external') => void;
}

// Create the context with a proper default value (undefined)
const AccommodationsContext = createContext<AccommodationsContextType | undefined>(undefined);

// Create provider props interface
interface AccommodationsProviderProps {
  children: ReactNode;
}

// Helper function to normalize image URLs
const normalizeImageUrl = (url: string): string => {
  // If URL is already a full Supabase URL or external URL, return it as is
  if (url.startsWith('http')) {
    return url;
  }
  
  // If it's a relative path but not a placeholder, prepend the Supabase URL
  if (!url.includes('placeholder.svg') && url.startsWith('/')) {
    // Make sure we don't duplicate the domain if it's already there
    const supabaseUrlBase = "https://uktyewnnkbqjopjeoznp.supabase.co";
    if (!url.includes(supabaseUrlBase)) {
      return url;
    }
  }
  
  // Return as is for placeholder images or already properly formatted URLs
  return url;
};

export const AccommodationsProvider: React.FC<AccommodationsProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<AccommodationsContent>(defaultContent);
  const [isSaving, setIsSaving] = useState(false);
  
  const { content, isLoading, error, refresh } = useContent<{ [key: string]: any }>({
    page: "accommodations",
    fallbackData: {}, // Empty fallback as we'll construct our own default state
  });

  // Helper function to safely extract data from potentially nested structures
  const extractData = <T,>(data: any, defaultData: T): T => {
    if (!data) return defaultData;
    
    // Handle case where data might be nested (e.g. data.accommodations.accommodations)
    if (typeof data === 'object' && Object.keys(data).length === 1) {
      const key = Object.keys(data)[0];
      if (data[key] && typeof data[key] === 'object') {
        return data[key] as T;
      }
    }
    
    return data as T;
  };

  // Initialize form data from Supabase content or use defaults
  useEffect(() => {
    if (!isLoading && content) {
      try {
        console.log("Raw accommodations content from database:", content);
        let newFormData = { ...defaultContent };

        // Process header data
        if (content.header) {
          newFormData.header = {
            title: content.header.title || defaultContent.header.title,
            description: content.header.description || defaultContent.header.description,
            imageUrl: content.header.imageUrl ? normalizeImageUrl(content.header.imageUrl) : defaultContent.header.imageUrl
          };
        }

        // Process accommodations - handle potential nesting
        if (content.accommodations) {
          try {
            // Extract accommodations from potential nesting
            const accommodationsData = extractData(content.accommodations, []);
            
            // Parse if it's a string
            const parsedAccommodations = typeof accommodationsData === 'string' 
              ? JSON.parse(accommodationsData) 
              : accommodationsData;
            
            // Ensure each accommodation has an ID and properly structured features
            if (Array.isArray(parsedAccommodations)) {
              const accommodationsWithIds = parsedAccommodations.map((accommodation: any) => ({
                ...accommodation,
                id: accommodation.id || uuidv4(),
                linkType: accommodation.linkType || 'internal',
                buttonText: accommodation.buttonText || 'Book Now',
                buttonLink: accommodation.buttonLink || '/reservations',
                imageUrl: accommodation.imageUrl ? normalizeImageUrl(accommodation.imageUrl) : defaultContent.accommodations[0].imageUrl,
                features: (accommodation.features || []).map((feature: any) => ({
                  ...feature,
                  id: feature.id || uuidv4()
                }))
              }));
              
              newFormData.accommodations = accommodationsWithIds;
            }
          } catch (e) {
            console.error("Error processing accommodations:", e);
          }
        }

        // Process CTA banner - handle potential nesting
        if (content.ctaBanner) {
          try {
            // Extract CTA banner from potential nesting
            const ctaBannerData = extractData(content.ctaBanner, defaultContent.ctaBanner);
            
            // Parse if it's a string
            const parsedCTA = typeof ctaBannerData === 'string'
              ? JSON.parse(ctaBannerData)
              : ctaBannerData;
            
            newFormData.ctaBanner = {
              ...defaultContent.ctaBanner,
              ...parsedCTA,
              imageUrl: parsedCTA.imageUrl ? normalizeImageUrl(parsedCTA.imageUrl) : defaultContent.ctaBanner.imageUrl,
              linkType: parsedCTA.linkType || 'internal'
            };
          } catch (e) {
            console.error("Error parsing CTA banner:", e);
          }
        }

        console.log("Processed accommodations form data:", newFormData);
        setFormData(newFormData);
      } catch (e) {
        console.error("Error loading accommodations content:", e);
        toast({
          title: "Error loading content",
          description: "There was an error loading the page content. Default values will be used.",
          variant: "destructive",
        });
      }
    }
  }, [content, isLoading]);

  // Handler functions for header
  const handleHeaderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        [name]: value,
      },
    }));
  };

  const handleHeaderImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        imageUrl,
      },
    }));
  };

  // Handler functions for accommodations
  const addAccommodation = () => {
    const newAccommodation: Accommodation = {
      id: uuidv4(),
      title: "New Accommodation Type",
      description: "Enter a description for this accommodation type.",
      imageUrl: "/placeholder.svg",
      buttonText: "Book Now",
      buttonLink: "/reservations",
      linkType: "internal",
      features: [
        { id: uuidv4(), text: "New feature", icon: "Plus" }
      ]
    };

    setFormData((prev) => ({
      ...prev,
      accommodations: [...prev.accommodations, newAccommodation],
    }));
  };

  const removeAccommodation = (accommodationId: string) => {
    setFormData((prev) => ({
      ...prev,
      accommodations: prev.accommodations.filter((accommodation) => accommodation.id !== accommodationId),
    }));
  };

  const handleAccommodationChange = (
    accommodationId: string,
    field: keyof Omit<Accommodation, 'id' | 'features'>,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      accommodations: prev.accommodations.map((accommodation) =>
        accommodation.id === accommodationId
          ? { ...accommodation, [field]: value }
          : accommodation
      ),
    }));
  };

  const handleAccommodationImageChange = (accommodationId: string, imageUrl: string) => {
    // Make sure we save the full URL
    setFormData((prev) => ({
      ...prev,
      accommodations: prev.accommodations.map((accommodation) =>
        accommodation.id === accommodationId
          ? { ...accommodation, imageUrl: imageUrl }
          : accommodation
      ),
    }));
    console.log(`Accommodation image updated for ${accommodationId} with URL: ${imageUrl}`);
  };

  // Add this new function for handling accommodation link type change
  const handleAccommodationLinkTypeChange = (accommodationId: string, linkType: 'internal' | 'external') => {
    setFormData((prev) => ({
      ...prev,
      accommodations: prev.accommodations.map((accommodation) =>
        accommodation.id === accommodationId
          ? { ...accommodation, linkType }
          : accommodation
      ),
    }));
  };

  // Handler functions for features
  const addFeature = (accommodationId: string) => {
    setFormData((prev) => ({
      ...prev,
      accommodations: prev.accommodations.map((accommodation) =>
        accommodation.id === accommodationId
          ? {
              ...accommodation,
              features: [
                ...accommodation.features,
                { id: uuidv4(), text: "New feature", icon: "Plus" },
              ],
            }
          : accommodation
      ),
    }));
  };

  const removeFeature = (accommodationId: string, featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      accommodations: prev.accommodations.map((accommodation) =>
        accommodation.id === accommodationId
          ? {
              ...accommodation,
              features: accommodation.features.filter((feature) => feature.id !== featureId),
            }
          : accommodation
      ),
    }));
  };

  const handleFeatureChange = (
    accommodationId: string,
    featureId: string,
    field: keyof Omit<Feature, 'id'>,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      accommodations: prev.accommodations.map((accommodation) =>
        accommodation.id === accommodationId
          ? {
              ...accommodation,
              features: accommodation.features.map((feature) =>
                feature.id === featureId
                  ? { ...feature, [field]: value }
                  : feature
              ),
            }
          : accommodation
      ),
    }));
  };

  // Handler functions for CTA Banner
  const handleCTAChange = (field: keyof CTABanner, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ctaBanner: {
        ...prev.ctaBanner,
        [field]: value,
      },
    }));
  };

  const handleCTAImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      ctaBanner: {
        ...prev.ctaBanner,
        imageUrl,
      },
    }));
  };

  // Add new function for CTA link type changes
  const handleCTALinkTypeChange = (linkType: 'internal' | 'external') => {
    setFormData((prev) => ({
      ...prev,
      ctaBanner: {
        ...prev.ctaBanner,
        linkType,
      },
    }));
  };

  // Save content to Supabase
  const saveContent = async () => {
    setIsSaving(true);
    try {
      console.log("Saving accommodations form data:", formData);
      
      // Prepare data for saving - store data directly without nesting to prevent the issue
      const dataToSave = [
        {
          page: "accommodations",
          section: "header",
          content_key: "title",
          content_value: formData.header.title,
          content_type: "text"
        },
        {
          page: "accommodations",
          section: "header",
          content_key: "description",
          content_value: formData.header.description,
          content_type: "text"
        },
        {
          page: "accommodations",
          section: "header",
          content_key: "imageUrl",
          content_value: formData.header.imageUrl,
          content_type: "text"
        },
        {
          page: "accommodations",
          section: "accommodations", 
          content_key: "accommodations",
          content_value: JSON.stringify(formData.accommodations),
          content_type: "json"
        },
        {
          page: "accommodations",
          section: "ctaBanner",
          content_key: "title",
          content_value: formData.ctaBanner.title,
          content_type: "text"
        },
        {
          page: "accommodations",
          section: "ctaBanner",
          content_key: "description",
          content_value: formData.ctaBanner.description,
          content_type: "text"
        },
        {
          page: "accommodations",
          section: "ctaBanner",
          content_key: "imageUrl",
          content_value: formData.ctaBanner.imageUrl,
          content_type: "text"
        },
        {
          page: "accommodations",
          section: "ctaBanner",
          content_key: "buttonText",
          content_value: formData.ctaBanner.buttonText,
          content_type: "text"
        },
        {
          page: "accommodations",
          section: "ctaBanner",
          content_key: "buttonLink",
          content_value: formData.ctaBanner.buttonLink,
          content_type: "text"
        },
        {
          page: "accommodations",
          section: "ctaBanner",
          content_key: "linkType",
          content_value: formData.ctaBanner.linkType,
          content_type: "text"
        }
      ];

      console.log("Accommodations data being saved to database:", dataToSave);

      // First, delete existing content for this page
      const { error: deleteError } = await supabase
        .from("page_content")
        .delete()
        .match({ page: "accommodations" });

      if (deleteError) {
        console.error("Error deleting existing content:", deleteError);
        throw deleteError;
      }

      // Then insert the new content
      const { error } = await supabase
        .from("page_content")
        .insert(dataToSave);

      if (error) {
        console.error("Error inserting new content:", error);
        throw error;
      }

      console.log("Content saved successfully!");

      toast({
        title: "Content saved",
        description: "The Accommodations content has been updated.",
      });

      // Refresh content data
      refresh();
    } catch (error: any) {
      console.error("Error saving accommodations content:", error);
      toast({
        title: "Error saving content",
        description: error.message || "There was an error saving the content.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const contextValue: AccommodationsContextType = {
    formData, 
    setFormData,
    isLoading,
    error,
    isSaving,
    saveContent,
    handleHeaderChange,
    handleHeaderImageChange,
    addAccommodation,
    removeAccommodation,
    handleAccommodationChange,
    handleAccommodationImageChange,
    handleAccommodationLinkTypeChange,
    addFeature,
    removeFeature,
    handleFeatureChange,
    handleCTAChange,
    handleCTAImageChange,
    handleCTALinkTypeChange
  };

  // Return the context provider with proper children passing
  return (
    <AccommodationsContext.Provider value={contextValue}>
      {children}
    </AccommodationsContext.Provider>
  );
};

export const useAccommodationsContext = () => {
  const context = useContext(AccommodationsContext);
  if (context === undefined) {
    throw new Error("useAccommodationsContext must be used within an AccommodationsProvider");
  }
  return context;
};
