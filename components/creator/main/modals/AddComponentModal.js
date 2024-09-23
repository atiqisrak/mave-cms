import React from "react";
import { Modal, Button } from "antd";
import componentMap from "../utils/componentMap";

const AddComponentModal = ({ visible, onCancel, onComponentSelect }) => {
  const components = componentMap || {};

  return (
    <Modal open={visible} onCancel={onCancel} footer={null}>
      {Object.keys(components).length > 0 ? (
        Object.keys(components).map((componentType, index) => (
          <Button
            key={index}
            onClick={() => onComponentSelect(componentType)}
            style={{ marginBottom: "1rem" }}
          >
            {componentType}
          </Button>
        ))
      ) : (
        <p>No components available</p>
      )}
    </Modal>
  );
};

export default AddComponentModal;
