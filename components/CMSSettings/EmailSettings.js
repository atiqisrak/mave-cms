// components/CMSSettings/EmailSettings.js

import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import instance from "../../axios";

const { Option } = Select;

const EmailSettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, {
        type: "email-settings",
        config: {
          name: "Email Settings",
          description: "Email Settings for MAVE",
          ...values,
        },
      });
      message.success("Email Settings updated successfully!");
    } catch (error) {
      console.error("Error updating Email Settings:", error);
      message.error("Failed to update Email Settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {/* Mail Driver */}
      <Form.Item
        name="mailDriver"
        label="Mail Driver"
        rules={[{ required: true, message: "Mail Driver is required." }]}
      >
        <Select>
          <Option value="smtp">SMTP</Option>
          <Option value="sendmail">Sendmail</Option>
          <Option value="mailgun">Mailgun</Option>
          <Option value="ses">SES</Option>
          {/* Add more drivers as needed */}
        </Select>
      </Form.Item>

      {/* Mail Host */}
      <Form.Item
        name="mailHost"
        label="Mail Host"
        rules={[{ required: true, message: "Mail Host is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Mail Port */}
      <Form.Item
        name="mailPort"
        label="Mail Port"
        rules={[
          { required: true, message: "Mail Port is required." },
          {
            type: "number",
            min: 1,
            max: 65535,
            message: "Please enter a valid port number.",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      {/* Mail Username */}
      <Form.Item
        name="mailUsername"
        label="Mail Username"
        rules={[{ required: true, message: "Mail Username is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Mail Password */}
      <Form.Item
        name="mailPassword"
        label="Mail Password"
        rules={[{ required: true, message: "Mail Password is required." }]}
      >
        <Input.Password />
      </Form.Item>

      {/* Mail Encryption */}
      <Form.Item
        name="mailEncryption"
        label="Mail Encryption"
        rules={[{ required: true, message: "Mail Encryption is required." }]}
      >
        <Select>
          <Option value="tls">TLS</Option>
          <Option value="ssl">SSL</Option>
          <Option value="none">None</Option>
        </Select>
      </Form.Item>

      {/* Mail From Address */}
      <Form.Item
        name="mailFromAddress"
        label="Mail From Address"
        rules={[
          { required: true, message: "Mail From Address is required." },
          { type: "email", message: "Please enter a valid email address." },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Mail From Name */}
      <Form.Item
        name="mailFromName"
        label="Mail From Name"
        rules={[{ required: true, message: "Mail From Name is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Save Button */}
      <Form.Item>
        <Button className="mavebutton" htmlType="submit" loading={saving}>
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmailSettings;
