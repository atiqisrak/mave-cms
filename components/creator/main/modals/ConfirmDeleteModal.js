import React from "react";
import { Modal, Button } from "antd";

const ConfirmDeleteModal = ({ visible, onConfirm, onCancel, itemType }) => {
  return (
    <Modal
      title={`Delete ${itemType}`}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          No
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Yes, Delete
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to delete this {itemType}? This action cannot be
        undone.
      </p>
    </Modal>
  );
};

export default ConfirmDeleteModal;
