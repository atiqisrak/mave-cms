import React, { useState } from "react";
import { Form, Input, Button, Select, Checkbox, message } from "antd";

const { Option } = Select;

const ContentManagement = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Content management settings saved!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to save content management settings.");
  };

  return (
    <Form
      form={form}
      name="content-management"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
        label="Default Content Settings"
        name="defaultContentSettings"
        rules={[
          {
            required: true,
            message: "Please configure default content settings!",
          },
        ]}
      >
        <Select placeholder="Select default content settings">
          <Option value="draft">Draft</Option>
          <Option value="publish">Publish</Option>
          <Option value="autoSave">Auto-save intervals</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Media Management"
        name="mediaManagement"
        rules={[
          { required: true, message: "Please set media management settings!" },
        ]}
      >
        <Select placeholder="Select media management settings">
          <Option value="storage">Storage Options</Option>
          <Option value="fileSize">File Size Limits</Option>
          <Option value="fileTypes">Allowed File Types</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="SEO Settings"
        name="seoSettings"
        rules={[{ required: true, message: "Please configure SEO settings!" }]}
      >
        <Select placeholder="Select SEO settings">
          <Option value="metaTags">Meta Tags</Option>
          <Option value="descriptions">Descriptions</Option>
          <Option value="keywords">Keywords</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Settings
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContentManagement;
