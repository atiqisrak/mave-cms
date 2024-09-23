import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Button, message, Modal, Tabs } from "antd";
import RegistrationSettings from "./user/RegistrationSettings";
import EmailVerificationSettings from "./user/EmailVerificationSettings";
import PasswordManagementSettings from "./user/PasswordManagementSettings";
import ProfileManagement from "./user/ProfileManagement";
import ActivityLog from "./user/ActivityLog";
import AccessControlSettings from "./user/AccessControlSettings";
import AuthenticationMethods from "./user/AuthenticationMethods";
import UserNotifications from "./user/UserNotifications";
import BulkUserActions from "./user/BulkUserActions";
import ImportExportUsers from "./user/ImportExportUsers";
import UserList from "./user/UserList";
import UserForm from "./user/UserForm";
import instance from "../../axios";
import UserProfile from "./user/UserProfile";
import Loader from "../Loader";

const { Content } = Layout;

const initialLogs = [
  {
    id: 1,
    timestamp: "2024-07-01 10:00:00",
    user: "John Doe",
    action: "Login",
    details: "User logged in",
  },
  {
    id: 2,
    timestamp: "2024-07-01 11:00:00",
    user: "Jane Smith",
    action: "Edit",
    details: "Edited an article",
  },
  // Add more logs as needed
];

const UserManagement = () => {
  const [users, setUsers] = useState();
  const [logs, setLogs] = useState(initialLogs);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/admin/users");
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleEditUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    message.success("User deleted successfully");
  };

  const handleCreateOrUpdateUser = (values) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...values } : user
        )
      );
      message.success("User updated successfully");
    } else {
      setUsers([...users, { id: users.length + 1, ...values }]);
      message.success("User created successfully");
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBulkDelete = (userIds) => {
    setUsers(users.filter((user) => !userIds.includes(user.id)));
    message.success("Selected users deleted successfully.");
  };

  const handleBulkChangeRole = (userIds, role) => {
    setUsers(
      users.map((user) =>
        userIds.includes(user.id) ? { ...user, role } : user
      )
    );
    message.success("Selected users roles updated successfully.");
  };

  const handleImport = (importedUsers) => {
    setUsers([...users, ...importedUsers]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("Users: ", users);

  return (
    <>
      {users ? (
        <Layout
          style={{
            width: "100%",
            backgroundColor: "transparent",
          }}
        >
          <Content
            style={{
              margin: 0,
              minHeight: 280,
              backgroundColor: "#fff",
            }}
          >
            <Tabs
              defaultActiveKey="1"
              type="card"
              style={{ marginBottom: 16, fontSize: 16 }}
              tabPosition="left"
              tabBarGutter={6}
            >
              <Tabs.TabPane tab="User Profile" key="1">
                <UserProfile />
              </Tabs.TabPane>
              <Tabs.TabPane tab="User Management" key="2">
                <h1>User Management</h1>
                <Button
                  type="primary"
                  onClick={handleAddUser}
                  style={{ marginBottom: 16 }}
                >
                  Add User
                </Button>
                <UserList
                  users={users}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                  fetchUsers={fetchUsers}
                />
                <UserForm
                  open={isModalVisible}
                  onCreate={handleCreateOrUpdateUser}
                  onCancel={handleCancel}
                  initialValues={editingUser}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Registration Settings" key="3">
                <h2>Registration Settings</h2>
                <RegistrationSettings />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Email Verification Settings" key="4">
                <h2>Email Verification Settings</h2>
                <EmailVerificationSettings />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Password Management Settings" key="5">
                <h2>Password Management Settings</h2>
                <PasswordManagementSettings />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Import/Export Users" key="6">
                <h2>Import/Export Users</h2>
                <ImportExportUsers
                  users={users}
                  onImport={handleImport}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                  fetchUsers={fetchUsers}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Activity Log" key="7">
                <h2>Activity Log</h2>
                <ActivityLog logs={logs} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Access Control Settings" key="8">
                <h2>Access Control Settings</h2>
                <AccessControlSettings />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Authentication Methods" key="9">
                <h2>Authentication Methods</h2>
                <AuthenticationMethods />
              </Tabs.TabPane>
              <Tabs.TabPane tab="User Notifications" key="10">
                <h2>User Notifications</h2>
                <UserNotifications />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Bulk User Actions" key="11">
                <h2>Bulk User Actions</h2>
                <BulkUserActions
                  users={users}
                  onBulkDelete={handleBulkDelete}
                  onBulkChangeRole={handleBulkChangeRole}
                />
              </Tabs.TabPane>
            </Tabs>
          </Content>
        </Layout>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserManagement;
