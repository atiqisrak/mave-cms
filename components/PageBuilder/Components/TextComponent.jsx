// components/PageBuilder/Components/TextComponent.jsx

import React, { useState } from "react";
import { Input, Button, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const TextComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(component.value || "");

  const handleSubmit = () => {
    if (tempValue.trim() === "") {
      Modal.error({
        title: "Validation Error",
        content: "Text cannot be empty.",
      });
      return;
    }
    updateComponent({ ...component, value: tempValue });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(component.value || "");
    setIsEditing(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this component?",
      onOk: deleteComponent,
      okText: "Yes",
      cancelText: "No",
    });
  };

  return (
    <div className="border p-4 rounded-md bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">Text Component</h3>
        <div>
          {isEditing ? (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={handleSubmit}
                className="mr-2"
              >
                Submit
              </Button>
              <Button icon={<CloseOutlined />} onClick={handleCancel} danger>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}
                className="mr-2"
              />
              <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
            </>
          )}
        </div>
      </div>
      {isEditing ? (
        <Input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder="Enter text..."
        />
      ) : (
        <p>{component.value}</p>
      )}
    </div>
  );
};

export default TextComponent;
