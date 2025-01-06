// components/formbuilder/builder/FormPreview.js
import React from "react";
import { Drawer, Button } from "antd";
import FormElement from "./FormElement";

const FormPreview = ({
  visible,
  onCancel,
  onSave,
  formMeta,
  formAttributes,
  formElements,
  loading,
}) => {
  const safeDescription =
    typeof formMeta.description === "string" ? formMeta.description : "";

  return (
    <Drawer
      title="Draft Form Preview"
      open={visible}
      onClose={onCancel}
      width="60%"
      footer={
        <div className="flex justify-end">
          <Button onClick={onCancel} className="mr-2">
            Discard
          </Button>
          <Button
            onClick={onSave}
            className="bg-theme text-white"
            loading={loading}
          >
            Publish Form
          </Button>
        </div>
      }
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold">
          {formMeta.title || "Untitled Form"}
        </h3>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: safeDescription }}
        />
      </div>
      <div className="border border-dashed p-4">
        {formElements.map((element, idx) => (
          <FormElement
            key={element.updated_on}
            element={element}
            index={idx}
            // We disable reordering & editing in preview
            moveElement={() => {}}
            onUpdateElement={() => {}}
            isPreview={true}
          />
        ))}
      </div>
    </Drawer>
  );
};

export default FormPreview;
