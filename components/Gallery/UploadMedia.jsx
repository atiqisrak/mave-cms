// components/UploadMedia.jsx

import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import instance from "../../axios";

const UploadMedia = ({ onUploadSuccess }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const props = {
    multiple: true,
    beforeUpload: (file) => {
      // Validate file size and type if needed
      const isValid =
        file.size / 1024 / 1024 < 2 && // Less than 2MB
        ["image/jpeg", "image/png", "video/mp4", "application/pdf"].includes(
          file.type
        );
      if (!isValid) {
        message.error(
          "File must be smaller than 2MB and of type JPG, PNG, MP4, or PDF."
        );
      }
      return isValid || Upload.LIST_IGNORE;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
    fileList,
  };

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("media", file.originFileObj);
    });

    setUploading(true);
    try {
      const response = await instance.post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        message.success("Upload successful.");
        setFileList([]);
        onUploadSuccess(); // Refresh media assets
      } else {
        message.error("Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      message.error("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Upload {...props} listType="picture">
        <Button icon={<UploadOutlined />}>Select Files</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </div>
  );
};

export default UploadMedia;
