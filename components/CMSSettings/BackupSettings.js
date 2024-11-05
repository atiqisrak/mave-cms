// components/CMSSettings/BackupSettings.js

import React, { useEffect, useState } from "react";
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Button,
  message,
} from "antd";
import instance from "../../axios";

const { Option } = Select;

const BackupSettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, { config: values });
      message.success("Backup Settings updated successfully!");
    } catch (error) {
      console.error("Error updating Backup Settings:", error);
      message.error("Failed to update Backup Settings.");
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

      {/* Backup Frequency */}
      <Form.Item
        name="backupFrequency"
        label="Backup Frequency"
        rules={[{ required: true, message: "Backup Frequency is required." }]}
      >
        <Select>
          <Option value="daily">Daily</Option>
          <Option value="weekly">Weekly</Option>
          <Option value="monthly">Monthly</Option>
        </Select>
      </Form.Item>

      {/* Backup Time */}
      <Form.Item
        name="backupTime"
        label="Backup Time"
        rules={[{ required: true, message: "Backup Time is required." }]}
      >
        <Input type="time" />
      </Form.Item>

      {/* Backup Location */}
      <Form.Item
        name="backupLocation"
        label="Backup Location"
        rules={[{ required: true, message: "Backup Location is required." }]}
      >
        <Select>
          <Option value="local">Local</Option>
          <Option value="remote">Remote</Option>
        </Select>
      </Form.Item>

      {/* Backup Destination */}
      <Form.Item
        name="backupDestination"
        label="Backup Destination"
        rules={[{ required: true, message: "Backup Destination is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Remote Backup Settings */}
      <Form.Item label="Remote Backup Settings">
        <Form.Item
          name={["remoteBackupSettings", "provider"]}
          label="Remote Backup Provider"
          rules={[
            { required: true, message: "Remote Backup Provider is required." },
          ]}
        >
          {/* <Input /> */}
          <Select
            placeholder="Select a provider"
            allowClear
            showSearch
            optionFilterProp="children"
          >
            <Option value="aws">AWS S3</Option>
            <Option value="gcp">Google Cloud Storage</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name={["remoteBackupSettings", "bucketName"]}
          label="Bucket Name"
          rules={[{ required: true, message: "Bucket Name is required." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["remoteBackupSettings", "accessKey"]}
          label="Access Key"
          rules={[{ required: true, message: "Access Key is required." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["remoteBackupSettings", "secretKey"]}
          label="Secret Key"
          rules={[{ required: true, message: "Secret Key is required." }]}
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

export default BackupSettings;
