import { Form, Checkbox, Button, message, Select, Input } from "antd";
import { useState } from "react";

const { TextArea } = Input;

export default function AccessControl() {
  const [form] = Form.useForm();
  const [isIpWhitelistingEnabled, setIpWhitelistingEnabled] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Access control settings saved!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to save access control settings.");
  };

  // Function to handle IP Whitelisting checkbox change
  const handleIpWhitelistingChange = (e) => {
    setIpWhitelistingEnabled(e.target.checked);
    if (!e.target.checked) {
      form.setFieldsValue({ whiteListedIps: [] }); // Clear IPs when disabled
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
      <Form
        form={form}
        name="access-control"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        initialValues={{
          emailVerification: false,
          passwordPolicy: "weak",
          sessionTimeout: 15,
          enableIpWhitelisting: false,
          whiteListedIps: [],
          enableSingleSignOn: false,
          enableTwoFactorAuth: false,
        }}
      >
        <Form.Item name="emailVerification" valuePropName="checked">
          <Checkbox>Email Verification</Checkbox>
        </Form.Item>
        <Form.Item name="passwordPolicy" label="Password Policy">
          <Select placeholder="Select password policy" allowClear>
            <Select.Option value="weak">Weak (4+ characters)</Select.Option>
            <Select.Option value="medium">
              Medium (6+ characters, mixed case, numbers)
            </Select.Option>
            <Select.Option value="strong">
              Strong (8+ characters, mixed case, numbers, symbols)
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="sessionTimeout" label="Session Timeout">
          <Select placeholder="Select session timeout" allowClear>
            <Select.Option value={15}>15 minutes</Select.Option>
            <Select.Option value={30}>30 minutes</Select.Option>
            <Select.Option value={60}>1 hour</Select.Option>
            <Select.Option value={120}>2 hours</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="enableIpWhitelisting" valuePropName="checked">
          <Checkbox onChange={handleIpWhitelistingChange}>
            Enable IP Whitelisting
          </Checkbox>
        </Form.Item>
        <Form.Item name="whiteListedIps">
          <Select
            mode="tags"
            placeholder="Enter white-listed IPs"
            style={{ width: "100%" }}
            allowClear
            disabled={!isIpWhitelistingEnabled} // Dynamically disable based on checkbox state
          />
        </Form.Item>
        <Form.Item name="enableSingleSignOn" valuePropName="checked">
          <Checkbox>Enable Single Sign-On</Checkbox>
        </Form.Item>
        <Form.Item name="enableTwoFactorAuth" valuePropName="checked">
          <Checkbox>Enable Two Factor Authentication</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "var(--theme)",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: 500,
            }}
          >
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
