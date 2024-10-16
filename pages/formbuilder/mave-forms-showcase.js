import React, { useState } from "react";
import MaveFormsList from "../../components/formbuilder/MaveFormsList";

const MaveFormsShowcase = () => {
  const [selectedFormId, setSelectedFormId] = useState(null);

  const handleSelectForm = (formId) => {
    setSelectedFormId(formId);
  };

  return (
    <div className="mavecontainer">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5em",
        }}
      >
        <div>
          <MaveFormsList
            onSelectForm={handleSelectForm}
            selectedFormId={selectedFormId}
          />
        </div>
      </div>
    </div>
  );
};

export default MaveFormsShowcase;
