import React from "react";
import { Form, Select, Button, message } from "antd";

const { Option } = Select;

const PasswordManagementSettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Password management settings saved!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to save password management settings.");
  };

  return (
    <Form
      form={form}
      name="password-management-settings"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      initialValues={{
        passwordPolicy: "strong",
      }}
    >
      <Form.Item
        label="Password Policy"
        name="passwordPolicy"
        rules={[
          { required: true, message: "Please select a password policy!" },
        ]}
      >
        <Select>
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

export default PasswordManagementSettings;
