import React, { useEffect, useState } from "react";
import {
  Col,
  Image,
  Row,
  Modal,
  Button,
  Select,
  Pagination,
  Skeleton,
  message,
} from "antd";
import instance from "../axios";
import Loader from "./Loader";
import { FilterOutlined } from "@ant-design/icons";

const SingleMediaSelect = ({ visible, onCancel, onMediaSelect, media }) => {
  const [mediaAssets, setMediaAssets] = useState([]);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination and Sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("DESC");
  const [filterMode, setFilterMode] = useState(false);
  const [totalMediaAssets, setTotalMediaAssets] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleMediaClick = (image) => {
    const mediaId = image.id;
    setSelectedMedia(mediaId);
  };

  const handleAddMedia = () => {
    if (selectedMedia) {
      onMediaSelect(selectedMedia);
      onCancel();
    }
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
    fetchMediaAssets(1, sortBy);
  };

  const handleFilterClick = () => {
    setFilterMode(true);
  };

  const handleFilterApply = () => {
    setFilterMode(false);
    fetchMediaAssets(currentPage, sortBy);
  };

  const handleFilterCancel = () => {
    setFilterMode(false);
  };

  const fetchMediaAssets = async (page, sort) => {
    setLoading(true);
    try {
      const response = await instance(
        `/media/pageview?page=${page}&count=${12}&order_type=${sort}`
      );
      if (Array.isArray(response.data.data)) {
        // Sort media assets based on ID
        const sortedMediaAssets = response.data.data.sort((a, b) => {
          if (sortBy === "asc") {
            return a.id - b.id;
          } else {
            return b.id - a.id;
          }
        });
        setMediaAssets(response.data.data);
        if (response.data.total) {
          setTotalMediaAssets(response.data.total);
        }
      } else {
        console.error("Error fetching media assets:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching media assets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMediaAssets(currentPage, sortBy);
    console.log("Media fetched from selector");
    // console.log("Media fetched from selector");
  }, [currentPage, sortBy]);

  if (loading) {
    return <Loader />;
  }

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
    <Modal
      title="Select Media"
      open={visible}
      onCancel={onCancel}
      width="60vw"
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleAddMedia}>
          Add Media
        </Button>,
      ]}
    >
      <Button
        onClick={handleFilterClick}
        style={{
          backgroundColor: "var(--themes)",
          color: "var(--white)",
          fontSize: "1.1rem",
          padding: "1.2em 1.2em",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: "22%",
          right: "10%",
        }}
      >
        <FilterOutlined />
        Filter
      </Button>

      <div>
        {filterMode ? (
          <>
            <label>Sort By: </label>
            <Select
              showSearch
              defaultValue={sortBy}
              onChange={(value) => handleSortChange(value)}
              style={{ width: 120, marginLeft: 16 }}
            >
              <Option value="asc">First Added</Option>
              <Option value="desc">Last Added</Option>
            </Select>
          </>
        ) : null}
      </div>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {mediaAssets.map((asset) => (
          <Col key={asset.id} span={6} style={{ marginTop: "1rem" }}>
            <div
              onClick={() => handleMediaClick(asset)}
              style={{
                cursor: "pointer",
                position: "relative",
              }}
            >
              {asset.file_type.startsWith("image/") ? (
                <>
                  {isLoading ? (
                    <Skeleton.Image />
                  ) : (
                    <Image
                      preview={false}
                      src={`${MEDIA_URL}/${asset.file_path}`}
                      alt={asset.file_name}
                      style={{
                        objectFit: "contain",
                        borderRadius: 10,
                        width: "12vw",
                        height: "18vh",
                        backgroundColor: "black",
                      }}
                    />
                  )}
                </>
              ) : asset.file_type.startsWith("video/") ? (
                <>
                  <video
                    autoPlay
                    loop
                    muted
                    style={{
                      width: "12vw",
                      height: "18vh",
                    }}
                  >
                    <source
                      src={`${MEDIA_URL}/${asset.file_path}`}
                      type={asset.file_type}
                    />
                    Your browser does not support the video tag.
                  </video>
                </>
              ) : asset.file_type === "application/pdf" ? (
                // <iframe
                //   src={`${MEDIA_URL}/${asset.file_path}`}
                //   width={275}
                //   height={200}
                // />
                <>
                  <img
                    src="/images/pdf_file_type.png"
                    alt="pdf"
                    style={{
                      width: "6vw",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                  <p>
                    {asset.file_name.length > 16
                      ? asset.file_name.substring(0, 16) + "..."
                      : asset.file_name}
                  </p>
                </>
              ) : (
                <p>Unsupported file format: {asset.file_type}</p>
              )}
              {selectedMedia === asset.id && (
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
      {renderPagination()}
    </Modal>
  );
};

export default SingleMediaSelect;
