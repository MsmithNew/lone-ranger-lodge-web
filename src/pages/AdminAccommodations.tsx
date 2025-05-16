
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { AccommodationsProvider } from "@/components/admin/accommodations/AccommodationsContext";
import HeaderSection from "@/components/admin/accommodations/HeaderSection";
import AccommodationSection from "@/components/admin/accommodations/AccommodationSection";
import CTABannerSection from "@/components/admin/accommodations/CTABannerSection";

const AdminAccommodations = () => {
  const [activeTab, setActiveTab] = useState("header");

  return (
    <AdminLayout title="Edit Accommodations">
      <AccommodationsProvider>
        <div className="bg-white rounded-lg shadow p-6">
          <Tabs defaultValue="header" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-8">
              <TabsList>
                <TabsTrigger value="header">Header</TabsTrigger>
                <TabsTrigger value="accommodations">Accommodation Types</TabsTrigger>
                <TabsTrigger value="cta">CTA Banner</TabsTrigger>
              </TabsList>
              
              <Button 
                onClick={() => {
                  // This button will be handled by the context's saveContent function
                  // which is accessed in the child components
                }}
                className="bg-rvblue hover:bg-rvblue/90 ml-auto"
              >
                Save Changes
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
      </AccommodationsProvider>
    </AdminLayout>
  );
};

export default AdminAccommodations;
