import React, { useEffect, useState } from "react";
import instance from "../axios";
import { Col, Checkbox, Image, Row, Button } from "antd";
import Loader from "./Loader";

const MediaSelectionModal = ({ isModalVisible, setIsModalVisible, media, selectedMedia, setSelectedMedia, currentMedia }) => {
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
        return prevSelectedMedia?.filter((id) => id !== mediaId)
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
      {/* Ok & cancel Button */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
        alignItems: "center",
        position: "sticky",
        top: 50,
        backgroundColor: "white",
        zIndex: 1,
      }}>
        <Button
          type="primary"
          onClick={() => {
            setSelectedMedia([]);
          }}
          danger
        >
          Clear Selection
        </Button>
        <Button
          onClick={() => {
            setIsModalVisible(false);
          }
          }
          style={{
            backgroundColor: "var(--theme)",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
            height: "clamp(30px, 3vw, 40px)",
            width: "clamp(100px, 10vw, 200px)",
          }}
        >Submit</Button>
        <Button
          onClick={() => {
            setIsModalVisible(false);
          }
          }
          danger>Cancel</Button>
      </div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {mediaAssets?.map((mediaItem, index) => (
          <Col key={index} span={6} style={{ marginTop: "1rem" }}>
            <label>
              {console.log("Current Media", currentMedia)}
              {/* {console.log("Selected Media", selectedMedia)} */}
              {/* <Checkbox
                checked={
                  selectedMedia?.includes(mediaItem.id) ||
                  currentMedia?.map((media) => media.id).includes(mediaItem.id)}
                onChange={() => handleMediaSelection(mediaItem.id)}
                style={
                  {
                    position: "absolute",
                    top: 10,
                    left: 30,
                    zIndex: 1
                  }
                }
              /> */}
              {
                console.log("Current Media", currentMedia?.id)}{
                console.log("Selected Media", selectedMedia)
              }
              <div style={{
                position: "absolute",
                zIndex: 1,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                height: "clamp(150px, 6vw, 200px)",
                width: "clamp(150px, 6vw, 200px)",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                display: selectedMedia?.includes(mediaItem.id) ? "flex" : "none"
              }}>
                Selected
              </div>
              <div style={{
                position: "absolute",
                zIndex: 1,
                color: "white",
                backgroundColor: "var(--theme)",
                padding: "5px 15px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px 15px",
                display: currentMedia?.map((media) => media.id).includes(mediaItem.id) ? "flex" : "none"
              }}>
                Current
              </div>
              {mediaItem.file_type.startsWith("image") ? (
                <div>
                  <Image
                    onClick={() =>
                      // handleMediaSelection(mediaItem.id)}
                      // select and deselect media
                      !selectedMedia?.includes(mediaItem.id) &&
                      handleMediaSelection(mediaItem.id)
                    }
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
                </div>
              ) : mediaItem.file_type.startsWith("video") ? (
                <video
                  onClick={() => handleMediaSelection(mediaItem.id)}
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
              ) : mediaItem.file_type.startsWith("application") ?
                (
                  <Image
                    onClick={() => handleMediaSelection(mediaItem.id)}
                    preview={false}
                    src="/images/pdf_file_type.png"
                    style={{
                      height: "clamp(150px, 6vw, 200px)",
                      width: "clamp(150px, 6vw, 200px)",
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                  />
                ) :
                (
                  <Image
                    onClick={() => handleMediaSelection(mediaItem.id)}
                    preview={false}
                    src="/images/Image_Placeholder.png"
                    style={{
                      height: "clamp(150px, 6vw, 200px)",
                      width: "clamp(150px, 6vw, 200px)",
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
