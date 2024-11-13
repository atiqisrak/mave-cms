// components/CMSSettings/AnalyticsSettings.js

import React, { useEffect, useState } from "react";
import { Form, Input, Switch, Button, message } from "antd";
import instance from "../../axios";

const AnalyticsSettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, {
        type: "analytics-settings",
        config: {
          name: "Analytics Settings",
          description: "Analytics Settings for MAVE",
          ...values,
        },
      });
      message.success("Analytics Settings updated successfully!");
    } catch (error) {
      console.error("Error updating Analytics Settings:", error);
      message.error("Failed to update Analytics Settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {/* Enable Google Analytics */}
      <Form.Item
        name={["googleAnalytics", "enabled"]}
        label="Enable Google Analytics"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Google Analytics Tracking ID */}
      <Form.Item
        name={["googleAnalytics", "trackingId"]}
        label="Google Analytics Tracking ID"
        rules={[{ required: true, message: "Tracking ID is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Enable Google Tag Manager */}
      <Form.Item
        name={["googleTagManager", "enabled"]}
        label="Enable Google Tag Manager"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Google Tag Manager Container ID */}
      <Form.Item
        name={["googleTagManager", "containerId"]}
        label="Google Tag Manager Container ID"
        rules={[{ required: true, message: "Container ID is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Enable Facebook Pixel */}
      <Form.Item
        name={["facebookPixel", "enabled"]}
        label="Enable Facebook Pixel"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Facebook Pixel ID */}
      <Form.Item
        name={["facebookPixel", "pixelId"]}
        label="Facebook Pixel ID"
        rules={[{ required: true, message: "Pixel ID is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Enable Hotjar */}
      <Form.Item
        name={["hotjar", "enabled"]}
        label="Enable Hotjar"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Hotjar Site ID */}
      <Form.Item
        name={["hotjar", "siteId"]}
        label="Hotjar Site ID"
        rules={[{ required: true, message: "Site ID is required." }]}
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

export default AnalyticsSettings;
