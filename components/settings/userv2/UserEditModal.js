import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import instance from "../../../axios";

const UserEditModal = ({ visible, user, onCancel, fetchUsers }) => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(user?.profile_picture);

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

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={user}
        onFinish={handleUpdateUser}
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
          <Select>
            {/* Replace with dynamic roles */}
            <Select.Option value="1">Admin</Select.Option>
            <Select.Option value="2">Editor</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Avatar">
          <Upload
            name="avatar"
            action="/upload"
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
