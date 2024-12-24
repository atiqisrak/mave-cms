// components/UploadMedia.jsx

import React, { useState } from "react";
import { Upload, Button, message, Progress, Tag } from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios"; // Use axios directly for Cloudinary
import instance from "../../axios"; // Existing axios instance for your backend
import Image from "next/image";
import { addMediaToDB } from "../../utils/indexedDB";

const { Dragger } = Upload;

const UploadMedia = ({
  onUploadSuccess,
  selectionMode = "single",
  onSelectMedia,
  uploadDestination = "backend", // New prop with default value
}) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleBeforeUpload = (file) => {
    const isValidSize = file.size / 1024 / 1024 < 10; // Less than 10MB
    const isValidType = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "video/mp4",
      "application/pdf",
      "application/epub",
    ].includes(file.type);
    if (!isValidSize) {
      message.error("File must be smaller than 10MB.");
    }
    if (!isValidType) {
      message.error(
        "Unsupported file type. Only JPG, PNG, MP4, PDF, and EPUB are allowed."
      );
    }
    return isValidSize && isValidType;
  };
  const handleChange = ({ file, fileList: newFileList }) => {
    // Update the fileList with progress and status
    setFileList(
      newFileList?.map((f) => {
        if (f.response) {
          f.status = "done";
        }
        return f;
      })
    );
  };

  const handleRemove = (file) => {
    setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const customUpload = async ({ onSuccess, onError, file, onProgress }) => {
    const formData = new FormData();

    let response;

    try {
      setUploading(true);
      if (uploadDestination === "cloudinary") {
        // Cloudinary Upload
        formData.append("file", file);
        formData.append("upload_preset", "mave_cms_preset"); // Ensure this preset exists in your Cloudinary account

        response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              onProgress({ percent });
            },
          }
        );

        onSuccess(response.data, file);
        message.success(`${file.name} uploaded successfully to Cloudinary.`);
        onUploadSuccess();

        // Handle selection after upload
        if (selectionMode === "single") {
          onSelectMedia([response.data]);
        } else {
          onSelectMedia(response.data);
        }
      } else {
        // Backend Upload
        formData.append("file[]", file);

        response = await instance.post("/media/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            onProgress({ percent });
          },
        });

        onSuccess(response.data, file);
        message.success(`${file.name} uploaded successfully.`);
        onUploadSuccess();

        // Handle selection after upload
        if (selectionMode === "single") {
          // Assuming response.data is an array of uploaded media
          if (Array.isArray(response.data) && response.data.length > 0) {
            onSelectMedia([response.data[0]]);
          }
        } else {
          if (Array.isArray(response.data) && response.data.length > 0) {
            onSelectMedia(response.data);
          }
        }
      }

      setUploading(false);
    } catch (error) {
      console.error("Upload error:", error);
      onError(error);
      message.error(`${file.name} upload failed.`);
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <Dragger
        multiple={selectionMode === "multiple"}
        beforeUpload={handleBeforeUpload}
        customRequest={customUpload}
        onChange={handleChange}
        onRemove={handleRemove}
        fileList={fileList}
        listType="picture"
        className="rounded-md"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined className="text-4xl text-gray-400" />
        </p>
        <p className="ant-upload-text text-lg">
          Click or drag files to this area to upload
        </p>
        <p className="ant-upload-hint text-sm text-gray-500">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other banned files
        </p>
      </Dragger>
      {fileList.length > 0 && (
        <div className="mt-4">
          {fileList?.map((file) => (
            <div
              key={file.uid}
              className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded-md"
            >
              <div className="flex items-center">
                {file.type.startsWith("image/") ? (
                  <Image
                    src={file.thumbUrl || "/icons/image-placeholder.svg"}
                    alt={file.name}
                    width={50}
                    height={50}
                    className="object-cover rounded-md"
                  />
                ) : file.type.startsWith("video/") ? (
                  <Image
                    src="/icons/video-placeholder.svg"
                    alt={file.name}
                    width={50}
                    height={50}
                  />
                ) : (
                  <Image
                    src="/icons/document-placeholder.svg"
                    alt={file.name}
                    width={50}
                    height={50}
                  />
                )}
                <div className="ml-4">
                  <p className="font-semibold">{file.name}</p>
                  {file.status === "uploading" && (
                    <Progress percent={file.percent} size="small" />
                  )}
                  {file.status === "done" && <Tag color="green">Uploaded</Tag>}
                  {file.status === "error" && <Tag color="red">Error</Tag>}
                </div>
              </div>
              <Button
                type="text"
                icon={<DeleteOutlined className="text-red-500" />}
                onClick={() => handleRemove(file)}
              />
            </div>
          ))}
        </div>
      )}
      <Button
        type="primary"
        onClick={() => {
          if (fileList.length === 0) {
            message.warning("Please select at least one file to upload.");
            return;
          }
          // Trigger upload for all files
          // Since customRequest handles upload, we might not need to do anything here
        }}
        disabled={fileList.length === 0 || uploading}
        loading={uploading}
        className="mavebutton mt-4 w-full hidden"
        icon={<UploadOutlined />}
      >
        Start Upload
      </Button>
    </div>
  );
};

export default UploadMedia;
