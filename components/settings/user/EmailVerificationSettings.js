import React from "react";
import { Form, Checkbox, Button, message } from "antd";

const EmailVerificationSettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Email verification settings saved!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to save email verification settings.");
  };

  return (
    <Form
      form={form}
      name="email-verification-settings"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      initialValues={{
        emailVerification: true,
      }}
    >
      <Form.Item name="emailVerification" valuePropName="checked">
        <Checkbox>Email Verification</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Settings
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmailVerificationSettings;
