
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { AccommodationsProvider, useAccommodationsContext } from "@/components/admin/accommodations/AccommodationsContext";
import HeaderSection from "@/components/admin/accommodations/HeaderSection";
import AccommodationSection from "@/components/admin/accommodations/AccommodationSection";
import CTABannerSection from "@/components/admin/accommodations/CTABannerSection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Create a separate component for the content to use the context
const AccommodationsContent = () => {
  const [activeTab, setActiveTab] = useState("header");
  const { saveContent, isSaving, formData, refresh } = useAccommodationsContext();
  const [bucketChecked, setBucketChecked] = useState(false);

  // Check and create storage bucket on component mount
  useEffect(() => {
    const checkBucket = async () => {
      try {
        // Check if bucket exists
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
        
        if (bucketsError) {
          console.error("Error checking buckets:", bucketsError);
          return;
        }
        
        const bucketExists = buckets?.some(bucket => bucket.name === 'content_images');
        
        // If bucket doesn't exist, try to create it
        if (!bucketExists) {
          console.log("Content images bucket not found, attempting to create it");
          const { data, error } = await supabase.storage.createBucket('content_images', {
            public: true
          });
          
          if (error) {
            console.error("Error creating bucket:", error);
            toast({
              title: "Storage setup error",
              description: "Could not create storage bucket for images. Some features may not work correctly.",
              variant: "destructive",
            });
          } else {
            console.log("Created content_images bucket:", data);
          }
        } else {
          console.log("Content images bucket exists");
        }
        
        setBucketChecked(true);
      } catch (err) {
        console.error("Error checking/creating bucket:", err);
      }
    };
    
    checkBucket();
  }, []);

  // Save the current state when switching tabs to prevent data loss
  const handleTabChange = (newTab: string) => {
    // We're just changing tabs, no need to persist to database yet
    // This prevents data loss when switching between tabs
    setActiveTab(newTab);
  };

  // Refresh data on component mount
  useEffect(() => {
    // Force refresh from database
    const refreshData = async () => {
      try {
        await refresh();
        console.log("Refreshed accommodation data");
      } catch (err) {
        console.error("Error refreshing data:", err);
      }
    };
    
    refreshData();
  }, [refresh]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Tabs 
        defaultValue="header" 
        value={activeTab} 
        onValueChange={handleTabChange}
      >
        <div className="flex justify-between items-center mb-8">
          <TabsList>
            <TabsTrigger value="header">Header</TabsTrigger>
            <TabsTrigger value="accommodations">Accommodation Types</TabsTrigger>
            <TabsTrigger value="cta">CTA Banner</TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={saveContent}
            className="bg-rvblue hover:bg-rvblue/90 ml-auto"
            disabled={isSaving || !bucketChecked}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <TabsContent value="header" className="pt-4">
          <HeaderSection />
        </TabsContent>

        <TabsContent value="accommodations" className="pt-4">
          <AccommodationSection />
        </TabsContent>

        <TabsContent value="cta" className="pt-4">
          <CTABannerSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Main component that provides the context
const AdminAccommodations = () => {
  return (
    <AdminLayout title="Edit Accommodations">
      <AccommodationsProvider>
        <AccommodationsContent />
      </AccommodationsProvider>
    </AdminLayout>
  );
};

export default AdminAccommodations;
