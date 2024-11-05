// components/CMSSettings/SEOSettings.js

import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import instance from "../../axios";

const SEOSettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, { config: values });
      message.success("SEO Settings updated successfully!");
    } catch (error) {
      console.error("Error updating SEO Settings:", error);
      message.error("Failed to update SEO Settings.");
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

      {/* Meta Title */}
      <Form.Item
        name="metaTitle"
        label="Meta Title"
        rules={[{ required: true, message: "Meta Title is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Meta Description */}
      <Form.Item
        name="metaDescription"
        label="Meta Description"
        rules={[{ required: true, message: "Meta Description is required." }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      {/* Meta Keywords */}
      <Form.Item
        name="metaKeywords"
        label="Meta Keywords"
        rules={[{ required: true, message: "Meta Keywords are required." }]}
      >
        <Input />
      </Form.Item>

      {/* Open Graph Title */}
      <Form.Item
        name="ogTitle"
        label="Open Graph Title"
        rules={[{ required: true, message: "OG Title is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Open Graph Description */}
      <Form.Item
        name="ogDescription"
        label="Open Graph Description"
        rules={[{ required: true, message: "OG Description is required." }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      {/* Open Graph Type */}
      <Form.Item
        name="ogType"
        label="Open Graph Type"
        rules={[{ required: true, message: "OG Type is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Open Graph URL */}
      <Form.Item
        name="ogUrl"
        label="Open Graph URL"
        rules={[
          { required: true, message: "OG URL is required." },
          { type: "url", message: "Please enter a valid URL." },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Open Graph Image URL */}
      <Form.Item
        name="ogImage"
        label="Open Graph Image URL"
        rules={[
          { required: true, message: "OG Image URL is required." },
          { type: "url", message: "Please enter a valid URL." },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Twitter Title */}
      <Form.Item
        name="twitterTitle"
        label="Twitter Title"
        rules={[{ required: true, message: "Twitter Title is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Twitter Description */}
      <Form.Item
        name="twitterDescription"
        label="Twitter Description"
        rules={[
          { required: true, message: "Twitter Description is required." },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      {/* Twitter Image URL */}
      <Form.Item
        name="twitterImage"
        label="Twitter Image URL"
        rules={[
          { required: true, message: "Twitter Image URL is required." },
          { type: "url", message: "Please enter a valid URL." },
        ]}
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

export default SEOSettings;
