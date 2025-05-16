
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { AccommodationsProvider, useAccommodationsContext } from "@/components/admin/accommodations/AccommodationsContext";
import HeaderSection from "@/components/admin/accommodations/HeaderSection";
import AccommodationSection from "@/components/admin/accommodations/AccommodationSection";
import CTABannerSection from "@/components/admin/accommodations/CTABannerSection";

// Create a separate component for the content to use the context
const AccommodationsContent = () => {
  const [activeTab, setActiveTab] = useState("header");
  const { saveContent, isSaving } = useAccommodationsContext();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Tabs defaultValue="header" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-8">
          <TabsList>
            <TabsTrigger value="header">Header</TabsTrigger>
            <TabsTrigger value="accommodations">Accommodation Types</TabsTrigger>
            <TabsTrigger value="cta">CTA Banner</TabsTrigger>
          </TabsList>
          
          <Button 
            onClick={saveContent}
            className="bg-rvblue hover:bg-rvblue/90 ml-auto"
            disabled={isSaving}
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
