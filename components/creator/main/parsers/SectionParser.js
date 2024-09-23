import React from "react";
import ComponentParser from "./ComponentParser";
import { Button, Divider } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SectionParser = ({
  sectionData,
  onEdit,
  onDelete,
  editMode,
  ...props
}) => {
  if (!sectionData || !sectionData.data || sectionData.data.length === 0) {
    return null;
  }

  return (
    <div className="section-container">
      {/* Render the section title if available */}
      {sectionData.sectionTitle && (
        <h2 className="section-title">{sectionData.sectionTitle}</h2>
      )}

      {/* Loop through each component in the section and render it */}
      <div className="section-content">
        {sectionData.data.map((componentData, index) => (
          <ComponentParser
            key={index}
            componentData={componentData}
            editMode={editMode}
            {...props}
          />
        ))}
      </div>

      {/* Edit and Delete buttons for section, shown if in editMode */}
      {editMode && (
        <div className="section-actions">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(sectionData._id)}
          >
            Edit Section
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(sectionData._id)}
          >
            Delete Section
          </Button>
        </div>
      )}

      {/* Divider between sections */}
      <Divider />
    </div>
  );
};

export default SectionParser;
