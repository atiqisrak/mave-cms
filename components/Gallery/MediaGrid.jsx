// components/Gallery/MediaGrid.jsx

import React from "react";
import { Row, Col } from "antd";
import MediaCard from "./MediaCard";

const MediaGrid = ({
  mediaItems,
  mediaType,
  handleEdit,
  handleDelete,
  handlePreview,
  availableTags, // New prop for available tags
}) => {
  return (
    <Row gutter={[16, 16]}>
      {mediaItems.length > 0 ? (
        mediaItems.map((media) => (
          <Col key={media.id} xs={24} sm={12} md={8} lg={6}>
            <MediaCard
              media={media}
              mediaType={mediaType}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handlePreview={handlePreview}
              availableTags={availableTags} // Pass availableTags
            />
          </Col>
        ))
      ) : (
        <Col span={24}>
          <p className="text-center text-gray-500">No media available.</p>
        </Col>
      )}
    </Row>
  );
};

export default MediaGrid;
