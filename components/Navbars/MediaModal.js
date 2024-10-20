// components/Navbars/MediaModal.js

import React from "react";
import { Modal, Image, Row, Col } from "antd";

const MediaModal = ({ mediaList, visible, onCancel, onSelect }) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  return (
    <Modal
      title="Select a Media Item"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <div className="max-h-96 overflow-y-auto">
        <Row gutter={[16, 16]}>
          {mediaList.map((media) => (
            <Col xs={12} md={8} key={media.id}>
              <div
                onClick={() => onSelect(media)}
                className="cursor-pointer border p-2"
              >
                {media.file_type.startsWith("image/") ? (
                  <Image
                    src={`${MEDIA_URL}/${media.file_path}`}
                    alt={media.file_name}
                    className="w-full h-32 object-cover"
                    preview={false}
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                    Unsupported Media
                  </div>
                )}
                <p className="text-center mt-2">{media.file_name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Modal>
  );
};

export default MediaModal;
