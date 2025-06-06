
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useContent } from "@/hooks/use-content";
import ImageUploader from "@/components/admin/ImageUploader";
import LinkSelector from "@/components/admin/LinkSelector";

interface AmenityItem {
  name: string;
  icon: string;
}

interface AccommodationItem {
  title: string;
  description: string;
  imageUrl: string;
}

const AdminAbout = () => {
  // State for header section
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerDescription, setHeaderDescription] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [isSavingHeader, setIsSavingHeader] = useState(false);
  
  // State for Texas Charm section
  const [texasCharmTitle, setTexasCharmTitle] = useState("");
  const [texasCharmDescription, setTexasCharmDescription] = useState("");
  const [amenities, setAmenities] = useState<AmenityItem[]>([]);
  const [isSavingTexasCharm, setIsSavingTexasCharm] = useState(false);
  
  // State for Accommodations section
  const [accommodationsTitle, setAccommodationsTitle] = useState("");
  const [accommodationsDescription, setAccommodationsDescription] = useState("");
  const [accommodationItems, setAccommodationItems] = useState<AccommodationItem[]>([]);
  const [isSavingAccommodations, setIsSavingAccommodations] = useState(false);
  const [accommodationsDataError, setAccommodationsDataError] = useState<string | null>(null);
  
  // New state for Accommodations CTA
  const [accommodationsCtaButtonText, setAccommodationsCtaButtonText] = useState("");
  const [accommodationsCtaButtonLink, setAccommodationsCtaButtonLink] = useState("");
  const [accommodationsCtaButtonLinkType, setAccommodationsCtaButtonLinkType] = useState("internal");
  
  // State for CTA section
  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaDescription, setCtaDescription] = useState("");
  const [ctaButtonText, setCtaButtonText] = useState("");
  const [ctaButtonLink, setCtaButtonLink] = useState("");
  const [ctaButtonLinkType, setCtaButtonLinkType] = useState("internal");
  const [isSavingCta, setIsSavingCta] = useState(false);
  
  // Fetch current content
  const { content, isLoading, refresh } = useContent<any>({
    page: "about",
    fallbackData: {}
  });
  
  // Setup available Lucide icons for amenities
  const availableIcons = [
    "Waves", "Building", "Power", "Warehouse", "PlayIcon",
    "Dog", "Music", "Utensils", "IceCream", "ShowerHead", "Sofa", "Wifi"
  ];
  
  // Initialize form data from content
  useEffect(() => {
    if (!isLoading && content) {
      // Header section
      if (content.header) {
        setHeaderTitle(content.header.title || "");
        setHeaderDescription(content.header.description || "");
        setHeaderImage(content.header.imageUrl || "");
      }
      
      // Texas Charm section
      if (content.texas_charm) {
        setTexasCharmTitle(content.texas_charm.title || "");
        setTexasCharmDescription(content.texas_charm.description || "");
        
        // Parse amenities from JSON if available
        try {
          if (content.texas_charm.amenities) {
            const parsedAmenities = JSON.parse(content.texas_charm.amenities);
            if (Array.isArray(parsedAmenities)) {
              setAmenities(parsedAmenities || []);
            }
          }
        } catch (error) {
          console.error("Error parsing amenities:", error);
          setAmenities([]);
        }
      }
      
      // Accommodations section
      if (content.accommodations) {
        setAccommodationsTitle(content.accommodations.title || "");
        setAccommodationsDescription(content.accommodations.description || "");
        
        // Parse accommodation items from JSON if available
        try {
          if (content.accommodations.items) {
            const parsedItems = JSON.parse(content.accommodations.items);
            if (Array.isArray(parsedItems)) {
              setAccommodationItems(parsedItems || []);
            }
          }
        } catch (error) {
          console.error("Error parsing accommodation items:", error);
          setAccommodationItems([]);
        }
        
        // Load accommodations CTA button data
        setAccommodationsCtaButtonText(content.accommodations.buttonText || "");
        setAccommodationsCtaButtonLink(content.accommodations.buttonLink || "");
        setAccommodationsCtaButtonLinkType(content.accommodations.buttonLinkType || "internal");
      }
      
      // CTA section
      if (content.cta) {
        setCtaTitle(content.cta.title || "");
        setCtaDescription(content.cta.description || "");
        setCtaButtonText(content.cta.buttonText || "");
        setCtaButtonLink(content.cta.buttonLink || "");
        setCtaButtonLinkType(content.cta.buttonLinkType || "internal");
      }
    }
  }, [isLoading, content]);
  
  // Helper function to check JSON size
  const getJSONSize = (data: any): number => {
    try {
      const jsonString = JSON.stringify(data);
      return new Blob([jsonString]).size;
    } catch (error) {
      console.error("Error calculating JSON size:", error);
      return 0;
    }
  };

  // Helper function to save content item with retry logic
  const saveContentItemWithRetry = async (page: string, section: string, key: string, value: string, type: string = "", maxRetries = 3): Promise<boolean> => {
    let retries = 0;
    
    while (retries < maxRetries) {
      try {
        await saveContentItem(page, section, key, value, type);
        return true; // Success
      } catch (error) {
        retries++;
        console.error(`Error saving content (attempt ${retries}):`, error);
        
        if (retries >= maxRetries) {
          throw error; // Give up after max retries
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries - 1)));
      }
    }
    
    return false; // Should never reach here
  };
  
  // Handler for saving header section
  const handleSaveHeader = async () => {
    setIsSavingHeader(true);
    try {
      await saveContentItemWithRetry("about", "header", "title", headerTitle);
      await saveContentItemWithRetry("about", "header", "description", headerDescription);
      await saveContentItemWithRetry("about", "header", "imageUrl", headerImage);
      
      toast({
        title: "Header updated",
        description: "The page header has been updated successfully",
      });
      
      // Refresh content
      await refresh();
    } catch (error) {
      console.error("Error saving header:", error);
      toast({
        title: "Error updating header",
        description: "There was a problem updating the page header",
        variant: "destructive",
      });
    } finally {
      setIsSavingHeader(false);
    }
  };
  
  // Handler for saving Texas Charm section
  const handleSaveTexasCharm = async () => {
    setIsSavingTexasCharm(true);
    try {
      await saveContentItemWithRetry("about", "texas_charm", "title", texasCharmTitle);
      await saveContentItemWithRetry("about", "texas_charm", "description", texasCharmDescription);
      
      // Check amenities JSON size before saving
      const amenitiesJson = JSON.stringify(amenities);
      const amenitiesSize = new Blob([amenitiesJson]).size;
      
      if (amenitiesSize > 100000) { // 100KB limit
        throw new Error("Amenities data exceeds size limit (100KB). Please reduce the number of amenities or content size.");
      }
      
      await saveContentItemWithRetry("about", "texas_charm", "amenities", amenitiesJson);
      
      toast({
        title: "Texas Charm section updated",
        description: "The Texas Charm section has been updated successfully",
      });
      
      // Refresh content
      await refresh();
    } catch (error) {
      console.error("Error saving Texas Charm section:", error);
      toast({
        title: "Error updating Texas Charm section",
        description: error instanceof Error ? error.message : "There was a problem updating the Texas Charm section",
        variant: "destructive",
      });
    } finally {
      setIsSavingTexasCharm(false);
    }
  };
  
  // Handler for saving Accommodations section
  const handleSaveAccommodations = async () => {
    setIsSavingAccommodations(true);
    setAccommodationsDataError(null);
    
    try {
      await saveContentItemWithRetry("about", "accommodations", "title", accommodationsTitle);
      await saveContentItemWithRetry("about", "accommodations", "description", accommodationsDescription);
      
      // Save accommodations CTA button
      await saveContentItemWithRetry("about", "accommodations", "buttonText", accommodationsCtaButtonText);
      await saveContentItemWithRetry("about", "accommodations", "buttonLink", accommodationsCtaButtonLink);
      await saveContentItemWithRetry("about", "accommodations", "buttonLinkType", accommodationsCtaButtonLinkType, "link_type");
      
      // Check accommodation items size before saving
      const itemsJson = JSON.stringify(accommodationItems);
      const itemsSize = new Blob([itemsJson]).size;
      
      if (itemsSize > 100000) { // 100KB limit
        setAccommodationsDataError(`Data size (${Math.round(itemsSize/1024)}KB) exceeds limit (100KB). Try reducing the number of accommodations or using smaller images.`);
        throw new Error("Accommodation data exceeds size limit (100KB). Please reduce the number of accommodations or use smaller images.");
      }
      
      await saveContentItemWithRetry("about", "accommodations", "items", itemsJson);
      
      toast({
        title: "Accommodations section updated",
        description: "The Accommodations section has been updated successfully",
      });
      
      // Refresh content
      await refresh();
    } catch (error) {
      console.error("Error saving Accommodations section:", error);
      toast({
        title: "Error updating Accommodations section",
        description: error instanceof Error ? error.message : "There was a problem updating the Accommodations section",
        variant: "destructive",
      });
    } finally {
      setIsSavingAccommodations(false);
    }
  };
  
  // Handler for saving CTA section
  const handleSaveCta = async () => {
    setIsSavingCta(true);
    try {
      await saveContentItemWithRetry("about", "cta", "title", ctaTitle);
      await saveContentItemWithRetry("about", "cta", "description", ctaDescription);
      await saveContentItemWithRetry("about", "cta", "buttonText", ctaButtonText);
      await saveContentItemWithRetry("about", "cta", "buttonLink", ctaButtonLink);
      await saveContentItemWithRetry("about", "cta", "buttonLinkType", ctaButtonLinkType, "link_type");
      
      toast({
        title: "CTA section updated",
        description: "The CTA section has been updated successfully",
      });
      
      // Refresh content
      await refresh();
    } catch (error) {
      console.error("Error saving CTA section:", error);
      toast({
        title: "Error updating CTA section",
        description: error instanceof Error ? error.message : "There was a problem updating the CTA section",
        variant: "destructive",
      });
    } finally {
      setIsSavingCta(false);
    }
  };
  
  // Helper function to save content item
  const saveContentItem = async (page: string, section: string, key: string, value: string, type: string = "") => {
    // Check if the content item already exists
    const { data: existingItem, error: queryError } = await supabase
      .from("page_content")
      .select("*")
      .eq("page", page)
      .eq("section", section)
      .eq("content_key", key)
      .maybeSingle();
    
    if (queryError) {
      throw new Error(`Error querying content: ${queryError.message}`);
    }
    
    if (existingItem) {
      // Update existing item
      const updateData: any = {
        content_value: value,
        updated_at: new Date().toISOString(),
      };
      
      if (type === "link_type") {
        updateData.link_type = value;
      }
      
      const { error: updateError } = await supabase
        .from("page_content")
        .update(updateData)
        .eq("id", existingItem.id);
        
      if (updateError) {
        throw new Error(`Error updating content: ${updateError.message}`);
      }
    } else {
      // Create new item
      const insertData: any = {
        page,
        section,
        content_key: key,
        content_value: value,
        display_order: 0,
      };
      
      if (type === "link_type") {
        insertData.link_type = value;
      }
      
      const { error: insertError } = await supabase
        .from("page_content")
        .insert(insertData);
        
      if (insertError) {
        throw new Error(`Error inserting content: ${insertError.message}`);
      }
    }
  };
  
  // Add a new amenity
  const addAmenity = () => {
    setAmenities([...amenities, { name: "", icon: "Waves" }]);
  };
  
  // Remove an amenity
  const removeAmenity = (index: number) => {
    const updatedAmenities = [...amenities];
    updatedAmenities.splice(index, 1);
    setAmenities(updatedAmenities);
  };
  
  // Update an amenity
  const updateAmenity = (index: number, field: keyof AmenityItem, value: string) => {
    const updatedAmenities = [...amenities];
    updatedAmenities[index] = {
      ...updatedAmenities[index],
      [field]: value,
    };
    setAmenities(updatedAmenities);
  };
  
  // Add a new accommodation item
  const addAccommodationItem = () => {
    // Check if adding a new item would exceed size limit
    const newItems = [...accommodationItems, { title: "", description: "", imageUrl: "" }];
    const newItemsSize = getJSONSize(newItems);
    
    if (newItemsSize > 100000) { // 100KB limit
      toast({
        title: "Warning",
        description: "Adding more accommodations may exceed the data size limit. Try using smaller images or shorter descriptions.",
        variant: "destructive",
      });
    }
    
    setAccommodationItems(newItems);
    setAccommodationsDataError(null);
  };
  
  // Remove an accommodation item
  const removeAccommodationItem = (index: number) => {
    const updatedItems = [...accommodationItems];
    updatedItems.splice(index, 1);
    setAccommodationItems(updatedItems);
    setAccommodationsDataError(null);
  };
  
  // Update an accommodation item
  const updateAccommodationItem = (index: number, field: keyof AccommodationItem, value: string) => {
    const updatedItems = [...accommodationItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setAccommodationItems(updatedItems);
    
    // Check data size when updating
    const newItemsSize = getJSONSize(updatedItems);
    if (newItemsSize > 90000) { // 90KB warning threshold
      setAccommodationsDataError(`Data size (${Math.round(newItemsSize/1024)}KB) approaching limit (100KB). Consider using smaller images.`);
    } else {
      setAccommodationsDataError(null);
    }
  };
  
  return (
    <AdminLayout title="About Page Content">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About Page Content</CardTitle>
            <CardDescription>
              Manage the content displayed on the About page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {/* Header Section */}
              <AccordionItem value="header">
                <AccordionTrigger>Page Header</AccordionTrigger>
                <AccordionContent className="space-y-4 p-2">
                  <div className="space-y-2">
                    <Label htmlFor="header-title">Title</Label>
                    <Input
                      id="header-title"
                      value={headerTitle}
                      onChange={(e) => setHeaderTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="header-description">Description</Label>
                    <Textarea
                      id="header-description"
                      value={headerDescription}
                      onChange={(e) => setHeaderDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <ImageUploader
                      label="Header Background Image"
                      currentImageUrl={headerImage}
                      onImageUploaded={setHeaderImage}
                      bucket="content_images"
                      folder="about"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSaveHeader} 
                    disabled={isSavingHeader}
                    className="mt-4 flex items-center"
                  >
                    {isSavingHeader ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </AccordionContent>
              </AccordionItem>
              
              {/* Texas Charm Section */}
              <AccordionItem value="texas-charm">
                <AccordionTrigger>Texas Charm Section</AccordionTrigger>
                <AccordionContent className="space-y-4 p-2">
                  <div className="space-y-2">
                    <Label htmlFor="texas-charm-title">Section Title</Label>
                    <Input
                      id="texas-charm-title"
                      value={texasCharmTitle}
                      onChange={(e) => setTexasCharmTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="texas-charm-description">Section Description</Label>
                    <Textarea
                      id="texas-charm-description"
                      value={texasCharmDescription}
                      onChange={(e) => setTexasCharmDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-2">
                      <Label>Amenities</Label>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={addAmenity}
                        className="flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Amenity
                      </Button>
                    </div>
                    
                    <div className="space-y-4 max-h-96 overflow-y-auto p-2">
                      {amenities.map((amenity, index) => (
                        <div key={index} className="flex items-start space-x-2 p-2 border rounded-md">
                          <div className="flex-1 space-y-2">
                            <div>
                              <Label htmlFor={`amenity-name-${index}`}>Name</Label>
                              <Input
                                id={`amenity-name-${index}`}
                                value={amenity.name}
                                onChange={(e) => updateAmenity(index, "name", e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`amenity-icon-${index}`}>Icon</Label>
                              <select
                                id={`amenity-icon-${index}`}
                                value={amenity.icon}
                                onChange={(e) => updateAmenity(index, "icon", e.target.value)}
                                className="w-full p-2 border rounded-md"
                              >
                                {availableIcons.map((icon) => (
                                  <option key={icon} value={icon}>
                                    {icon}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => removeAmenity(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSaveTexasCharm} 
                    disabled={isSavingTexasCharm}
                    className="mt-4 flex items-center"
                  >
                    {isSavingTexasCharm ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </AccordionContent>
              </AccordionItem>
              
              {/* Accommodations Section */}
              <AccordionItem value="accommodations">
                <AccordionTrigger>Accommodations Section</AccordionTrigger>
                <AccordionContent className="space-y-4 p-2">
                  <div className="space-y-2">
                    <Label htmlFor="accommodations-title">Section Title</Label>
                    <Input
                      id="accommodations-title"
                      value={accommodationsTitle}
                      onChange={(e) => setAccommodationsTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accommodations-description">Section Description</Label>
                    <Textarea
                      id="accommodations-description"
                      value={accommodationsDescription}
                      onChange={(e) => setAccommodationsDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  {/* Accommodations CTA Button Settings */}
                  <div className="space-y-4 border-t pt-4 mt-4">
                    <h4 className="font-medium">Section CTA Button</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accommodations-cta-button-text">Button Text</Label>
                      <Input
                        id="accommodations-cta-button-text"
                        value={accommodationsCtaButtonText}
                        onChange={(e) => setAccommodationsCtaButtonText(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <LinkSelector
                        label="Button Link"
                        value={accommodationsCtaButtonLink}
                        linkType={accommodationsCtaButtonLinkType}
                        onValueChange={setAccommodationsCtaButtonLink}
                        onLinkTypeChange={setAccommodationsCtaButtonLinkType}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <Label>Accommodation Cards</Label>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={addAccommodationItem}
                        className="flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Card
                      </Button>
                    </div>
                    
                    {accommodationsDataError && (
                      <div className="p-3 bg-amber-50 border-amber-200 border rounded flex items-start space-x-2 text-amber-800 mb-2">
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{accommodationsDataError}</p>
                      </div>
                    )}
                    
                    <div className="space-y-4 max-h-96 overflow-y-auto p-2">
                      {accommodationItems.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md">
                          <div className="flex justify-between items-start">
                            <h4 className="text-lg font-medium">Card {index + 1}</h4>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeAccommodationItem(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-4 mt-2">
                            <div>
                              <Label htmlFor={`accommodation-title-${index}`}>Title</Label>
                              <Input
                                id={`accommodation-title-${index}`}
                                value={item.title}
                                onChange={(e) => updateAccommodationItem(index, "title", e.target.value)}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`accommodation-description-${index}`}>Description</Label>
                              <Textarea
                                id={`accommodation-description-${index}`}
                                value={item.description}
                                onChange={(e) => updateAccommodationItem(index, "description", e.target.value)}
                                rows={2}
                              />
                            </div>
                            
                            <div>
                              <ImageUploader
                                label={`Card Image ${index + 1}`}
                                currentImageUrl={item.imageUrl}
                                onImageUploaded={(url) => updateAccommodationItem(index, "imageUrl", url)}
                                bucket="content_images"
                                folder="about/accommodations"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSaveAccommodations} 
                    disabled={isSavingAccommodations}
                    className="mt-4 flex items-center"
                  >
                    {isSavingAccommodations ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </AccordionContent>
              </AccordionItem>
              
              {/* CTA Section */}
              <AccordionItem value="cta">
                <AccordionTrigger>CTA Banner</AccordionTrigger>
                <AccordionContent className="space-y-4 p-2">
                  <div className="space-y-2">
                    <Label htmlFor="cta-title">Banner Title</Label>
                    <Input
                      id="cta-title"
                      value={ctaTitle}
                      onChange={(e) => setCtaTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cta-description">Banner Description</Label>
                    <Textarea
                      id="cta-description"
                      value={ctaDescription}
                      onChange={(e) => setCtaDescription(e.target.value)}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cta-button-text">Button Text</Label>
                    <Input
                      id="cta-button-text"
                      value={ctaButtonText}
                      onChange={(e) => setCtaButtonText(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <LinkSelector
                      label="Button"
                      value={ctaButtonLink}
                      linkType={ctaButtonLinkType}
                      onValueChange={setCtaButtonLink}
                      onLinkTypeChange={setCtaButtonLinkType}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSaveCta} 
                    disabled={isSavingCta}
                    className="mt-4 flex items-center"
                  >
                    {isSavingCta ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAbout;
