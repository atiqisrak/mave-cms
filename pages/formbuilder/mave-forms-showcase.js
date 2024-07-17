// src/pages/mave-forms-showcase.js

import React, { useState } from "react";
import MaveFormsList from "../../components/formbuilder/MaveFormsList";
import MaveFormElements from "../../components/formbuilder/MaveFormElements";

const MaveFormsShowcase = () => {
  const [selectedFormId, setSelectedFormId] = useState(null);

  const handleSelectForm = (formId) => {
    setSelectedFormId(formId);
  };

  return (
    <div className="ViewContainer">
      <h1>Mave Forms Showcase</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
