// components/PageBuilder/Components/TextComponent.jsx

import React, { useState } from "react";
import { Input, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TextComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isEditing, setIsEditing] = useState(!component.value);
  const [value, setValue] = useState(component.value || "");

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
        <h3>Text Component</h3>
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
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={handleSave}
          onBlur={handleSave}
        />
      ) : (
        <p>{component.value}</p>
      )}
    </div>
  );
};

export default TextComponent;
