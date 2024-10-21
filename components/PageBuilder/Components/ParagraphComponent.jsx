// components/PageBuilder/Components/ParagraphComponent.jsx

import React, { useState } from "react";
import { Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import RichTextEditor from "../../RichTextEditor";

const ParagraphComponent = ({
  component,
  updateComponent,
  deleteComponent,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(component.value);

  const handleSave = () => {
    updateComponent({ ...component, value });
    setIsEditing(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this component?",
      onOk: deleteComponent,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3>Paragraph Component</h3>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsEditing(!isEditing)}
            className="mr-2"
          />
          <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
        </div>
      </div>
      {isEditing ? (
        // <ReactQuill value={value} onChange={setValue} onBlur={handleSave} />
        <RichTextEditor
          defaultValue={value}
          onChange={(html) => setValue(html)}
          editMode={true}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: component.value }} />
      )}
    </div>
  );
};

export default ParagraphComponent;
