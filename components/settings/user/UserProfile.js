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
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*@(gmail\.com|mave\.cms|webable\.digital)$/;
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
              {modifyMode ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Button
                    type="primary"
                    onClick={handleUpdateProfile}
                    style={{
                      backgroundColor: "var(--theme)",
                      borderColor: "var(--theme)",
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => setModifyMode(false)}
                    style={{
                      backgroundColor: "var(--themes)",
                      borderColor: "var(--themes)",
                    }}
                  >
                    Discard
                  </Button>
                </div>
              ) : (
                <Button
                  type="primary"
                  onClick={() => setModifyMode(true)}
                  style={{
                    backgroundColor: "var(--theme)",
                    borderColor: "var(--theme)",
                  }}
                >
                  Edit Profile
                </Button>
              )}
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
              value: modifyMode ? (
                <Input
                  placeholder={userData?.name}
                  value={modifiedData?.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  style={{ width: "100%" }}
                />
              ) : (
                userData?.name
              ),
            },
            {
              key: 2,
              label: "Email",
              value: modifyMode ? (
                <Input
                  placeholder={userData?.email}
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
            // const [roles, setRoles] = useState([
            //   { id: 1, name: "Super Admin" },
            //   { id: 2, name: "Admin" },
            //   { id: 3, name: "Editor" },
            //   { id: 4, name: "User" },
            //   { id: 5, name: "Guest" },
            // ]);
            {
              key: 3,
              label: "Role",
              value:
                // modifyMode ? (
                //   <Select
                //     defaultValue={userData?.role_id}
                //     style={{ width: "100%" }}
                //     onChange={(value) => handleInputChange("role_id", value)}
                //   >
                //     {roles?.map((role) => (
                //       <Select.Option key={role.id} value={role.id}>
                //         {role.name}
                //       </Select.Option>
                //     ))}
                //   </Select>
                // ) : (
                roles?.find((role) => role.id == userData?.role_id)?.name,
              // ),
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
              title: "Fields",
              dataIndex: "label",
              key: "label",
            },
            {
              title: "Information",
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
