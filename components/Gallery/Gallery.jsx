// pages/gallery.jsx

import React, { useEffect, useState, useMemo } from "react";
import { Modal, Spin, message } from "antd";
import instance from "../../axios";
import { setPageTitle } from "../../global/constants/pageTitle";
import GalleryHeader from "./GalleryHeader";
import MediaTabs from "./MediaTabs";
import PaginationComponent from "./PaginationComponent";
import PreviewModal from "./PreviewModal";
import UploadMediaTabs from "./UploadMediaTabs";

const Gallery = () => {
  // For server pagination
  const [cachedPages, setCachedPages] = useState({}); // { pageNumber: [media array] }
  const [mediaAssets, setMediaAssets] = useState([]);
  const [totalMediaAssets, setTotalMediaAssets] = useState(0);

  // For local search
  const [allMedia, setAllMedia] = useState([]);

  // UI states
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("desc"); // or "asc"
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    setPageTitle("Media Library");
    loadAllMediaFromLocalStorage(); // Attempt to load from localStorage
    fetchAllMedia(); // For local search
    fetchOrGetCachedPage(currentPage, itemsPerPage, sortBy);
  }, []);

  // ------------------
  //  Fetch / Caching
  // ------------------

  // 1) For local search: fetch full data once
  const fetchAllMedia = async () => {
    try {
      const res = await instance.get("/media");
      const all = res.data?.data || [];
      setAllMedia(all);
      localStorage.setItem("allMedia", JSON.stringify(all));
    } catch {
      message.error("Error fetching all media.");
    }
  };

  // 2) Either return cached page or fetch from server
  const fetchOrGetCachedPage = async (page, pageSize, order) => {
    // If we have it cached, skip the API call
    const cacheKey = `${page}-${order}-${pageSize}`;
    if (cachedPages[cacheKey]) {
      setMediaAssets(cachedPages[cacheKey].data);
      setTotalMediaAssets(cachedPages[cacheKey].total);
      return;
    }
    setIsLoading(true);
    try {
      const orderType = order === "asc" ? "ASC" : "DESC";
      const res = await instance.get(
        `/media/pageview?page=${page}&count=${pageSize}&order_type=${orderType}`
      );
      const pageData = res.data?.data || [];
      const total = res.data?.total || 0;

      // Cache it
      setCachedPages((prev) => ({
        ...prev,
        [cacheKey]: { data: pageData, total },
      }));

      setMediaAssets(pageData);
      setTotalMediaAssets(total);
    } catch {
      message.error("Error fetching paginated media.");
    } finally {
      setIsLoading(false);
    }
  };

  // Attempt to load full media from local storage on mount
  const loadAllMediaFromLocalStorage = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("allMedia")) || [];
      setAllMedia(stored);
    } catch {
      // ignore JSON parse errors
    }
  };

  // ------------------
  //    Display Data
  // ------------------

  // If searching, we filter & (optionally) sort `allMedia` client-side
  // else we show the server-paginated `mediaAssets`.
  const displayedMedia = useMemo(() => {
    if (!searchText.trim()) return mediaAssets;

    let filtered = allMedia.filter(
      (m) =>
        m.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        m.file_name?.toLowerCase().includes(searchText.toLowerCase())
    );

    // Optional local sort on search
    filtered = filtered.sort((a, b) => {
      // Check both title and file_name
      const aTitle = a.title || a.file_name;
      const bTitle = b.title || b.file_name;
      if (sortBy === "asc") return aTitle.localeCompare(bTitle);
      return bTitle.localeCompare(aTitle);
    });

    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [mediaAssets, allMedia, searchText, currentPage, itemsPerPage, sortBy]);

  // Correct total for search vs normal view
  const displayedTotal = useMemo(() => {
    if (!searchText.trim()) return totalMediaAssets;
    return allMedia.filter(
      (m) =>
        // m.title?.toLowerCase().includes(searchText.toLowerCase())
        m.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        m.file_name?.toLowerCase().includes(searchText.toLowerCase())
    ).length;
  }, [searchText, allMedia, totalMediaAssets]);

  // ------------------
  //     Handlers
  // ------------------
  const handleSearch = (text) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (!searchText.trim()) {
      fetchOrGetCachedPage(page, itemsPerPage, sortBy);
    }
  };

  const handleItemsPerPageChange = (size) => {
    setItemsPerPage(size);
    setCurrentPage(1);
    if (!searchText.trim()) {
      fetchOrGetCachedPage(1, size, sortBy);
    }
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
    if (!searchText.trim()) {
      fetchOrGetCachedPage(1, itemsPerPage, newSort);
    }
  };

  const handleAddMedia = () => setIsUploadModalVisible(true);

  const handleUploadModalClose = () => {
    setIsUploadModalVisible(false);
    // Refresh current page + fetchAllMedia to keep local search updated
    fetchOrGetCachedPage(currentPage, itemsPerPage, sortBy);
    fetchAllMedia();
  };

  const handlePreview = (media) => {
    setSelectedMedia(media);
    setIsPreviewModalVisible(true);
  };

  // Update both local search data & cached page data if something changes
  const handleEdit = (updatedMedia) => {
    // Update in allMedia
    setAllMedia((prev) =>
      prev.map((m) => (m.id === updatedMedia.id ? updatedMedia : m))
    );

    // Update in cached pages
    setCachedPages((prev) => {
      const updated = { ...prev };
      for (const key in updated) {
        updated[key].data = updated[key].data.map((item) =>
          item.id === updatedMedia.id ? updatedMedia : item
        );
      }
      return updated;
    });
    message.success("Updated successfully.");
  };

  const handleDelete = (mediaId) => {
    Modal.confirm({
      title: "Delete Media",
      content: "Are you sure?",
      onOk: async () => {
        try {
          await instance.delete(`/media/${mediaId}`);
          message.success("Deleted successfully.");
          fetchAllMedia();
          // Remove from cached pages
          setCachedPages((prev) => {
            const updated = { ...prev };
            for (const key in updated) {
              updated[key].data = updated[key].data.filter(
                (i) => i.id !== mediaId
              );
              updated[key].total = updated[key].total - 1;
            }
            return updated;
          });
          // If current page data changed, update the displayed array
          fetchOrGetCachedPage(currentPage, itemsPerPage, sortBy);
        } catch {
          message.error("Delete error.");
        }
      },
    });
  };

  const handleFilter = () => message.info("Filter not implemented.");
  const copyApiEndpoint = () => {
    navigator?.clipboard?.writeText(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/media`
    );
    message.success("Endpoint copied.");
  };

  return (
    <div className="gallery-page">
      {/* Upload Modal */}
      <Modal
        title="Upload Media"
        open={isUploadModalVisible}
        onCancel={handleUploadModalClose}
        footer={null}
        width={800}
      >
        <UploadMediaTabs
          onUploadSuccess={handleUploadModalClose}
          onSelectMedia={setSelectedMedia}
        />
      </Modal>

      {/* Preview Modal */}
      {selectedMedia && (
        <PreviewModal
          visible={isPreviewModalVisible}
          onClose={() => setIsPreviewModalVisible(false)}
          media={selectedMedia}
          mediaType={
            selectedMedia?.file_type?.startsWith("image/")
              ? "image"
              : selectedMedia?.file_type?.startsWith("video/")
                ? "video"
                : "document"
          }
          handleEdit={handleEdit}
        />
      )}

      {/* Header */}
      <GalleryHeader
        onCreate={handleAddMedia}
        onFilter={handleFilter}
        onSearch={handleSearch}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
        copyApiEndpoint={copyApiEndpoint}
        // Suppose there's a dropdown for sort in your Header
        onSortChange={handleSortChange}
      />

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center my-10">
          <Spin size="large" />
        </div>
      ) : (
        <MediaTabs
          images={displayedMedia.filter((m) =>
            m.file_type?.startsWith("image/")
          )}
          videos={displayedMedia.filter((m) =>
            m.file_type?.startsWith("video/")
          )}
          docs={displayedMedia.filter((m) => m.file_type === "application/pdf")}
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
          total={displayedTotal}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Gallery;
