import React from "react";
import { Form, Checkbox, Button, message } from "antd";

const UserNotifications = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Notification settings saved!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to save notification settings.");
  };

  return (
    <Form
      form={form}
      name="user-notifications-settings"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      initialValues={{
        emailNotifications: true,
        smsNotifications: false,
        inAppNotifications: true,
      }}
    >
      <Form.Item name="emailNotifications" valuePropName="checked">
        <Checkbox>Email Notifications</Checkbox>
      </Form.Item>

      <Form.Item name="smsNotifications" valuePropName="checked">
        <Checkbox>SMS Notifications</Checkbox>
      </Form.Item>

      <Form.Item name="inAppNotifications" valuePropName="checked">
        <Checkbox>In-App Notifications</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Settings
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserNotifications;
