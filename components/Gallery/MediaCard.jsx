// components/Gallery/MediaCard.jsx

import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import PreviewModal from "./PreviewModal";
import Image from "next/image";

const { Meta } = Card;

// Helper function to format bytes to KB or MB
const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${size} ${sizes[i]}`;
};

const MediaCard = ({
  media,
  mediaType,
  handleEdit,
  handleDelete,
  handlePreview,
}) => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [fileSize, setFileSize] = useState("Loading...");

  useEffect(() => {
    const fetchFileSize = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`,
          {
            method: "HEAD",
          }
        );
        const contentLength = response.headers.get("content-length");
        if (contentLength) {
          setFileSize(formatBytes(parseInt(contentLength, 10)));
        } else {
          setFileSize("Size not available");
        }
      } catch (error) {
        console.error("Error fetching file size:", error);
        setFileSize("Error");
      }
    };
    fetchFileSize();
  }, [media.file_path]);

  const openPreview = () => {
    setIsPreviewVisible(true);
  };

  const closePreview = () => {
    setIsPreviewVisible(false);
  };

  // Determine media preview content based on mediaType
  const renderMediaContent = () => {
    switch (mediaType) {
      case "image":
        return (
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
            alt={media.file_name}
            width={354}
            height={260}
            objectFit="cover"
            preview={false}
            className="rounded-t-md"
          />
        );
      case "video":
        return (
          <video width="100%" height="200" controls className="rounded-t-md">
            <source
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
              type={media.file_type}
            />
            Your browser does not support the video tag.
          </video>
        );
      case "document":
        return (
          <div className="document-preview flex flex-col items-center justify-center h-48 bg-gray-50">
            <Image
              src="/icons/document.svg"
              alt="Document"
              width={64}
              height={64}
            />
            <p className="mt-2 text-sm text-gray-700">{media.file_name}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const actions = [
    <Button
      type="link"
      icon={<DeleteOutlined />}
      onClick={() => handleDelete(media.id)}
      key="delete"
      danger
      className="hover:text-red-500"
    />,
    <Button
      type="link"
      icon={<EyeOutlined />}
      onClick={openPreview}
      key="preview"
      className="hover:text-green-500"
    />,
  ];

  return (
    <>
      <Card
        hoverable
        cover={renderMediaContent()}
        actions={actions}
        className="media-card shadow-md rounded-md"
      >
        <div className="media-card-meta flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <h3 className="text-lg font-semibold truncate max-w-xs">
              {media.file_name.slice(0, media.file_name.lastIndexOf("."))}
            </h3>
            <h3 className="text-lg text-gray-300 font-semibold flex items-center">
              1 MB
            </h3>
          </div>
          <span className="text-lg text-gray-400 font-semibold capitalize flex items-center">
            {mediaType}
          </span>
        </div>
      </Card>

      {/* Preview Modal */}
      <PreviewModal
        visible={isPreviewVisible}
        onClose={closePreview}
        media={media}
        mediaType={mediaType}
        handleEdit={handleEdit}
      />
    </>
  );
};

export default MediaCard;
