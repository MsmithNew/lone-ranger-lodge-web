
import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { AccommodationsProvider, useAccommodationsContext } from "@/components/admin/accommodations/AccommodationsContext";
import HeaderSection from "@/components/admin/accommodations/HeaderSection";
import AccommodationSection from "@/components/admin/accommodations/AccommodationSection";
import CTABannerSection from "@/components/admin/accommodations/CTABannerSection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, RefreshCcw, Wifi, WifiOff } from "lucide-react";

// Create a separate component for the content to use the context
const AccommodationsContent = () => {
  const [activeTab, setActiveTab] = useState("header");
  const { saveContent, isSaving, refresh } = useAccommodationsContext();
  const [isLoading, setIsLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [lastOnlineCheck, setLastOnlineCheck] = useState<Date>(new Date());
  const [isRetrying, setIsRetrying] = useState(false);

  // Enhanced network connectivity check
  const checkConnection = useCallback(async () => {
    try {
      setIsRetrying(true);
      console.log("Checking database connection...");
      
      // Simple ping to check connection - list storage buckets is lightweight
      const { error } = await supabase.storage.getBucket('content_images');
      
      if (error) {
        console.error("Storage connection error:", error);
        setNetworkError(true);
        
        toast({
          title: "Connection issue",
          description: "There are network connectivity issues with the database. You may not be able to save changes or upload images.",
          variant: "destructive",
        });
      } else {
        if (networkError) {
          // If we're recovering from an error state, show a success toast
          toast({
            title: "Connection restored",
            description: "Database connection has been restored. You can now save changes.",
          });
        }
        setNetworkError(false);
      }
      
      setLastOnlineCheck(new Date());
    } catch (err) {
      console.error("Network error during connectivity check:", err);
      setNetworkError(true);
      
      toast({
        title: "Network error",
        description: "Failed to connect to the database. Please check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsRetrying(false);
      setIsLoading(false);
    }
  }, [networkError]);
  
  // Check network on component mount and setup periodic checks
  useEffect(() => {
    checkConnection();
    
    // Set up periodic connection checks (every 30 seconds)
    const intervalId = setInterval(() => {
      checkConnection();
    }, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [checkConnection]);

  // Save the current state when switching tabs to prevent data loss
  const handleTabChange = (newTab: string) => {
    // We're just changing tabs, no need to persist to database yet
    setActiveTab(newTab);
  };

  // Handle manual retry
  const handleRetryConnection = () => {
    checkConnection();
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
        setNetworkError(true);
        
        toast({
          title: "Data refresh failed",
          description: "Unable to load the latest content. You may be working with outdated information.",
          variant: "destructive",
        });
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
      {networkError && (
        <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-md">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-red-800">Network Connectivity Issues</h3>
              <p className="text-sm text-red-700 mb-2">
                There are problems connecting to the database. You can still make changes, but they may not be saved.
                Try refreshing the page or checking your internet connection.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-red-600">
                  Last check: {lastOnlineCheck.toLocaleTimeString()}
                </div>
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
          
          <div className="flex items-center space-x-2">
            {!networkError ? (
              <div className="text-xs text-green-600 flex items-center mr-2">
                <Wifi className="h-3 w-3 mr-1" />
                Connected
              </div>
            ) : (
              <div className="text-xs text-red-600 flex items-center mr-2">
                <WifiOff className="h-3 w-3 mr-1" />
                Offline
              </div>
            )}
            <Button 
              onClick={saveContent}
              className="bg-rvblue hover:bg-rvblue/90"
              disabled={isSaving || isLoading}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
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
