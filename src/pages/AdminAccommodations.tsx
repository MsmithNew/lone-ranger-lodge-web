
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
        {(context) => {
          const { formData, isLoading, error, isSaving, saveContent } = context;
          
          return (
            <div className="bg-white rounded-lg shadow p-6">
              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <p className="ml-2 text-lg text-muted-foreground">Loading content...</p>
                </div>
              ) : error ? (
                <div className="bg-destructive/10 p-4 rounded-md">
                  <p className="text-destructive font-semibold">Error loading content</p>
                  <p className="text-sm mt-1">{error.message}</p>
                </div>
              ) : (
                <>
                  <Tabs defaultValue="header" value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex justify-between items-center mb-8">
                      <TabsList>
                        <TabsTrigger value="header">Header</TabsTrigger>
                        <TabsTrigger value="accommodations">Accommodation Types</TabsTrigger>
                        <TabsTrigger value="cta">CTA Banner</TabsTrigger>
                      </TabsList>
                      
                      <Button 
                        onClick={saveContent} 
                        disabled={isSaving}
                        className="bg-rvblue hover:bg-rvblue/90 ml-auto"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Saving...
                          </>
                        ) : "Save Changes"}
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
                </>
              )}
            </div>
          );
        }}
      </AccommodationsProvider>
    </AdminLayout>
  );
};

export default AdminAccommodations;
