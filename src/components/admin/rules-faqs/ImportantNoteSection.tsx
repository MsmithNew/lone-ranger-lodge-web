
import React from "react";
import { useRulesFAQsContext } from "./RulesFAQsContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ImportantNoteSection: React.FC = () => {
  const { formData, handleNoteChange } = useRulesFAQsContext();
  
  return (
    <div>
      <Label htmlFor="importantNote" className="mb-2 block">Important Note</Label>
      <Textarea
        id="importantNote"
        value={formData.importantNote}
        onChange={handleNoteChange}
        className="mt-1"
        rows={4}
        placeholder="Enter an important note for visitors"
      />
      <p className="text-sm text-muted-foreground mt-2">
        This note will appear prominently at the bottom of the rules section.
      </p>
    </div>
  );
};

export default ImportantNoteSection;
