// components/Gallery/PreviewModal.jsx

import React from "react";
import { Modal, Image } from "antd";

const PreviewModal = ({ visible, onClose, media, mediaType }) => {
  const renderPreviewContent = () => {
    switch (mediaType) {
      case "image":
        return (
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
            alt={media.file_name}
            width={600}
            height={400}
            objectFit="contain"
          />
        );
      case "video":
        return (
          <video width="100%" height="400" controls>
            <source
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
              type={media.file_type}
            />
            Your browser does not support the video tag.
          </video>
        );
      case "document":
        return (
          <div className="document-preview flex flex-col items-center justify-center h-96">
            <img
              src="/icons/document-icon.svg"
              alt="Document"
              width={128}
              height={128}
            />
            <p className="mt-4 text-lg text-gray-700">{media.file_name}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      title={media.title || media.file_name}
    >
      {renderPreviewContent()}
    </Modal>
  );
};

export default PreviewModal;
