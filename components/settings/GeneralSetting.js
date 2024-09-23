import React, { useEffect } from "react";
import {
  Layout,
  Breadcrumb,
  Form,
  Input,
  Button,
  Upload,
  Select,
  message,
} from "antd";
import { UploadOutlined, HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Content } = Layout;
const { Option } = Select;

const GeneralSetting = () => {
  const [form] = Form.useForm();

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("generalSettings");
    if (savedSettings) {
      form.setFieldsValue(JSON.parse(savedSettings));
    }
  }, [form]);

  // Save form data to localStorage
  const onFinish = (values) => {
    const settings = {
      siteTitle: values.siteTitle,
      siteDescription: values.siteDescription,
      logo: values.logo,
      favicon: values.favicon,
      timezone: values.timezone,
      language: values.language,
    };

    localStorage.setItem("generalSettings", JSON.stringify(settings));
    message.success("Settings saved successfully!");
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
      style={{
        backgroundColor: "#f9f9f9",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
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
        <Select placeholder="Select timezone">
          <Option value="UTC">UTC</Option>
          <Option value="GMT">GMT</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Language"
        name="language"
        rules={[{ required: true, message: "Please select the language!" }]}
      >
        <Select placeholder="Select language">
          <Option value="en">English</Option>
          <Option value="bn">Bangla</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "fit-content",
            backgroundColor: "var(--theme)",
            borderColor: "var(--theme)",
            fontSize: "1.4rem",
            fontWeight: 600,
            margin: "0 auto",
            display: "block",
            padding: "0 2rem",
            height: "4rem",
            borderRadius: "18px",
          }}
        >
          Save Settings
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GeneralSetting;
