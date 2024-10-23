// pages/sliders.jsx

import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Tabs, message, Spin, Space, Form } from "antd";
import {
  HomeFilled,
  PlusCircleOutlined,
  CopyOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import instance from "../axios";
import Loader from "../components/Loader";
import SliderList from "../components/slider/SliderList";
import SliderForm from "../components/slider/SliderForm";
import SlidersHeader from "../components/slider/SlidersHeader";

const { TabPane } = Tabs;

const Sliders = () => {
  const router = useRouter();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [imageSliders, setImageSliders] = useState([]);
  const [cardSliders, setCardSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [form] = Form.useForm();
  const [type, setType] = useState("image");
  const [filterOptions, setFilterOptions] = useState({
    parentMenus: [], // Example filter option, adjust as needed
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("asc");

  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  const CustomPrevArrow = ({ onClick }) => (
    <Button
      icon={<LeftOutlined />}
      onClick={onClick}
      size="large"
      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent border-none"
    />
  );

  const CustomNextArrow = ({ onClick }) => (
    <Button
      icon={<RightOutlined />}
      onClick={onClick}
      size="large"
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent border-none"
    />
  );

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/sliders");
      if (response.data) {
        setSliders(response.data);
        setImageSliders(
          response.data.filter((slider) => slider.type === "image")
        );
        setCardSliders(
          response.data.filter((slider) => slider.type === "card")
        );
      } else {
        message.error("Failed to fetch sliders.");
      }
    } catch (error) {
      message.error("Failed to fetch sliders.");
    }
    setLoading(false);
  };

  const fetchFilterOptions = async () => {};

  useEffect(() => {
    // fetchFilterOptions();
    fetchSliders();
  }, []);

  const handleAddSlider = () => {
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingItemId(null);
    form.resetFields();
    setSelectedMedia([]);
    setSelectedCards([]);
  };

  const handleEditClick = (id) => {
    setEditingItemId(id);
    setIsFormVisible(true);
    const slider = sliders.find((s) => s.id === id);
    if (slider) {
      form.setFieldsValue({
        title_en: slider.title_en,
        title_bn: slider.title_bn,
        description_en: slider.description_en,
        description_bn: slider.description_bn,
        type: slider.type,
      });
      setSelectedMedia(slider.media_ids || []);
      setSelectedCards(slider.card_ids || []);
      setType(slider.type);
    }
  };

  const handleDeleteSlider = async (id) => {
    try {
      setLoading(true);
      await instance.delete(`/sliders/${id}`);
      message.success("Slider deleted successfully.");
      fetchSliders();
    } catch (error) {
      message.error("Failed to delete slider.");
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    if (!value) {
      fetchSliders();
      return;
    }
    setLoading(true);
    try {
      const response = await instance.get("/sliders/search", {
        params: { query: value },
      });
      if (response.data) {
        setSliders(response.data);
        setImageSliders(
          response.data.filter((slider) => slider.type === "image")
        );
        setCardSliders(
          response.data.filter((slider) => slider.type === "card")
        );
      } else {
        message.error("No sliders found.");
      }
    } catch (error) {
      message.error("Search failed.");
    }
    setLoading(false);
  };

  const handleFilter = () => {
    setIsFilterModalVisible(true);
  };

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const applyFilters = (filters) => {
    // Implement your filter logic based on the filters received
    // For example, filter by slider type or other criteria
    let filteredSliders = [...sliders];
    if (filters.type) {
      filteredSliders = filteredSliders.filter(
        (slider) => slider.type === filters.type
      );
    }
    // Add more filter conditions as needed
    setSliders(filteredSliders);
    setImageSliders(
      filteredSliders.filter((slider) => slider.type === "image")
    );
    setCardSliders(filteredSliders.filter((slider) => slider.type === "card"));
  };

  const resetFilters = () => {
    fetchSliders();
  };

  return (
    <div className="mavecontainer bg-gray-50 rounded-xl">
      <SlidersHeader
        onAddSlider={handleAddSlider}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortType={sortType}
        setSortType={setSortType}
        handleFilter={handleFilter}
        onShowChange={(value) => {
          // Handle items per page change if needed
          // For now, it's managed in SliderList
        }}
        handleSelectAll={() => {
          // Implement select all logic if applicable
        }}
        allSelected={false} // Adjust based on your selection logic
        filterOptions={filterOptions}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
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
      />
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
          handleSearch={handleSearch}
          handleFilter={handleFilter}
          sortType={sortType}
          setSortType={setSortType}
          itemsPerPage={12} // Adjust as needed or manage via state
          setItemsPerPage={() => {}} // Implement if managing via state
          currentPage={1} // Adjust as needed or manage via state
          setCurrentPage={() => {}} // Implement if managing via state
          totalSliders={sliders.length}
        />
      )}
    </div>
  );
};

export default Sliders;
