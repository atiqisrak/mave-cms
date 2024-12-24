// pages/gallery.jsx

import React, { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import GalleryHeader from "./GalleryHeader";
import MediaTabs from "./MediaTabs";
import PaginationComponent from "./PaginationComponent";
import PreviewModal from "./PreviewModal";
import UploadMediaTabs from "./UploadMediaTabs";
import useMediaData from "../../hooks/useMediaData";
import { setPageTitle } from "../../global/constants/pageTitle";

const Gallery = () => {
  // Use the custom hook to manage media data
  const {
    mediaAssets,
    totalMediaAssets,
    isLoading,
    currentPage,
    itemsPerPage,
    sortType,
    searchText,
    selectedTag,
    handlePageChange,
    handleItemsPerPageChange,
    handleSortTypeChange,
    handleSearch,
    handleTagFilterChange,
    addMedia,
    editMedia,
    deleteMedia,
    isIndexedDBLoaded,
  } = useMediaData();

  // UI States for Modals
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = React.useState(null);
  const [isUploadModalVisible, setIsUploadModalVisible] = React.useState(false);

  // Set the page title
  useEffect(() => {
    setPageTitle("Media Library");
  }, []);

  // Handlers for opening and closing modals
  const handleAddMedia = () => setIsUploadModalVisible(true);
  const handleUploadModalClose = () => setIsUploadModalVisible(false);

  const handlePreview = (media) => {
    setSelectedMedia(media);
    setIsPreviewModalVisible(true);
  };

  const handlePreviewModalClose = () => {
    setIsPreviewModalVisible(false);
    setSelectedMedia(null);
  };

  return (
    <div className="gallery-page">
      {/* Upload Modal */}
      <Modal
        title="Upload Media"
        visible={isUploadModalVisible}
        onCancel={handleUploadModalClose}
        footer={null}
        width={800}
      >
        <UploadMediaTabs
          onUploadSuccess={handleUploadModalClose}
          addMedia={addMedia}
        />
      </Modal>

      {/* Preview Modal */}
      {selectedMedia && (
        <PreviewModal
          visible={isPreviewModalVisible}
          onClose={handlePreviewModalClose}
          media={selectedMedia}
          mediaType={
            selectedMedia?.file_type?.startsWith("image/")
              ? "image"
              : selectedMedia?.file_type?.startsWith("video/")
                ? "video"
                : "document"
          }
          handleEdit={editMedia}
        />
      )}

      {/* Gallery Header */}
      <GalleryHeader
        onCreate={handleAddMedia}
        onFilter={() => {
          /* Implement if needed */
        }}
        onSearch={handleSearch}
        onTagFilterChange={handleTagFilterChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
        sortType={sortType}
        setSortType={handleSortTypeChange}
      />

      {/* Media Grid or Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center my-10">
          <Spin size="large" />
        </div>
      ) : (
        <MediaTabs
          images={mediaAssets.filter((m) => m.file_type?.startsWith("image/"))}
          videos={mediaAssets.filter((m) => m.file_type?.startsWith("video/"))}
          docs={mediaAssets.filter((m) => m.file_type === "application/pdf")}
          handleEdit={editMedia}
          handleDelete={deleteMedia}
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
