// components/CMSSettings/ContentSettings.js

import React, { useEffect, useState } from "react";
import { Form, Input, Select, InputNumber, Button, message } from "antd";
import instance from "../../axios";

const { Option } = Select;

const ContentSettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, {
        type: "content-settings",
        config: {
          name: "Content Settings",
          description: "Content Settings for MAVE",
          ...values,
        },
      });
      message.success("Content Settings updated successfully!");
    } catch (error) {
      console.error("Error updating Content Settings:", error);
      message.error("Failed to update Content Settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {/* Default Content Status */}
      <Form.Item
        name="contentDefaultStatus"
        label="Default Content Status"
        rules={[
          { required: true, message: "Default Content Status is required." },
        ]}
      >
        <Select showSearch>
          <Option value="draft">Draft</Option>
          <Option value="published">Published</Option>
          <Option value="archived">Archived</Option>
        </Select>
      </Form.Item>

      {/* Default Content Author */}
      <Form.Item
        name="contentDefaultAuthor"
        label="Default Content Author"
        rules={[
          { required: true, message: "Default Content Author is required." },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Maximum Upload Size */}
      <Form.Item
        name="maxUploadSizeMB"
        label="Maximum Upload Size (MB)"
        rules={[
          { required: true, message: "Maximum Upload Size is required." },
          {
            type: "number",
            min: 1,
            max: 1000,
            message: "Please enter a valid size between 1 and 1000 MB.",
          },
        ]}
      >
        <InputNumber min={1} max={1000} />
      </Form.Item>

      {/* Allowed Upload Types */}
      <Form.Item
        name="allowedUploadTypes"
        label="Allowed Upload Types"
        rules={[
          {
            required: true,
            message: "Please select at least one upload type.",
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Select allowed file types"
          showSearch
        >
          <Option value="jpg">JPG</Option>
          <Option value="jpeg">JPEG</Option>
          <Option value="png">PNG</Option>
          <Option value="gif">GIF</Option>
          <Option value="pdf">PDF</Option>
          <Option value="doc">DOC</Option>
          <Option value="docx">DOCX</Option>
          <Option value="xls">XLS</Option>
          <Option value="xlsx">XLSX</Option>
          <Option value="ppt">PPT</Option>
          <Option value="pptx">PPTX</Option>
          <Option value="zip">ZIP</Option>
          <Option value="rar">RAR</Option>
        </Select>
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

export default ContentSettings;
