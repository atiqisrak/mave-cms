// components/CMSSettings/GeneralSettings.js

import React, { useEffect, useState } from "react";
import { Form, Input, Select, Switch, Button, message } from "antd";
import instance from "../../axios";

const { Option } = Select;

const GeneralSettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, { config: values });
      message.success("General Settings updated successfully!");
    } catch (error) {
      console.error("Error updating General Settings:", error);
      message.error("Failed to update General Settings.");
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

      {/* Site Title */}
      <Form.Item
        name="siteTitle"
        label="Site Title"
        rules={[{ required: true, message: "Site Title is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Site Description */}
      <Form.Item
        name="siteDescription"
        label="Site Description"
        rules={[{ required: true, message: "Site Description is required." }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      {/* Site Logo URL */}
      <Form.Item
        name="siteLogo"
        label="Site Logo URL"
        rules={[
          { required: true, message: "Site Logo URL is required." },
          { type: "url", message: "Please enter a valid URL." },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Site Favicon URL */}
      <Form.Item
        name="siteFavicon"
        label="Site Favicon URL"
        rules={[
          { required: true, message: "Site Favicon URL is required." },
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

      {/* Site Social Links */}
      <Form.Item name="siteSocialLinks" label="Site Social Links">
        <Input.Group compact>
          <Form.Item
            name={["siteSocialLinks", "facebook"]}
            noStyle
            rules={[
              { type: "url", message: "Please enter a valid Facebook URL." },
            ]}
          >
            <Input style={{ width: "25%" }} placeholder="Facebook URL" />
          </Form.Item>
          <Form.Item
            name={["siteSocialLinks", "twitter"]}
            noStyle
            rules={[
              { type: "url", message: "Please enter a valid Twitter URL." },
            ]}
          >
            <Input style={{ width: "25%" }} placeholder="Twitter URL" />
          </Form.Item>
          <Form.Item
            name={["siteSocialLinks", "linkedin"]}
            noStyle
            rules={[
              { type: "url", message: "Please enter a valid LinkedIn URL." },
            ]}
          >
            <Input style={{ width: "25%" }} placeholder="LinkedIn URL" />
          </Form.Item>
          <Form.Item
            name={["siteSocialLinks", "instagram"]}
            noStyle
            rules={[
              { type: "url", message: "Please enter a valid Instagram URL." },
            ]}
          >
            <Input style={{ width: "25%" }} placeholder="Instagram URL" />
          </Form.Item>
        </Input.Group>
      </Form.Item>

      {/* Timezone */}
      <Form.Item
        name="timezone"
        label="Timezone"
        rules={[{ required: true, message: "Timezone is required." }]}
      >
        <Select>
          <Option value="Asia/Dhaka">Asia/Dhaka</Option>
          <Option value="America/New_York">America/New_York</Option>
          <Option value="Europe/London">Europe/London</Option>
          <Option value="Asia/Tokyo">Asia/Tokyo</Option>
          {/* Add more timezones as needed */}
        </Select>
      </Form.Item>

      {/* Date Format */}
      <Form.Item
        name="dateFormat"
        label="Date Format"
        rules={[{ required: true, message: "Date Format is required." }]}
      >
        <Select>
          <Option value="DD-MM-YYYY">DD-MM-YYYY</Option>
          <Option value="MM-DD-YYYY">MM-DD-YYYY</Option>
          <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
          {/* Add more formats as needed */}
        </Select>
      </Form.Item>

      {/* Time Format */}
      <Form.Item
        name="timeFormat"
        label="Time Format"
        rules={[{ required: true, message: "Time Format is required." }]}
      >
        <Select>
          <Option value="hh:mm A">12-hour (hh:mm AM/PM)</Option>
          <Option value="HH:mm">24-hour (HH:mm)</Option>
        </Select>
      </Form.Item>

      {/* Enable Google Crawler */}
      <Form.Item
        name="googleCrawler"
        label="Enable Google Crawler"
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

export default GeneralSettings;
