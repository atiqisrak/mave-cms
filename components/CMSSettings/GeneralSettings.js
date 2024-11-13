// components/CMSSettings/GeneralSettings.js

import React, { useEffect, useState } from "react";
import { Form, Input, Select, Switch, Button, message, Tooltip } from "antd";
import instance from "../../axios";
import { setThemeColors } from "../../utils/themeUtils";

const { Option } = Select;

const GeneralSettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  // Define theme options with theme and accent colors
  const theme_options = [
    {
      name: "Default",
      theme: "#fcb813",
      accent: "#e3a611",
    },
    {
      name: "Orange",
      theme: "#fb5607",
      accent: "#f27059",
    },
    {
      name: "Red",
      theme: "#ff006e",
      accent: "#9d0208",
    },
    {
      name: "Violet",
      theme: "#8338ec",
      accent: "#7209b7",
    },
    {
      name: "Blue",
      theme: "#3a86ff",
      accent: "#0096c7",
    },
    {
      name: "Green",
      theme: "#7ae582",
      accent: "#25a18e",
    },
  ];

  useEffect(() => {
    // Assuming config prop has 'type', 'config', 'media_list', 'created_by'
    form.setFieldsValue(config); // Set form fields with config
    // Apply the initial theme
    if (config.themecolor && config.themeaccent) {
      setThemeColors(config.themecolor, config.themeaccent);
    }
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      // Construct the payload
      const payload = {
        type: "general-settings",
        config: {
          name: "General Settings",
          description: "General Settings for MAVE",
          ...values,
        },
        media_list: config.media_list || null,
        created_by: config.created_by || null,
      };

      await instance.put(`/settings/${id}`, payload);
      message.success("General Settings updated successfully!");

      // Apply the updated theme
      if (values.themecolor && values.themeaccent) {
        setThemeColors(values.themecolor, values.themeaccent);
      }
    } catch (error) {
      console.error("Error updating General Settings:", error);
      message.error("Failed to update General Settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleThemeSelection = (value) => {
    const selectedTheme = theme_options.find((theme) => theme.name === value);
    if (selectedTheme) {
      // Update both themecolor and themeaccent in the form
      form.setFieldsValue({
        themecolor: selectedTheme.theme,
        themeaccent: selectedTheme.accent,
      });
      // Apply the theme colors immediately
      setThemeColors(selectedTheme.theme, selectedTheme.accent);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
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

      {/* Single Theme Selection */}
      <Form.Item
        label="Theme"
        name="theme"
        rules={[{ required: true, message: "Theme selection is required." }]}
      >
        <Select
          placeholder="Select Theme"
          onChange={(value) => {
            const selectedTheme = theme_options.find(
              (theme) => theme.name === value
            );
            if (selectedTheme) {
              handleThemeSelection(selectedTheme.theme, selectedTheme.accent);
            }
          }}
        >
          {theme_options.map((theme) => (
            <Option key={theme.name} value={theme.name}>
              <div
                style={{
                  display: "inline-block",
                  width: "16px",
                  height: "16px",
                  backgroundColor: theme.theme,
                  marginRight: "8px",
                  borderRadius: "50%",
                }}
              ></div>
              {theme.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Save Button */}
      <Form.Item>
        <Tooltip title="Click to save changes and apply the theme">
          <Button className="mavebutton" htmlType="submit" loading={saving}>
            Save Changes
          </Button>
        </Tooltip>
      </Form.Item>
    </Form>
  );
};

export default GeneralSettings;
