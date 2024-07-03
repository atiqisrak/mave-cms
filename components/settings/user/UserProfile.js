import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Input,
  Row,
  Select,
  Table,
  Typography,
  message,
} from "antd";
import { useContext, useState, useEffect } from "react";
import GLOBAL_CONTEXT from "../../../src/context/context";
import instance from "../../../axios";
import moment from "moment/moment";

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
        <Row>
          <Col span={24}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Avatar
                size={100}
                shape="circle"
                src="/images/profile_avatar.png"
                style={{
                  border: "4px solid var(--theme)",
                }}
              />
              <Button
                type="primary"
                onClick={() => setModifyMode(!modifyMode)}
                style={{
                  backgroundColor: "var(--theme)",
                  borderColor: "var(--theme)",
                }}
              >
                {modifyMode ? "Submit" : "Edit Profile"}
              </Button>
            </div>
          </Col>
        </Row>

        {/* User Information Table */}
        <Table
          bordered
          pagination={false}
          dataSource={[
            {
              key: 1,
              label: "Name",
              // value: userData?.name,
              value: modifyMode ? (
                <Input
                  placeholder="Name"
                  value={modifiedData?.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  style={{ width: "100%" }}
                />
              ) : (
                userData?.name
              ),
              // action: modifyMode ? (
              //   <div
              //     style={{
              //       display: "flex",
              //       justifyContent: "space-between",
              //       width: "100px",
              //     }}
              //   >
              //     <CheckOutlined
              //       style={{
              //         color: "var(--theme)",
              //         cursor: "pointer",
              //         padding: "10px",
              //         backgroundColor: "var(--gray)",
              //         borderRadius: "5px",
              //       }}
              //       onClick={handleUpdateProfile}
              //     />
              //     <CloseOutlined
              //       style={{
              //         color: "var(--themes)",
              //         cursor: "pointer",
              //         padding: "10px",
              //         backgroundColor: "var(--gray)",
              //         borderRadius: "5px",
              //       }}
              //       onClick={() => setModifyMode(false)}
              //     />
              //   </div>
              // ) : (
              //   <EditOutlined
              //     style={{
              //       color: "var(--themes)",
              //       cursor: "pointer",
              //       padding: "10px",
              //       backgroundColor: "var(--gray)",
              //       borderRadius: "5px",
              //     }}
              //     onClick={() => setModifyMode(true)}
              //   />
              // ),
            },
            {
              key: 2,
              label: "Email",
              // value: userData?.email,
              value: modifyMode ? (
                <Input
                  placeholder="Email"
                  value={modifiedData?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={(e) => emailValidation(e.target.value)}
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  {userData?.email}
                  <br />
                  {emailMessage}
                </div>
              ),
            },
            {
              key: 3,
              label: "Role",
              value:
                userData?.role_id === "1"
                  ? "Super Admin"
                  : userData?.role_id === "2"
                  ? "Admin"
                  : userData?.role_id === "3"
                  ? "Editor"
                  : userData?.role_id === "4"
                  ? "User"
                  : userData?.role_id === "5"
                  ? "Guest"
                  : "",
            },
            {
              key: 4,
              label: "Active",
              value: userData?.status ? "Yes" : "No",
            },
            {
              key: 5,
              label: "Last Login",
              value: moment(userData?.last_login).format(
                "MMMM Do YYYY, h:mm:ss a"
              ),
            },
          ]}
          columns={[
            {
              title: "Label",
              dataIndex: "label",
              key: "label",
            },
            {
              title: "Value",
              dataIndex: "value",
              key: "value",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default UserProfile;
