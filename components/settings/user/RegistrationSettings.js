import React from "react";
import { Form, Checkbox, Button, message } from "antd";

const RegistrationSettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Registration settings saved!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to save registration settings.");
  };

  return (
    <Form
      form={form}
      name="registration-settings"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      initialValues={{
        userRegistration: true,
        emailVerification: false,
      }}
    >
      <Form.Item name="userRegistration" valuePropName="checked">
        <Checkbox>User Registration</Checkbox>
      </Form.Item>

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

export default RegistrationSettings;
