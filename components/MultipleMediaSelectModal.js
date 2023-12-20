import React, { useState } from "react";
import { Modal, Button, Row, Col } from "antd";
import instance from "../axios";

const MultipleMediaSelectModal = ({ media, visible, onCancel, onMediaSelect }) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [selectedMedia, setSelectedMedia] = useState(selectedMedia || []);

  const handleMediaClick = (mediaItem) => {
    const mediaId = mediaItem.id;

    // Toggle selection state
    if (selectedMedia.includes(mediaId)) {
      setSelectedMedia(selectedMedia.filter((id) => id !== mediaId));
    } else {
      setSelectedMedia([...selectedMedia, mediaId]);
    }
  };

  const handleAddMedia = () => {
    // Create a copy of the selected media for the modal
    const selectedMediaCopy = [...selectedMedia];

    // Create a FormData object for submission
    const formData = new FormData();
    selectedMediaCopy.forEach((mediaId) => {
      formData.append("media_ids[]", mediaId);
    });

    // Call the callback to handle media selection
    onMediaSelect(formData);

    // Clear selected media and close the modal
    setSelectedMedia([]);
    onCancel();
  };

  return (

    <Modal
      title="Select Media"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleAddMedia}>
          Add Media
        </Button>,
      ]}
      width="0vw"
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {media?.map((mediaItem, index) => (

<Col key={index} span={6} style={{ marginTop: "1rem" }}>
        <div
          key={mediaItem.id}
          onClick={() => handleMediaClick(mediaItem)}
          style={{
            cursor: "pointer",
            position: "relative",
            border: selectedMedia.includes(mediaItem.id) ? "2px solid #1890ff" : "none",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {mediaItem.file_type.startsWith("image") ? (
            <img
              src={`${MEDIA_URL}/${mediaItem.file_path}`}
              alt={mediaItem.file_name}
              width={"200px"}
              height={100}
              style={{
                objectFit: "cover",
                borderRadius: 10,
              }}
            />
          ) : mediaItem.file_type.startsWith("video") ? (
            <video
              controls
              width="100%"
              height={100}
              objectFit="cover"
              src={`${MEDIA_URL}/${mediaItem.file_path}`}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src="/images/Image_Placeholder.png"
              style={{
                width: "100%",
                height: 100,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />
          )}
          {selectedMedia.includes(mediaItem.id) && (
            <div
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              ✓
            </div>
          )}
        </div>

      </Col>
      ))}
      </Row>
    </Modal>
  );
};

export default MultipleMediaSelectModal;
