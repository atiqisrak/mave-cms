import React from "react";
import { Form, Input, Checkbox, Button, message } from "antd";

const AccessControlSettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Access control settings saved!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to save access control settings.");
  };

  return (
    <Form
      form={form}
      name="access-control-settings"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      initialValues={{
        sessionTimeout: 30,
        enableIPWhitelisting: false,
        whitelistedIPs: "",
      }}
    >
      <Form.Item
        label="Session Timeout (minutes)"
        name="sessionTimeout"
        rules={[
          { required: true, message: "Please input the session timeout!" },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item name="enableIPWhitelisting" valuePropName="checked">
        <Checkbox>Enable IP Whitelisting</Checkbox>
      </Form.Item>

      <Form.Item
        label="Whitelisted IPs"
        name="whitelistedIPs"
        rules={[
          { required: true, message: "Please input the whitelisted IPs!" },
        ]}
      >
        <Input.TextArea rows={4} placeholder="Enter IPs separated by commas" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Settings
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccessControlSettings;
