import { message } from "antd";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import instance from "../../axios";
import UsersTopbar from "../../components/settings/user/UsersTopbar";
import UserTable from "../../components/settings/userv2/UserTable";

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
  const [roles, setRoles] = useState([]);
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
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/roles");
      if (res.status === 200) {
        setRoles(res.data);
      } else {
        message.error("Something went wrong while fetching roles.");
      }
    } catch (error) {
      message.error("Something went wrong while fetching roles.");
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  console.log("Roles Users", roles);

  return (
    <div className="ViewContainer ViewContentContainer">
      <UsersTopbar
        menuItems={menuItems}
        active={active}
        setActive={setActive}
        setCreateUser={setCreateUser}
        createUser={createUser}
        handleCreateUser={handleCreateUser}
        fetchUsers={fetchUsers}
        roles={roles}
      />
      <UserTable
        users={users}
        fetchUsers={fetchUsers}
        setUsers={setUsers}
        roles={roles}
      />
    </div>
  );
}
