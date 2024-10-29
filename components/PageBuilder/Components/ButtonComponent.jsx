// components/PageBuilder/Components/ButtonComponent.jsx

import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ButtonSelectionModal from "../Modals/ButtonSelectionModal/ButtonSelectionModal";
import { useRouter } from "next/router";

const { Paragraph } = Typography;

const ButtonComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buttonData, setButtonData] = useState(component._mave || {});
  const router = useRouter();

  useEffect(() => {
    setButtonData(component._mave || {});
  }, [component._mave]);

  const handleSelectButton = (newButtonData) => {
    updateComponent({
      ...component,
      _mave: newButtonData,
      id: component._id,
    });
    setButtonData(newButtonData);
    setIsModalVisible(false);
    message.success("Button updated successfully.");
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this button?",
      onOk: deleteComponent,
      okText: "Yes",
      cancelText: "No",
    });
  };

  const handleButtonClick = () => {
    if (buttonData.action?.type === "internal_link" && buttonData.action.url) {
      router.push(buttonData.action.url);
    } else if (
      buttonData.action?.type === "external_link" &&
      buttonData.action.url
    ) {
      window.open(buttonData.action.url, "_blank");
    } else if (
      buttonData.action?.type === "action" &&
      buttonData.action.customScript
    ) {
      try {
        // eslint-disable-next-line no-eval
        eval(buttonData.action.customScript);
      } catch (error) {
        message.error("Error executing custom script.");
      }
    }
  };

  const getButtonIcon = () => {
    if (buttonData.icon) {
      const IconComponent = require("@ant-design/icons")[buttonData.icon];
      return IconComponent ? <IconComponent /> : null;
    }
    return null;
  };

  return (
    <div className="border p-4 rounded-md bg-gray-50">
      {/* Header with Component Title and Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Button Component</h3>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mr-2"
          />
          <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
        </div>
      </div>

      {/* Button Display */}
      {buttonData.text ? (
        <div style={{ textAlign: "left" }}>
          <Button
            className="mavebutton"
            icon={getButtonIcon()}
            onClick={handleButtonClick}
            aria-label={buttonData.text}
          >
            {buttonData.text}
          </Button>
        </div>
      ) : (
        <Paragraph>No button configured.</Paragraph>
      )}

      {/* Button Selection Modal */}
      <ButtonSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectButton={handleSelectButton}
        initialButton={buttonData}
      />
    </div>
  );
};

export default ButtonComponent;
