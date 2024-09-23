import { useContext, useState, useEffect } from "react";
import { useAuth } from "../../src/context/AuthContext";
import UserProfileForm from "../../components/user/UserProfileForm";
import UserList from "../../components/user/UserList";
import UserCreateForm from "../../components/user/UserCreateForm";
import { Button, Spin, message } from "antd";
import UserProfileHeader from "../../components/user/UserProfileHeader";
import instance from "../../axios";

const Profile = () => {
  const { user, logout } = useAuth(); // Assuming you have user data from context
  const [userData, setUserData] = useState({});
  const [modifyMode, setModifyMode] = useState(false);
  const [modifiedData, setModifiedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [createUser, setCreateUser] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  // Fetch the current user's data
  useEffect(() => {
    if (user) {
      setUserData(user); // Assuming the user data is available in context
    }
  }, [user]);

  // Fetch the list of users if the logged-in user is an admin
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/admin/users"); // Assuming this is the correct endpoint
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      message.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData.role_id === 1 || userData.role_id === 2) {
      fetchUsers();
    }
  }, [userData]);

  // Handle input change for creating and modifying users
  const handleInputChange = (fieldName, value) => {
    if (createUser) {
      if (fieldName === "name") setName(value);
      else if (fieldName === "email") setEmail(value);
      else if (fieldName === "password") setPassword(value);
      else if (fieldName === "confirmPassword") setConfirmPassword(value);
    } else {
      setModifiedData({ ...modifiedData, [fieldName]: value });
    }
  };

  // Validate email (basic example)
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setValidEmail(validateEmail(email));
  }, [email]);

  // Handle profile update
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const response = await instance.put(
        `/admin/user/${userData.id}`,
        modifiedData
      );
      if (response.status === 200) {
        message.success("Profile updated successfully");
        setUserData({ ...userData, ...modifiedData });
        setModifyMode(false);
      }
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Handle user edit (for the UserList)
  const handleUserEdit = (user) => {
    setModifyMode(true);
    setModifiedData(user); // Set the user to be edited
  };

  // Handle user deletion (for the UserList)
  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      await instance.delete(`/admin/user/${userId}`);
      message.success("User deleted successfully");
      setUsers(users.filter((u) => u.id !== userId)); // Remove user from the list
    } catch (error) {
      message.error("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  // Handle user creation
  const handleCreateUser = async () => {
    if (!passwordsMatch || !validEmail) return;
    setLoading(true);
    try {
      const newUser = { name, email, password };
      const response = await instance.post("/admin/register", newUser);
      if (response.status === 201) {
        message.success("User created successfully");
        setUsers([...users, response.data]);
        setCreateUser(false);
      }
    } catch (error) {
      message.error("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin />;
  }

  const canModifyUsers = userData?.role_id === "1" || userData?.role_id === "2";

  return (
    <div className="ViewContainer ViewContentContainer">
      <UserProfileHeader
        userData={userData}
        setUserData={setUserData}
        canModifyUsers={canModifyUsers}
        modifyMode={modifyMode}
        setModifyMode={setModifyMode}
      />
    </div>
  );
};

export default Profile;
