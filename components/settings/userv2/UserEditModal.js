import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import instance from "../../../axios";

const { Option } = Select;

const UserEditModal = ({ visible, user, onCancel, fetchUsers, roles }) => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(user?.profile_picture);

  useEffect(() => {
    setAvatar(user?.profile_picture); // Set initial avatar state
    form.setFieldsValue({
      ...user,
      role_id: parseInt(user?.role_id), // Set the initial role ID value correctly
    });
  }, [user, form]);

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      setAvatar(info.file.response.url); // Adjust this according to your backend response
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleUpdateUser = async (values) => {
    try {
      await instance.put(`/admin/user/${user.id}`, {
        ...values,
        profile_picture: avatar,
      });
      message.success("User updated successfully");
      fetchUsers();
      onCancel();
    } catch (error) {
      message.error("Failed to update user");
    }
  };

  // Ensure role is correctly selected and mapped
  const userRole = roles?.find((role) => role?.id === parseInt(user?.role_id));

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      footer={[
        <Button key="back" onClick={onCancel} danger>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          style={{
            backgroundColor: "var(--theme)",
            borderColor: "var(--theme)",
            fontWeight: 600,
          }}
          onClick={() => form.submit()}
        >
          Update
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateUser}
        initialValues={{
          name: user?.name,
          email: user?.email,
          role_id: userRole?.id,
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter the email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role_id"
          label="Role"
          rules={[{ required: true, message: "Please select the role" }]}
        >
          <Select value={userRole?.id}>
            {roles?.map((role) => (
              <Option key={role.id} value={role.id}>
                {role.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Avatar">
          <Upload
            name="avatar"
            action="/upload" // Adjust this URL to your backend endpoint
            onChange={handleUploadChange}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserEditModal;
