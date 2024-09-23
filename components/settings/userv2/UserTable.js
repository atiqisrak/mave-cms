import React, { useState, useEffect } from "react";
import {
  Table,
  Avatar,
  Button,
  Input,
  Select,
  Popconfirm,
  message,
  Modal,
  Checkbox,
  Spin,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import TopBar from "./TopBar";
import UserEditModal from "./UserEditModal";
import UserViewModal from "./UserViewModal";
import FilterDrawer from "./FilterDrawer";
import instance from "../../../axios";

const { Option } = Select;

const UserTable = ({ users, fetchUsers, roles }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // Handle selection of all rows (not header)
  const handleSelectAll = () => {
    if (selectedRowKeys.length === filteredUsers.length) {
      // Deselect all if already selected
      setSelectedRowKeys([]);
    } else {
      // Select all
      setSelectedRowKeys(filteredUsers.map((user) => user.id));
    }
  };

  // Handle individual row selection
  const handleSelect = (id) => {
    setSelectedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id]
    );
  };

  // Handle search by name
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Handle edit button click
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalVisible(true);
  };

  // Handle view button click
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewModalVisible(true);
  };

  // Handle delete button click
  const handleDeleteUser = async (id) => {
    try {
      await instance.delete(`/admin/user/${id}`);
      message.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedRowKeys.map((id) => instance.delete(`/admin/user/${id}`))
      );
      message.success("Selected users deleted successfully");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete selected users");
    }
  };

  // Column definitions for Ant Design Table
  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={() => handleSelect(record.id)}
        />
      ),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record) => (
        <Avatar src={record.profile_picture || "/default-avatar.png"} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, record) =>
        record.role_mave ? record?.role_mave.title : "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewUser(record)}
            style={{ backgroundColor: "var(--theme)", color: "white" }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
            style={{
              backgroundColor: "transparent",
              color: "var(--theme)",
              border: "2px solid var(--theme)",
            }}
          />
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            onCancel={() => message.info("User not deleted")}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <TopBar
        selectedRowKeys={selectedRowKeys}
        onSearch={handleSearch}
        onDelete={handleBulkDelete}
        setIsFilterDrawerVisible={setIsFilterDrawerVisible}
        setFilteredUsers={setFilteredUsers}
        users={users}
        onSelectAll={handleSelectAll}
      />
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        loading={!users}
      />

      {users && roles && (
        <>
          <UserEditModal
            open={isEditModalVisible}
            user={selectedUser}
            onCancel={() => setIsEditModalVisible(false)}
            fetchUsers={fetchUsers}
            roles={roles}
          />
          <UserViewModal
            open={isViewModalVisible}
            user={selectedUser}
            onCancel={() => setIsViewModalVisible(false)}
            onEdit={() => handleEditUser(selectedUser)}
          />
          <FilterDrawer
            open={isFilterDrawerVisible}
            onClose={() => setIsFilterDrawerVisible(false)}
            setFilteredUsers={setFilteredUsers}
            users={users}
          />
        </>
      )}
    </>
  );
};

export default UserTable;
