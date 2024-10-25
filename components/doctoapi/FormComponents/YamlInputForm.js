// components/doctoapi/FormComponents/YamlInputForm.js

import React from "react";
import { Form, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "./TextArea";

const YamlInputForm = ({ onYamlChange, onFileUpload }) => {
  const handleFile = (file) => {
    onFileUpload(file);
    return false; // Prevent automatic upload
  };

  return (
    <Form layout="vertical">
      <Form.Item label="YAML Input">
        <TextArea
          onChange={onYamlChange}
          placeholder="Write your YAML here..."
          autoSize={{ minRows: 10 }}
        />
      </Form.Item>
      <Form.Item label="Or Upload YAML File">
        <Upload beforeUpload={handleFile} accept=".yaml,.yml">
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default YamlInputForm;
