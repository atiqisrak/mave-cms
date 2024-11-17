import React, { useState } from "react";
import { Button, Modal, Checkbox, Select, message, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const BulkUserActions = ({ onBulkDelete, onBulkChangeRole, users }) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [roles2, setRoles2] = useState([
    { id: 1, u_id: "y8wewowlhl", name: "Admin" },
    { id: 2, u_id: "btrq7wcnsv", name: "Editor" },
    { id: 3, u_id: "lf0kaur5u4", name: "User" },
    { id: 4, u_id: "c66aaozpxq", name: "Guest" },
  ]);

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
        <Col span={24}>
          {users?.map((user) => (
            <Row
              gutter={16}
              style={{
                marginTop: "1rem",
                backgroundColor: "#ceedff",
                padding: "1rem 1em",
                borderRadius: "5px",
              }}
              key={user.id}
            >
              <Col span={8}>
                <Checkbox key={user.id} value={user.id}>
                  {user.name}
                </Checkbox>
              </Col>
              <Col span={8}>{user.email}</Col>
              <Col span={8}>
                {user?.role_id
                  ? roles2.find((role) => role.id == user?.role_id)?.name
                  : "Guest"}
              </Col>
            </Row>
          ))}
        </Col>
      </Checkbox.Group>
      <Select
        placeholder="Select bulk action"
        onChange={handleActionChange}
        style={{ width: "200px", marginTop: "16px" }}
        showSearch
      >
        <Option value="delete">Delete</Option>
        <Option value="changeRole">Change Role</Option>
      </Select>
      {selectedAction === "changeRole" && (
        <Select
          placeholder="Select role"
          onChange={handleRoleChange}
          style={{ width: "200px", marginTop: "16px" }}
          showSearch
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
