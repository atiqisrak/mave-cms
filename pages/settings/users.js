import { PlusCircleOutlined, UserSwitchOutlined } from "@ant-design/icons";
import UserManagement from "../../components/settings/UserManagement";
import Link from "next/link";
import { Button, message, Modal } from "antd";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import UserList from "../../components/settings/user/UserList";
import instance from "../../axios";
import UserForm from "../../components/settings/user/UserForm";
import UsersTopbar from "../../components/settings/user/UsersTopbar";

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

export default function usersSettingsPage() {
  const router = useRouter();
  const [users, setUsers] = useState();
  const [logs, setLogs] = useState(initialLogs);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("1");
  const [createUser, setCreateUser] = useState(false);

  const menuItems = [
    {
      key: "1",
      title: "Users",
      link: "/settings/users",
    },
    {
      key: "2",
      title: "Registration",
      link: "/settings/user-registration",
    },
    {
      key: "3",
      title: "Access Control",
      link: "/settings/access-control",
    },
    {
      key: "4",
      title: "Role Permission",
      link: "/settings/role-permission",
    },
  ];

  useEffect(() => {
    if (router.pathname === "/settings/users") {
      setActive("1");
    }
  }, [router.pathname]);

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
    setModalVisible(true);
  };

  const handleCreateUser = async () => {
    setLoading(true);
    const items = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    };
    try {
      const response = await instance.post("/admin/register", items);
      if (response.status === 201) {
        console.log("User created successfully");
        message.success("User created successfully");
        setCreateUser(false);
        fetchUsers();
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setEditingUser(user);
    setModalVisible(true);
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
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
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

  return (
    <div className="ViewContainer">
      <UsersTopbar
        menuItems={menuItems}
        active={active}
        setActive={setActive}
        setCreateUser={setCreateUser}
        createUser={createUser}
        handleCreateUser={handleCreateUser}
      />
      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        fetchUsers={fetchUsers}
      />
    </div>
  );
}
