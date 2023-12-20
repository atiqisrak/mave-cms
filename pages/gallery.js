import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Image,
  Modal,
  Pagination,
  Row,
  Select,
  Skeleton,
  Spin,
} from "antd";
import UploadMedia from "../components/UploadMedia";
import instance from "../axios";
import { setPageTitle } from "../global/constants/pageTitle";
import Loader from "../components/Loader";
import {
  FilterOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Option } = Select;

const Gallery = () => {
  useEffect(() => {
    setPageTitle("Media Library");
  }, []);

  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mediaAssets, setMediaAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Media assets per page
  const [selectedMediaCount, setSelectedMediaCount] = useState(12);
  const [totalMediaAssets, setTotalMediaAssets] = useState(0);
  const [sortBy, setSortBy] = useState("desc");
  const [settingsVisible, setSettingsVisible] = useState(false);

  // const fetchMediaAssets = async (page, count) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await instance(
  //       `/media/pageview?page=${page}&count=${count}`
  //     );
  //     if (Array.isArray(response.data.data)) {
  //       const sortedMediaAssets = response.data.data.sort((a, b) => {
  //         if (sortBy === "asc") {
  //           return a.id - b.id;
  //         } else {
  //           return b.id - a.id;
  //         }
  //       });

  //       setMediaAssets(sortedMediaAssets);
  //       if (response.data.total) {
  //         setTotalMediaAssets(response.data.total);

  //         {
  //           console.log("Total: ", response.data.total);
  //         }
  //       }
  //     } else {
  //       console.error("Error fetching media assets:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching media assets:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const fetchMediaAssets = async (page, count) => {
    setIsLoading(true);
    try {
      const orderType = sortBy === "asc" ? "ASC" : "DESC";
      const response = await instance(
        `/media/pageview?page=${page}&count=${count}&order_type=${orderType}`
      );

      if (Array.isArray(response.data.data)) {
        // Assuming 'created_at' is the field to be used for sorting
        const sortedMediaAssets = response.data.data.sort((a, b) => {
          const timestampA = new Date(a.created_at).getTime();
          const timestampB = new Date(b.created_at).getTime();

          return sortBy === "asc"
            ? timestampA - timestampB
            : timestampB - timestampA;
        });

        setMediaAssets(sortedMediaAssets);
        if (response.data.total) {
          setTotalMediaAssets(response.data.total);
        }
      } else {
        console.error("Error fetching media assets:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching media assets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchMediaAssets(currentPage, selectedMediaCount);
  }, [currentPage, selectedMediaCount, sortBy]);

  const handleNewMediaUpload = () => {
    fetchMediaAssets();
  };

  // const onDelete = async (id) => {
  //   try {
  //     Modal.confirm({
  //       title: "Delete Media",
  //       content: "Are you sure you want to delete this media?",
  //       okText: "Yes",
  //       cancelText: "No",
  //       onOk: async () => {
  //         const response = await instance.delete(`/media/${id}`);
  //         if (response.data) {
  //           fetchMediaAssets();
  //         } else {
  //           console.error("Error deleting media:", response.data.message);
  //         }
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error deleting media:", error);
  //   }
  // };

  const onDelete = async (id) => {
    try {
      Modal.confirm({
        title: "Delete Media",
        content: "Are you sure you want to delete this media?",
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          // Update the local state to hide the media item
          setMediaAssets((prevAssets) =>
            prevAssets.filter((asset) => asset.id !== id)
          );

          try {
            // Make the server request to delete the media
            const response = await instance.delete(`/media/${id}`);
            if (response.data) {
              // Assuming the server request was successful, no need to update state again
              console.log("Media deleted successfully");
            } else {
              // Handle the case where the server request fails
              console.error("Error deleting media:", response.data.message);
            }
          } catch (error) {
            // Handle errors that occur during the server request
            console.error("Error deleting media:", error);
          }
        },
      });
    } catch (error) {
      // Handle errors that occur during the modal confirmation
      console.error("Error deleting media:", error);
    }
  };

  const handleFilterClick = () => {
    setSettingsVisible(true);
  };

  const handleFilterCancel = () => {
    setSettingsVisible(false);
  };

  return (
    <div className="login-page">
      <div className="ViewContainer ViewContentContainer media-area login-page-section">
        <h1 style={{ textAlign: "center" }}>Media Library</h1>
        <hr style={{ marginBottom: "1rem", marginTop: ".5rem" }} />

        <center>
          <Button
            type="primary"
            onClick={showModal}
            style={{
              marginBottom: "5rem",
              marginTop: "1rem",
              borderRadius: "5px",
              border: "1px solid var(--lite-dark)",
              backgroundColor: "var(--themes)",
              fontSize: "1.5rem",
              lineHeight: "1.5rem",
              padding: "1em 2em 2em 2em",
            }}
          >
            Upload Media
            <UploadOutlined />
          </Button>
        </center>

        <Button
          style={{
            backgroundColor: "var(--theme)",
            color: "var(--white)",
            fontSize: "1.1rem",
            padding: "1.2em 1.2em",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: "16%",
            right: "10%",
          }}
          onClick={() => fetchMediaAssets()}
        >
          <SyncOutlined /> Sync
        </Button>

        <Modal
          title="Upload Media"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <UploadMedia onUploadSuccess={handleNewMediaUpload} />
        </Modal>

        {isLoading ? (
          <center>
            <Spin size="large" />
          </center>
        ) : (
          <></>
        )}

        {/* Add Filter button */}
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

        <Modal
          title="Filter Settings"
          open={settingsVisible}
          onOk={handleFilterCancel}
          onCancel={handleFilterCancel}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <label>Items to Show: </label>
              <Select
                showSearch
                defaultValue={selectedMediaCount}
                onChange={(value) => setSelectedMediaCount(value)}
                style={{ width: 120 }}
              >
                <Option value={12}>12</Option>
                <Option value={24}>24</Option>
                <Option value={48}>48</Option>
                <Option value={100}>100</Option>
              </Select>
            </div>

            <div>
              <label>Sort By: </label>
              <Select
                showSearch
                defaultValue={sortBy}
                onChange={(value) => setSortBy(value)}
                style={{ width: 120, marginLeft: 16 }}
              >
                <Option value="asc">First Added</Option>
                <Option value="desc">Last Added</Option>
              </Select>
            </div>
          </div>
        </Modal>

        <Row
          gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {mediaAssets.map((asset) => (
            <Col
              span={5}
              style={{
                marginTop: "1rem",
                border: "1px solid var(--gray-dark)",
                borderRadius: "10px",
                padding: "0.6rem",
                margin: "0.4em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "var(--white)",
              }}
              key={asset.id}
            >
              {asset.file_type.startsWith("image/") ? (
                <>
                  {isLoading ? (
                    <Skeleton.Image />
                  ) : (
                    <Image
                      src={`${MEDIA_URL}/${asset.file_path}`}
                      alt={asset.file_name}
                      style={{
                        objectFit: "cover",
                        borderRadius: 10,
                        width: "12vw",
                        height: "18vh",
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
                <iframe
                  src={`${API_BASE_URL}/${asset.file_path}`}
                  width={275}
                  height={200}
                ></iframe>
              ) : (
                <p>Unsupported file format: {asset.file_type}</p>
              )}

              <div
                className="assetDescription"
                style={{
                  borderRadius: "10px",
                  padding: "1rem",
                  marginTop: "1rem",
                  border: "1px solid var(--lite-dark)",
                  overflow: "hidden",
                }}
              >
                <h4
                  style={{
                    color: "var(--theme)",
                    paddingBottom: "1rem",
                  }}
                >
                  File Type:
                  {asset.file_type.startsWith("image/") ? (
                    <span> Image</span>
                  ) : asset.file_type.startsWith("video/") ? (
                    <span> Video</span>
                  ) : asset.file_type === "application/pdf" ? (
                    <span> PDF</span>
                  ) : (
                    <span> Unsupported</span>
                  )}
                </h4>
              </div>
              <Button danger onClick={() => onDelete(asset.id)}>
                Delete
              </Button>
            </Col>
          ))}
        </Row>

        <Pagination
          current={currentPage}
          pageSize={selectedMediaCount}
          total={totalMediaAssets}
          onChange={handlePaginationChange}
          responsive={true}
          showSizeChanger={false}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        />
      </div>
    </div>
  );
};

export default Gallery;
