// components/CMSSettings/NotificationSettings.js

import React, { useEffect, useState } from "react";
import { Form, Switch, Button, message, Input } from "antd";
import instance from "../../axios";

const NotificationSettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, { config: values });
      message.success("Notification Settings updated successfully!");
    } catch (error) {
      console.error("Error updating Notification Settings:", error);
      message.error("Failed to update Notification Settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {/* Name and Description */}
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Name is required." }]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Description is required." }]}
      >
        <Input.TextArea rows={4} disabled />
      </Form.Item>

      {/* Digital Footprint */}
      <Form.Item
        name="digitalFootprint"
        label="Enable Digital Footprint"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Email Notifications */}
      <Form.Item
        name="emailNotification"
        label="Enable Email Notifications"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* SMS Notifications */}
      <Form.Item
        name="smsNotification"
        label="Enable SMS Notifications"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Push Notifications */}
      <Form.Item
        name="pushNotification"
        label="Enable Push Notifications"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Web Notifications */}
      <Form.Item
        name="webNotification"
        label="Enable Web Notifications"
        valuePropName="checked"
      >
        <Switch />
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

export default NotificationSettings;
