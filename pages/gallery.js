import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Skeleton,
  Spin,
  Tabs,
  message,
} from "antd";
import UploadMedia from "../components/UploadMedia";
import instance from "../axios";
import { setPageTitle } from "../global/constants/pageTitle";
import Loader from "../components/Loader";
import {
  CheckCircleTwoTone,
  CloseCircleOutlined,
  DeleteFilled,
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FilterOutlined,
  SyncOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Option } = Select;
import { Document, Page } from "react-pdf";
import Image from "next/image";
import Documents from "./documents";

const Gallery = () => {
  useEffect(() => {
    setPageTitle("Media Library");
  }, []);

  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mediaAssets, setMediaAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const [bulkSelectionVisible, setBulkSelectionVisible] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Media assets per page
  const [selectedMediaCount, setSelectedMediaCount] = useState(12);
  const [totalMediaAssets, setTotalMediaAssets] = useState(0);
  const [sortBy, setSortBy] = useState("desc");
  const [settingsVisible, setSettingsVisible] = useState(false);

  const fetchMediaAssets = async (page, count) => {
    setIsLoading(true);
    try {
      const orderType = sortBy === "asc" ? "ASC" : "DESC";
      const response = await instance(
        `/media/pageview?page=${page}&count=${count}&order_type=${orderType}`
      );

      if (Array.isArray(response.data.data)) {
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

  useEffect(() => {
    mediaAssets &&
      mediaAssets.map((asset) => {
        if (asset.file_type.startsWith("image/")) {
          setImages((prevImages) => [...prevImages, asset]);
        } else if (asset.file_type.startsWith("video/")) {
          setVideos((prevVideos) => [...prevVideos, asset]);
        } else if (asset.file_type === "application/pdf") {
          setPdfs((prevPdfs) => [...prevPdfs, asset]);
        }
      });
  }, [mediaAssets]);

  const handleNewMediaUpload = () => {
    window.location.reload();
  };

  const onDelete = async (id) => {
    try {
      Modal.confirm({
        title: "Delete Media",
        content: "Are you sure you want to delete this media?",
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          setMediaAssets((prevAssets) =>
            prevAssets.filter((asset) => asset.id !== id)
          );

          try {
            const response = await instance.delete(`/media/${id}`);
            if (response.data) {
              console.log("Media deleted successfully");
            } else {
              message.error("Error deleting media");
            }
          } catch (error) {
            message.error("Error deleting media");
          }
        },
      });
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  const handleFilterClick = () => {
    setSettingsVisible(true);
  };

  const handleFilterCancel = () => {
    setSettingsVisible(false);
  };

  const handleBulkDelete = async () => {
    setBulkSelectionVisible(!bulkSelectionVisible);
  };

  const fetchVideos = async () => {
    try {
      const response = await instance("/media");
      if (response?.data?.data) {
        setVideos(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const sizeFormatter = (size) => {
    let sizeInKB = size / 1024;
    return sizeInKB < 1024
      ? `${sizeInKB.toFixed(0)} KB`
      : `${(sizeInKB / 1024).toFixed(1)} MB`;
  };

  const [editMedia, setEditMedia] = useState([]);
  const handleEditMode = ({ mediaId, mediaTitle }) => {
    setEditMode(true);
    setEditMedia({ mediaId, mediaTitle });
  };

  const handleSubmit = async () => {
    setEditMode(false);
    try {
      const response = await instance.put(`/media/${editMedia?.mediaId}`, {
        title: editMedia?.mediaTitle,
      });
      if (response.data) {
        console.log("Media title updated successfully");
        window.location.reload();
      } else {
        console.error("Error updating media title:", response.data.message);
        message.error("Error updating media title");
      }
    } catch (error) {
      console.error("Error updating media title:", error);
      message.error("Error updating media title");
    }
  };

  return (
    <div className="login-page">
      <div className="ViewContainer ViewContentContainer media-area login-page-section">
        {/* <h1 style={{ textAlign: "center" }}>Upload</h1> */}
        {/* <hr style={{ marginBottom: "1rem", marginTop: ".5rem" }} /> */}

        <center>
          <div
            onClick={showModal}
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5rem",
              backgroundColor: "#e2f3ff",
              border: "1px dashed #006eff",
              borderRadius: "15px",
              padding: "3rem",
              margin: "0 2rem 2rem",
            }}
          >
            <Image
              src="/images/cloudupload.png"
              alt="Upload"
              width={300}
              height={300}
              style={{ cursor: "pointer" }}
            />
            <h1
              style={{
                color: "#006eff",
                marginBottom: "1rem",
              }}
            >
              Upload to Cloud Storage
            </h1>
            {/* warning info about size and dimension */}
            <p
              style={{
                color: "var(--themes)",
                fontSize: "1rem",
                textAlign: "center",
                fontWeight: 400,
                lineHeight: "1.5",
              }}
            >
              Maximum file size: 2MB <br /> Image/Video Maximum dimension:
              1920x1080
            </p>
          </div>
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
          <UploadMedia />
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

        {/* Tabs for Image, Video, PDF */}
        <Tabs defaultActiveKey="1" centered animated type="card">
          <Tabs.TabPane icon={<FileImageOutlined />} tab="Images" key="1">
            <Row
              gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {images &&
                images?.map((image) => (
                  <Col
                    key={image.id}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    xl={6}
                    style={{
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                        padding: "1rem",
                        borderRadius: "5px",
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Image
                        src={`${MEDIA_URL}/${image.file_path}`}
                        alt={image.file_name}
                        width={400}
                        height={400}
                        objectFit="cover"
                        style={{
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.open(`${MEDIA_URL}/${image.file_path}`);
                        }}
                      />
                      <div
                        className="image-info"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "1rem",
                          paddingLeft: "1rem",
                        }}
                      >
                        {editMode && image.id === editMedia.mediaId ? (
                          <>
                            <strong>Name:{""}</strong>
                            <Input
                              defaultValue={
                                image?.title ? image.title : image.file_name
                              }
                              style={{ width: "100%" }}
                              onChange={(e) =>
                                setEditMedia({
                                  ...editMedia,
                                  mediaTitle: e.target.value,
                                })
                              }
                            />
                          </>
                        ) : (
                          <p>
                            <strong> Name:</strong>{" "}
                            {/* {image?.title ? image.title : image.file_name} */}
                            {/* make name shorter and ... if more than 10 */}
                            {image?.title
                              ? image.title.length > 18
                                ? image.title.substring(0, 18) + "..."
                                : image.title
                              : image.file_name.length > 18
                              ? image.file_name.substring(0, 18) + "..."
                              : image.file_name}
                          </p>
                        )}
                        <div>
                          <p>
                            <strong> Size:</strong>
                            {sizeFormatter(image.file_size)}
                          </p>
                          <p>
                            <strong> Type: </strong> {image.file_type}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: "1rem",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {editMode ? (
                          <>
                            <Button
                              success
                              icon={<CheckCircleTwoTone />}
                              style={{
                                marginRight: "6vw",
                                backgroundColor: "green",
                              }}
                              onClick={() => handleSubmit()}
                            />
                          </>
                        ) : (
                          <Button
                            type="primary"
                            success
                            icon={<EditOutlined />}
                            style={{ marginRight: "6vw" }}
                            onClick={() =>
                              handleEditMode({
                                mediaId: image.id,
                                mediaTitle: image?.title
                                  ? image.title
                                  : image.file_name,
                              })
                            }
                          />
                        )}
                        {!editMode ? (
                          <Button
                            type="primary"
                            danger
                            onClick={() => onDelete(image.id)}
                            icon={<DeleteOutlined />}
                          />
                        ) : (
                          <Button
                            danger
                            icon={<CloseCircleOutlined />}
                            onClick={() => setEditMode(false)}
                          />
                        )}
                      </div>
                    </div>
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
          </Tabs.TabPane>
          <Tabs.TabPane tab="Videos" key="2" icon={<VideoCameraOutlined />}>
            {isLoading ? (
              <center>
                <Spin size="large" />
                <Skeleton active />
              </center>
            ) : (
              <div>
                {videos?.length > 0 ? (
                  <div>
                    <Row
                      gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {videos.map((video) => (
                        <Col
                          key={video.id}
                          xs={24}
                          sm={12}
                          md={8}
                          lg={6}
                          xl={4}
                          style={{ marginBottom: "1rem" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <video
                              src={`${MEDIA_URL}/${video.file_path}`}
                              controls
                              width="200"
                              height="200"
                            />
                            <Button
                              type="primary"
                              danger
                              onClick={() => onDelete(video.id)}
                              style={{ marginTop: "1rem" }}
                            >
                              Delete
                            </Button>
                          </div>
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
                ) : (
                  <center>
                    <h1>No Videos Available</h1>
                  </center>
                )}
              </div>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Docs" key="3" icon={<FilePdfOutlined />}>
            <Documents />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Gallery;
