import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import axios from "axios";
import { useState } from "react";

function UploadMedia() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { Dragger } = Upload;

  const beforeUpload = (file) => {
    const fileType = file.type;

    let sizeLimit = 0;

    if (fileType.startsWith("image/")) {
      sizeLimit = 2;
    } else if (fileType.startsWith("video/")) {
      sizeLimit = 10;
    } else if (
      fileType.startsWith("application/pdf") ||
      fileType === "application/vnd.ms-powerpoint" ||
      fileType === "application/vnd.ms-excel"
    ) {
      sizeLimit = 100;
    }

    if (sizeLimit > 0 && file.size / 1024 / 1024 > sizeLimit) {
      message.error(`File size must be smaller than ${sizeLimit}MB.`);
      return false;
    }

    return true;
  };

  const props = {
    name: "file[]",
    multiple: true,
    beforeUpload: beforeUpload,
    action: `${API_BASE_URL}/media/upload`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        message.loading({ content: "Uploading...", key: "uploading" });
      }
      if (beforeUpload && status === "done") {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (!beforeUpload || status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("File uploaded successfully.");
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
}

export default UploadMedia;
