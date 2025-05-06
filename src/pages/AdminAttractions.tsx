
import { useState, useEffect, useRef, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Edit, Trash, Upload, Save, Plus, Search, MoveVertical } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Attraction {
  id: number;
  key: string;
  image_url: string;
  title?: string | null;
  description?: string | null;
  learnMore?: string | null;
  category: string;
  display_order: number | null;
}

const CATEGORY_LABELS: Record<string, string> = {
  'outdoor': 'Outdoor Activities',
  'family': 'Family Fun',
  'culture': 'Arts & Culture',
  'recommendations': 'Front Desk Recommendations'
};

const AdminAttractions = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAttraction, setEditingAttraction] = useState<Attraction | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newAttraction, setNewAttraction] = useState<Omit<Attraction, "id" | "display_order">>({
    key: "",
    image_url: "",
    title: "",
    description: "",
    learnMore: "",
    category: "outdoor",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAttractions();
  }, []);

  const fetchAttractions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('activity_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      // Enrich with title and description if available
      const enrichedData = data.map(item => ({
        ...item,
        title: item.title || extractTitleFromKey(item.key),
        description: item.description || "",
        learnMore: item.learnMore || "",
      }));
      
      setAttractions(enrichedData);
    } catch (error) {
      console.error('Error fetching attractions:', error);
      toast({
        title: "Error loading attractions",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const extractTitleFromKey = (key: string) => {
    // Convert key like "hiking-trail" to "Hiking Trail"
    return key
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getFilteredAttractions = () => {
    let filtered = attractions;
    
    // First filter by search term if any
    if (searchTerm) {
      filtered = filtered.filter(attraction => 
        attraction.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.key.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Then filter by active tab/category if not "all"
    if (activeTab !== "all") {
      filtered = filtered.filter(attraction => attraction.category === activeTab);
    }
    
    return filtered;
  };

  const handleEditClick = (attraction: Attraction) => {
    setEditingAttraction(attraction);
    setIsDialogOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingAttraction(null);
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingAttraction) {
      setEditingAttraction({
        ...editingAttraction,
        [e.target.name]: e.target.value,
      });
    } else if (isCreatingNew) {
      setNewAttraction({
        ...newAttraction,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCategoryChange = (value: string) => {
    if (editingAttraction) {
      setEditingAttraction({
        ...editingAttraction,
        category: value,
      });
    } else if (isCreatingNew) {
      setNewAttraction({
        ...newAttraction,
        category: value,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (!editingAttraction) return;
    
    try {
      // Generate a new key if it doesn't exist or has been changed substantially
      let keyToUse = editingAttraction.key;
      if (!keyToUse || keyToUse.trim() === "") {
        keyToUse = editingAttraction.title!.toLowerCase().replace(/\s+/g, '-');
      }

      const { error } = await supabase
        .from('activity_images')
        .update({ 
          key: keyToUse,
          image_url: editingAttraction.image_url,
          category: editingAttraction.category,
          title: editingAttraction.title,
          description: editingAttraction.description,
          learnMore: editingAttraction.learnMore,
        })
        .eq('id', editingAttraction.id);

      if (error) throw error;
      
      toast({
        title: "Changes saved",
        description: `${editingAttraction.title} has been updated`,
      });
      
      fetchAttractions(); // Refresh the data
      setIsDialogOpen(false);
      setEditingAttraction(null);
    } catch (error) {
      console.error('Error updating attraction:', error);
      toast({
        title: "Error saving changes",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleCreateNew = async () => {
    try {
      // Generate a key from the title if not provided
      let keyToUse = newAttraction.key;
      if (!keyToUse || keyToUse.trim() === "") {
        keyToUse = newAttraction.title!.toLowerCase().replace(/\s+/g, '-');
      }

      // Find the highest display_order for the selected category
      const maxOrderAttraction = attractions
        .filter(a => a.category === newAttraction.category)
        .sort((a, b) => b.display_order - a.display_order)[0];
      
      const newDisplayOrder = maxOrderAttraction ? maxOrderAttraction.display_order + 1 : 0;
      
      const { data, error } = await supabase
        .from('activity_images')
        .insert({ 
          key: keyToUse,
          image_url: newAttraction.image_url || "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
          category: newAttraction.category,
          title: newAttraction.title,
          description: newAttraction.description,
          learnMore: newAttraction.learnMore,
          display_order: newDisplayOrder
        })
        .select();

      if (error) throw error;
      
      toast({
        title: "Attraction created",
        description: `${newAttraction.title} has been added`,
      });
      
      fetchAttractions(); // Refresh the data
      setIsDialogOpen(false);
      setIsCreatingNew(false);
      setNewAttraction({
        key: "",
        image_url: "",
        title: "",
        description: "",
        learnMore: "",
        category: "outdoor",
      });
    } catch (error) {
      console.error('Error creating attraction:', error);
      toast({
        title: "Error creating attraction",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAttraction = async (attraction: Attraction) => {
    if (window.confirm(`Are you sure you want to delete "${attraction.title}"?`)) {
      try {
        const { error } = await supabase
          .from('activity_images')
          .delete()
          .eq('id', attraction.id);

        if (error) throw error;

        toast({
          title: "Attraction deleted",
          description: `${attraction.title} has been removed`,
        });

        fetchAttractions(); // Refresh the data
      } catch (error) {
        console.error('Error deleting attraction:', error);
        toast({
          title: "Error deleting attraction",
          description: "Please try again",
          variant: "destructive",
        });
      }
    }
  };

  const handleMoveAttraction = async (attraction: Attraction, direction: 'up' | 'down') => {
    // Find nearby attractions of the same category
    const sameCategory = attractions
      .filter(a => a.category === attraction.category)
      .sort((a, b) => a.display_order - b.display_order);
    
    const currentIndex = sameCategory.findIndex(a => a.id === attraction.id);
    if (currentIndex === -1) return;
    
    let targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Check if target index is valid
    if (targetIndex < 0 || targetIndex >= sameCategory.length) return;
    
    const targetAttraction = sameCategory[targetIndex];
    
    try {
      // Swap display_order values
      const currentOrder = attraction.display_order;
      const targetOrder = targetAttraction.display_order;
      
      // Update the current attraction
      const { error: error1 } = await supabase
        .from('activity_images')
        .update({ display_order: targetOrder })
        .eq('id', attraction.id);
      
      if (error1) throw error1;
      
      // Update the target attraction
      const { error: error2 } = await supabase
        .from('activity_images')
        .update({ display_order: currentOrder })
        .eq('id', targetAttraction.id);
      
      if (error2) throw error2;
      
      fetchAttractions(); // Refresh data
    } catch (error) {
      console.error('Error reordering attractions:', error);
      toast({
        title: "Error moving attraction",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleOpenCreateModal = () => {
    setIsCreatingNew(true);
    setIsDialogOpen(true);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(editingAttraction || isCreatingNew)) return;
    
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image should be less than 2MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const key = editingAttraction ? editingAttraction.key : (newAttraction.key || Date.now().toString());
      
      // Upload the file to Supabase Storage
      const fileName = `${key}-${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('activity_images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('activity_images')
        .getPublicUrl(fileName);

      if (!publicUrlData.publicUrl) throw new Error("Failed to get public URL");

      // Update the state
      if (editingAttraction) {
        setEditingAttraction({
          ...editingAttraction,
          image_url: publicUrlData.publicUrl
        });
      } else {
        setNewAttraction({
          ...newAttraction,
          image_url: publicUrlData.publicUrl
        });
      }
      
      toast({
        title: "Image uploaded",
        description: "The new image has been uploaded.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const renderAttractionDialog = () => {
    const currentItem = editingAttraction || newAttraction;
    const isEdit = !!editingAttraction;
    
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? `Edit Attraction: ${editingAttraction?.title}` : 'Create New Attraction'}
            </DialogTitle>
            <DialogDescription>
              {isEdit 
                ? "Make changes to the attraction details" 
                : "Add a new attraction to the specified category"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* Category selector */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={currentItem.category} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outdoor">Outdoor Activities</SelectItem>
                  <SelectItem value="family">Family Fun</SelectItem>
                  <SelectItem value="culture">Arts & Culture</SelectItem>
                  <SelectItem value="recommendations">Front Desk Recommendations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Image upload */}
            <div className="space-y-2">
              <Label>Attraction Image</Label>
              <div className="relative">
                <div 
                  className="h-48 border rounded-md overflow-hidden cursor-pointer bg-gray-50 flex items-center justify-center"
                  onClick={handleImageClick}
                >
                  {currentItem.image_url ? (
                    <img 
                      src={currentItem.image_url} 
                      alt={currentItem.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                      <Upload className="h-8 w-8 mb-2" />
                      <span>Click to select an image</span>
                    </div>
                  )}
                  
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="loading-spinner mb-2"></div>
                        <span>Uploading...</span>
                      </div>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            
            {/* Title field */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                name="title"
                value={currentItem.title || ''}
                onChange={handleInputChange}
                placeholder="Enter attraction title"
                required
              />
            </div>
            
            {/* Key field (optional, for advanced users) */}
            <div className="space-y-2">
              <Label htmlFor="key" className="flex justify-between">
                <span>URL Key</span>
                <span className="text-xs text-gray-500">(Optional - auto-generated from title)</span>
              </Label>
              <Input 
                id="key"
                name="key"
                value={currentItem.key || ''}
                onChange={handleInputChange}
                placeholder="Example: palo-pinto-mountains"
              />
            </div>
            
            {/* Description field */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={currentItem.description || ''}
                onChange={handleInputChange}
                placeholder="Enter a brief description of the attraction"
                rows={3}
              />
            </div>
            
            {/* Learn More URL field */}
            <div className="space-y-2">
              <Label htmlFor="learnMore">Learn More URL</Label>
              <Input 
                id="learnMore"
                name="learnMore"
                value={currentItem.learnMore || ''}
                onChange={handleInputChange}
                placeholder="https://example.com/more-info"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDialogOpen(false);
                setEditingAttraction(null);
                setIsCreatingNew(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={isEdit ? handleSaveChanges : handleCreateNew}
              className="bg-rvblue hover:bg-rvblue/90"
            >
              <Save className="h-4 w-4 mr-2" /> {isEdit ? 'Save Changes' : 'Create Attraction'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const filteredAttractions = getFilteredAttractions();

  return (
    <AdminLayout title="Manage Attractions">
      <div className="space-y-6">
        {/* Tabs for category filtering */}
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="culture">Arts & Culture</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Search and add new */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search attractions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleOpenCreateModal}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>

        {/* Attractions List */}
        {isLoading ? (
          <Card>
            <CardContent className="pt-6 text-center">
              Loading attractions...
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "all" 
                  ? "All Attractions" 
                  : CATEGORY_LABELS[activeTab] || "Attractions"}
              </CardTitle>
              <CardDescription>
                Manage attractions by category - {filteredAttractions.length} items found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttractions.map((attraction) => (
                    <TableRow key={attraction.id}>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-8 w-8"
                            onClick={() => handleMoveAttraction(attraction, 'up')}
                            title="Move up"
                          >
                            <MoveVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="h-12 w-16 overflow-hidden rounded">
                          <img 
                            src={attraction.image_url} 
                            alt={attraction.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{attraction.title}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100">
                          {CATEGORY_LABELS[attraction.category] || attraction.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditClick(attraction)}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteAttraction(attraction)}
                          >
                            <Trash className="h-4 w-4 mr-1" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredAttractions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                        No attractions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        
        {/* Edit/Add Dialog */}
        {renderAttractionDialog()}
      </div>
    </AdminLayout>
  );
};

export default AdminAttractions;
