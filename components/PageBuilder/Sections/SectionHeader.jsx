// components/PageBuilder/Sections/SectionHeader.jsx

import React, { useState } from "react";
import { Input, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined, DragOutlined } from "@ant-design/icons";

const SectionHeader = ({
  section,
  updateSection,
  deleteSection,
  dragHandleProps,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(section.sectionTitle);

  const handleSave = () => {
    updateSection({ ...section, sectionTitle: title });
    setIsEditing(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this section?",
      onOk: deleteSection,
    });
  };

  return (
    <div className="section-header flex justify-between items-center mb-4">
      <div className="flex items-center">
        <Button {...dragHandleProps} icon={<DragOutlined />} />
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onPressEnter={handleSave}
            onBlur={handleSave}
            className="ml-2"
          />
        ) : (
          <h2 className="text-xl font-bold ml-2">{section.sectionTitle}</h2>
        )}
      </div>
      <div>
        <Button
          icon={<EditOutlined />}
          onClick={() => setIsEditing(!isEditing)}
          className="mr-2"
        />
        <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
      </div>
    </div>
  );
};

export default SectionHeader;
