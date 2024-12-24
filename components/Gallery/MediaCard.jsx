// components/Gallery/MediaCard.jsx

import React from "react";
import { Card, Button, Tag, Popconfirm } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Meta } = Card;

const MediaCard = ({ media, mediaType, handleDelete, handlePreview }) => {
  // Render tags with horizontal scroll and consistent height
  const renderTags = () => {
    return (
      <div className="mt-2 flex space-x-2 overflow-x-auto no-scrollbar min-h-[24px]">
        {media.tags && media.tags.length > 0 ? (
          media.tags.map((t) => (
            <Tag color="orange" key={t} className="flex-shrink-0">
              {t}
            </Tag>
          ))
        ) : (
          <div className="invisible">No Tags</div> // Placeholder for consistent height
        )}
      </div>
    );
  };

  const actions = [
    <Button
      type="link"
      icon={<EyeOutlined />}
      onClick={() => handlePreview(media)}
      key="preview"
      className="hover:text-green-500"
    />,
    // <Button
    //   type="link"
    //   icon={<DeleteOutlined />}
    //   onClick={() => handleDelete(media.id)}
    //   key="delete"
    //   danger
    //   className="hover:text-red-500"
    // />,
    <Popconfirm
      title="Are you sure you want to delete this media?"
      onConfirm={() => handleDelete(media.id)}
      okText="Yes"
      cancelText="No"
      key="delete"
    >
      <Button
        type="link"
        icon={<DeleteOutlined />}
        danger
        className="hover:text-red-500"
      />
    </Popconfirm>,
  ];

  // Responsive media container
  const renderMedia = () => {
    if (mediaType === "image") {
      return (
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-64">
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
            alt={media.file_name}
            layout="fill"
            objectFit="cover"
            objectPosition={
              media.file_type.startsWith("image/") ? "left" : "top"
            }
            className="rounded-t-md"
          />
        </div>
      );
    } else if (mediaType === "video") {
      return (
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
          <video className="w-full h-full object-cover rounded-t-md" controls>
            <source
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
              type={media.file_type}
            />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-100 rounded-t-md">
          <iframe
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
            title={media.file_name}
            className="w-full h-full rounded-md"
          />
        </div>
      );
    }
  };

  return (
    <Card
      hoverable
      cover={renderMedia()}
      actions={actions}
      className="media-card shadow-md rounded-md overflow-hidden"
    >
      <Meta
        className="pt-6"
        title={media.title || media.file_name}
        description={
          <>
            <p className="text-gray-500 text-sm truncate">{media.file_name}</p>
            {renderTags()}
          </>
        }
      />
    </Card>
  );
};

export default MediaCard;
