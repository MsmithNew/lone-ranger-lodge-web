
import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { AccommodationsProvider, useAccommodationsContext } from "@/components/admin/accommodations/AccommodationsContext";
import HeaderSection from "@/components/admin/accommodations/HeaderSection";
import AccommodationSection from "@/components/admin/accommodations/AccommodationSection";
import CTABannerSection from "@/components/admin/accommodations/CTABannerSection";
import { supabase, checkSupabaseConnection } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, RefreshCcw } from "lucide-react";

// Create a separate component for the content to use the context
const AccommodationsContent = () => {
  const [activeTab, setActiveTab] = useState("header");
  const { saveContent, isSaving, refresh } = useAccommodationsContext();
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  // Basic connection check - simplified
  const checkConnection = useCallback(async () => {
    try {
      setIsRetrying(true);
      
      const isConnected = await checkSupabaseConnection();
      
      if (!isConnected) {
        setConnectionError("Network connectivity issues detected. Please check your internet connection.");
        
        toast({
          title: "Connection issue",
          description: "There are network connectivity issues. Some features may not work correctly.",
          variant: "destructive",
        });
      } else {
        if (connectionError) {
          toast({
            title: "Connection restored",
            description: "Network connection has been restored.",
          });
        }
        setConnectionError(null);
      }
    } catch (err) {
      console.error("Error checking connection:", err);
      setConnectionError("Network error occurred.");
    } finally {
      setIsRetrying(false);
      setIsLoading(false);
    }
  }, [connectionError]);
  
  // Check network on component mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  // Handle tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  // Handle manual retry
  const handleRetryConnection = () => {
    checkConnection();
  };

  // Refresh data on component mount
  useEffect(() => {
    const refreshData = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error("Error refreshing data:", err);
        setConnectionError("Failed to load data. Please check your connection.");
      }
    };
    
    refreshData();
  }, [refresh]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center h-64">
        <div className="flex flex-col items-center text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rvblue mb-4"></div>
          <p className="text-gray-600">Loading accommodations content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {connectionError && (
        <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-md">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-red-800">Network Connectivity Issues</h3>
              <p className="text-sm text-red-700 mb-2">
                {connectionError}
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-red-300 hover:bg-red-100 text-red-700"
                onClick={handleRetryConnection}
                disabled={isRetrying}
              >
                {isRetrying ? (
                  <>
                    <RefreshCcw className="h-3 w-3 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="h-3 w-3 mr-2" />
                    Retry Connection
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      
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
            className="bg-rvblue hover:bg-rvblue/90"
            disabled={isSaving || isLoading || !!connectionError}
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
