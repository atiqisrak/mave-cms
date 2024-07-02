import React from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ProfileManagement = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Profile updated successfully!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to update profile.");
  };

  return (
    <Form
      form={form}
      name="profile-management"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      initialValues={{
        name: "John Doe",
        email: "john@example.com",
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Profile Picture"
        name="profilePicture"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
      >
        <Upload name="profilePicture" listType="picture" maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileManagement;
