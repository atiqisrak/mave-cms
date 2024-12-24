// components/Gallery/MediaCard.jsx

import React, { useEffect, useState } from "react";
import { Card, Button, Space, Tag } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import PreviewModal from "./PreviewModal";
import Image from "next/image";

const { Meta } = Card;

const MediaCard = ({ media, mediaType, handleDelete, handlePreview }) => {
  // Just show existing tags if any
  const renderTags = () => {
    if (media.tags && media.tags.length > 0) {
      return (
        <div className="mt-2 flex flex-wrap gap-2">
          {media.tags.map((t) => (
            <Tag color="orange" key={t}>
              {t}
            </Tag>
          ))}
        </div>
      );
    }
    return null;
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
      onClick={() => handlePreview(media)}
      key="preview"
      className="hover:text-green-500"
    />,
  ];

  return (
    <Card
      hoverable
      cover={
        mediaType === "image" ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
            alt={media.file_name}
            width={354}
            height={260}
            style={{ objectFit: "cover" }}
          />
        ) : mediaType === "video" ? (
          <video
            width="100%"
            height="200"
            controls
            style={{ borderRadius: "4px" }}
          >
            <source
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
              type={media.file_type}
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="document-preview flex items-center justify-center h-44 bg-gray-50">
            <iframe
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
              width="100%"
              height="100%"
            />
          </div>
        )
      }
      actions={actions}
      className="media-card shadow-md rounded-md"
    >
      <Meta
        title={media.title || media.file_name}
        description={
          <>
            <p className="text-gray-500">{media.file_name}</p>
            {renderTags()}
          </>
        }
      />
    </Card>
  );
};

export default MediaCard;
