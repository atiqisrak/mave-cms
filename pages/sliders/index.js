// pages/sliders.jsx

import React, { useEffect, useState } from "react";
import { message, Spin, Form } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import instance from "../../axios";
import SliderList from "../../components/slider/SliderList";
import SliderForm from "../../components/slider/SliderForm";
import SlidersHeader from "../../components/slider/SlidersHeader";

const Sliders = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [allSliders, setAllSliders] = useState([]);
  const [displayedSliders, setDisplayedSliders] = useState([]);
  const [imageSliders, setImageSliders] = useState([]);
  const [cardSliders, setCardSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [form] = Form.useForm();
  const [type, setType] = useState("image");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("asc");

  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent border-none"
      aria-label="Previous Slide"
    >
      <LeftOutlined style={{ fontSize: "24px", color: "#000" }} />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent border-none"
      aria-label="Next Slide"
    >
      <RightOutlined style={{ fontSize: "24px", color: "#000" }} />
    </button>
  );

  // Fetch all sliders once
  const fetchSliders = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/sliders");
      if (response.data && Array.isArray(response.data)) {
        setAllSliders(response.data);
      } else {
        message.error("Failed to fetch sliders. Invalid data format.");
      }
    } catch (error) {
      console.error("Error fetching sliders:", error);
      message.error("Failed to fetch sliders.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Update displayedSliders based on searchTerm and sortType
  useEffect(() => {
    let filteredSliders = [...allSliders];

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filteredSliders = filteredSliders.filter(
        (slider) =>
          (slider.title_en &&
            slider.title_en.toLowerCase().includes(lowerSearch)) ||
          (slider.title_bn &&
            slider.title_bn.toLowerCase().includes(lowerSearch))
      );
    }

    // Apply sorting
    if (sortType === "asc") {
      // Newest first
      filteredSliders.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else {
      // Oldest first
      filteredSliders.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }

    setDisplayedSliders(filteredSliders);
  }, [allSliders, searchTerm, sortType]);

  // Update imageSliders and cardSliders based on displayedSliders
  useEffect(() => {
    const images = displayedSliders.filter(
      (slider) => slider.type && slider.type.toLowerCase() === "image"
    );
    const cards = displayedSliders.filter(
      (slider) => slider.type && slider.type.toLowerCase() === "card"
    );

    setImageSliders(images);
    setCardSliders(cards);
  }, [displayedSliders]);

  // Handle adding a new slider
  const handleAddSlider = () => {
    setIsFormVisible(true);
    setEditingItemId(null);
    form.resetFields();
    setSelectedMedia([]);
    setSelectedCards([]);
    setType("image");
  };

  // Handle cancelling the form
  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingItemId(null);
    form.resetFields();
    setSelectedMedia([]);
    setSelectedCards([]);
    setType("image");
  };

  // Handle editing a slider
  const handleEditClick = async (id) => {
    setEditingItemId(id);
    setIsFormVisible(true);
    try {
      const response = await instance.get(`/sliders/${id}`);
      const slider = response.data;
      if (slider) {
        form.setFieldsValue({
          title_en: slider.title_en,
          title_bn: slider.title_bn,
          description_en: slider.description_en,
          description_bn: slider.description_bn,
          type: slider.type,
        });
        setSelectedMedia(slider.medias || []);
        setSelectedCards(slider.card_ids || []);
        setType(slider.type);
      }
    } catch (error) {
      console.error("Error fetching slider details:", error);
      message.error("Failed to fetch slider details.");
      setIsFormVisible(false);
      setEditingItemId(null);
    }
  };

  // Handle deleting a slider
  const handleDeleteSlider = async (id) => {
    try {
      setLoading(true);
      await instance.delete(`/sliders/${id}`);
      message.success("Slider deleted successfully.");
      fetchSliders();
    } catch (error) {
      console.error("Error deleting slider:", error);
      message.error("Failed to delete slider.");
    }
    setLoading(false);
  };

  // Handle sort type change
  const handleSortTypeChange = (type) => {
    setSortType(type);
  };

  // Handle applying filters (if any additional filters are implemented)
  const applyFilters = (filters) => {
    // Implement your filter logic based on the filters received
    // This example assumes filters are already handled in the useEffect for search and sort
    // Add more filter conditions as needed
    message.success("Filters applied successfully.");
  };

  // Handle resetting filters
  const resetFilters = () => {
    setSearchTerm("");
    setSortType("asc");
    message.success("Filters reset successfully.");
  };

  return (
    <div className="mavecontainer bg-gray-50 rounded-xl p-4">
      {/* Header Section */}
      <SlidersHeader
        onAddSlider={handleAddSlider}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        sortType={sortType}
        setSortType={handleSortTypeChange}
      />

      {/* Slider Form Modal */}
      <SliderForm
        form={form}
        type={type}
        setType={setType}
        selectedMedia={selectedMedia}
        setSelectedMedia={setSelectedMedia}
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
        editingItemId={editingItemId}
        fetchSliders={fetchSliders}
        onCancelEdit={handleCancelForm}
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
      />

      {/* Slider List Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <SliderList
          imageSliders={imageSliders}
          cardSliders={cardSliders}
          CustomNextArrow={CustomNextArrow}
          CustomPrevArrow={CustomPrevArrow}
          MEDIA_URL={MEDIA_URL}
          handleEditClick={handleEditClick}
          handleDeleteSlider={handleDeleteSlider}
          itemsPerPage={6} // Set default items per page
        />
      )}
    </div>
  );
};

export default Sliders;
