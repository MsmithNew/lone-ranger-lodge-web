
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminContent = () => {
  return (
    <AdminLayout title="Content Management">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Homepage Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Content management has been simplified. The site now uses static content.
            </p>
            <Button disabled>
              Database Integration Required
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
