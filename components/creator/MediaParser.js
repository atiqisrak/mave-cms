import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { Button, Image, Modal, Pagination, Select, message } from "antd";
import SingleMediaSelect from "../SingleMediaSelect";

const MediaParser = ({ item, editMode, onMediaSelect, setMediaId }) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [medias, setMedias] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMediaAssets, setTotalMediaAssets] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState(null);

  const fetchMedias = async () => {
    try {
      setLoading(true);
      const response = await instance("/media");
      if (response?.data) {
        // console.log('response',response)
        setMedias(response?.data);
        setTotalMediaAssets(response?.data?.length);
        // console.log("TotalMediaAssets: ", setTotalMediaAssets);
        // console.log("Medias: ", response.data);
        // message.success("Media assets fetched successfully");
        setLoading(false);
      } else {
        // console.error("Error fetching media assets:", response.data.message);
        message.error("Media files couldn't be fetched");
      }
    } catch (error) {
      // console.error("Error fetching media assets:", error);
      message.error("Media files couldn't be fetched");
    }
  };

  const handleClick = (e) => {
    setMediaId(e);
    try {
      setLoading(true);
      fetchMedias();
      if (medias) {
        setClicked(true);
        setVisible(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching media assets:", error);
    }
  };

  // const handleMediaChange = (value) => {
  //   setSelectedMedia(value);
  //   onMediaSelect(value);
  // };

  const handleMediaChange = (value) => {
    // console.log('our medias',medias)
    const selectedMedia = medias.find((media) => media.id === value);
    setSelectedMedia(value);
    // console.log("selectedMedia", selectedMedia);
    onMediaSelect({ _mave: selectedMedia, type: "media", id: value });
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Pagination
          current={currentPage}
          total={totalMediaAssets}
          responsive={true}
          showSizeChanger={false}
          onChange={handlePaginationChange}
        />
      </div>
    );
  };

  return (
    <>
      {editMode ? (
        <div>
          <Button
            type="primary"
            style={{
              marginTop: "3em",
              marginRight: "1rem",
              height: "inherit",
              backgroundColor: "var(--themes)",
            }}
            onClick={() => {
              handleClick(item);
            }}
          >
            Select Media
          </Button>

          {clicked && (
            <SingleMediaSelect
              visible={visible}
              onCancel={() => setVisible(false)}
              onMediaSelect={handleMediaChange}
              media={medias}
            />
          )}
        </div>
      ) : (
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          {item?._mave?.file_type.startsWith("image") ? (
            <img
              src={`${MEDIA_URL}/${item?._mave?.file_path}`}
              alt={item?._mave?.file_path}
              style={{ width: "15vw", height: "auto" }}
            />
          ) : item?._mave?.file_type.startsWith("video") ? (
            <video
              src={`${MEDIA_URL}/${item?._mave?.file_path}`}
              alt={item?._mave?.file_path}
              style={{ width: "15vw", height: "auto" }}
              autoPlay
              loop
              muted
            />
          ) : item?._mave?.file_type.startsWith("audio") ? (
            <audio
              src={`${MEDIA_URL}/${item?._mave?.file_path}`}
              alt={item?._mave?.file_path}
              style={{ width: "15vw", height: "auto" }}
              controls
            />
          ) : item?._mave?.file_type.startsWith("application") ? (
            <iframe
              src={`${MEDIA_URL}/${item?._mave?.file_path}`}
              style={{
                width: "300px",
                height: "40vh",
              }}
              title="document"
            />
          ) : (
            <a
              href={`${MEDIA_URL}/${item?._mave?.file_path}`}
              target="_blank"
              rel="noreferrer"
            >
              {item?._mave?.title_en}
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default MediaParser;
