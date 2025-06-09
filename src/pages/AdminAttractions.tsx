
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminAttractions = () => {
  return (
    <AdminLayout title="Attractions Management">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Attractions Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Attractions management has been simplified. The page now uses static content.
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

export default AdminAttractions;
