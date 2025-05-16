
import React from "react";
import { useRulesFAQsContext } from "./RulesFAQsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

const ParkRulesSection: React.FC = () => {
  const { 
    formData, 
    addRuleCategory, 
    removeRuleCategory, 
    handleCategoryNameChange,
    addRule,
    removeRule,
    handleRuleChange
  } = useRulesFAQsContext();
  
  return (
    <div className="space-y-6">
      {formData.parkRules.map((category) => (
        <div
          key={category.id}
          className="border rounded-lg p-4 bg-gray-50"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 mr-4">
              <Label htmlFor={`category-${category.id}`}>Category Name</Label>
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
            {category.rules.map((rule) => (
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
  );
};

export default ParkRulesSection;
