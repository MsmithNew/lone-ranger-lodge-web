
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploader from "@/components/admin/ImageUploader";
import LinkSelector from "@/components/admin/LinkSelector";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";

// Content editor for the Home page
const AdminContent = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<Record<string, Record<string, Record<string, any>>>>({});
  const [origContent, setOrigContent] = useState<Record<string, Record<string, Record<string, any>>>>({});

  useEffect(() => {
    fetchPageContent();
  }, [activeTab]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page', activeTab)
        .order('display_order', { ascending: true });

      if (error) throw error;

      // Transform the flat array into a nested structure by section and content_key
      const transformedContent: Record<string, Record<string, Record<string, any>>> = {};
      transformedContent[activeTab] = {};

      data.forEach(item => {
        if (!transformedContent[activeTab][item.section]) {
          transformedContent[activeTab][item.section] = {};
        }
        transformedContent[activeTab][item.section][item.content_key] = item.content_value;
        if (item.link_type) {
          transformedContent[activeTab][item.section][`${item.content_key}_link_type`] = item.link_type;
        }
      });

      setContent(transformedContent);
      setOrigContent(JSON.parse(JSON.stringify(transformedContent))); // Deep copy
    } catch (error) {
      console.error("Error fetching content:", error);
      toast({
        title: "Error loading content",
        description: "There was a problem loading the page content.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (section: string, key: string, value: string | any[]) => {
    setContent(prevContent => {
      const newContent = { ...prevContent };
      if (!newContent[activeTab]) newContent[activeTab] = {};
      if (!newContent[activeTab][section]) newContent[activeTab][section] = {};
      newContent[activeTab][section][key] = value;
      return newContent;
    });
  };
  
  const handleLinkTypeChange = (section: string, key: string, linkType: string) => {
    setContent(prevContent => {
      const newContent = { ...prevContent };
      if (!newContent[activeTab]) newContent[activeTab] = {};
      if (!newContent[activeTab][section]) newContent[activeTab][section] = {};
      newContent[activeTab][section][`${key}_link_type`] = linkType;
      return newContent;
    });
  };

  const saveContent = async (section: string) => {
    if (!content[activeTab] || !content[activeTab][section]) return;

    setSaving(true);
    const sectionContent = content[activeTab][section];
    const updates = [];

    // Prepare all inserts/updates
    for (const key in sectionContent) {
      // Skip link_type keys as they will be handled with their main keys
      if (key.endsWith('_link_type')) continue;
      
      const value = sectionContent[key];
      const linkTypeKey = `${key}_link_type`;
      const linkType = sectionContent[linkTypeKey] || 'internal';
      
      // Handle arrays (for dynamic content like gallery, features, etc.)
      if (Array.isArray(value)) {
        // Delete existing items for this key
        const { error: deleteError } = await supabase
          .from('page_content')
          .delete()
          .eq('page', activeTab)
          .eq('section', section)
          .like('content_key', `${key}%`);
          
        if (deleteError) {
          console.error("Error deleting existing items:", deleteError);
          throw deleteError;
        }
        
        // Insert all array items with proper indexing
        value.forEach((item, index) => {
          updates.push({
            page: activeTab,
            section,
            content_key: `${key}${index + 1}`,
            content_value: item,
            display_order: index,
          });
        });
      } else {
        // Regular key-value pair
        updates.push({
          page: activeTab,
          section,
          content_key: key,
          content_value: value,
          link_type: linkTypeKey in sectionContent ? sectionContent[linkTypeKey] : 'internal',
        });
      }
    }

    try {
      // Use upsert to handle both insert and update cases
      const { error } = await supabase
        .from('page_content')
        .upsert(updates, { 
          onConflict: 'page,section,content_key',
          ignoreDuplicates: false
        });

      if (error) throw error;

      toast({
        title: "Content saved",
        description: `The ${section} section has been updated.`,
      });
      
      // Update original content to match current state
      setOrigContent(prevContent => {
        const newContent = { ...prevContent };
        if (!newContent[activeTab]) newContent[activeTab] = {};
        newContent[activeTab][section] = { ...sectionContent };
        return newContent;
      });

    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error saving content",
        description: "There was a problem saving the content.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = (section: string) => {
    if (!content[activeTab] || !content[activeTab][section]) return false;
    if (!origContent[activeTab] || !origContent[activeTab][section]) return true;
    
    const currentContent = content[activeTab][section];
    const originalContent = origContent[activeTab][section];
    
    for (const key in currentContent) {
      if (JSON.stringify(currentContent[key]) !== JSON.stringify(originalContent[key] || '')) return true;
    }
    
    return false;
  };
  
  // Add a new item to an array
  const addItem = (section: string, baseKey: string, template: any = '') => {
    setContent(prevContent => {
      const newContent = { ...prevContent };
      if (!newContent[activeTab]) newContent[activeTab] = {};
      if (!newContent[activeTab][section]) newContent[activeTab][section] = {};
      
      // Initialize as array if it doesn't exist
      if (!Array.isArray(newContent[activeTab][section][baseKey])) {
        newContent[activeTab][section][baseKey] = [];
      }
      
      // Add new item to array
      newContent[activeTab][section][baseKey] = [
        ...newContent[activeTab][section][baseKey],
        template
      ];
      
      return newContent;
    });
  };
  
  // Remove an item from an array
  const removeItem = (section: string, baseKey: string, index: number) => {
    setContent(prevContent => {
      const newContent = { ...prevContent };
      if (!newContent[activeTab][section][baseKey]) return newContent;
      
      const items = [...newContent[activeTab][section][baseKey]];
      items.splice(index, 1);
      
      newContent[activeTab][section][baseKey] = items;
      return newContent;
    });
  };
  
  // Convert key-based content to array format for dynamic sections
  const initializeArrayContent = (section: string, keyPattern: string, keys: string[]) => {
    if (!content[activeTab]?.[section]) return;
    
    const sectionContent = content[activeTab][section];
    let hasItems = false;
    
    // Check if we have any items matching the pattern
    for (const key in sectionContent) {
      if (key.startsWith(keyPattern)) {
        hasItems = true;
        break;
      }
    }
    
    if (!hasItems) return;
    
    // Extract items from key-based structure
    const items: Record<string, any>[] = [];
    let index = 1;
    
    while (true) {
      const hasCurrentItem = keys.some(key => `${keyPattern}${index}_${key}` in sectionContent);
      if (!hasCurrentItem) break;
      
      const item: Record<string, any> = {};
      keys.forEach(key => {
        const fullKey = `${keyPattern}${index}_${key}`;
        if (fullKey in sectionContent) {
          item[key] = sectionContent[fullKey];
        }
      });
      
      items.push(item);
      index++;
    }
    
    if (items.length > 0) {
      handleContentChange(section, keyPattern, items);
    }
  };

  // Home page section editors
  const renderHomePageEditors = () => {
    return (
      <Accordion type="single" collapsible className="w-full">
        {/* Hero Section */}
        <AccordionItem value="hero">
          <AccordionTrigger className="text-lg font-medium">
            Hero Banner Section
            {hasChanges('hero') && <span className="ml-2 text-sm text-amber-500">(Unsaved changes)</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <Label htmlFor="hero-headline">Headline</Label>
                <Input
                  id="hero-headline"
                  value={content.home?.hero?.headline || ''}
                  onChange={(e) => handleContentChange('hero', 'headline', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Input
                  id="hero-subtitle"
                  value={content.home?.hero?.subtitle || ''}
                  onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)}
                />
              </div>
              
              <ImageUploader
                currentImageUrl={content.home?.hero?.image_url || ''}
                onImageUploaded={(url) => handleContentChange('hero', 'image_url', url)}
                label="Hero Background Image"
                folder="hero"
              />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Features List</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Convert comma-separated string to array if needed
                      if (typeof content.home?.hero?.features === 'string') {
                        const features = content.home?.hero?.features
                          .split(',')
                          .map(f => f.trim())
                          .filter(f => f.length > 0);
                        handleContentChange('hero', 'features', features);
                      } else if (!Array.isArray(content.home?.hero?.features)) {
                        handleContentChange('hero', 'features', []);
                      }
                      
                      // Add a new empty feature
                      addItem('hero', 'features');
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {Array.isArray(content.home?.hero?.features) ? (
                    content.home.hero.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...content.home.hero.features];
                            newFeatures[index] = e.target.value;
                            handleContentChange('hero', 'features', newFeatures);
                          }}
                          placeholder={`Feature ${index + 1}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem('hero', 'features', index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Textarea
                      id="hero-features"
                      value={content.home?.hero?.features || ''}
                      onChange={(e) => handleContentChange('hero', 'features', e.target.value)}
                      placeholder="Resort-Style Pool, Historic Lodges, Full Hookups, Horse Hotel"
                    />
                  )}
                </div>
                <p className="text-sm text-gray-500">Enter features that will appear as a list in the hero section.</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-cta">Call to Action Text</Label>
                <Input
                  id="hero-cta"
                  value={content.home?.hero?.cta_text || ''}
                  onChange={(e) => handleContentChange('hero', 'cta_text', e.target.value)}
                  placeholder="Book Your Stay Now"
                />
              </div>
              
              <LinkSelector
                label="CTA Button"
                value={content.home?.hero?.cta_link || '/reservations'}
                linkType={content.home?.hero?.cta_link_link_type || 'internal'}
                onValueChange={(value) => handleContentChange('hero', 'cta_link', value)}
                onLinkTypeChange={(type) => handleLinkTypeChange('hero', 'cta_link', type)}
              />
              
              <Button 
                onClick={() => saveContent('hero')} 
                disabled={saving || !hasChanges('hero')}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Welcome Section */}
        <AccordionItem value="welcome">
          <AccordionTrigger className="text-lg font-medium">
            Welcome Section
            {hasChanges('welcome') && <span className="ml-2 text-sm text-amber-500">(Unsaved changes)</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <Label htmlFor="welcome-title">Section Title</Label>
                <Input
                  id="welcome-title"
                  value={content.home?.welcome?.title || ''}
                  onChange={(e) => handleContentChange('welcome', 'title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="welcome-description">Section Description</Label>
                <Textarea
                  id="welcome-description"
                  value={content.home?.welcome?.description || ''}
                  onChange={(e) => handleContentChange('welcome', 'description', e.target.value)}
                  rows={4}
                />
              </div>
              
              <ImageUploader
                currentImageUrl={content.home?.welcome?.image_url || ''}
                onImageUploaded={(url) => handleContentChange('welcome', 'image_url', url)}
                label="Welcome Image"
                folder="welcome"
              />
              
              <div className="space-y-2">
                <Label htmlFor="welcome-cta">Button Text</Label>
                <Input
                  id="welcome-cta"
                  value={content.home?.welcome?.cta_text || ''}
                  onChange={(e) => handleContentChange('welcome', 'cta_text', e.target.value)}
                  placeholder="Book Now"
                />
              </div>
              
              <LinkSelector
                label="CTA Button"
                value={content.home?.welcome?.cta_link || '/reservations'}
                linkType={content.home?.welcome?.cta_link_link_type || 'internal'}
                onValueChange={(value) => handleContentChange('welcome', 'cta_link', value)}
                onLinkTypeChange={(type) => handleLinkTypeChange('welcome', 'cta_link', type)}
              />
              
              <Button 
                onClick={() => saveContent('welcome')} 
                disabled={saving || !hasChanges('welcome')}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Gallery Section */}
        <AccordionItem value="gallery">
          <AccordionTrigger className="text-lg font-medium">
            Photo Gallery Section
            {hasChanges('gallery') && <span className="ml-2 text-sm text-amber-500">(Unsaved changes)</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <Label htmlFor="gallery-title">Section Title</Label>
                <Input
                  id="gallery-title"
                  value={content.home?.gallery?.title || ''}
                  onChange={(e) => handleContentChange('gallery', 'title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gallery-description">Section Description</Label>
                <Textarea
                  id="gallery-description"
                  value={content.home?.gallery?.description || ''}
                  onChange={(e) => handleContentChange('gallery', 'description', e.target.value)}
                />
              </div>
              
              {/* Gallery Images with add/remove functionality */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Gallery Images</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Initialize gallery_images array if needed
                      if (!Array.isArray(content.home?.gallery?.gallery_images)) {
                        // Convert existing numbered items to array if they exist
                        const images = [];
                        for (let i = 1; i <= 6; i++) {
                          if (content.home?.gallery?.[`image${i}_url`]) {
                            images.push({
                              url: content.home.gallery[`image${i}_url`],
                              alt: content.home.gallery[`image${i}_alt`] || ''
                            });
                          }
                        }
                        handleContentChange('gallery', 'gallery_images', images.length > 0 ? images : []);
                      }
                      
                      // Add new empty image
                      addItem('gallery', 'gallery_images', { url: '', alt: '' });
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
                
                {Array.isArray(content.home?.gallery?.gallery_images) ? (
                  <div className="space-y-6">
                    {content.home.gallery.gallery_images.map((image, index) => (
                      <div key={index} className="border p-4 rounded-md relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeItem('gallery', 'gallery_images', index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                        
                        <div className="mt-4 space-y-4">
                          <ImageUploader
                            currentImageUrl={image.url}
                            onImageUploaded={(url) => {
                              const newImages = [...content.home.gallery.gallery_images];
                              newImages[index] = { ...newImages[index], url };
                              handleContentChange('gallery', 'gallery_images', newImages);
                            }}
                            label={`Gallery Image ${index + 1}`}
                            folder="gallery"
                          />
                          
                          <div className="space-y-2">
                            <Label htmlFor={`image-${index}-alt`}>Image Alt Text</Label>
                            <Input
                              id={`image-${index}-alt`}
                              value={image.alt}
                              onChange={(e) => {
                                const newImages = [...content.home.gallery.gallery_images];
                                newImages[index] = { ...newImages[index], alt: e.target.value };
                                handleContentChange('gallery', 'gallery_images', newImages);
                              }}
                              placeholder="Image description"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Fallback to original implementation for backward compatibility
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-2 border p-3 rounded-md">
                        <ImageUploader
                          currentImageUrl={content.home?.gallery?.[`image${i+1}_url`] || ''}
                          onImageUploaded={(url) => handleContentChange('gallery', `image${i+1}_url`, url)}
                          label={`Image ${i+1}`}
                          folder="gallery"
                        />
                        
                        <div className="space-y-2">
                          <Label htmlFor={`gallery-image-${i}-alt`}>Image {i+1} Alt Text</Label>
                          <Input
                            id={`gallery-image-${i}-alt`}
                            value={content.home?.gallery?.[`image${i+1}_alt`] || ''}
                            onChange={(e) => handleContentChange('gallery', `image${i+1}_alt`, e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Button 
                onClick={() => saveContent('gallery')} 
                disabled={saving || !hasChanges('gallery')}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Things To Do Section */}
        <AccordionItem value="thingsToDo">
          <AccordionTrigger className="text-lg font-medium">
            Things To Do Section
            {hasChanges('thingsToDo') && <span className="ml-2 text-sm text-amber-500">(Unsaved changes)</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <Label htmlFor="thingsToDo-title">Section Title</Label>
                <Input
                  id="thingsToDo-title"
                  value={content.home?.thingsToDo?.title || ''}
                  onChange={(e) => handleContentChange('thingsToDo', 'title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thingsToDo-description">Section Description</Label>
                <Textarea
                  id="thingsToDo-description"
                  value={content.home?.thingsToDo?.description || ''}
                  onChange={(e) => handleContentChange('thingsToDo', 'description', e.target.value)}
                />
              </div>
              
              <ImageUploader
                currentImageUrl={content.home?.thingsToDo?.image_url || ''}
                onImageUploaded={(url) => handleContentChange('thingsToDo', 'image_url', url)}
                label="Featured Image"
                folder="things-to-do"
              />
              
              {/* Activities with add/remove functionality */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Activities</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Initialize activities array if needed
                      if (!Array.isArray(content.home?.thingsToDo?.activities)) {
                        // Convert existing numbered items to array if they exist
                        const activities = [];
                        for (let i = 1; i <= 7; i++) {
                          if (content.home?.thingsToDo?.[`activity${i}`]) {
                            activities.push(content.home.thingsToDo[`activity${i}`]);
                          }
                        }
                        handleContentChange('thingsToDo', 'activities', activities.length > 0 ? activities : []);
                      }
                      
                      // Add new empty activity
                      addItem('thingsToDo', 'activities', '');
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                </div>
                
                {Array.isArray(content.home?.thingsToDo?.activities) ? (
                  <div className="space-y-3">
                    {content.home.thingsToDo.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={activity}
                          onChange={(e) => {
                            const newActivities = [...content.home.thingsToDo.activities];
                            newActivities[index] = e.target.value;
                            handleContentChange('thingsToDo', 'activities', newActivities);
                          }}
                          placeholder={`Activity ${index + 1}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem('thingsToDo', 'activities', index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Fallback to original implementation for backward compatibility
                  <div className="space-y-3">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="space-y-2 border p-3 rounded-md">
                        <Label htmlFor={`thingsToDo-activity-${i}`}>Activity {i+1}</Label>
                        <Input
                          id={`thingsToDo-activity-${i}`}
                          value={content.home?.thingsToDo?.[`activity${i+1}`] || ''}
                          onChange={(e) => handleContentChange('thingsToDo', `activity${i+1}`, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Button 
                onClick={() => saveContent('thingsToDo')} 
                disabled={saving || !hasChanges('thingsToDo')}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Featured Amenities Section */}
        <AccordionItem value="featuredAmenities">
          <AccordionTrigger className="text-lg font-medium">
            Featured Amenities Section
            {hasChanges('featuredAmenities') && <span className="ml-2 text-sm text-amber-500">(Unsaved changes)</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <Label htmlFor="featuredAmenities-title">Section Title</Label>
                <Input
                  id="featuredAmenities-title"
                  value={content.home?.featuredAmenities?.title || ''}
                  onChange={(e) => handleContentChange('featuredAmenities', 'title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="featuredAmenities-description">Section Description</Label>
                <Input
                  id="featuredAmenities-description"
                  value={content.home?.featuredAmenities?.description || ''}
                  onChange={(e) => handleContentChange('featuredAmenities', 'description', e.target.value)}
                />
              </div>
              
              {/* Amenities with add/remove functionality */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Amenities</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Initialize amenities array if needed
                      if (!Array.isArray(content.home?.featuredAmenities?.amenities)) {
                        // Convert existing numbered items to array if they exist
                        const amenities = [];
                        for (let i = 1; i <= 6; i++) {
                          const title = content.home?.featuredAmenities?.[`amenity${i}_title`];
                          const description = content.home?.featuredAmenities?.[`amenity${i}_description`];
                          const image = content.home?.featuredAmenities?.[`amenity${i}_image`];
                          
                          if (title || description || image) {
                            amenities.push({
                              title: title || '',
                              description: description || '',
                              image: image || ''
                            });
                          }
                        }
                        handleContentChange('featuredAmenities', 'amenities', amenities.length > 0 ? amenities : []);
                      }
                      
                      // Add new empty amenity
                      addItem('featuredAmenities', 'amenities', { title: '', description: '', image: '' });
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Amenity
                  </Button>
                </div>
                
                {Array.isArray(content.home?.featuredAmenities?.amenities) ? (
                  <div className="space-y-6">
                    {content.home.featuredAmenities.amenities.map((amenity, index) => (
                      <div key={index} className="border p-4 rounded-md relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeItem('featuredAmenities', 'amenities', index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                        
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`amenity-${index}-title`}>Amenity Title</Label>
                            <Input
                              id={`amenity-${index}-title`}
                              value={amenity.title}
                              onChange={(e) => {
                                const newAmenities = [...content.home.featuredAmenities.amenities];
                                newAmenities[index] = { ...newAmenities[index], title: e.target.value };
                                handleContentChange('featuredAmenities', 'amenities', newAmenities);
                              }}
                              placeholder="Amenity title"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`amenity-${index}-description`}>Description</Label>
                            <Textarea
                              id={`amenity-${index}-description`}
                              value={amenity.description}
                              onChange={(e) => {
                                const newAmenities = [...content.home.featuredAmenities.amenities];
                                newAmenities[index] = { ...newAmenities[index], description: e.target.value };
                                handleContentChange('featuredAmenities', 'amenities', newAmenities);
                              }}
                              placeholder="Amenity description"
                            />
                          </div>
                          
                          <ImageUploader
                            currentImageUrl={amenity.image}
                            onImageUploaded={(url) => {
                              const newAmenities = [...content.home.featuredAmenities.amenities];
                              newAmenities[index] = { ...newAmenities[index], image: url };
                              handleContentChange('featuredAmenities', 'amenities', newAmenities);
                            }}
                            label={`Amenity ${index + 1} Image`}
                            folder="amenities"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Fallback to original implementation for backward compatibility
                  <div className="space-y-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-2 border p-3 rounded-md">
                        <Label htmlFor={`featuredAmenities-${i}-title`}>Amenity {i+1} Title</Label>
                        <Input
                          id={`featuredAmenities-${i}-title`}
                          value={content.home?.featuredAmenities?.[`amenity${i+1}_title`] || ''}
                          onChange={(e) => handleContentChange('featuredAmenities', `amenity${i+1}_title`, e.target.value)}
                        />
                        
                        <Label htmlFor={`featuredAmenities-${i}-description`}>Amenity {i+1} Description</Label>
                        <Textarea
                          id={`featuredAmenities-${i}-description`}
                          value={content.home?.featuredAmenities?.[`amenity${i+1}_description`] || ''}
                          onChange={(e) => handleContentChange('featuredAmenities', `amenity${i+1}_description`, e.target.value)}
                        />
                        
                        <ImageUploader
                          currentImageUrl={content.home?.featuredAmenities?.[`amenity${i+1}_image`] || ''}
                          onImageUploaded={(url) => handleContentChange('featuredAmenities', `amenity${i+1}_image`, url)}
                          label={`Amenity ${i+1} Image`}
                          folder="amenities"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Button 
                onClick={() => saveContent('featuredAmenities')} 
                disabled={saving || !hasChanges('featuredAmenities')}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Rules Section */}
        <AccordionItem value="rules">
          <AccordionTrigger className="text-lg font-medium">
            Rules & Regulations Section
            {hasChanges('rules') && <span className="ml-2 text-sm text-amber-500">(Unsaved changes)</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <Label htmlFor="rules-title">Section Title</Label>
                <Input
                  id="rules-title"
                  value={content.home?.rules?.title || ''}
                  onChange={(e) => handleContentChange('rules', 'title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rules-description">Section Description</Label>
                <Textarea
                  id="rules-description"
                  value={content.home?.rules?.description || ''}
                  onChange={(e) => handleContentChange('rules', 'description', e.target.value)}
                />
              </div>
              
              <ImageUploader
                currentImageUrl={content.home?.rules?.image_url || ''}
                onImageUploaded={(url) => handleContentChange('rules', 'image_url', url)}
                label="Rules Section Image"
                folder="rules"
              />
              
              {/* Rules with add/remove functionality */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Rules</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Initialize rules array if needed
                      if (!Array.isArray(content.home?.rules?.rules)) {
                        // Convert existing numbered items to array if they exist
                        const rules = [];
                        for (let i = 1; i <= 5; i++) {
                          const title = content.home?.rules?.[`rule${i}_title`];
                          const text = content.home?.rules?.[`rule${i}_text`];
                          
                          if (title || text) {
                            rules.push({
                              title: title || '',
                              text: text || ''
                            });
                          }
                        }
                        handleContentChange('rules', 'rules', rules.length > 0 ? rules : []);
                      }
                      
                      // Add new empty rule
                      addItem('rules', 'rules', { title: '', text: '' });
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </div>
                
                {Array.isArray(content.home?.rules?.rules) ? (
                  <div className="space-y-4">
                    {content.home.rules.rules.map((rule, index) => (
                      <div key={index} className="border p-4 rounded-md relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeItem('rules', 'rules', index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                        
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`rule-${index}-title`}>Rule Title</Label>
                            <Input
                              id={`rule-${index}-title`}
                              value={rule.title}
                              onChange={(e) => {
                                const newRules = [...content.home.rules.rules];
                                newRules[index] = { ...newRules[index], title: e.target.value };
                                handleContentChange('rules', 'rules', newRules);
                              }}
                              placeholder="Rule title"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`rule-${index}-text`}>Rule Text</Label>
                            <Textarea
                              id={`rule-${index}-text`}
                              value={rule.text}
                              onChange={(e) => {
                                const newRules = [...content.home.rules.rules];
                                newRules[index] = { ...newRules[index], text: e.target.value };
                                handleContentChange('rules', 'rules', newRules);
                              }}
                              placeholder="Rule description"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Fallback to original implementation for backward compatibility
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="space-y-2 border p-3 rounded-md">
                        <Label htmlFor={`rules-${i}-title`}>Rule {i+1} Title</Label>
                        <Input
                          id={`rules-${i}-title`}
                          value={content.home?.rules?.[`rule${i+1}_title`] || ''}
                          onChange={(e) => handleContentChange('rules', `rule${i+1}_title`, e.target.value)}
                        />
                        
                        <Label htmlFor={`rules-${i}-text`}>Rule {i+1} Text</Label>
                        <Textarea
                          id={`rules-${i}-text`}
                          value={content.home?.rules?.[`rule${i+1}_text`] || ''}
                          onChange={(e) => handleContentChange('rules', `rule${i+1}_text`, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <LinkSelector
                label="View All Rules Button"
                value={content.home?.rules?.view_all_link || '/rules-faqs'}
                linkType={content.home?.rules?.view_all_link_link_type || 'internal'}
                onValueChange={(value) => handleContentChange('rules', 'view_all_link', value)}
                onLinkTypeChange={(type) => handleLinkTypeChange('rules', 'view_all_link', type)}
              />
              
              <Button 
                onClick={() => saveContent('rules')} 
                disabled={saving || !hasChanges('rules')}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* CTA Section */}
        <AccordionItem value="cta">
          <AccordionTrigger className="text-lg font-medium">
            Call to Action Section
            {hasChanges('cta') && <span className="ml-2 text-sm text-amber-500">(Unsaved changes)</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <Label htmlFor="cta-title">Section Title</Label>
                <Input
                  id="cta-title"
                  value={content.home?.cta?.title || ''}
                  onChange={(e) => handleContentChange('cta', 'title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cta-description">Section Description</Label>
                <Textarea
                  id="cta-description"
                  value={content.home?.cta?.description || ''}
                  onChange={(e) => handleContentChange('cta', 'description', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cta-button">Button Text</Label>
                <Input
                  id="cta-button"
                  value={content.home?.cta?.button_text || ''}
                  onChange={(e) => handleContentChange('cta', 'button_text', e.target.value)}
                />
              </div>
              
              <LinkSelector
                label="CTA Button"
                value={content.home?.cta?.button_link || '/reservations'}
                linkType={content.home?.cta?.button_link_link_type || 'internal'}
                onValueChange={(value) => handleContentChange('cta', 'button_link', value)}
                onLinkTypeChange={(type) => handleLinkTypeChange('cta', 'button_link', type)}
              />
              
              <Button 
                onClick={() => saveContent('cta')} 
                disabled={saving || !hasChanges('cta')}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Local Attractions Section */}
        <AccordionItem value="attractions">
          <AccordionTrigger className="text-lg font-medium">
            Local Attractions Section
            {hasChanges('attractions') && <span className="ml-2 text-sm text-amber-500">(Unsaved changes)</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <Label htmlFor="attractions-title">Section Title</Label>
                <Input
                  id="attractions-title"
                  value={content.home?.attractions?.title || ''}
                  onChange={(e) => handleContentChange('attractions', 'title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="attractions-description">Section Description</Label>
                <Input
                  id="attractions-description"
                  value={content.home?.attractions?.description || ''}
                  onChange={(e) => handleContentChange('attractions', 'description', e.target.value)}
                />
              </div>
              
              {/* Attractions with add/remove functionality */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Attractions</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Initialize attractions array if needed
                      if (!Array.isArray(content.home?.attractions?.attraction_items)) {
                        // Convert existing numbered items to array if they exist
                        const attractions = [];
                        for (let i = 1; i <= 6; i++) {
                          const name = content.home?.attractions?.[`attraction${i}_name`];
                          const description = content.home?.attractions?.[`attraction${i}_description`];
                          const distance = content.home?.attractions?.[`attraction${i}_distance`];
                          
                          if (name || description || distance) {
                            attractions.push({
                              name: name || '',
                              description: description || '',
                              distance: distance || ''
                            });
                          }
                        }
                        handleContentChange('attractions', 'attraction_items', attractions.length > 0 ? attractions : []);
                      }
                      
                      // Add new empty attraction
                      addItem('attractions', 'attraction_items', { name: '', description: '', distance: '' });
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Attraction
                  </Button>
                </div>
                
                {Array.isArray(content.home?.attractions?.attraction_items) ? (
                  <div className="space-y-4">
                    {content.home.attractions.attraction_items.map((attraction, index) => (
                      <div key={index} className="border p-4 rounded-md relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeItem('attractions', 'attraction_items', index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                        
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`attraction-${index}-name`}>Attraction Name</Label>
                            <Input
                              id={`attraction-${index}-name`}
                              value={attraction.name}
                              onChange={(e) => {
                                const newAttractions = [...content.home.attractions.attraction_items];
                                newAttractions[index] = { ...newAttractions[index], name: e.target.value };
                                handleContentChange('attractions', 'attraction_items', newAttractions);
                              }}
                              placeholder="Attraction name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`attraction-${index}-description`}>Description</Label>
                            <Textarea
                              id={`attraction-${index}-description`}
                              value={attraction.description}
                              onChange={(e) => {
                                const newAttractions = [...content.home.attractions.attraction_items];
                                newAttractions[index] = { ...newAttractions[index], description: e.target.value };
                                handleContentChange('attractions', 'attraction_items', newAttractions);
                              }}
                              placeholder="Attraction description"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`attraction-${index}-distance`}>Distance</Label>
                            <Input
                              id={`attraction-${index}-distance`}
                              value={attraction.distance}
                              onChange={(e) => {
                                const newAttractions = [...content.home.attractions.attraction_items];
                                newAttractions[index] = { ...newAttractions[index], distance: e.target.value };
                                handleContentChange('attractions', 'attraction_items', newAttractions);
                              }}
                              placeholder="5 min"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Fallback to original implementation for backward compatibility
                  <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-2 border p-3 rounded-md">
                        <Label htmlFor={`attractions-${i}-name`}>Attraction {i+1} Name</Label>
                        <Input
                          id={`attractions-${i}-name`}
                          value={content.home?.attractions?.[`attraction${i+1}_name`] || ''}
                          onChange={(e) => handleContentChange('attractions', `attraction${i+1}_name`, e.target.value)}
                        />
                        
                        <Label htmlFor={`attractions-${i}-description`}>Attraction {i+1} Description</Label>
                        <Textarea
                          id={`attractions-${i}-description`}
                          value={content.home?.attractions?.[`attraction${i+1}_description`] || ''}
                          onChange={(e) => handleContentChange('attractions', `attraction${i+1}_description`, e.target.value)}
                        />
                        
                        <Label htmlFor={`attractions-${i}-distance`}>Attraction {i+1} Distance</Label>
                        <Input
                          id={`attractions-${i}-distance`}
                          value={content.home?.attractions?.[`attraction${i+1}_distance`] || ''}
                          onChange={(e) => handleContentChange('attractions', `attraction${i+1}_distance`, e.target.value)}
                          placeholder="5 min"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <LinkSelector
                label="Discover More Button"
                value={content.home?.attractions?.discover_more_link || '/activities'}
                linkType={content.home?.attractions?.discover_more_link_link_type || 'internal'}
                onValueChange={(value) => handleContentChange('attractions', 'discover_more_link', value)}
                onLinkTypeChange={(type) => handleLinkTypeChange('attractions', 'discover_more_link', type)}
              />
              
              <Button 
                onClick={() => saveContent('attractions')} 
                disabled={saving || !hasChanges('attractions')}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    <AdminLayout title="Content Management">
      <Card>
        <CardHeader>
          <CardTitle>Edit Website Content</CardTitle>
          <CardDescription>
            Update text, images, and other content elements on your website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="home">Home Page</TabsTrigger>
              {/* Add more tabs as needed for other pages */}
            </TabsList>
            
            <TabsContent value="home">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                renderHomePageEditors()
              )}
            </TabsContent>
            {/* Add TabsContent for other pages as they are added */}
          </Tabs>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminContent;
