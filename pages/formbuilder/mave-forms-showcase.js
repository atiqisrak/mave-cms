// pages/formbuilder/mave-forms-showcase.js
import React, { useState } from "react";
import MaveFormsList from "../../components/formbuilder/MaveFormsList";
import { FormBuilderProvider } from "../../src/context/FormBuilderContext";

const MaveFormsShowcase = () => {
  const [selectedFormId, setSelectedFormId] = useState(null);

  const handleSelectForm = (formId) => {
    setSelectedFormId(formId);
  };

  return (
    <FormBuilderProvider>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row justify-between mb-10">
          {/* Forms List */}
          <div className="w-full">
            <MaveFormsList
              onSelectForm={handleSelectForm}
              selectedFormId={selectedFormId}
            />
          </div>
          {/* You can add a sidebar or additional content here if needed */}
        </div>
      </div>
    </FormBuilderProvider>
  );
};

export default MaveFormsShowcase;
