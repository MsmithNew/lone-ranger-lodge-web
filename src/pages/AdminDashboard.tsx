
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Edit, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [attractionCount, setAttractionCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count, error } = await supabase
          .from('activity_images')
          .select('*', { count: 'exact', head: true });

        if (error) throw error;
        setAttractionCount(count);
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast({
          title: "Error fetching dashboard data",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const dashboardItems = [
    {
      title: "Manage Attractions",
      description: "Edit attraction images, titles, descriptions and links",
      icon: <Image className="h-8 w-8 text-rvblue" />,
      link: "/admin/attractions",
      stats: `${attractionCount ?? '...'} attractions`,
    },
    {
      title: "Site Settings",
      description: "Configure website settings and preferences",
      icon: <Settings className="h-8 w-8 text-rvolive" />,
      link: "/admin/settings",
      stats: "General settings",
    },
    {
      title: "Edit Content",
      description: "Modify text content across the website",
      icon: <Edit className="h-8 w-8 text-rvmaroon" />,
      link: "/admin/content",
      stats: "Page content",
    },
  ];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardItems.map((item, index) => (
          <Link to={item.link} key={index}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                <div className="p-2 bg-gray-100 rounded-full">{item.icon}</div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3">{item.description}</CardDescription>
                <p className="text-sm font-medium text-gray-500">
                  {isLoading ? "Loading..." : item.stats}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Help</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• To edit attraction images, go to the Attractions section</li>
              <li>• Changes are applied immediately after saving</li>
              <li>• Remember to log out when you're finished</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
