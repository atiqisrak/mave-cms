// components/doctoapi/FormComponents/FileUpload.js

import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";

const FileUpload = ({ onFileSelect }) => {
  const handleBeforeUpload = (file) => {
    onFileSelect(file);
    return false; // Prevent automatic upload
  };

  return (
    // <Upload beforeUpload={handleBeforeUpload} accept=".yaml,.yml">
    //   <Button icon={<UploadOutlined />}>Upload YAML File</Button>
    // </Upload>
    <Dragger
      name="file"
      multiple={false}
      beforeUpload={handleBeforeUpload}
      accept=".yaml,.yml"
    >
      <p className="ant-upload-drag-icon">
        <UploadOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag YAML file to this area to upload
      </p>
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Dragger>
  );
};

export default FileUpload;
