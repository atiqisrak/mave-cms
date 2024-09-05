import React from "react";
import { Modal, Table, Button } from "antd";

const UserViewModal = ({ visible, user, onCancel, onEdit }) => {
  const columns = [
    { title: "Field", dataIndex: "field", key: "field" },
    { title: "Value", dataIndex: "value", key: "value" },
  ];

  const dataSource = [
    { key: "1", field: "Name", value: user?.name },
    { key: "2", field: "Email", value: user?.email },
    {
      key: "3",
      field: "Role",
      value: user?.role_mave ? user?.role_mave.title : "N/A",
    },
    // Add more fields as needed
  ];

  return (
    <Modal
      title="User Details"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel} danger>
          Close
        </Button>,
      ]}
    >
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </Modal>
  );
};

export default UserViewModal;
