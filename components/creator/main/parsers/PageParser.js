import React from "react";
import SectionParser from "./SectionParser";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const PageParser = ({
  pageData,
  editMode,
  onAddSection,
  onEditSection,
  onDeleteSection,
}) => {
  if (!pageData || !pageData.sections || pageData.sections.length === 0) {
    return <div>No sections available</div>;
  }

  return (
    <div className="page-container">
      {/* Render each section on the page */}
      {pageData.sections.map((sectionData, index) => (
        <SectionParser
          key={index}
          sectionData={sectionData}
          editMode={editMode}
          onEdit={onEditSection}
          onDelete={onDeleteSection}
        />
      ))}

      {/* Add section button */}
      {editMode && (
        <div className="add-section-container">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onAddSection}
            style={{ marginTop: "20px" }}
          >
            Add New Section
          </Button>
        </div>
      )}
    </div>
  );
};

export default PageParser;
