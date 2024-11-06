// components/formbuilder/MaveFormsShowcase.jsx

import React, { useState } from "react";
import MaveFormsList from "../../components/formbuilder/MaveFormsList";

const MaveFormsShowcase = () => {
  const [selectedFormId, setSelectedFormId] = useState(null);

  const handleSelectForm = (formId) => {
    setSelectedFormId(formId);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row justify-between mb-10">
        {/* Forms List */}
        <div className="w-full">
          <MaveFormsList
            onSelectForm={handleSelectForm}
            selectedFormId={selectedFormId}
          />
        </div>
        {/* Placeholder for additional content if needed */}
      </div>
      {/* Additional responsive content can be added here */}
    </div>
  );
};

export default MaveFormsShowcase;
