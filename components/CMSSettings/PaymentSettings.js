// components/CMSSettings/PaymentSettings.js

import React, { useEffect, useState } from "react";
import { Form, Switch, Input, Button, message } from "antd";
import instance from "../../axios";

const PaymentSettings = ({ config, id }) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      await instance.put(`/settings/${id}`, {
        type: "payment-settings",
        config: values,
      });
      message.success("Payment Settings updated successfully!");
    } catch (error) {
      console.error("Error updating Payment Settings:", error);
      message.error("Failed to update Payment Settings.");
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

      {/* Enable PayPal */}
      <Form.Item
        name={["paypal", "enabled"]}
        label="Enable PayPal"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* PayPal Client ID */}
      <Form.Item
        name={["paypal", "clientId"]}
        label="PayPal Client ID"
        rules={[{ required: true, message: "Client ID is required." }]}
      >
        <Input />
      </Form.Item>

      {/* PayPal Client Secret */}
      <Form.Item
        name={["paypal", "clientSecret"]}
        label="PayPal Client Secret"
        rules={[{ required: true, message: "Client Secret is required." }]}
      >
        <Input.Password />
      </Form.Item>

      {/* Enable Stripe */}
      <Form.Item
        name={["stripe", "enabled"]}
        label="Enable Stripe"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Stripe Publishable Key */}
      <Form.Item
        name={["stripe", "publishableKey"]}
        label="Stripe Publishable Key"
        rules={[{ required: true, message: "Publishable Key is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Stripe Secret Key */}
      <Form.Item
        name={["stripe", "secretKey"]}
        label="Stripe Secret Key"
        rules={[{ required: true, message: "Secret Key is required." }]}
      >
        <Input.Password />
      </Form.Item>

      {/* Enable Razorpay */}
      <Form.Item
        name={["razorpay", "enabled"]}
        label="Enable Razorpay"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* Razorpay Key */}
      <Form.Item
        name={["razorpay", "key"]}
        label="Razorpay Key"
        rules={[{ required: true, message: "Razorpay Key is required." }]}
      >
        <Input />
      </Form.Item>

      {/* Razorpay Secret */}
      <Form.Item
        name={["razorpay", "secret"]}
        label="Razorpay Secret"
        rules={[{ required: true, message: "Razorpay Secret is required." }]}
      >
        <Input.Password />
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

export default PaymentSettings;
