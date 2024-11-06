// components/CMSSettings/PerformanceSettings.js

import React, { useEffect, useState } from "react";
import { Form, Switch, Button, message, Input } from "antd";
import instance from "../../axios";

const PerformanceSettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, {
        type: "performance-settings",
        config: values,
      });
      message.success("Performance Settings updated successfully!");
    } catch (error) {
      console.error("Error updating Performance Settings:", error);
      message.error("Failed to update Performance Settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {/* Name and Description */}
      {/* <Form.Item
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
      </Form.Item> */}

      {/* Minify HTML */}
      <Form.Item name="minifyHtml" label="Minify HTML" valuePropName="checked">
        <Switch />
      </Form.Item>

      {/* Minify CSS */}
      <Form.Item name="minifyCss" label="Minify CSS" valuePropName="checked">
        <Switch />
      </Form.Item>

      {/* Minify JS */}
      <Form.Item name="minifyJs" label="Minify JS" valuePropName="checked">
        <Switch />
      </Form.Item>

      {/* Enable GZIP Compression */}
      <Form.Item
        name="gzipCompression"
        label="Enable GZIP Compression"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Enable Browser Caching */}
      <Form.Item
        name="browserCaching"
        label="Enable Browser Caching"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Enable Lazy Loading for Images */}
      <Form.Item
        name="lazyLoadingImages"
        label="Enable Lazy Loading for Images"
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

export default PerformanceSettings;
