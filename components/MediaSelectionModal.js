import React, { useEffect, useState } from "react";
import instance from "../axios";
import { Col, Checkbox, Image, Row } from "antd";
import Loader from "./Loader";

const MediaSelectionModal = ({ media, selectedMedia, setSelectedMedia }) => {
  const [mediaAssets, setMediaAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  useEffect(() => {
    const fetchMediaAssets = async () => {
      try {
        setLoading(true);
        const response = await instance("/media");
        if (response.data) {
          setMediaAssets(response.data);
          setLoading(false);
        } else {
          console.error("Error fetching media assets:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching media assets:", error);
      }
    };

    fetchMediaAssets();
  }, []);

  const handleMediaSelection = (mediaId) => {
    setSelectedMedia((prevSelectedMedia) => {
      if (prevSelectedMedia?.includes(mediaId)) {
        return prevSelectedMedia?.filter((id) => id !== mediaId);
      } else {
        return [...prevSelectedMedia, mediaId];
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mediaSelectionModal">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {mediaAssets?.map((mediaItem, index) => (
          <Col key={index} span={6} style={{ marginTop: "1rem" }}>
            <label>
              <Checkbox
                checked={selectedMedia?.includes(mediaItem.id)}
                onChange={() => handleMediaSelection(mediaItem.id)}
                style={
                  {
                    position: "absolute",
                    top: 10,
                    left: 30,
                    zIndex: 1
                  }
                }
              />
              {/* Check if image or video */}
              {mediaItem.file_type.startsWith("image") ? (
                <Image
                  className="checkboxmedia"
                  preview={false}
                  src={`${MEDIA_URL}/${mediaItem.file_path}`}
                  alt={mediaItem.file_name}
                  style={{
                    height: "clamp(150px, 6vw, 200px)",
                    width: "clamp(150px, 6vw, 200px)",
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />
              ) : mediaItem.file_type.startsWith("video") ? (
                <video
                  className="checkboxmedia"
                  autoPlay
                  loop
                  muted
                  width="200px"
                  height="150px"
                  objectFit="cover"
                  src={`${MEDIA_URL}/${mediaItem.file_path}`}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src="/images/Image_Placeholder.png"
                  style={{
                    height: "200px",
                    width: "18vw",
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />
              )}
            </label>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MediaSelectionModal;
