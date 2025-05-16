
import { useEffect, useState, useCallback } from "react";
import { supabase, checkSupabaseConnection } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ContentOptions {
  page: string;
  section?: string;
  fallbackData?: Record<string, any>;
  maxRetries?: number;
  retryDelay?: number;
}

export function useContent<T extends Record<string, any>>({
  page,
  section,
  fallbackData = {},
  maxRetries = 5,
  retryDelay = 2000,
}: ContentOptions): {
  content: T;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  isOnline: boolean;
} {
  const [content, setContent] = useState<T>(fallbackData as T);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Make fetchContent a useCallback so we can use it in the refresh function
  const fetchContent = useCallback(async (forceRetry = false) => {
    if (retryCount >= maxRetries && !forceRetry) {
      console.log(`Max retries (${maxRetries}) reached, using fallback data`);
      setContent(fallbackData as T);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      console.log(`Fetching content for page: ${page}, section: ${section || 'all'} (attempt ${retryCount + 1})`);
      
      // First check connection
      const isConnected = await checkSupabaseConnection();
      setIsOnline(isConnected);
      
      if (!isConnected) {
        throw new Error("Connection to database unavailable");
      }
      
      let query = supabase
        .from('page_content')
        .select('*')
        .eq('page', page);
      
      if (section) {
        query = query.eq('section', section);
      }
      
      const { data, error } = await query.order('display_order', { ascending: true });

      if (error) throw new Error(error.message);

      console.log(`Raw data from content fetch:`, data);

      if (data && data.length > 0) {
        // Transform the data into a usable object structure
        const transformedData: Record<string, any> = {};
        
        data.forEach(item => {
          try {
            let contentValue = item.content_value;
            
            // Try to parse JSON if the content_type suggests it might be JSON
            if (item.content_type === 'json' && typeof contentValue === 'string') {
              try {
                contentValue = JSON.parse(contentValue);
              } catch (e) {
                // If parsing fails, keep the original string value
                console.warn(`Failed to parse JSON for ${item.content_key}:`, e);
              }
            }
            
            if (section) {
              // If we're fetching a specific section, flatten the structure
              transformedData[item.content_key] = contentValue;
              // Add link_type if it exists
              if (item.link_type) {
                transformedData[`${item.content_key}_link_type`] = item.link_type;
              }
            } else {
              // Otherwise, organize by section
              if (!transformedData[item.section]) {
                transformedData[item.section] = {};
              }
              transformedData[item.section][item.content_key] = contentValue;
              // Add link_type if it exists
              if (item.link_type) {
                transformedData[item.section][`${item.content_key}_link_type`] = item.link_type;
              }
            }
          } catch (itemError) {
            console.error(`Error processing item ${item.content_key}:`, itemError);
            // Continue processing other items
          }
        });
        
        // Merge with fallback data to ensure all expected fields exist
        const finalContent = { ...fallbackData, ...transformedData } as T;
        console.log("Fetched content:", finalContent);
        setContent(finalContent);
      } else {
        // If no data, use the fallback
        console.log("No data found, using fallback:", fallbackData);
        setContent(fallbackData as T);
      }
      setError(null);
      setRetryCount(0); // Reset retry count on success
      setIsOnline(true);
    } catch (err) {
      console.error("Error fetching content:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setIsOnline(false);
      
      // Only show toast on the final retry
      if (retryCount === maxRetries - 1) {
        // After all retries failed, show toast and use fallback data
        toast({
          title: "Content loading issue",
          description: "Failed to load content after multiple attempts. Using default content.",
          variant: "destructive",
        });
        
        // Still use fallback data after all retries
        setContent(fallbackData as T);
      } else {
        // Implement exponential backoff retry logic
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchContent();
        }, retryDelay * Math.pow(2, retryCount)); // Exponential backoff
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, section, fallbackData, maxRetries, retryDelay, retryCount]);

  useEffect(() => {
    fetchContent();
    
    // Set up a network status listener
    const handleNetworkChange = () => {
      const isOnline = navigator.onLine;
      setIsOnline(isOnline);
      
      if (isOnline && error) {
        // If we're back online and had an error, try to fetch again
        setRetryCount(0);
        fetchContent(true);
      }
    };
    
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    
    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, [fetchContent, error]);

  // Reset retry count when page or section changes
  useEffect(() => {
    setRetryCount(0);
  }, [page, section]);

  // Add a refresh function that can be called explicitly to force a content refresh
  const refresh = useCallback(async () => {
    console.log("Manually refreshing content");
    setRetryCount(0);
    await fetchContent(true);
  }, [fetchContent]);

  return { content, isLoading, error, refresh, isOnline };
}
