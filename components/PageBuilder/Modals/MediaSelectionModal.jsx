// components/PageBuilder/Modals/MediaSelectionModal.jsx

import React, { useState, useEffect } from "react";
import {
  Modal,
  List,
  Button,
  message,
  Select,
  Pagination,
  Tabs,
  Input,
  Switch,
} from "antd";
import { EyeOutlined, InboxOutlined, SyncOutlined } from "@ant-design/icons";
import instance from "../../../axios";
import Image from "next/image";
import UploadMediaTabs from "../../Gallery/UploadMediaTabs";
import Cloudinary from "../../Gallery/Cloudinary";

const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

const MediaSelectionModal = ({
  isVisible,
  onClose,
  onSelectMedia,
  selectionMode = "single",
  initialSelectedMedia = [],
}) => {
  const [mediaList, setMediaList] = useState([]);
  const [sortedMedia, setSortedMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedMedia, setSelectedMedia] = useState(initialSelectedMedia);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Number of items per page

  useEffect(() => {
    if (isVisible) {
      fetchMedia();
      // Set selectedMedia to initialSelectedMedia when the modal opens
      setSelectedMedia(initialSelectedMedia);
      setSearchQuery("");
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/media");
      setMediaList(response.data);
      console.log("Media List", response.data);
      const filteredAndSorted = filterAndSortMedia(
        response.data,
        searchQuery,
        sortOrder
      );
      console.log("Filtered and Sorted", filteredAndSorted);
      setSortedMedia(filteredAndSorted);
    } catch (error) {
      message.error("Failed to fetch media items.");
    }
    setLoading(false);
  };

  const filterAndSortMedia = (list, query, order) => {
    const filtered = list.filter((media) =>
      media.title
        ? media.title.toLowerCase().includes(query.toLowerCase())
        : media.file_name.toLowerCase().includes(query.toLowerCase())
    );
    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    return sorted;
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    const filteredAndSorted = filterAndSortMedia(mediaList, searchQuery, value);
    setSortedMedia(filteredAndSorted);
    setCurrentPage(1); // Reset to first page on sort change
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const filteredAndSorted = filterAndSortMedia(mediaList, value, sortOrder);
    setSortedMedia(filteredAndSorted);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSelection = (item) => {
    if (selectionMode === "single") {
      setSelectedMedia([item]);
    } else {
      if (selectedMedia.some((media) => media.id === item.id)) {
        setSelectedMedia(selectedMedia.filter((media) => media.id !== item.id));
      } else {
        setSelectedMedia([...selectedMedia, item]);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedMedia.length === 0) {
      message.warning("Please select at least one media item.");
      return;
    }
    onSelectMedia(selectedMedia); // Always pass an array
    onClose();
  };

  // const isItemSelected = (item) => {
  //   return selectedMedia.some((media) => media.id === item.id);
  // };
  const isItemSelected = (item) => {
    return selectedMedia.some(
      (media) => media?.id === item.id || media?.file_path === item.file_path
    );
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  console.log("Sorted Media", sortedMedia);
  // Calculate items for the current page
  const paginatedMedia = sortedMedia.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleUploadSuccess = (uploadedMedia) => {
    // Check if uploadedMedia is valid
    if (!uploadedMedia) {
      console.error("Upload failed or no media returned.");
      return;
    }
    // Refresh media list after upload
    fetchMedia();

    // Automatically select the uploaded media
    if (selectionMode === "single") {
      const singleMedia = Array.isArray(uploadedMedia)
        ? uploadedMedia[0]
        : uploadedMedia;
      // Ensure singleMedia is defined
      if (singleMedia) {
        setSelectedMedia([singleMedia]);
        onSelectMedia([singleMedia]);
        onClose();
      } else {
        message.error("No media selected after upload.");
      }
    } else {
      const newSelected = Array.isArray(uploadedMedia)
        ? [...selectedMedia, ...uploadedMedia]
        : [...selectedMedia, uploadedMedia];

      // Filter out undefined elements
      const validSelected = newSelected.filter((media) => media);
      setSelectedMedia(validSelected);
      onSelectMedia(validSelected);
    }

    message.success("Media uploaded and selected successfully.");
  };

  return (
    <Modal
      title="Select Media"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={900}
      centered
    >
      <Tabs defaultActiveKey="1" centered type="card">
        <TabPane tab="Select Media" key="1">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Native Storage" key="1">
              {/* Sorting and Search Controls */}
              <div className="w-auto grid items-center grid-cols-5 gap-4 pb-6">
                <div className="col-span-1 ml-4">
                  <Switch
                    checkedChildren="Added Last"
                    unCheckedChildren="Added First"
                    checked={sortOrder === "asc"}
                    onChange={(checked) =>
                      handleSortChange(checked ? "asc" : "desc")
                    }
                  />
                </div>
                <div className="col-span-3">
                  <Search
                    placeholder="Search media..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    allowClear
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button
                    className="mavebutton"
                    onClick={fetchMedia}
                    icon={<SyncOutlined />}
                  >
                    Refresh
                  </Button>
                  {console.log("Paginated Media", paginatedMedia)}
                </div>
              </div>

              {/* Media List */}
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 4,
                  xxl: 6,
                }}
                dataSource={paginatedMedia}
                loading={loading}
                locale={{ emptyText: "No media items found." }}
                renderItem={(item) => (
                  <List.Item>
                    <div
                      className={`relative border-2 rounded-md cursor-pointer ${
                        isItemSelected(item)
                          ? "border-theme"
                          : "border-transparent"
                      }`}
                      onClick={() => handleSelection(item)}
                    >
                      {console.log("Paginated Media", paginatedMedia)}
                      {item.file_type.startsWith("image/") ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${item.file_path}`}
                          alt={item.title || "Media Unavailable"}
                          width={250}
                          height={200}
                          objectFit="cover"
                          layout="responsive"
                          className="rounded-md"
                        />
                      ) : item.file_type.startsWith("video/") ? (
                        <div className="relative">
                          <video
                            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${item.file_path}`}
                            className="rounded-md w-full h-28 object-cover"
                            muted
                            preload="metadata"
                            height={200}
                          />
                          <div className="absolute inset-0 flex justify-center items-center">
                            <EyeOutlined className="text-white text-3xl opacity-75" />
                          </div>
                        </div>
                      ) : (
                        <div className="document-preview flex flex-col items-center justify-center h-48 bg-gray-100 rounded-md">
                          <InboxOutlined className="text-4xl text-gray-400" />
                          <p className="mt-2 text-center text-sm font-medium truncate w-40">
                            {item.title || item.file_name}
                          </p>
                        </div>
                      )}
                      <p className="mt-2 text-center text-sm font-medium truncate">
                        {item.title || "Untitled"}
                      </p>
                      {isItemSelected(item) && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-md">
                          <span className="text-white text-lg font-semibold">
                            Selected
                          </span>
                        </div>
                      )}
                    </div>
                  </List.Item>
                )}
              />

              {/* Pagination Controls */}
              <div className="flex justify-between mt-4">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={sortedMedia.length}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper
                />
                <Button
                  className="mavebutton"
                  onClick={handleSubmit}
                  disabled={selectedMedia.length === 0}
                >
                  Submit
                </Button>
              </div>
            </TabPane>
            <TabPane tab="Cloudinary" key="2">
              <Cloudinary />
            </TabPane>
          </Tabs>
        </TabPane>

        <TabPane tab="Upload Media" key="2">
          {/* <UploadMedia
            onUploadSuccess={handleUploadSuccess}
            selectionMode={selectionMode}
            onSelectMedia={handleUploadSuccess}
          /> */}
          <UploadMediaTabs
            onUploadSuccess={handleUploadSuccess}
            onSelectMedia={handleUploadSuccess}
            selectionMode={selectionMode}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default MediaSelectionModal;
