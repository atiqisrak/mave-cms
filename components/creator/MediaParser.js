import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { Button, Image, Modal, Pagination, Select } from "antd";
import SingleMediaSelect from "../SingleMediaSelect";

const MediaParser = ({ item, editMode, onMediaSelect }) => {
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
        setMedias(response?.data);
        setTotalMediaAssets(response?.data?.length);
        console.log("TotalMediaAssets: ", setTotalMediaAssets);
        console.log("Medias: ", response.data);
        setLoading(false);
      } else {
        console.error("Error fetching media assets:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching media assets:", error);
    }
  };

  const handleClick = () => {
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

  const handleMediaChange = (value) => {
    setSelectedMedia(value);
    onMediaSelect(value);
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
              marginRight: "1rem",
              height: "inherit",
              backgroundColor: "var(--themes)",
            }}
            onClick={() => {
              handleClick();
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
        <div>
          {item?._mave?.file_type.startsWith("image") ? (
            <img
              src={`${MEDIA_URL}/${item?._mave?.file_path}`}
              alt={item?._mave?.file_path}
              style={{ width: "15vw", height: "auto" }}
            />
          ) : (
            <video
              src={`${MEDIA_URL}/${item?._mave?.file_path}`}
              alt={item?._mave?.file_path}
              style={{ width: "15vw", height: "auto" }}
              autoPlay
              loop
              muted
            />
          )}
        </div>
      )}
    </>
  );
};

export default MediaParser;
