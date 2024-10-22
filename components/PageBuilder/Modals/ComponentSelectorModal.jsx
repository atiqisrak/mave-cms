// components/PageBuilder/Modals/ComponentSelectorModal.jsx

import React from "react";
import { Modal, List, Button } from "antd";

const componentOptions = [
  { type: "title", name: "Title" },
  { type: "description", name: "Paragraph" },
  { type: "media", name: "Media" },
  { type: "menu", name: "Menu" },
  { type: "navbar", name: "Navbar" },
  { type: "slider", name: "Slider" },
  { type: "card", name: "Card" },
  { type: "footer", name: "Footer" },
];

const ComponentSelectorModal = ({ isVisible, onClose, onSelectComponent }) => {
  const handleSelect = (componentType) => {
    const newComponent = { type: componentType };
    onSelectComponent(newComponent);
    onClose();
  };

  return (
    <Modal
      title="Select Component Type"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <List
        dataSource={componentOptions}
        renderItem={(item) => (
          <List.Item>
            <Button type="link" onClick={() => handleSelect(item.type)} block>
              {item.name}
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default ComponentSelectorModal;
