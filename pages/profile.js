import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Popconfirm, Row, Select, message } from "antd";
import { useContext, useState, useEffect } from "react";
import GLOBAL_CONTEXT from "../src/context/context";
import instance from "../axios";
import Loader from "../components/Loader";

const Profile = () => {
  const { user } = useContext(GLOBAL_CONTEXT);
  const [userData, setUserData] = useState({});
  const [modifyMode, setModifyMode] = useState(false);
  const [modifiedData, setModifiedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [roles, setRoles] = useState([
    { id: 1, u_id: "9zrsdrfhw8", name: "Super Admin" },
    { id: 2, u_id: "y8wewowlhl", name: "Admin" },
    { id: 3, u_id: "btrq7wcnsv", name: "Editor" },
    { id: 4, u_id: "lf0kaur5u4", name: "User" },
    { id: 5, u_id: "c66aaozpxq", name: "Guest" },
  ]);

  const [roles2, setRoles2] = useState([
    { id: 1, u_id: "y8wewowlhl", name: "Admin" },
    { id: 2, u_id: "btrq7wcnsv", name: "Editor" },
    { id: 3, u_id: "lf0kaur5u4", name: "User" },
    { id: 4, u_id: "c66aaozpxq", name: "Guest" },
  ]);

  const isSuperAdmin = userData?.role_id === 1;
  const isAdmin = userData?.role_id === 2;

  // Function to check if the logged-in user can modify users
  const canModifyUsers = isSuperAdmin || isAdmin;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
      console.log("User Data: ", JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (userData?.role_id == 1 || userData?.role_id == 2) {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const res = await instance.get("/admin/users");
          setUsers(res.data);
          console.log("All Users: ", res.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [userData]);

  // replace current data with changed data
  const handleInputChange = (fieldName, value) => {
    setModifiedData({
      ...modifiedData,
      [fieldName]: value,
    });
  };

  const updatedData = { ...userData, ...modifiedData };

  const handleUpdateProfile = () => {
    setLoading(true);
    try {
      instance
        .put(`/admin/user/${userData?.id}`, updatedData)
        .then((response) => {
          console.log("Response: ", response?.data?.user);
          if (response.status === 200) {
            message.success("Profile Updated Successfully");
            setUserData(updatedData);
            setModifyMode(false);
            localStorage.setItem("user", JSON.stringify(updatedData));
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          message.error("Something went wrong");
        });
    } catch (error) {
      console.log("Error: ", error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  // Users
  const [userEdit, setUserEdit] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [modifiedUserData, setModifiedUserData] = useState({});

  const handleUserInputChange = (fieldName, value) => {
    setModifiedUserData({
      ...modifiedUserData,
      [fieldName]: value,
    });
  };
  const updatedUserData = { ...users, ...modifiedUserData };

  const handleUpdateUser = async (id) => {
    setLoading(true);

    try {
      const updatedUser = {
        ...users.find((user) => user.id === id),
        ...modifiedUserData,
      };

      instance
        .put(`/admin/user/${id}`, updatedUser)
        .then((response) => {
          console.log("Response: ", response?.data?.user);
          if (response.status === 200) {
            message.success("User Updated Successfully");
            setUsers(
              users.map((user) => (user.id === id ? updatedUser : user))
            );
            setUserEdit(false);
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          message.error("Something went wrong");
        });
    } catch (error) {
      console.log("Error: ", error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleUserEdit = (user) => {
    setUserEdit(true);
    setEditUserId(user?.id);
    setModifiedUserData({
      name: user?.name,
      email: user?.email,
      role_id: user?.role_id,
      // Add other fields as needed
    });
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);

    try {
      instance
        .delete(`/admin/user/${id}`)
        .then((response) => {
          console.log("Response: ", response?.data?.user);
          if (response.status === 200) {
            message.success("User Deleted Successfully");
            setUsers(users.filter((user) => user.id !== id));
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          message.error("Something went wrong");
        });
    } catch (error) {
      console.log("Error: ", error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="ViewContainer">
        <div className="ViewContentContainer">
          <div className="user">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              width={50}
              alt=""
            />
            <h2 style={{ textAlign: "center" }}>{userData.name}</h2>
            <p>Admin</p>
          </div>
          <hr />
          <div className="profileContainer" style={{ marginTop: "1rem" }}>
            <div>
              <Col>
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Col span={24}>
                    <div className="item1">
                      <label style={{ color: "#F1612A", fontWeight: 700 }}>
                        Name :{" "}
                      </label>
                      |
                      {modifyMode ? (
                        <Input
                          defaultValue={userData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                        />
                      ) : (
                        <p className="top1">
                          {userData.name ? userData.name : "Admin User"}
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Col span={24}>
                    <div className="item2">
                      <label style={{ color: "#F1612A", fontWeight: 700 }}>
                        Email :
                      </label>
                      |
                      {modifyMode ? (
                        <Input
                          defaultValue={userData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      ) : (
                        <p className="top2">
                          {userData.email ? userData.email : "Admin Email"}
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Col span={24}>
                    <div className="item3">
                      <label style={{ color: "#F1612A", fontWeight: 700 }}>
                        Phone :
                      </label>
                      |
                      {modifyMode ? (
                        <Input
                          defaultValue={userData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      ) : (
                        <p className="top3">
                          {userData.phone ? userData.phone : "Admin Phone"}
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Col span={24}>
                    <div className="item4">
                      <label style={{ color: "#F1612A", fontWeight: 700 }}>
                        Role :
                      </label>
                      |
                      {modifyMode ? (
                        <Select
                          defaultValue={userData?.role_id}
                          onChange={(value) =>
                            handleInputChange("role_id", value)
                          }
                          style={{ width: "100%" }}
                        >
                          {roles.map((role) => (
                            <Select.Option value={role.id}>
                              {role.name}
                            </Select.Option>
                          ))}
                        </Select>
                      ) : (
                        <p className="top4">
                          {userData?.role_id == "null"
                            ? "Guest"
                            : roles.find((role) => role.id == userData?.role_id)
                              ?.name}
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Col span={24}>
                    <div className="item5">
                      <label style={{ color: "#F1612A", fontWeight: 700 }}>
                        Permissions :
                      </label>
                      |<p className="top5">All</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              {modifyMode ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  {canModifyUsers && (
                    <>
                      <Button
                        type="primary"
                        style={{
                          marginRight: "1rem",
                          backgroundColor: "var(--theme)",
                          color: "white",
                          padding: "0.5rem 1rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={handleUpdateProfile}
                      >
                        <CheckOutlined /> Save
                      </Button>
                      <Button
                        type="primary"
                        danger
                        style={{
                          marginLeft: "1rem",
                          padding: "0.5rem 1rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => setModifyMode(false)}
                      >
                        <CloseOutlined /> Cancel
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {canModifyUsers && (
                    <Button
                      type="primary"
                      style={{
                        marginTop: "1rem",
                        backgroundColor: "var(--theme)",
                        color: "white",
                        padding: "0.5rem 1rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => setModifyMode(true)}
                    >
                      <EditOutlined /> Edit
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Other Users */}
          {loading ? (
            <Loader />
          ) : userData?.role_id == 1 || userData?.role_id == 2 ? (
            <div className="" style={{ marginTop: "4rem" }}>
              {/* Users table with name, email, role and permissions */}
              <div>
                <Col
                  style={{
                    marginBottom: "1rem",
                    padding: "2rem",
                    borderRadius: "5px",
                  }}
                >
                  <center><h1>
                    User Management
                  </h1></center>
                  <Row
                    gutter={16}
                    style={{
                      backgroundColor: "#ceedff",
                      padding: "1rem 1em",
                      borderRadius: "5px",
                      marginTop: "2rem",
                    }}
                  >
                    <Col span={6}>
                      <h3 style={{ fontWeight: "bold" }}>Name</h3>
                    </Col>
                    <Col span={6}>
                      <h3 style={{ fontWeight: "bold" }}>Email</h3>
                    </Col>
                    <Col span={4}>
                      <h3 style={{ fontWeight: "bold" }}>Role</h3>
                    </Col>
                    <Col span={6}>
                      <h3 style={{ fontWeight: "bold" }}>Permissions</h3>
                    </Col>
                    <Col span={2}>
                      <h3 style={{ fontWeight: "bold" }}>Actions</h3>
                    </Col>
                  </Row>
                  {users?.map((user) => (
                    <Row
                      gutter={16}
                      style={{
                        marginTop: "1rem",
                        backgroundColor: "#ceedff",
                        padding: "1rem 1em",
                        borderRadius: "5px",
                      }}
                    >
                      <Col span={6}>
                        {userEdit && user?.id == editUserId ? (
                          <Input
                            defaultValue={user?.name}
                            onChange={(e) =>
                              handleUserInputChange("name", e.target.value)
                            }
                          />
                        ) : (
                          user?.name
                        )}
                      </Col>
                      <Col span={6}>
                        {userEdit && user?.id == editUserId ? (
                          <Input
                            defaultValue={user?.email}
                            onChange={(e) =>
                              handleUserInputChange("email", e.target.value)
                            }
                          />
                        ) : (
                          user?.email
                        )}
                      </Col>
                      <Col span={4}>
                        {userEdit && user?.id == editUserId ? (
                          <Select
                            defaultValue={
                              //  Find role name by id
                              roles2.find((role) => role.id == user?.role_id)?.id
                            }
                            onChange={(value) =>
                              handleUserInputChange("role_id", value)
                            }
                            style={{ width: "100%" }}
                          >
                            {roles2.map((role) => (
                              <Select.Option value={role.id}>
                                {role.name}
                              </Select.Option>
                            ))}
                          </Select>
                        ) : user?.role_id ? (
                          roles2.find((role) => role.id == user?.role_id)?.name
                        ) : (
                          "Guest"
                        )}
                      </Col>
                      <Col span={6}>
                        <p>All</p>
                      </Col>
                      <Col span={2}>
                        {userEdit && user?.id == editUserId ? (
                          <>
                            <Button
                              icon={<CheckOutlined />}
                              style={{
                                marginRight: "1rem",
                              }}
                              onClick={() => handleUpdateUser(user?.id)}
                            />
                            <Button
                              danger
                              icon={<CloseOutlined />}
                              onClick={() => setUserEdit(false)}
                            />
                          </>
                        ) : (
                          <div className="flexed-center" style={{ gap: "1em" }}>
                            <Button
                              type="primary"
                              style={{
                                backgroundColor: "var(--theme)",
                                color: "white",
                                padding: "0.5rem 1rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                handleUserEdit(user);
                                console.log("Clicked User Id: ", user?.id);
                              }}
                            >
                              <EditOutlined />
                            </Button>
                            {
                              // Only Super Admin can delete users
                              userData?.role_id == 1 &&
                              (<Popconfirm
                                title="Are you sure to delete this user?"
                                onConfirm={() => {
                                  console.log("Clicked User Id: ", user?.id);
                                  handleDeleteUser(user?.id);
                                }}
                                onCancel={() => console.log("Canceled")}
                                okText="Yes"
                                cancelText="No"
                              >
                                <Button
                                  danger
                                  type="primary"
                                  style={{
                                    padding: "0.5rem 1rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <DeleteOutlined />
                                </Button>
                              </Popconfirm>)
                            }

                          </div>
                        )}
                      </Col>
                    </Row>
                  ))}
                </Col>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Profile;
