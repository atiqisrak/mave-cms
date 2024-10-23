// components/PageBuilder/Modals/MediaSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, List, Button, message, Select, Pagination } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import instance from "../../../axios"; // Adjust the path as necessary
import Image from "next/image";

const { Option } = Select;

const MediaSelectionModal = ({
  isVisible,
  onClose,
  onSelectMedia,
  selectionMode = "single",
}) => {
  const [mediaList, setMediaList] = useState([]);
  const [sortedMedia, setSortedMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedMedia, setSelectedMedia] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Number of items per page

  useEffect(() => {
    if (isVisible) {
      fetchMedia();
    }
    setSelectedMedia([]);
    setCurrentPage(1);
  }, [isVisible]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/media");
      setMediaList(response.data);
      setSortedMedia(sortMedia(response.data, sortOrder));
    } catch (error) {
      message.error("Failed to fetch media items.");
    }
    setLoading(false);
  };

  const sortMedia = (list, order) => {
    const sorted = [...list].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    return sorted;
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setSortedMedia(sortMedia(mediaList, value));
    setCurrentPage(1); // Reset to first page on sort change
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
    if (selectionMode === "single") {
      onSelectMedia(selectedMedia[0]); // Pass single media object
    } else {
      onSelectMedia(selectedMedia);
    }
    onClose();
  };

  const isItemSelected = (item) => {
    return selectedMedia.some((media) => media.id === item.id);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate items for the current page
  const paginatedMedia = sortedMedia.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Modal
      title="Select Media"
      visible={isVisible}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Submit"
      width={900}
      centered
      footer={[
        <Button key="cancel" onClick={onClose} className="mavecancelbutton">
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          disabled={selectedMedia.length === 0}
          className="mavebutton"
        >
          Submit
        </Button>,
      ]}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        {/* Sorting Controls */}
        <div className="flex items-center gap-2">
          <span className="font-semibold">Sort By:</span>
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-32"
            size="large"
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
        </div>

        {/* Submit Button for Multiple Selection */}
        {selectionMode === "multiple" && (
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={selectedMedia.length === 0}
            className="mavebutton"
          >
            Submit
          </Button>
        )}
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
        renderItem={(item) => (
          <List.Item>
            <div
              className={`relative border-2 rounded-md cursor-pointer ${
                isItemSelected(item) ? "border-theme" : "border-transparent"
              }`}
              onClick={() => handleSelection(item)}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${item.file_path}`}
                alt={item.title}
                width={250}
                height={200}
                objectFit="cover"
                layout="responsive"
                className="rounded-md"
                priority={false}
              />
              <p className="mt-2 text-center text-sm font-medium">
                {item.title}
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
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={sortedMedia.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper
        />
      </div>
    </Modal>
  );
};

export default MediaSelectionModal;
