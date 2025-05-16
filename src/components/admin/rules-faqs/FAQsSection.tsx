
import React from "react";
import { useRulesFAQsContext } from "./RulesFAQsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

const FAQsSection: React.FC = () => {
  const { 
    formData, 
    addFAQ, 
    removeFAQ, 
    handleFAQQuestionChange,
    handleFAQAnswerChange
  } = useRulesFAQsContext();
  
  return (
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
  );
};

export default FAQsSection;
