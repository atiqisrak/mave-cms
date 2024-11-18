// components/PageBuilder/Modals/SliderSelectionModal.jsx

import React, { useState, useEffect } from "react";
import {
  Modal,
  List,
  message,
  Carousel,
  Tabs,
  Input,
  Pagination,
  Button,
} from "antd";
import instance from "../../../axios";
import Image from "next/image";
import { CheckCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Search } = Input;

const SliderSelectionModal = ({ isVisible, onClose, onSelectSlider }) => {
  const [sliderList, setSliderList] = useState([]);
  const [filteredSliders, setFilteredSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSliderId, setSelectedSliderId] = useState(null);
  const [activeTab, setActiveTab] = useState("image"); // Default to 'image' type
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Adjusted for 3-column grid

  useEffect(() => {
    if (isVisible) {
      fetchSliders();
      setSelectedSliderId(null);
      setSearchTerm("");
      setCurrentPage(1);
    }
  }, [isVisible]);

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/sliders");
      const sliders = response.data || [];
      setSliderList(sliders);
      filterAndSortSliders(sliders, activeTab, searchTerm, sortOrder);
    } catch (error) {
      message.error("Failed to fetch sliders");
    }
    setLoading(false);
  };

  const filterAndSortSliders = (sliders, type, search, order) => {
    let filtered = sliders.filter((slider) => {
      const sliderType = slider.type || "image";
      return sliderType === type;
    });

    if (search) {
      filtered = filtered.filter((slider) =>
        (slider.title_en || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredSliders(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    filterAndSortSliders(sliderList, key, searchTerm, sortOrder);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterAndSortSliders(sliderList, activeTab, value, sortOrder);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    filterAndSortSliders(sliderList, activeTab, searchTerm, order);
  };

  const handleSliderSelect = (item) => {
    setSelectedSliderId(item.id);
    onSelectSlider(item);
    onClose();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination logic
  const paginatedSliders = filteredSliders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Helper function to render slider images
  const renderSliderImages = (medias) => {
    return medias?.map((media) => (
      <div key={media.id}>
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
          alt={media.title || "Slider Image"}
          width={500}
          height={300}
          objectFit="cover"
          className="rounded-lg"
          priority
        />
      </div>
    ));
  };

  // Helper function to render slider cards
  const renderSliderCards = (cards) => {
    return cards?.map((card) => (
      <div key={card.id} className="p-4">
        {/* Card Image */}
        {card.media_files && card.media_files.file_path ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${card.media_files.file_path}`}
            alt={card.media_files.title || "Card Image"}
            width={500}
            height={300}
            objectFit="cover"
            className="rounded-lg"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-40 bg-gray-200">
            <Image
              src="/images/Image_Placeholder.png"
              alt="No Image"
              width={500}
              height={300}
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </div>
        )}
        {/* Card Title */}
        <h3>{card.title_en || "Card Title"}</h3>
        {/* Card Description */}
        <div
          dangerouslySetInnerHTML={{
            __html: card.description_en?.slice(0, 100) || "Card Description",
          }}
        />
      </div>
    ));
  };

  return (
    <Modal
      title="Select Slider"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={900}
      bodyStyle={{ padding: "20px" }}
    >
      {/* Tabs for Slider Types */}
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        centered
        type="card"
      >
        <TabPane tab="Image Sliders" key="image" />
        <TabPane tab="Card Sliders" key="card" />
      </Tabs>

      {/* Search and Sort Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleSortChange("asc")}
            className={`mr-2 ${sortOrder === "asc" ? "mavebutton" : ""}`}
          >
            Ascending
          </Button>
          <Button
            onClick={() => handleSortChange("desc")}
            className={`${sortOrder === "desc" ? "mavebutton" : ""}`}
          >
            Descending
          </Button>
        </div>
        <Search
          placeholder="Search sliders..."
          value={searchTerm}
          onChange={handleSearchChange}
          allowClear
          style={{ width: 200 }}
        />
      </div>

      {/* Slider List */}
      <List
        loading={loading}
        dataSource={paginatedSliders}
        renderItem={(item) => (
          <List.Item>
            <div
              className="relative w-full cursor-pointer border rounded-md overflow-hidden"
              onClick={() => handleSliderSelect(item)}
            >
              {/* Slider Preview */}
              <div className="p-4 bg-white">
                <Carousel autoplay>
                  {activeTab === "image" ? (
                    item.medias && item.medias.length > 0 ? (
                      renderSliderImages(item.medias)
                    ) : (
                      <div className="flex items-center justify-center h-40 bg-gray-200">
                        <Image
                          src="/images/Image_Placeholder.png"
                          alt="No Image"
                          width={500}
                          height={300}
                          objectFit="cover"
                          className="rounded-lg"
                          priority
                        />
                      </div>
                    )
                  ) : item.cards && item.cards.length > 0 ? (
                    renderSliderCards(item.cards)
                  ) : (
                    <div className="flex items-center justify-center h-40 bg-gray-200">
                      <p>No Cards Available</p>
                    </div>
                  )}
                </Carousel>
              </div>

              {/* Slider Title */}
              <div className="p-2">
                <h3 className="text-lg font-semibold">
                  {item.title_en || "Untitled Slider"}
                </h3>
                {item.description_en ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.description_en.slice(0, 200) + "...",
                    }}
                  />
                ) : (
                  "No description."
                )}
              </div>

              {/* Selected Overlay */}
              {selectedSliderId === item.id && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <CheckCircleOutlined
                    style={{ fontSize: "48px", color: "#fff" }}
                  />
                  <span className="text-white text-xl font-bold ml-2">
                    Selected
                  </span>
                </div>
              )}
            </div>
          </List.Item>
        )}
        grid={{ gutter: 16, column: 3 }} // Updated to 3 columns
        locale={{ emptyText: "No sliders found." }}
      />

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredSliders.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </Modal>
  );
};

export default SliderSelectionModal;
