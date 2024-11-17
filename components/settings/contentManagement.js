import React, { useEffect, useState } from "react";
import {
  Layout,
  Breadcrumb,
  Form,
  InputNumber,
  Select,
  Radio,
  Button,
  message,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import instance from "../../axios";

const { Content } = Layout;
const { Option } = Select;

const ContentManagement = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load content management settings from localStorage if available
    const contentSettings = JSON.parse(localStorage.getItem("contentSettings"));
    if (contentSettings) {
      form.setFieldsValue({
        defaultContentSettings: contentSettings.defaultContentSettings,
        uploadMaxSize: contentSettings.uploadMaxSize,
        allowedFileTypes: contentSettings.allowedFileTypes,
        viewUnpublished: contentSettings.viewUnpublished,
      });
    }
  }, []);

  const handleFormSubmit = async (values) => {
    console.log("Form Values: ", values);
    setLoading(true);
    // try{
    //   const response = await instance.post("/settings/content-management", values);
    //   console.log("Response: ", response.data);
    //   if(response.status === 200){
    //     setLoading(false);
    //     form.resetFields();
    //   } else {
    //    console.log("Failed to save content management settings.");
    //   }
    // } catch(error){
    //   console.error("Failed to save content management settings.");
    //   } finally {
    //   setLoading(false);
    // }

    // save on indexdb
    const settings = {
      defaultContentSettings: values.defaultContentSettings,
      uploadMaxSize: values.uploadMaxSize,
      allowedFileTypes: values.allowedFileTypes,
      viewUnpublished: values.viewUnpublished,
    };

    // Save settings to localStorage
    localStorage.setItem("contentSettings", JSON.stringify(settings));
    message.success("Settings saved successfully!");
    form.resetFields();
    setLoading(false);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSubmit}
      style={{
        backgroundColor: "#f9f9f9",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Form.Item
        label="Default Content Settings"
        name="defaultContentSettings"
        rules={[
          { required: true, message: "Please select a default setting!" },
        ]}
      >
        <Select placeholder="Select content status" allowClear showSearch>
          <Option value="draft">Draft</Option>
          <Option value="publish">Publish</Option>
          <Option value="pendingApproval">Pending Approval</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Upload File Maximum Size (MB)"
        name="uploadMaxSize"
        rules={[{ required: true, message: "Please enter a valid file size!" }]}
      >
        <InputNumber min={1} max={1000} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Allowed File Types"
        name="allowedFileTypes"
        rules={[{ required: true, message: "Please select file types!" }]}
      >
        <Select
          mode="multiple"
          placeholder="Select allowed file types"
          allowClear
          showSearch
        >
          <Option value="png">png</Option>
          <Option value="jpg">jpg</Option>
          <Option value="svg">svg</Option>
          <Option value="jpeg">jpeg</Option>
          <Option value="pdf">pdf</Option>
          <Option value="doc">doc</Option>
          <Option value="docx">docx</Option>
          <Option value="ppt">ppt</Option>
          <Option value="pptx">pptx</Option>
          <Option value="json">json</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Users Can View Unpublished Content"
        name="viewUnpublished"
        rules={[{ required: true, message: "Please select an option!" }]}
      >
        <Radio.Group>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
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

export default ContentManagement;
