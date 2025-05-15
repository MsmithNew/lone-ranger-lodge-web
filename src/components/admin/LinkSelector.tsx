
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface Page {
  id: string;
  name: string;
  path: string;
}

interface LinkSelectorProps {
  value: string;
  linkType: string;
  onValueChange: (value: string) => void;
  onLinkTypeChange: (type: string) => void;
  label: string;
}

const LinkSelector = ({ 
  value, 
  linkType, 
  onValueChange, 
  onLinkTypeChange,
  label 
}: LinkSelectorProps) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const { data, error } = await supabase
          .from('site_pages')
          .select('*')
          .order('name');
          
        if (error) throw error;
        
        setPages(data || []);
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPages();
  }, []);
  
  const handleTypeChange = (newType: string) => {
    onLinkTypeChange(newType);
    
    // Reset value when changing types
    if (newType === 'internal' && !pages.some(p => p.path === value)) {
      onValueChange(pages.length > 0 ? pages[0].path : '');
    } else if (newType === 'external' && value.startsWith('/')) {
      onValueChange('https://');
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`link-type-${label}`}>{label} Link Type</Label>
        <Select 
          value={linkType} 
          onValueChange={handleTypeChange}
        >
          <SelectTrigger id={`link-type-${label}`}>
            <SelectValue placeholder="Select link type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="internal">Page Link</SelectItem>
            <SelectItem value="external">External URL</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {linkType === 'internal' ? (
        <div>
          <Label htmlFor={`page-select-${label}`}>Select Page</Label>
          <Select
            value={value}
            onValueChange={onValueChange}
            disabled={isLoading || pages.length === 0}
          >
            <SelectTrigger id={`page-select-${label}`}>
              <SelectValue placeholder={isLoading ? "Loading pages..." : "Select a page"} />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => (
                <SelectItem key={page.id} value={page.path}>
                  {page.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div>
          <Label htmlFor={`external-url-${label}`}>External URL</Label>
          <Input
            id={`external-url-${label}`}
            type="url"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="https://"
          />
        </div>
      )}
    </div>
  );
};

export default LinkSelector;
