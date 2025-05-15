import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContentOptions {
  page: string;
  section?: string;
  fallbackData?: Record<string, any>;
}

export function useContent<T extends Record<string, any>>({
  page,
  section,
  fallbackData = {},
}: ContentOptions): {
  content: T;
  isLoading: boolean;
  error: Error | null;
} {
  const [content, setContent] = useState<T>(fallbackData as T);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
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
            if (section) {
              // If we're fetching a specific section, flatten the structure
              transformedData[item.content_key] = item.content_value;
            } else {
              // Otherwise, organize by section
              if (!transformedData[item.section]) {
                transformedData[item.section] = {};
              }
              transformedData[item.section][item.content_key] = item.content_value;
            }
          });
          
          // Merge with fallback data to ensure all expected fields exist
          setContent({ ...fallbackData, ...transformedData } as T);
        } else {
          // If no data, use the fallback
          setContent(fallbackData as T);
        }
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        // Still use fallback data on error
        setContent(fallbackData as T);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [page, section, fallbackData]);

  return { content, isLoading, error };
}
