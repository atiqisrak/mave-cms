import React, { useState } from "react";
import { Button, Modal, Checkbox, Select, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const BulkUserActions = ({ onBulkDelete, onBulkChangeRole }) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleBulkDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete selected users?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk: () => {
        onBulkDelete(selectedUsers);
        message.success("Users deleted successfully.");
      },
    });
  };

  const handleBulkChangeRole = (role) => {
    onBulkChangeRole(selectedUsers, role);
    message.success("User roles updated successfully.");
  };

  const handleActionChange = (value) => {
    setSelectedAction(value);
    if (value === "delete") {
      handleBulkDelete();
    }
  };

  const handleRoleChange = (role) => {
    handleBulkChangeRole(role);
  };

  return (
    <div>
      <Checkbox.Group
        style={{ width: "100%" }}
        onChange={(checkedValues) => setSelectedUsers(checkedValues)}
      >
        {/* Assuming a list of user options is available */}
        <Checkbox value="user1">User 1</Checkbox>
        <Checkbox value="user2">User 2</Checkbox>
        <Checkbox value="user3">User 3</Checkbox>
        {/* Add more user options as needed */}
      </Checkbox.Group>
      <Select
        placeholder="Select bulk action"
        onChange={handleActionChange}
        style={{ width: "200px", marginTop: "16px" }}
      >
        <Option value="delete">Delete</Option>
        <Option value="changeRole">Change Role</Option>
      </Select>
      {selectedAction === "changeRole" && (
        <Select
          placeholder="Select role"
          onChange={handleRoleChange}
          style={{ width: "200px", marginTop: "16px" }}
        >
          <Option value="admin">Admin</Option>
          <Option value="editor">Editor</Option>
          <Option value="viewer">Viewer</Option>
        </Select>
      )}
    </div>
  );
};

export default BulkUserActions;
