// components/PageBuilder/Modals/MediaSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, List, Button, Select, message } from "antd";
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

  useEffect(() => {
    if (isVisible) {
      fetchMedia();
    }
    setSelectedMedia([]);
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
    onSelectMedia(selectedMedia);
    onClose();
  };

  const isItemSelected = (item) => {
    return selectedMedia.some((media) => media.id === item.id);
  };

  return (
    <Modal
      title="Select Media"
      open={isVisible}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Submit"
      width={900}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <Button
            icon={<SortAscendingOutlined />}
            onClick={() => handleSortChange("asc")}
            className={`mr-2 ${
              sortOrder === "asc"
                ? "text-gray-600 border-2 border-yellow-600 font-semibold bg-theme"
                : ""
            }`}
          >
            Ascending
          </Button>
          <Button
            icon={<SortDescendingOutlined />}
            onClick={() => handleSortChange("desc")}
            className={`${
              sortOrder === "desc"
                ? "text-gray-600 border-2 border-yellow-600 font-semibold bg-theme"
                : ""
            }`}
          >
            Descending
          </Button>
        </div>
        {/* <Select
          value={sortOrder}
          onChange={handleSortChange}
          style={{ width: 200 }}
        >
          <Option value="asc">Sort by Date (Ascending)</Option>
          <Option value="desc">Sort by Date (Descending)</Option>
        </Select> */}
        <Button
          onClick={handleSubmit}
          className="bg-theme text-gray-600 border-2 border-yellow-600 font-semibold"
        >
          Submit
        </Button>
      </div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={sortedMedia}
        loading={loading}
        renderItem={(item) => (
          <List.Item>
            <div
              className={`border-2 border-theme rounded-md cursor-pointer ${
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
                preview={false}
                loading="lazy"
                className="rounded-md"
              />
              <p className="mt-2 text-center">{item.title}</p>
              {isItemSelected(item) && (
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90 rounded-md">
                  <div className="flex justify-center items-center w-full h-full">
                    <p className="text-white text-xl font-bold">Selected</p>
                  </div>
                </div>
              )}
            </div>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default MediaSelectionModal;
