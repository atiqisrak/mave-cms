import React, { useState } from "react";
import { Form, Input, Button, Select, Checkbox, message } from "antd";

const { Option } = Select;

const UserManagement = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("User management settings saved!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to save user management settings.");
  };

  return (
    <Form
      form={form}
      name="user-management"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
        label="User Roles and Permissions"
        name="userRoles"
        rules={[
          {
            required: true,
            message: "Please define user roles and permissions!",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Select user roles">
          <Option value="admin">Admin</Option>
          <Option value="editor">Editor</Option>
          <Option value="viewer">Viewer</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="userRegistration"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox>User Registration</Checkbox>
      </Form.Item>

      <Form.Item
        name="emailVerification"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox>Email Verification</Checkbox>
      </Form.Item>

      <Form.Item
        label="Password Policy"
        name="passwordPolicy"
        rules={[{ required: true, message: "Please set a password policy!" }]}
      >
        <Select placeholder="Select password policy">
          <Option value="strong">
            Strong (8+ characters, mixed case, numbers, symbols)
          </Option>
          <Option value="medium">
            Medium (6+ characters, mixed case, numbers)
          </Option>
          <Option value="weak">Weak (4+ characters)</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Settings
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserManagement;
