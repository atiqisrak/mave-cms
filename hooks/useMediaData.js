// hooks/useMediaData.js

import { useEffect, useState, useCallback } from "react";
import {
  addMediaToDB,
  deleteMediaFromDB,
  getPaginatedMediaFromDB,
  updateMediaInDB,
} from "../utils/indexedDB";
import instance from "../axios";
import { message } from "antd";

const useMediaData = () => {
  // State variables
  const [mediaAssets, setMediaAssets] = useState([]);
  const [totalMediaAssets, setTotalMediaAssets] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isIndexedDBLoaded, setIsIndexedDBLoaded] = useState(false);

  // Pagination, Sorting, Filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortType, setSortType] = useState("desc");
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const checkIndexedDbQuota = async () => {
    try {
      const quota = await navigator.storage.estimate();
      // console.log("Usage:", quota.usage);
      // console.log("Quota:", quota.quota);
    } catch (error) {
      console.error("Error checking indexedDB quota:", error);
    }
  };

  useEffect(() => {
    checkIndexedDbQuota();
  }, []);

  // Function to fetch data from API for a specific page
  const fetchFromAPI = useCallback(
    async (page, pageSize, order, keyword, tagFilter) => {
      const cacheKey = `${page}-${order}-${pageSize}-${keyword || ""}-${tagFilter || ""}`;
      try {
        setIsLoading(true);
        let url = `/media/pageview?page=${page}&count=${pageSize}&order_type=${order.toUpperCase()}`;
        if (keyword?.trim()) {
          url += `&keyword=${encodeURIComponent(keyword.trim())}`;
        }
        if (tagFilter) {
          url += `&tag=${encodeURIComponent(tagFilter)}`;
        }

        const res = await instance.get(url);
        const data = res.data?.data || [];
        const total = res.data?.total || 0;

        setMediaAssets(data);
        setTotalMediaAssets(total);
      } catch (error) {
        console.error("Error fetching media from API:", error);
        message.error("Error fetching media from API.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Function to load data from IndexedDB
  const fetchFromIndexedDB = useCallback(
    async (page, pageSize, order, keyword, tagFilter) => {
      try {
        setIsLoading(true);
        const { data, total } = await getPaginatedMediaFromDB(
          page,
          pageSize,
          order,
          keyword,
          tagFilter
        );
        setMediaAssets(data);
        setTotalMediaAssets(total);
      } catch (error) {
        console.error("Error fetching media from IndexedDB:", error);
        message.error("Error fetching media from IndexedDB.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Function to populate IndexedDB with all media from the API
  const populateIndexedDB = useCallback(async () => {
    try {
      let page = 1;
      const pageSize = 100; // Adjust based on API limits
      let allMedia = [];
      let totalFetched = 0;
      let totalAvailable = 0;
      let keepFetching = true;
      let sortType = "desc";

      console.log("Starting to populate IndexedDB with all media...");

      while (keepFetching) {
        const url = `/media/pageview?page=${page}&count=${pageSize}&order_type=${sortType.toUpperCase()}`;
        console.log(`Fetching page ${page} from API: ${url}`);
        const res = await instance.get(url);
        const data = res.data?.data || [];
        totalAvailable = res.data?.total || 0;

        console.log(
          `Fetched ${data.length} media items from API on page ${page}.`
        );
        allMedia = allMedia.concat(data);
        totalFetched += data.length;
        page += 1;

        if (totalFetched >= totalAvailable || data.length < pageSize) {
          keepFetching = false;
        }
      }

      console.log(`Total media fetched for IndexedDB: ${allMedia.length}.`);

      if (allMedia.length > 0) {
        await addMediaToDB(allMedia);
        setIsIndexedDBLoaded(true);
        // message.success("All media loaded into IndexedDB for offline access.");
        console.log("All media successfully added to IndexedDB.");
      } else {
        console.warn("No media fetched to add to IndexedDB.");
      }
    } catch (error) {
      console.error("Error populating IndexedDB:", error);
      message.error("Failed to load all media into IndexedDB.");
    }
  }, []);

  // Initialization: Check if IndexedDB has data
  useEffect(() => {
    const initialize = async () => {
      try {
        const allMedia = await getPaginatedMediaFromDB(1, 1, "desc", "", "");
        if (allMedia.total > 0) {
          setIsIndexedDBLoaded(true);
        }
        await fetchFromIndexedDB(
          currentPage,
          itemsPerPage,
          sortType,
          searchText,
          selectedTag
        );
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    initialize();
  }, [
    fetchFromIndexedDB,
    currentPage,
    itemsPerPage,
    sortType,
    searchText,
    selectedTag,
  ]);

  // Effect to populate IndexedDB in the background
  useEffect(() => {
    if (!isIndexedDBLoaded) {
      populateIndexedDB();
    }
  }, [isIndexedDBLoaded, populateIndexedDB]);

  // Effect to handle data loading based on dependencies
  useEffect(() => {
    const loadData = async () => {
      if (isIndexedDBLoaded) {
        await fetchFromIndexedDB(
          currentPage,
          itemsPerPage,
          sortType,
          searchText,
          selectedTag
        );
      } else {
        await fetchFromAPI(
          currentPage,
          itemsPerPage,
          sortType,
          searchText,
          selectedTag
        );
      }
    };

    loadData();
  }, [
    currentPage,
    itemsPerPage,
    sortType,
    searchText,
    selectedTag,
    fetchFromAPI,
    fetchFromIndexedDB,
    isIndexedDBLoaded,
  ]);

  // CRUD Operations

  // Add Media
  const addMedia = useCallback(async (media) => {
    try {
      await addMediaToDB(Array.isArray(media) ? media : [media]);
      //   setMediaAssets((prev) =>
      //     Array.isArray(media) ? [...media, ...prev] : [media, ...prev]
      //   );

      setMediaAssets((prev) =>
        Array.isArray(media) ? [...prev, ...media] : [...prev, media]
      );

      setTotalMediaAssets((prev) =>
        Array.isArray(media) ? prev + media.length : prev + 1
      );
      // message.success("Media added successfully.");
    } catch (error) {
      console.error("Error adding media:", error);
      message.error("Error adding media.");
    }
  }, []);

  // Edit Media
  const editMedia = useCallback(async (updatedMedia) => {
    try {
      await instance.put(`/media/${updatedMedia.id}`, updatedMedia);
      await updateMediaInDB(updatedMedia);
      setMediaAssets((prev) =>
        prev.map((item) => (item.id === updatedMedia.id ? updatedMedia : item))
      );
      message.success("Media updated successfully.");
    } catch (error) {
      console.error("Error updating media:", error);
      message.error("Error updating media.");
    }
  }, []);

  // Delete Media
  const deleteMedia = useCallback(async (id) => {
    try {
      await instance.delete(`/media/${id}`);
      await deleteMediaFromDB(id);
      setMediaAssets((prev) => prev.filter((item) => item.id !== id));
      setTotalMediaAssets((prev) => prev - 1);
      message.success("Media deleted successfully.");
    } catch (error) {
      console.error("Error deleting media:", error);
      message.error("Error deleting media.");
    }
  }, []);

  // Handlers for Pagination, Search, and Filter
  const handlePageChange = (page) => setCurrentPage(page);
  const handleItemsPerPageChange = (size) => setItemsPerPage(size);
  const handleSortTypeChange = (type) => setSortType(type);
  const handleSearch = (text) => setSearchText(text);
  //   const handleTagFilterChange = (tag) => setSelectedTag(tag);
  const handleTagFilterChange = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1); // Reset to first page on tag change
  };

  return {
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
  };
};

export default useMediaData;
