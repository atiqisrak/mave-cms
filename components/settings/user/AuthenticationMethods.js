import React from "react";
import { Form, Checkbox, Button, message } from "antd";

const AuthenticationMethods = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Authentication methods settings saved!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to save authentication methods settings.");
  };

  return (
    <Form
      form={form}
      name="authentication-methods-settings"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      initialValues={{
        enableSSO: false,
        enable2FA: false,
      }}
    >
      <Form.Item name="enableSSO" valuePropName="checked">
        <Checkbox>Enable Single Sign-On (SSO)</Checkbox>
      </Form.Item>

      <Form.Item name="enable2FA" valuePropName="checked">
        <Checkbox>Enable Two-Factor Authentication (2FA)</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Settings
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthenticationMethods;
