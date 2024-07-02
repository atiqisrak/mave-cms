import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row, Select, message } from "antd";
import { useContext, useState, useEffect } from "react";
import GLOBAL_CONTEXT from "../../../src/context/context";
import instance from "../../../axios";

const UserProfile = () => {
  const { user } = useContext(GLOBAL_CONTEXT);
  const [userData, setUserData] = useState({});
  const [modifyMode, setModifyMode] = useState(false);
  const [modifiedData, setModifiedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([
    { id: 1, name: "Super Admin" },
    { id: 2, name: "Admin" },
    { id: 3, name: "Editor" },
    { id: 4, name: "User" },
    { id: 5, name: "Guest" },
  ]);
  const [validEmail, setValidEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const isSuperAdmin = userData?.role_id === 1;
  const isAdmin = userData?.role_id === 2;
  const canModifyUsers = isSuperAdmin || isAdmin;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleInputChange = (fieldName, value) => {
    setModifiedData({
      ...modifiedData,
      [fieldName]: value,
    });
  };

  const handleUpdateProfile = () => {
    setLoading(true);
    const updatedData = { ...userData, ...modifiedData };
    instance
      .put(`/admin/user/${userData?.id}`, updatedData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Profile Updated Successfully");
          setUserData(updatedData);
          setModifyMode(false);
          localStorage.setItem("user", JSON.stringify(updatedData));
        }
      })
      .catch((error) => {
        message.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const emailValidation = (email) => {
    const emailRegEx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*@(gmail\.com|webable\.digital)$/;
    if (!email.trim()) {
      setEmailMessage("Email is required. (e.g.: username@gmail.com)");
      setValidEmail(false);
      return;
    }
    if (emailRegEx.test(email)) {
      setEmailMessage("Email is valid");
      setValidEmail(true);
    } else {
      setEmailMessage(
        "Email is invalid. Please use @gmail.com as email extension"
      );
      setValidEmail(false);
    }
  };

  return (
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
                </label>{" "}
                |
                {modifyMode ? (
                  <Input
                    defaultValue={userData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
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
            style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <Col span={24}>
              <div className="item2">
                <label style={{ color: "#F1612A", fontWeight: 700 }}>
                  Email :
                </label>{" "}
                |
                {modifyMode ? (
                  <>
                    <Input
                      defaultValue={userData.email}
                      onChange={(e) => {
                        handleInputChange("email", e.target.value);
                        emailValidation(e.target.value);
                      }}
                    />
                    {!validEmail && (
                      <p style={{ color: "red" }}>{emailMessage}</p>
                    )}
                  </>
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
            style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <Col span={24}>
              <div className="item3">
                <label style={{ color: "#F1612A", fontWeight: 700 }}>
                  Phone :
                </label>{" "}
                |
                {modifyMode ? (
                  <Input
                    defaultValue={userData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
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
            style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <Col span={24}>
              <div className="item4">
                <label style={{ color: "#F1612A", fontWeight: 700 }}>
                  Role :
                </label>{" "}
                |
                {modifyMode ? (
                  <Select
                    defaultValue={userData?.role_id}
                    onChange={(value) => handleInputChange("role_id", value)}
                    style={{ width: "100%" }}
                  >
                    {roles.map((role) => (
                      <Select.Option value={role.id} key={role.id}>
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
            style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <Col span={24}>
              <div className="item5">
                <label style={{ color: "#F1612A", fontWeight: 700 }}>
                  Permissions :
                </label>{" "}
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
                  }}
                  onClick={handleUpdateProfile}
                >
                  <CheckOutlined /> Save
                </Button>
                <Button
                  type="primary"
                  danger
                  style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
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
  );
};

export default UserProfile;
