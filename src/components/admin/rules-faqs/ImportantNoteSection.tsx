
import React from "react";
import { useRulesFAQsContext } from "./RulesFAQsContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ImportantNoteSection: React.FC = () => {
  const { formData, handleNoteChange } = useRulesFAQsContext();
  
  return (
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
  );
};

export default ImportantNoteSection;
