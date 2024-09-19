import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Table, Tag, message } from "antd";
import Image from "next/image";
import { useState } from "react";
import instance from "../../axios";

const UserProfileHeader = ({
  userData,
  setUserData,
  canModifyUsers,
  modifyMode,
  setModifyMode,
}) => {
  console.log("I am: ", userData);
  const [loading, setLoading] = useState(false);
  const [passwordChangeMode, setPasswordChangeMode] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const data = [
    {
      key: "1",
      title: "Name",
      description: modifyMode ? (
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input
            defaultValue={userData?.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </Form.Item>
      ) : (
        userData?.name || "Admin User"
      ),
    },
    {
      key: "2",
      title: "Email",
      description: modifyMode ? (
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input
            defaultValue={userData?.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </Form.Item>
      ) : (
        userData?.email || "Admin Email"
      ),
    },
    {
      key: "3",
      title: "Role",
      description: userData?.role_mave ? userData?.role_mave?.title : "Guest",
    },
    {
      key: "4",
      title: "Permissions",
      description: userData?.role_mave?.permission_mave
        ? userData?.role_mave?.permission_mave?.map((permission) => (
            <Tag
              key={permission.id}
              color="green"
              style={{
                width: "fit-content",
                padding: "0.25rem 0.5rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                borderRadius: "8px",
                marginBottom: "0.5rem",
              }}
            >
              {permission.title}
            </Tag>
          ))
        : "Not Assigned",
    },
  ];

  if (passwordChangeMode) {
    data.push(
      {
        key: "5",
        title: "Old Password",
        description: (
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: "Please enter old password" }]}
          >
            <Input.Password />
          </Form.Item>
        ),
      },
      {
        key: "6",
        title: "New Password",
        description: (
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: "Please enter new password" }]}
          >
            <Input.Password />
          </Form.Item>
        ),
      },
      {
        key: "7",
        title: "Confirm New Password",
        description: (
          <Form.Item
            name="confirmNewPassword"
            rules={[
              { required: true, message: "Please confirm new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        ),
      }
    );
  }

  // update user profile
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const updatedData = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      };

      const response = await instance.put(
        "/admin/user/" + userData.id,
        updatedData
      );
      if (response.status === 200) {
        message.success("Profile updated successfully");
        setModifyMode(false);
      } else {
        message.error("Failed to update profile.");
      }
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // handle password change
  const handlePasswordChange = async (values) => {
    setLoading(true);
    try {
      const payload = {
        old_password: values.oldPassword,
        new_password: values.newPassword,
        new_password_confirmation: values.confirmNewPassword,
      };

      const response = await instance.post("/admin/password/change", payload);
      if (response.status === 200) {
        message.success("Password changed successfully");
        setPasswordChangeMode(false);
        form.resetFields();
      } else {
        message.error("Failed to change password.");
      }
    } catch (error) {
      message.error("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const renderActionButton = () => {
    if (modifyMode) {
      return (
        <>
          <Button
            type="primary"
            onClick={handleUpdateProfile}
            loading={loading}
            style={buttonStyle}
          >
            <EditOutlined /> Save
          </Button>
          <Button
            type="primary"
            onClick={() => setModifyMode(false)}
            style={buttonStyle}
          >
            <CloseCircleOutlined /> Cancel
          </Button>
        </>
      );
    }

    if (passwordChangeMode) {
      return (
        <>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={buttonStyle}
          >
            <CheckCircleOutlined /> Save
          </Button>
          <Button
            type="primary"
            onClick={() => setPasswordChangeMode(false)}
            style={buttonStyle}
          >
            <CloseCircleOutlined /> Cancel
          </Button>
        </>
      );
    }

    return (
      <>
        <Button
          type="primary"
          onClick={() => setModifyMode(true)}
          style={buttonStyle}
        >
          <EditOutlined /> Edit Profile
        </Button>
        <Button onClick={() => setPasswordChangeMode(true)} style={buttonStyle}>
          <QqOutlined /> Change Password
        </Button>
      </>
    );
  };

  const buttonStyle = {
    backgroundColor: "var(--theme)",
    color: "var(--black)",
    fontSize: "1rem",
    fontWeight: 600,
    border: "2px solid var(--theme)",
    borderRadius: "7px",
  };

  return (
    <div
      className="user"
      style={{
        margin: "auto",
        width: "50%",
      }}
    >
      <div
        style={{
          border: "4px solid var(--theme)",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="/images/profile_avatar.png"
          alt="User"
          width={200}
          height={200}
          style={{ borderRadius: "50%" }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        style={{
          marginBottom: "1rem",
          borderRadius: "5px",
          border: "2px solid var(--theme)",
          width: "100%",
        }}
      />
      <Form form={form} onFinish={handlePasswordChange}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {renderActionButton()}
        </div>
      </Form>
    </div>
  );
};

export default UserProfileHeader;
