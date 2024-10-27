// components/CMSSettings/CacheSettings.js

import React, { useEffect, useState } from "react";
import { Form, Select, InputNumber, Button, message, Input } from "antd";
import instance from "../../axios";

const { Option } = Select;

const CacheSettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, { config: values });
      message.success("Cache Settings updated successfully!");
    } catch (error) {
      console.error("Error updating Cache Settings:", error);
      message.error("Failed to update Cache Settings.");
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

      {/* Cache Driver */}
      <Form.Item
        name="cacheDriver"
        label="Cache Driver"
        rules={[{ required: true, message: "Cache Driver is required." }]}
      >
        <Select>
          <Option value="file">File</Option>
          <Option value="redis">Redis</Option>
          <Option value="memcached">Memcached</Option>
        </Select>
      </Form.Item>

      {/* Cache Lifetime */}
      <Form.Item
        name="cacheLifetimeMinutes"
        label="Cache Lifetime (Minutes)"
        rules={[
          { required: true, message: "Cache Lifetime is required." },
          {
            type: "number",
            min: 1,
            max: 10080,
            message: "Please enter a valid number of minutes (1-10080).",
          },
        ]}
      >
        <InputNumber min={1} max={10080} />
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

export default CacheSettings;
