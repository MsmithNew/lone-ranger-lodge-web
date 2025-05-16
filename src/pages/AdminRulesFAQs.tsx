
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { AlertCircle, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";

// Import our context provider and component sections
import { RulesFAQsProvider, useRulesFAQsContext } from "@/components/admin/rules-faqs/RulesFAQsContext";
import HeaderSection from "@/components/admin/rules-faqs/HeaderSection";
import ParkRulesSection from "@/components/admin/rules-faqs/ParkRulesSection";
import FAQsSection from "@/components/admin/rules-faqs/FAQsSection";
import ImportantNoteSection from "@/components/admin/rules-faqs/ImportantNoteSection";

// Main content component that uses context
const RulesFAQsContent: React.FC = () => {
  const { isLoading, error, isSaving, saveContent } = useRulesFAQsContext();

  if (isLoading) {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error loading the content. {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={saveContent} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full" defaultValue="header">
        {/* Header Section */}
        <AccordionItem value="header" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4">Header Information</AccordionTrigger>
          <AccordionContent className="px-4 pt-4 pb-2 space-y-4">
            <HeaderSection />
          </AccordionContent>
        </AccordionItem>

        {/* Park Rules Section */}
        <AccordionItem value="rules" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4">Park Rules</AccordionTrigger>
          <AccordionContent className="px-4 pt-4 pb-2">
            <ParkRulesSection />
          </AccordionContent>
        </AccordionItem>

        {/* FAQs Section */}
        <AccordionItem value="faqs" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4">Frequently Asked Questions</AccordionTrigger>
          <AccordionContent className="px-4 pt-4 pb-2">
            <FAQsSection />
          </AccordionContent>
        </AccordionItem>

        {/* Important Note Section */}
        <AccordionItem value="note" className="border rounded-lg p-2">
          <AccordionTrigger className="px-4">Important Note</AccordionTrigger>
          <AccordionContent className="px-4 pt-4 pb-2">
            <ImportantNoteSection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// Main page component with context provider wrapper
const AdminRulesFAQs: React.FC = () => {
  return (
    <AdminLayout title="Manage Rules & FAQs">
      <RulesFAQsProvider>
        <RulesFAQsContent />
      </RulesFAQsProvider>
    </AdminLayout>
  );
};

export default AdminRulesFAQs;
