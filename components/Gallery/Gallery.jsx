// pages/gallery.jsx

import React, { useEffect, useState } from "react";
import { Modal, Spin, message } from "antd";
import {
  SyncOutlined,
  FilterOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import instance from "../../axios";
import { setPageTitle } from "../../global/constants/pageTitle";
import GalleryHeader from "./GalleryHeader";
import MediaTabs from "./MediaTabs";
import PaginationComponent from "./PaginationComponent";
import UploadMedia from "./UploadMedia";

const Gallery = () => {
  useEffect(() => {
    setPageTitle("Media Library");
  }, []);

  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [mediaAssets, setMediaAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalMediaAssets, setTotalMediaAssets] = useState(0);

  // Filter & Sort States
  const [sortBy, setSortBy] = useState("desc");
  const [filterSettings, setFilterSettings] = useState({
    // Add any filter parameters you need
  });

  // Fetch Media Assets Function
  const fetchMediaAssets = async (page, count) => {
    setIsLoading(true);
    try {
      const orderType = sortBy === "asc" ? "ASC" : "DESC";
      // Adjust the API endpoint and query parameters as needed
      const response = await instance.get(
        `/media/pageview?page=${page}&count=${count}&order_type=${orderType}`,
        {
          params: filterSettings, // Include any filter parameters
        }
      );

      if (response.data && Array.isArray(response.data.data)) {
        setMediaAssets(response.data.data);
        setTotalMediaAssets(response.data.total || 0);
      } else {
        message.error("Failed to fetch media assets.");
      }
    } catch (error) {
      console.error("Error fetching media assets:", error);
      message.error("An error occurred while fetching media assets.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMediaAssets(currentPage, itemsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, sortBy, filterSettings]);

  // Handle Page Change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle Items Per Page Change
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when items per page change
  };

  // Handle Search
  const handleSearch = async (searchText) => {
    if (searchText.trim() === "") {
      // Reset filters if search text is empty
      setFilterSettings({});
      fetchMediaAssets(currentPage, itemsPerPage);
      return;
    }

    try {
      setIsLoading(true);
      const response = await instance.get(`/media/search`, {
        params: { query: searchText, page: currentPage, count: itemsPerPage },
      });

      if (response.data && Array.isArray(response.data.data)) {
        setMediaAssets(response.data.data);
        setTotalMediaAssets(response.data.total || 0);
      } else {
        message.error("No media found for the search query.");
        setMediaAssets([]);
        setTotalMediaAssets(0);
      }
    } catch (error) {
      console.error("Error searching media:", error);
      message.error("An error occurred while searching for media.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Filter
  const handleFilter = () => {
    // Implement your filter logic here
    // For example, open a filter modal or update filterSettings state
    message.info("Filter functionality is not implemented yet.");
  };

  // Handle Copy API Endpoint
  const copyApiEndpoint = () => {
    navigator.clipboard.writeText(`${API_BASE_URL}/media`);
    message.success("API Endpoint Copied to Clipboard");
  };

  // Handle Add Media (Open Upload Modal)
  const handleAddMedia = () => {
    setIsUploadModalVisible(true);
  };

  // Handle Upload Modal Close
  const handleUploadModalClose = () => {
    setIsUploadModalVisible(false);
    // Optionally, refresh media assets after upload
    fetchMediaAssets(currentPage, itemsPerPage);
  };

  // Handle Edit Media
  const handleEdit = (mediaId) => {
    // Implement edit functionality, e.g., open an edit modal
    message.info(
      `Edit functionality for media ID ${mediaId} is not implemented yet.`
    );
  };

  // Handle Delete Media
  const handleDelete = async (mediaId) => {
    try {
      Modal.confirm({
        title: "Delete Media",
        content: "Are you sure you want to delete this media?",
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          try {
            await instance.delete(`/media/${mediaId}`);
            message.success("Media deleted successfully.");
            // Refresh media assets after deletion
            fetchMediaAssets(currentPage, itemsPerPage);
          } catch (error) {
            console.error("Error deleting media:", error);
            message.error("An error occurred while deleting the media.");
          }
        },
      });
    } catch (error) {
      console.error("Error opening delete confirmation:", error);
    }
  };

  // Handle Preview Media
  const handlePreview = (media) => {
    // Implement preview functionality if needed
    // Since each MediaCard handles its own preview, this can be left empty or used for additional logic
  };

  return (
    <div className="gallery-page">
      {/* Upload Media Modal */}
      <Modal
        title="Upload Media"
        open={isUploadModalVisible}
        onCancel={handleUploadModalClose}
        footer={null}
        width={800}
      >
        <UploadMedia onUploadSuccess={handleUploadModalClose} />
      </Modal>

      {/* Header */}
      <GalleryHeader
        onCreate={handleAddMedia}
        onFilter={handleFilter}
        onSearch={handleSearch}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
        copyApiEndpoint={copyApiEndpoint}
      />

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center my-10">
          <Spin size="large" />
        </div>
      ) : (
        <MediaTabs
          images={mediaAssets.filter((asset) =>
            asset.file_type.startsWith("image/")
          )}
          videos={mediaAssets.filter((asset) =>
            asset.file_type.startsWith("video/")
          )}
          docs={mediaAssets.filter(
            (asset) => asset.file_type === "application/pdf"
          )}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handlePreview={handlePreview}
        />
      )}

      {/* Pagination */}
      {!isLoading && (
        <PaginationComponent
          current={currentPage}
          pageSize={itemsPerPage}
          total={totalMediaAssets}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Gallery;
