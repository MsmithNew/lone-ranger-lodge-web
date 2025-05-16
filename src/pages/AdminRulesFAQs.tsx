
import React, { useState, useEffect } from "react";
import { useContent } from "@/hooks/use-content";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageUploader from "@/components/admin/ImageUploader";
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
import { v4 as uuidv4 } from 'uuid';

// Define interfaces for the FAQ data
interface ParkRule {
  id: string;
  rule: string;
}

interface RuleCategory {
  id: string;
  category: string;
  rules: ParkRule[];
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface RulesFAQsContent {
  header: {
    title: string;
    description: string;
    imageUrl: string;
  };
  parkRules: RuleCategory[];
  faqs: FAQ[];
  importantNote: string;
}

// Default content for fallback
const defaultContent: RulesFAQsContent = {
  header: {
    title: "Rules & FAQs",
    description: "Our park guidelines and answers to commonly asked questions to help you plan your stay.",
    imageUrl: "/placeholder.svg"
  },
  parkRules: [
    {
      id: uuidv4(),
      category: "General Rules",
      rules: [
        { id: uuidv4(), rule: "Quiet hours are from 10:00 PM to 7:00 AM. Please be considerate of your neighbors." },
        { id: uuidv4(), rule: "Speed limit throughout the park is 5 mph. Watch for children and pets!" },
        { id: uuidv4(), rule: "Check-in time is 3:00 PM. Check-out time is 11:00 AM." },
        { id: uuidv4(), rule: "All visitors must register at the office. Guest fees may apply." },
        { id: uuidv4(), rule: "Smoking is not permitted in any buildings, cabins, or rental units." },
        { id: uuidv4(), rule: "Alcoholic beverages are permitted at your site only. No alcohol in public areas." }
      ]
    },
    {
      id: uuidv4(),
      category: "RV & Camping Rules",
      rules: [
        { id: uuidv4(), rule: "One RV and one vehicle per site unless otherwise approved." },
        { id: uuidv4(), rule: "Please place all trash in designated dumpsters." },
        { id: uuidv4(), rule: "Campfires are allowed in fire rings only and must never be left unattended." },
        { id: uuidv4(), rule: "No washing of RVs or vehicles in the park." },
        { id: uuidv4(), rule: "Electric heaters are not permitted when using 30 amp service." },
        { id: uuidv4(), rule: "Clotheslines are not permitted." }
      ]
    },
    {
      id: uuidv4(),
      category: "Pet Rules",
      rules: [
        { id: uuidv4(), rule: "Pets must be kept on a leash at all times when outside your RV or cabin." },
        { id: uuidv4(), rule: "Pet owners must clean up after their pets immediately." },
        { id: uuidv4(), rule: "Pets cannot be left unattended outside at any time." },
        { id: uuidv4(), rule: "Excessive barking will not be tolerated." },
        { id: uuidv4(), rule: "Maximum of 2 pets per site." },
        { id: uuidv4(), rule: "Pets are not allowed in the pool area, playground, or community buildings (except service animals)." }
      ]
    },
    {
      id: uuidv4(),
      category: "Facility & Amenity Rules",
      rules: [
        { id: uuidv4(), rule: "Children under 14 must be supervised by an adult in all amenity areas." },
        { id: uuidv4(), rule: "No glass containers allowed in pool area or other public spaces." },
        { id: uuidv4(), rule: "The swimming pool is open from 10:00 AM to dusk, weather permitting." },
        { id: uuidv4(), rule: "Use of the pool, playground, and other amenities is at your own risk." },
        { id: uuidv4(), rule: "Please report any facility issues to the office promptly." },
        { id: uuidv4(), rule: "Management reserves the right to refuse service to anyone and to evict without refund any person who creates a disturbance." }
      ]
    }
  ],
  faqs: [
    {
      id: uuidv4(),
      question: "What is your cancellation policy?",
      answer: "Cancellations made 7 or more days prior to arrival receive a full refund minus a $20 processing fee. Cancellations within 7 days of arrival will be charged one night's fee. No-shows will be charged for the entire reservation."
    },
    {
      id: uuidv4(),
      question: "Do you allow pets?",
      answer: "Yes, we are a pet-friendly campground. We allow up to 2 pets per site. Pets must be kept on a leash at all times when outside your RV or cabin. There is a pet fee of $10 per pet per night for cabin stays. Please see our pet rules for more details."
    },
    {
      id: uuidv4(),
      question: "Do all RV sites have full hookups?",
      answer: "Yes, all of our RV sites offer full hookups including water, sewer, and electric (30/50 amp). Our premium sites also include cable TV connections."
    },
    {
      id: uuidv4(),
      question: "What amenities are included with my stay?",
      answer: "All guests have access to our swimming pool, bathhouses, laundry facilities, WiFi, community fire pit, playground, and nature trails. Some activities may have additional fees."
    },
    {
      id: uuidv4(),
      question: "Can I have visitors during my stay?",
      answer: "Yes, visitors are welcome but must register at the office upon arrival. Day visitors must leave by 10:00 PM. There may be a visitor fee depending on amenity usage."
    }
  ],
  importantNote: "These rules are in place to ensure the safety and enjoyment of all our guests. Failure to comply may result in being asked to leave without refund. We appreciate your cooperation and hope you have a wonderful stay!"
};

const AdminRulesFAQs = () => {
  const { content, isLoading, error, refresh } = useContent<{ [key: string]: any }>({
    page: "rules-faqs",
    fallbackData: {}, // Empty fallback as we'll construct our own default state
  });

  const [formData, setFormData] = useState<RulesFAQsContent>(defaultContent);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);

  // Initialize form data from Supabase content or use defaults
  useEffect(() => {
    if (!isLoading && content) {
      try {
        let newFormData = { ...defaultContent };

        // Process header data
        if (content.header) {
          newFormData.header = {
            title: content.header.title || defaultContent.header.title,
            description: content.header.description || defaultContent.header.description,
            imageUrl: content.header.imageUrl || defaultContent.header.imageUrl
          };
        }

        // Process park rules
        if (content.parkRules) {
          try {
            const parsedRules = typeof content.parkRules === 'string' 
              ? JSON.parse(content.parkRules) 
              : content.parkRules;
            
            // Ensure each rule has an ID
            const rulesWithIds = parsedRules.map((category: any) => ({
              ...category,
              id: category.id || uuidv4(),
              rules: (category.rules || []).map((rule: any) => ({
                ...rule,
                id: rule.id || uuidv4()
              }))
            }));
            
            newFormData.parkRules = rulesWithIds;
          } catch (e) {
            console.error("Error parsing park rules:", e);
          }
        }

        // Process FAQs
        if (content.faqs) {
          try {
            const parsedFAQs = typeof content.faqs === 'string'
              ? JSON.parse(content.faqs)
              : content.faqs;
            
            // Ensure each FAQ has an ID
            const faqsWithIds = parsedFAQs.map((faq: any) => ({
              ...faq,
              id: faq.id || uuidv4()
            }));
            
            newFormData.faqs = faqsWithIds;
          } catch (e) {
            console.error("Error parsing FAQs:", e);
          }
        }

        // Process important note
        if (content.importantNote) {
          newFormData.importantNote = content.importantNote;
        }

        setFormData(newFormData);
      } catch (e) {
        console.error("Error loading content:", e);
        toast({
          title: "Error loading content",
          description: "There was an error loading the page content. Default values will be used.",
          variant: "destructive",
        });
      }
    }
  }, [content, isLoading]);

  // Handle changes to the header section
  const handleHeaderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        [name]: value,
      },
    }));
  };

  // Handle changes to the image
  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        imageUrl,
      },
    }));
  };

  // Handle changes to the important note
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      importantNote: e.target.value,
    }));
  };

  // Add a new rule category
  const addRuleCategory = () => {
    const newCategory = {
      id: uuidv4(),
      category: "New Category",
      rules: [{ id: uuidv4(), rule: "New rule" }],
    };

    setFormData((prev) => ({
      ...prev,
      parkRules: [...prev.parkRules, newCategory],
    }));

    // Expand the new category
    setExpandedCategories((prev) => [...prev, newCategory.id]);
  };

  // Remove a rule category
  const removeRuleCategory = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      parkRules: prev.parkRules.filter((category) => category.id !== categoryId),
    }));
  };

  // Handle changes to a rule category name
  const handleCategoryNameChange = (
    categoryId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      parkRules: prev.parkRules.map((category) =>
        category.id === categoryId
          ? { ...category, category: e.target.value }
          : category
      ),
    }));
  };

  // Add a new rule to a category
  const addRule = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      parkRules: prev.parkRules.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              rules: [
                ...category.rules,
                { id: uuidv4(), rule: "New rule" },
              ],
            }
          : category
      ),
    }));
  };

  // Remove a rule from a category
  const removeRule = (categoryId: string, ruleId: string) => {
    setFormData((prev) => ({
      ...prev,
      parkRules: prev.parkRules.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              rules: category.rules.filter((rule) => rule.id !== ruleId),
            }
          : category
      ),
    }));
  };

  // Handle changes to a rule
  const handleRuleChange = (
    categoryId: string,
    ruleId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      parkRules: prev.parkRules.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              rules: category.rules.map((rule) =>
                rule.id === ruleId
                  ? { ...rule, rule: e.target.value }
                  : rule
              ),
            }
          : category
      ),
    }));
  };

  // Add a new FAQ
  const addFAQ = () => {
    const newFAQ = {
      id: uuidv4(),
      question: "New Question",
      answer: "New Answer",
    };

    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, newFAQ],
    }));

    // Expand the new FAQ
    setExpandedFAQs((prev) => [...prev, newFAQ.id]);
  };

  // Remove an FAQ
  const removeFAQ = (faqId: string) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((faq) => faq.id !== faqId),
    }));
  };

  // Handle changes to an FAQ question
  const handleFAQQuestionChange = (
    faqId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq) =>
        faq.id === faqId
          ? { ...faq, question: e.target.value }
          : faq
      ),
    }));
  };

  // Handle changes to an FAQ answer
  const handleFAQAnswerChange = (
    faqId: string,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq) =>
        faq.id === faqId
          ? { ...faq, answer: e.target.value }
          : faq
      ),
    }));
  };

  // Save all content to Supabase
  const saveContent = async () => {
    setIsSaving(true);
    try {
      // Prepare data for saving - convert complex objects to JSON strings
      const dataToSave = [
        {
          page: "rules-faqs",
          section: "header",
          content_key: "title",
          content_value: formData.header.title,
          content_type: "text"
        },
        {
          page: "rules-faqs",
          section: "header",
          content_key: "description",
          content_value: formData.header.description,
          content_type: "text"
        },
        {
          page: "rules-faqs",
          section: "header",
          content_key: "imageUrl",
          content_value: formData.header.imageUrl,
          content_type: "text"
        },
        {
          page: "rules-faqs",
          section: "parkRules",
          content_key: "parkRules",
          content_value: JSON.stringify(formData.parkRules),
          content_type: "json"
        },
        {
          page: "rules-faqs",
          section: "faqs",
          content_key: "faqs",
          content_value: JSON.stringify(formData.faqs),
          content_type: "json"
        },
        {
          page: "rules-faqs",
          section: "importantNote",
          content_key: "importantNote",
          content_value: formData.importantNote,
          content_type: "text"
        }
      ];

      // First, delete existing content for this page
      await supabase
        .from("page_content")
        .delete()
        .match({ page: "rules-faqs" });

      // Then insert the new content
      const { error } = await supabase
        .from("page_content")
        .insert(dataToSave);

      if (error) throw error;

      toast({
        title: "Content saved",
        description: "The Rules & FAQs content has been updated.",
      });

      // Refresh content data
      refresh();
    } catch (error: any) {
      console.error("Error saving content:", error);
      toast({
        title: "Error saving content",
        description: error.message || "There was an error saving the content.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout title="Manage Rules & FAQs">
      {isLoading ? (
        <div className="flex h-40 w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading the content. {error.message}
          </AlertDescription>
        </Alert>
      ) : (
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
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.header.title}
                    onChange={handleHeaderChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Page Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.header.description}
                    onChange={handleHeaderChange}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <ImageUploader
                  currentImageUrl={formData.header.imageUrl}
                  onImageUploaded={handleImageChange}
                  label="Header Background Image"
                  bucket="content_images"
                  folder="headers"
                />
              </AccordionContent>
            </AccordionItem>

            {/* Park Rules Section */}
            <AccordionItem value="rules" className="border rounded-lg p-2">
              <AccordionTrigger className="px-4">Park Rules</AccordionTrigger>
              <AccordionContent className="px-4 pt-4 pb-2">
                <div className="space-y-6">
                  {formData.parkRules.map((category, categoryIndex) => (
                    <div
                      key={category.id}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex-1 mr-4">
                          <Label htmlFor={`category-${category.id}`}>
                            Category Name
                          </Label>
                          <Input
                            id={`category-${category.id}`}
                            value={category.category}
                            onChange={(e) => handleCategoryNameChange(category.id, e)}
                            className="mt-1"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeRuleCategory(category.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove Category</span>
                        </Button>
                      </div>

                      <div className="space-y-2 pl-2">
                        <Label>Rules</Label>
                        {category.rules.map((rule, ruleIndex) => (
                          <div key={rule.id} className="flex items-center">
                            <Input
                              value={rule.rule}
                              onChange={(e) => handleRuleChange(category.id, rule.id, e)}
                              className="flex-1 mr-2"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeRule(category.id, rule.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove Rule</span>
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addRule(category.id)}
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Rule
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" onClick={addRuleCategory}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Category
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* FAQs Section */}
            <AccordionItem value="faqs" className="border rounded-lg p-2">
              <AccordionTrigger className="px-4">Frequently Asked Questions</AccordionTrigger>
              <AccordionContent className="px-4 pt-4 pb-2">
                <div className="space-y-6">
                  {formData.faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex-1 mr-4">
                          <Label htmlFor={`question-${faq.id}`}>Question</Label>
                          <Input
                            id={`question-${faq.id}`}
                            value={faq.question}
                            onChange={(e) => handleFAQQuestionChange(faq.id, e)}
                            className="mt-1"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFAQ(faq.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove FAQ</span>
                        </Button>
                      </div>

                      <div>
                        <Label htmlFor={`answer-${faq.id}`}>Answer</Label>
                        <Textarea
                          id={`answer-${faq.id}`}
                          value={faq.answer}
                          onChange={(e) => handleFAQAnswerChange(faq.id, e)}
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" onClick={addFAQ}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add FAQ
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Important Note Section */}
            <AccordionItem value="note" className="border rounded-lg p-2">
              <AccordionTrigger className="px-4">Important Note</AccordionTrigger>
              <AccordionContent className="px-4 pt-4 pb-2">
                <div>
                  <Label htmlFor="importantNote">Note Text</Label>
                  <Textarea
                    id="importantNote"
                    value={formData.importantNote}
                    onChange={handleNoteChange}
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminRulesFAQs;
