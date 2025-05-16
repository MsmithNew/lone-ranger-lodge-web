import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
  maxRetries = 3,
  retryDelay = 1000,
}: ContentOptions): {
  content: T;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
} {
  const [content, setContent] = useState<T>(fallbackData as T);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('page_content')
        .select('*')
        .eq('page', page);
      
      if (section) {
        query = query.eq('section', section);
      }
      
      const { data, error } = await query.order('display_order', { ascending: true });

      if (error) throw new Error(error.message);

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
        setContent({ ...fallbackData, ...transformedData } as T);
      } else {
        // If no data, use the fallback
        setContent(fallbackData as T);
      }
      setError(null);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error("Error fetching content:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      
      // Implement retry logic
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchContent();
        }, retryDelay * (retryCount + 1)); // Exponential backoff
      } else {
        // After all retries failed, show toast and use fallback data
        toast({
          title: "Content loading issue",
          description: "Failed to load content after multiple attempts. Using default content.",
          variant: "destructive",
        });
        
        // Still use fallback data after all retries
        setContent(fallbackData as T);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, section]);

  // Reset retry count when page or section changes
  useEffect(() => {
    setRetryCount(0);
  }, [page, section]);

  return { content, isLoading, error, refresh: fetchContent };
}
