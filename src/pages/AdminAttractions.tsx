
import { useState, useEffect, useRef } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { Edit, Trash, Upload, Save, Plus, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Attraction {
  id: number;
  key: string;
  image_url: string;
  title?: string;
  description?: string;
  learnMore?: string;
}

const AdminAttractions = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAttraction, setEditingAttraction] = useState<Attraction | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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
        .order('id', { ascending: true });

      if (error) throw error;
      
      // Enrich with title and description if available
      const enrichedData = data.map(item => ({
        ...item,
        title: extractTitleFromKey(item.key),
        description: "",
        learnMore: ""
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

  const filteredAttractions = attractions.filter(attraction => 
    attraction.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attraction.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (attraction: Attraction) => {
    setEditingAttraction(attraction);
  };

  const handleCancelEdit = () => {
    setEditingAttraction(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingAttraction) return;
    
    setEditingAttraction({
      ...editingAttraction,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = async () => {
    if (!editingAttraction) return;
    
    try {
      const { error } = await supabase
        .from('activity_images')
        .update({ 
          image_url: editingAttraction.image_url,
          // We're not storing title/description in the database yet,
          // but we could add columns for these in the future
        })
        .eq('key', editingAttraction.key);

      if (error) throw error;
      
      setAttractions(attractions.map(item => 
        item.key === editingAttraction.key ? editingAttraction : item
      ));
      
      toast({
        title: "Changes saved",
        description: `${editingAttraction.title} has been updated`,
      });
      
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

  const handleImageClick = () => {
    if (fileInputRef.current && editingAttraction) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingAttraction) return;
    
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
      // Upload the file to Supabase Storage
      const fileName = `${editingAttraction.key}-${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('activity_images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('activity_images')
        .getPublicUrl(fileName);

      if (!publicUrlData.publicUrl) throw new Error("Failed to get public URL");

      // Update the database with the new URL
      const { error: updateError } = await supabase
        .from('activity_images')
        .update({ image_url: publicUrlData.publicUrl })
        .eq('key', editingAttraction.key);

      if (updateError) throw updateError;

      // Update local state
      setEditingAttraction({
        ...editingAttraction,
        image_url: publicUrlData.publicUrl
      });
      
      toast({
        title: "Image updated",
        description: "The new image has been uploaded and saved.",
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

  return (
    <AdminLayout title="Manage Attractions">
      <div className="space-y-6">
        {/* Search and filter */}
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
          <Button>
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
              <CardTitle>Attractions</CardTitle>
              <CardDescription>
                Manage attraction images, titles, and descriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttractions.map((attraction) => (
                    <TableRow key={attraction.id}>
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
                      <TableCell className="text-gray-500 text-sm">{attraction.key}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditClick(attraction)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredAttractions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                        No attractions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Edit Attraction Modal/Card */}
        {editingAttraction && (
          <Card className="mt-6 border-2 border-rvblue">
            <CardHeader>
              <CardTitle>Edit Attraction</CardTitle>
              <CardDescription>
                Make changes to "{editingAttraction.title}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Image preview and upload */}
                <div>
                  <Label>Attraction Image</Label>
                  <div className="mt-2 relative">
                    <div 
                      className="h-48 border rounded-md overflow-hidden cursor-pointer bg-gray-50 flex items-center justify-center"
                      onClick={handleImageClick}
                    >
                      {editingAttraction.image_url ? (
                        <img 
                          src={editingAttraction.image_url} 
                          alt={editingAttraction.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 flex flex-col items-center">
                          <Upload className="h-8 w-8 mb-2" />
                          <span>No image selected</span>
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
                      
                      <div className="absolute inset-0 hover:bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Button variant="secondary" className="bg-white">
                          <Upload className="h-4 w-4 mr-2" /> Change Image
                        </Button>
                      </div>
                      
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
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title"
                    name="title"
                    value={editingAttraction.title || ''}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                {/* Description field */}
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={editingAttraction.description || ''}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                {/* Learn More URL field */}
                <div>
                  <Label htmlFor="learnMore">Learn More URL</Label>
                  <Input 
                    id="learnMore"
                    name="learnMore"
                    value={editingAttraction.learnMore || ''}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveChanges}
                className="bg-rvblue hover:bg-rvblue/90"
              >
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAttractions;
