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
  // -------------------
  //   Server Caching
  // -------------------
  // Cache structure: { "page-sortType-pageSize": { data: [], total: number } }
  const [cachedPages, setCachedPages] = useState({});

  // -------------------
  //   Display States
  // -------------------
  const [mediaAssets, setMediaAssets] = useState([]); // Server-based listing
  const [totalMediaAssets, setTotalMediaAssets] = useState(0);

  // For full media (local search)
  const [allMedia, setAllMedia] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("desc"); // "asc" or "desc"

  // -------------------
  //   UI States
  // -------------------
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  // -------------------
  //  Pagination
  // -------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // -------------------
  //  Lifecycle
  // -------------------
  useEffect(() => {
    setPageTitle("Media Library");
    loadAllMediaFromLocalStorage(); // Try loading from storage
    fetchAllMedia(); // Always fetch once for local search
    fetchOrGetCachedPage(currentPage, itemsPerPage, sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If sort changes and there's no search, re-fetch or use cache
  useEffect(() => {
    if (!searchText.trim()) {
      setCurrentPage(1);
      fetchOrGetCachedPage(1, itemsPerPage, sortType);
    }
  }, [sortType]);

  // -------------------
  //  Fetch & Caching
  // -------------------
  const loadAllMediaFromLocalStorage = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("allMedia")) || [];
      setAllMedia(stored);
    } catch {
      // ignore parse error
    }
  };

  const fetchAllMedia = async () => {
    try {
      const res = await instance.get("/media");
      const data = res?.data || [];
      setAllMedia(data);
      localStorage.setItem("allMedia", JSON.stringify(data));
    } catch {
      message.error("Error fetching full media for search.");
    }
  };

  // Server-based fetch or from cache
  const fetchOrGetCachedPage = async (page, pageSize, order) => {
    const cacheKey = `${page}-${order}-${pageSize}`;
    const cached = cachedPages[cacheKey];
    if (cached) {
      setMediaAssets(cached.data);
      setTotalMediaAssets(cached.total);
      return;
    }
    setIsLoading(true);
    try {
      const orderType = order === "asc" ? "ASC" : "DESC";
      const res = await instance.get(
        `/media/pageview?page=${page}&count=${pageSize}&order_type=${orderType}`
      );
      const fetchedData = res.data?.data || [];
      const fetchedTotal = res.data?.total || 0;
      // Save to cache
      setCachedPages((prev) => ({
        ...prev,
        [cacheKey]: { data: fetchedData, total: fetchedTotal },
      }));
      setMediaAssets(fetchedData);
      setTotalMediaAssets(fetchedTotal);
    } catch {
      message.error("Error fetching paginated media.");
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------
  //   Display Logic
  // -------------------
  // If user is searching, filter + local sort + local pagination
  // Otherwise, display server data (mediaAssets) + server-based total
  const displayedMedia = useMemo(() => {
    if (!searchText.trim()) return mediaAssets;

    // Filter by title or file_name
    let filtered = allMedia.filter(
      (m) =>
        m.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        m.file_name?.toLowerCase().includes(searchText.toLowerCase())
    );

    // Local sort when searching
    filtered.sort((a, b) => {
      const aTitle = (a.title || a.file_name).toLowerCase();
      const bTitle = (b.title || b.file_name).toLowerCase();
      return sortType === "asc"
        ? aTitle.localeCompare(bTitle)
        : bTitle.localeCompare(aTitle);
    });

    // Local pagination
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [searchText, mediaAssets, allMedia, currentPage, itemsPerPage, sortType]);

  const displayedTotal = useMemo(() => {
    if (!searchText.trim()) return totalMediaAssets;
    return allMedia.filter(
      (m) =>
        m.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        m.file_name?.toLowerCase().includes(searchText.toLowerCase())
    ).length;
  }, [searchText, allMedia, totalMediaAssets]);

  // -------------------
  //   Handlers
  // -------------------
  const handleSearch = (text) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // If no search, get from server or cache
    if (!searchText.trim()) {
      fetchOrGetCachedPage(page, itemsPerPage, sortType);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    // If no search, re-fetch server
    if (!searchText.trim()) {
      fetchOrGetCachedPage(1, value, sortType);
    }
  };

  const handleSortTypeChange = (newSort) => {
    setSortType(newSort);
  };

  const handleAddMedia = () => setIsUploadModalVisible(true);

  const handleUploadModalClose = () => {
    setIsUploadModalVisible(false);
    // Refresh both local & server data
    fetchAllMedia();
    fetchOrGetCachedPage(currentPage, itemsPerPage, sortType);
  };

  const handlePreview = (media) => {
    setSelectedMedia(media);
    setIsPreviewModalVisible(true);
  };

  // Update in allMedia + cached pages
  const handleEdit = (updatedMedia) => {
    setAllMedia((prev) =>
      prev.map((m) => (m.id === updatedMedia.id ? updatedMedia : m))
    );
    setCachedPages((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key].data = updated[key].data.map((item) =>
          item.id === updatedMedia.id ? updatedMedia : item
        );
      });
      return updated;
    });
    message.success("Media updated successfully.");
  };

  const handleDelete = (mediaId) => {
    Modal.confirm({
      title: "Delete Media",
      content: "Are you sure?",
      onOk: async () => {
        try {
          await instance.delete(`/media/${mediaId}`);
          message.success("Deleted successfully.");
          // Remove from allMedia
          setAllMedia((prev) => prev.filter((m) => m.id !== mediaId));
          // Update caches
          setCachedPages((prev) => {
            const updated = { ...prev };
            Object.keys(updated).forEach((key) => {
              updated[key].data = updated[key].data.filter(
                (i) => i.id !== mediaId
              );
              updated[key].total -= 1;
            });
            return updated;
          });
          // Re-fetch current page if needed
          if (!searchText.trim()) {
            fetchOrGetCachedPage(currentPage, itemsPerPage, sortType);
          }
        } catch {
          message.error("Error deleting media.");
        }
      },
    });
  };

  const handleFilter = () => message.info("Filter is not implemented yet.");
  const copyApiEndpoint = () => {
    navigator?.clipboard?.writeText(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/media`
    );
    message.success("Endpoint copied.");
  };

  // -------------------
  //   Render
  // -------------------
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
        sortType={sortType}
        setSortType={handleSortTypeChange}
      />

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
