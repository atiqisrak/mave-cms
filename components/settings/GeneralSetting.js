import React, { useState } from "react";
import { Form, Input, Button, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const GeneralSetting = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Settings saved!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Failed to save settings.");
  };

  return (
    <Form
      form={form}
      name="general-settings"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
        label="Site Title"
        name="siteTitle"
        rules={[{ required: true, message: "Please input the site title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Site Description"
        name="siteDescription"
        rules={[
          { required: true, message: "Please input the site description!" },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Logo"
        name="logo"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
      >
        <Upload name="logo" listType="picture" maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Favicon"
        name="favicon"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
      >
        <Upload name="favicon" listType="picture" maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Timezone"
        name="timezone"
        rules={[{ required: true, message: "Please select the timezone!" }]}
      >
        <Select>
          <Option value="UTC">UTC</Option>
          <Option value="GMT">GMT</Option>
          {/* Add more timezones as needed */}
        </Select>
      </Form.Item>

      <Form.Item
        label="Language"
        name="language"
        rules={[{ required: true, message: "Please select the language!" }]}
      >
        <Select>
          <Option value="en">English</Option>
          <Option value="bn">Bangla</Option>
          {/* Add more languages as needed */}
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

export default GeneralSetting;
