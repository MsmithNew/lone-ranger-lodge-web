
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Manage homepage content and settings.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Update about page content and images.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attractions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Manage attraction images and content.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rules & FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Update park rules and frequently asked questions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Configure site settings and preferences.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
