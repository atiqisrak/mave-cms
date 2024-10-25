// components/doctoapi/FormComponents/FileUpload.js

import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FileUpload = ({ onFileSelect }) => {
  const handleBeforeUpload = (file) => {
    onFileSelect(file);
    return false; // Prevent automatic upload
  };

  return (
    <Upload beforeUpload={handleBeforeUpload} accept=".yaml,.yml">
      <Button icon={<UploadOutlined />}>Upload YAML File</Button>
    </Upload>
  );
};

export default FileUpload;
