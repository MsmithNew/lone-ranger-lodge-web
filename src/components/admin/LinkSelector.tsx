
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

// Static pages data since we removed Supabase
const staticPages: Page[] = [
  { id: "1", name: "Home", path: "/" },
  { id: "2", name: "About", path: "/about" },
  { id: "3", name: "Accommodations", path: "/accommodations" },
  { id: "4", name: "Amenities", path: "/amenities" },
  { id: "5", name: "Activities", path: "/activities" },
  { id: "6", name: "Rules & FAQs", path: "/rules-faqs" },
  { id: "7", name: "Reservations", path: "/reservations" },
  { id: "8", name: "Contact", path: "/contact" },
];

const LinkSelector = ({ 
  value, 
  linkType, 
  onValueChange, 
  onLinkTypeChange,
  label 
}: LinkSelectorProps) => {
  const [pages] = useState<Page[]>(staticPages);
  
  const handleTypeChange = (newType: string) => {
    onLinkTypeChange(newType);
    
    // Reset value when changing types
    if (newType === 'internal' && pages.length > 0) {
      // Only set a default if no valid path is currently selected
      if (!value || !pages.some(p => p.path === value)) {
        onValueChange(pages[0].path);
      }
    } else if (newType === 'external' && (!value || value.startsWith('/'))) {
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
          >
            <SelectTrigger id={`page-select-${label}`}>
              <SelectValue placeholder="Select a page" />
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
