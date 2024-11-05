// components/CMSSettings/SecuritySettings.js

import React, { useEffect, useState } from "react";
import {
  Form,
  Switch,
  Select,
  Input,
  InputNumber,
  Button,
  message,
} from "antd";
import instance from "../../axios";

const { Option } = Select;

const SecuritySettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, { config: values });
      message.success("Security Settings updated successfully!");
    } catch (error) {
      console.error("Error updating Security Settings:", error);
      message.error("Failed to update Security Settings.");
    } finally {
      setSaving(false);
    }
  };

  // const fetchPermissions = async () => {
  //   try {
  //     const response = await instance.get("/permissions");
  //     setPermissions(response.data);
  //   } catch (error) {
  //     console.error("Error fetching permissions:", error);
  //   }
  // };

  const fetchRolesPermissions = async () => {
    try {
      const rolesResponse = await instance.get("/roles");
      const permissionsResponse = await instance.get("/permissions");

      if (rolesResponse.data && permissionsResponse.data) {
        setRoles(rolesResponse.data);
        setPermissions(permissionsResponse.data);
      } else {
        console.error("Error fetching roles and permissions.");
      }
    } catch (error) {
      console.error("Error fetching roles and permissions:", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchRolesPermissions();
  }, []);

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

      {/* Enable Registration */}
      <Form.Item
        name={["registration", "enabled"]}
        label="Enable Registration"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Default Role */}
      {/* <Form.Item
        name={["registration", "defaultRole"]}
        label="Default Role"
        rules={[{ required: true, message: "Default Role is required." }]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        name={["registration", "defaultRole"]}
        label="Default Role"
        rules={[{ required: true, message: "Default Role is required." }]}
      >
        <Select placeholder="Select default role">
          {roles?.map((role) => (
            <Option key={role.id} value={role.id}>
              {role.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/* Default Permissions */}
      <Form.Item
        name={["registration", "defaultPermissions"]}
        label="Default Permissions"
        rules={[
          { required: true, message: "Please select at least one permission." },
        ]}
      >
        <Select mode="multiple" placeholder="Select default permissions">
          {permissions?.map((permission) => (
            <Option key={permission.id} value={permission.id}>
              {permission.category} &gt; {permission.title}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Default User Status */}
      <Form.Item
        name={["registration", "defaultUserStatus"]}
        label="Default User Status"
        rules={[
          { required: true, message: "Default User Status is required." },
        ]}
      >
        <Select>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
          <Option value="pending">Pending</Option>
        </Select>
      </Form.Item>

      {/* Enable IP Whitelisting */}
      <Form.Item
        name={["ipWhitelisting", "enabled"]}
        label="Enable IP Whitelisting"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Allowed IPs */}
      <Form.Item
        name={["ipWhitelisting", "allowedIps"]}
        label="Allowed IPs"
        dependencies={[["ipWhitelisting", "enabled"]]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!getFieldValue(["ipWhitelisting", "enabled"]) || value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Please enter allowed IPs."));
            },
          }),
        ]}
      >
        <Input.TextArea
          rows={4}
          placeholder="Enter allowed IPs, one per line"
        />
      </Form.Item>

      {/* Enable IP Blacklisting */}
      <Form.Item
        name={["ipBlacklisting", "enabled"]}
        label="Enable IP Blacklisting"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Blocked IPs */}
      <Form.Item
        name={["ipBlacklisting", "blockedIps"]}
        label="Blocked IPs"
        dependencies={[["ipBlacklisting", "enabled"]]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!getFieldValue(["ipBlacklisting", "enabled"]) || value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Please enter blocked IPs."));
            },
          }),
        ]}
      >
        <Input.TextArea
          rows={4}
          placeholder="Enter blocked IPs, one per line"
        />
      </Form.Item>

      {/* Enable Two-Factor Authentication */}
      <Form.Item
        name="twoFactorAuthentication"
        label="Enable Two-Factor Authentication"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Enable Session Timeout */}
      <Form.Item
        name={["sessionManagement", "sessionTimeoutEnabled"]}
        label="Enable Session Timeout"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Session Timeout Minutes */}
      <Form.Item
        name={["sessionManagement", "sessionTimeoutMinutes"]}
        label="Session Timeout (Minutes)"
        dependencies={[["sessionManagement", "sessionTimeoutEnabled"]]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (
                !getFieldValue([
                  "sessionManagement",
                  "sessionTimeoutEnabled",
                ]) ||
                (value >= 1 && value <= 1440)
              ) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Please enter a valid number of minutes (1-1440).")
              );
            },
          }),
        ]}
      >
        <InputNumber min={1} max={1440} />
      </Form.Item>

      {/* Enable Single Sign-On */}
      <Form.Item
        name={["singleSignOn", "enabled"]}
        label="Enable Single Sign-On"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* SSO Providers */}
      <Form.Item
        name={["singleSignOn", "providers"]}
        label="SSO Providers"
        dependencies={[["singleSignOn", "enabled"]]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (
                !getFieldValue(["singleSignOn", "enabled"]) ||
                (value && value.length > 0)
              ) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Please select at least one SSO provider.")
              );
            },
          }),
        ]}
      >
        <Select mode="multiple" placeholder="Select SSO providers">
          <Option value="Google">Google</Option>
          <Option value="Facebook">Facebook</Option>
          <Option value="GitHub">GitHub</Option>
          {/* Add more providers as needed */}
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

export default SecuritySettings;
