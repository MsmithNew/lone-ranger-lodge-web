
import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useContent } from "@/hooks/use-content";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Define interfaces for the data types
export interface ParkRule {
  id: string;
  rule: string;
}

export interface RuleCategory {
  id: string;
  category: string;
  rules: ParkRule[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface RulesFAQsContent {
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
export const defaultContent: RulesFAQsContent = {
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

// Context type
interface RulesFAQsContextType {
  formData: RulesFAQsContent;
  setFormData: React.Dispatch<React.SetStateAction<RulesFAQsContent>>;
  isLoading: boolean;
  error: Error | null;
  isSaving: boolean;
  saveContent: () => Promise<void>;
  handleHeaderChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageChange: (imageUrl: string) => void;
  handleNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  
  // Rule operations
  addRuleCategory: () => void;
  removeRuleCategory: (categoryId: string) => void;
  handleCategoryNameChange: (categoryId: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  addRule: (categoryId: string) => void;
  removeRule: (categoryId: string, ruleId: string) => void;
  handleRuleChange: (categoryId: string, ruleId: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  
  // FAQ operations
  addFAQ: () => void;
  removeFAQ: (faqId: string) => void;
  handleFAQQuestionChange: (faqId: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFAQAnswerChange: (faqId: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RulesFAQsContext = createContext<RulesFAQsContextType | undefined>(undefined);

export const RulesFAQsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<RulesFAQsContent>(defaultContent);
  const [isSaving, setIsSaving] = useState(false);
  
  const { content, isLoading, error, refresh } = useContent<{ [key: string]: any }>({
    page: "rules-faqs",
    fallbackData: {}, // Empty fallback as we'll construct our own default state
  });

  // Initialize form data from Supabase content or use defaults
  useEffect(() => {
    if (!isLoading && content) {
      try {
        console.log("Raw content from database:", content);
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

        // Process important note - Fixed to handle different data structures
        console.log("Important Note from DB:", content.importantNote);
        
        let importantNoteValue = defaultContent.importantNote;
        
        if (content.importantNote) {
          // Check if it's an object with importantNote property
          if (typeof content.importantNote === 'object' && content.importantNote.importantNote) {
            importantNoteValue = content.importantNote.importantNote;
          }
          // Check if it's an object with content_value property
          else if (typeof content.importantNote === 'object' && content.importantNote.content_value) {
            importantNoteValue = content.importantNote.content_value;
          }
          // Check if it's a string directly
          else if (typeof content.importantNote === 'string') {
            importantNoteValue = content.importantNote;
          }
          
          newFormData.importantNote = importantNoteValue;
        }

        console.log("Processed form data:", newFormData);
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

  // Handler functions
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

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        imageUrl,
      },
    }));
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      importantNote: e.target.value,
    }));
  };

  // Rule category operations
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
  };

  const removeRuleCategory = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      parkRules: prev.parkRules.filter((category) => category.id !== categoryId),
    }));
  };

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

  // Rule operations
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

  // FAQ operations
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
  };

  const removeFAQ = (faqId: string) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((faq) => faq.id !== faqId),
    }));
  };

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

  // Save content to Supabase
  const saveContent = async () => {
    setIsSaving(true);
    try {
      console.log("Saving form data:", formData);
      
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
          content_value: formData.importantNote, // Ensure this is a simple string value
          content_type: "text"
        }
      ];

      console.log("Data being saved to database:", dataToSave);

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
    <RulesFAQsContext.Provider value={{
      formData, 
      setFormData,
      isLoading,
      error,
      isSaving,
      saveContent,
      handleHeaderChange,
      handleImageChange,
      handleNoteChange,
      addRuleCategory,
      removeRuleCategory,
      handleCategoryNameChange,
      addRule,
      removeRule,
      handleRuleChange,
      addFAQ,
      removeFAQ,
      handleFAQQuestionChange,
      handleFAQAnswerChange,
    }}>
      {children}
    </RulesFAQsContext.Provider>
  );
};

export const useRulesFAQsContext = () => {
  const context = useContext(RulesFAQsContext);
  if (context === undefined) {
    throw new Error("useRulesFAQsContext must be used within a RulesFAQsProvider");
  }
  return context;
};
