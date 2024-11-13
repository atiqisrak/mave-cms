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
      await instance.put(`/settings/${id}`, {
        type: "notification-settings",
        config: {
          name: "Notification Settings",
          description: "Notification Settings for MAVE",
          ...values,
        },
      });
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
