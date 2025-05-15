
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Content editor for the Home page
const AdminContent = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<Record<string, Record<string, Record<string, string>>>>({});
  const [origContent, setOrigContent] = useState<Record<string, Record<string, Record<string, string>>>>({});

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
      const transformedContent: Record<string, Record<string, Record<string, string>>> = {};
      transformedContent[activeTab] = {};

      data.forEach(item => {
        if (!transformedContent[activeTab][item.section]) {
          transformedContent[activeTab][item.section] = {};
        }
        transformedContent[activeTab][item.section][item.content_key] = item.content_value;
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

  const handleContentChange = (section: string, key: string, value: string) => {
    setContent(prevContent => {
      const newContent = { ...prevContent };
      if (!newContent[activeTab]) newContent[activeTab] = {};
      if (!newContent[activeTab][section]) newContent[activeTab][section] = {};
      newContent[activeTab][section][key] = value;
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
      const value = sectionContent[key];
      
      updates.push({
        page: activeTab,
        section,
        content_key: key,
        content_value: value,
      });
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
      if (currentContent[key] !== (originalContent[key] || '')) return true;
    }
    
    return false;
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
              
              <div className="space-y-2">
                <Label htmlFor="hero-image">Background Image URL</Label>
                <Input
                  id="hero-image"
                  value={content.home?.hero?.image_url || ''}
                  onChange={(e) => handleContentChange('hero', 'image_url', e.target.value)}
                  placeholder="/placeholder.svg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-features">Features List (comma-separated)</Label>
                <Textarea
                  id="hero-features"
                  value={content.home?.hero?.features || ''}
                  onChange={(e) => handleContentChange('hero', 'features', e.target.value)}
                  placeholder="Resort-Style Pool, Historic Lodges, Full Hookups, Horse Hotel"
                />
                <p className="text-sm text-gray-500">Enter features separated by commas. These will appear as a list in the hero section.</p>
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
              
              <div className="space-y-2">
                <Label htmlFor="welcome-image">Image URL</Label>
                <Input
                  id="welcome-image"
                  value={content.home?.welcome?.image_url || ''}
                  onChange={(e) => handleContentChange('welcome', 'image_url', e.target.value)}
                  placeholder="/placeholder.svg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="welcome-cta">Button Text</Label>
                <Input
                  id="welcome-cta"
                  value={content.home?.welcome?.cta_text || ''}
                  onChange={(e) => handleContentChange('welcome', 'cta_text', e.target.value)}
                  placeholder="Book Now"
                />
              </div>
              
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
              
              {/* Gallery Images - 6 items as in the original home page */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2 border p-3 rounded-md">
                  <Label htmlFor={`gallery-image-${i}-url`}>Image {i+1} URL</Label>
                  <Input
                    id={`gallery-image-${i}-url`}
                    value={content.home?.gallery?.[`image${i+1}_url`] || ''}
                    onChange={(e) => handleContentChange('gallery', `image${i+1}_url`, e.target.value)}
                    placeholder="/placeholder.svg"
                  />
                  <Label htmlFor={`gallery-image-${i}-alt`}>Image {i+1} Alt Text</Label>
                  <Input
                    id={`gallery-image-${i}-alt`}
                    value={content.home?.gallery?.[`image${i+1}_alt`] || ''}
                    onChange={(e) => handleContentChange('gallery', `image${i+1}_alt`, e.target.value)}
                  />
                </div>
              ))}
              
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
              
              <div className="space-y-2">
                <Label htmlFor="thingsToDo-image">Image URL</Label>
                <Input
                  id="thingsToDo-image"
                  value={content.home?.thingsToDo?.image_url || ''}
                  onChange={(e) => handleContentChange('thingsToDo', 'image_url', e.target.value)}
                  placeholder="/placeholder.svg"
                />
              </div>
              
              {/* 7 activity items as in the original home page */}
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
              
              {/* 6 amenity items as in the original home page */}
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
                  
                  <Label htmlFor={`featuredAmenities-${i}-image`}>Amenity {i+1} Image URL</Label>
                  <Input
                    id={`featuredAmenities-${i}-image`}
                    value={content.home?.featuredAmenities?.[`amenity${i+1}_image`] || ''}
                    onChange={(e) => handleContentChange('featuredAmenities', `amenity${i+1}_image`, e.target.value)}
                    placeholder="/placeholder.svg"
                  />
                </div>
              ))}
              
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
              
              <div className="space-y-2">
                <Label htmlFor="rules-image">Image URL</Label>
                <Input
                  id="rules-image"
                  value={content.home?.rules?.image_url || ''}
                  onChange={(e) => handleContentChange('rules', 'image_url', e.target.value)}
                  placeholder="/placeholder.svg"
                />
              </div>
              
              {/* 5 rule items as in the original home page */}
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
              
              {/* 6 attraction items as in the original home page */}
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
