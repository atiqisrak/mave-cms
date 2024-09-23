import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";

const EditSectionModal = ({ visible, sectionData, onCancel, onSave }) => {
  const [title, setTitle] = useState(sectionData?.sectionTitle || "");

  useEffect(() => {
    if (sectionData) {
      setTitle(sectionData.sectionTitle);
    }
  }, [sectionData]);

  const handleSave = () => {
    const updatedSection = {
      ...sectionData,
      sectionTitle: title,
    };
    onSave(updatedSection); // Call the onSave function with updated section data
    onCancel(); // Close the modal after saving
  };

  return (
    <Modal
      title="Edit Section"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save Changes
        </Button>,
      ]}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter section title"
        style={{ marginBottom: "20px" }}
      />
      {/* Additional form fields can be added here to edit other section details */}
    </Modal>
  );
};

export default EditSectionModal;
