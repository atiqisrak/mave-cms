// components/CMSSettings/APISettings.js

import React, { useEffect, useState } from "react";
import { Form, Switch, Input, Button, message } from "antd";
import instance from "../../axios";

const APISettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, { config: values });
      message.success("API Settings updated successfully!");
    } catch (error) {
      console.error("Error updating API Settings:", error);
      message.error("Failed to update API Settings.");
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

      {/* REST API Settings */}
      <Form.Item
        name={["restApi", "enabled"]}
        label="Enable REST API"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name={["restApi", "endpoint"]}
        label="REST API Endpoint"
        rules={[
          { required: true, message: "REST API Endpoint is required." },
          { type: "url", message: "Please enter a valid URL." },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["restApi", "apiKey"]}
        label="REST API Key"
        rules={[{ required: true, message: "REST API Key is required." }]}
      >
        <Input.Password />
      </Form.Item>

      {/* GraphQL API Settings */}
      <Form.Item
        name={["graphqlApi", "enabled"]}
        label="Enable GraphQL API"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name={["graphqlApi", "endpoint"]}
        label="GraphQL API Endpoint"
        rules={[
          { required: true, message: "GraphQL API Endpoint is required." },
          { type: "url", message: "Please enter a valid URL." },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["graphqlApi", "apiKey"]}
        label="GraphQL API Key"
        rules={[{ required: true, message: "GraphQL API Key is required." }]}
      >
        <Input.Password />
      </Form.Item>

      {/* External APIs */}
      <Form.Item label="External APIs">
        {/* Google API Key */}
        <Form.Item
          name={["externalApis", "google", "apiKey"]}
          label="Google API Key"
          rules={[{ required: true, message: "Google API Key is required." }]}
        >
          <Input.Password />
        </Form.Item>

        {/* Facebook API Key */}
        <Form.Item
          name={["externalApis", "facebook", "apiKey"]}
          label="Facebook API Key"
          rules={[{ required: true, message: "Facebook API Key is required." }]}
        >
          <Input.Password />
        </Form.Item>

        {/* Twitter API Key */}
        <Form.Item
          name={["externalApis", "twitter", "apiKey"]}
          label="Twitter API Key"
          rules={[{ required: true, message: "Twitter API Key is required." }]}
        >
          <Input.Password />
        </Form.Item>

        {/* LinkedIn API Key */}
        <Form.Item
          name={["externalApis", "linkedin", "apiKey"]}
          label="LinkedIn API Key"
          rules={[{ required: true, message: "LinkedIn API Key is required." }]}
        >
          <Input.Password />
        </Form.Item>

        {/* Instagram API Key */}
        <Form.Item
          name={["externalApis", "instagram", "apiKey"]}
          label="Instagram API Key"
          rules={[
            { required: true, message: "Instagram API Key is required." },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* YouTube API Key */}
        <Form.Item
          name={["externalApis", "youtube", "apiKey"]}
          label="YouTube API Key"
          rules={[{ required: true, message: "YouTube API Key is required." }]}
        >
          <Input.Password />
        </Form.Item>

        {/* OpenAI API Key */}
        <Form.Item
          name={["externalApis", "openai", "apiKey"]}
          label="OpenAI API Key"
          rules={[{ required: true, message: "OpenAI API Key is required." }]}
        >
          <Input.Password />
        </Form.Item>

        {/* Gemini API Key */}
        <Form.Item
          name={["externalApis", "gemini", "apiKey"]}
          label="Gemini API Key"
          rules={[{ required: true, message: "Gemini API Key is required." }]}
        >
          <Input.Password />
        </Form.Item>

        {/* Cloudinary API Key */}
        <Form.Item
          name={["externalApis", "cloudinary", "apiKey"]}
          label="Cloudinary API Key"
          rules={[
            { required: true, message: "Cloudinary API Key is required." },
          ]}
        >
          <Input.Password />
        </Form.Item>
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

export default APISettings;
