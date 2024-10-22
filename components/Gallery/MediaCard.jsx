// components/Gallery/MediaCard.jsx

import React from "react";
import { Card, Button, Popover, Image } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import PreviewModal from "./PreviewModal";

const { Meta } = Card;

const MediaCard = ({
  media,
  mediaType,
  handleEdit,
  handleDelete,
  handlePreview,
}) => {
  const [isPreviewVisible, setIsPreviewVisible] = React.useState(false);

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
            width={340}
            height={200}
            objectFit="cover"
            preview={false}
          />
        );
      case "video":
        return (
          <video width="100%" height="200" controls>
            <source
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
              type={media.file_type}
            />
            Your browser does not support the video tag.
          </video>
        );
      case "document":
        return (
          <div className="document-preview flex flex-col items-center justify-center h-48">
            <img
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

  return (
    <>
      <Card
        hoverable
        cover={renderMediaContent()}
        actions={[
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={openPreview}
            key="preview"
          />,
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(media.id)}
            key="edit"
          />,
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(media.id)}
            key="delete"
            danger
          />,
        ]}
        className="media-card"
      >
        <Meta
          title={media.title || media.file_name}
          description={mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
        />
      </Card>

      {/* Preview Modal */}
      <PreviewModal
        visible={isPreviewVisible}
        onClose={closePreview}
        media={media}
        mediaType={mediaType}
      />
    </>
  );
};

export default MediaCard;
