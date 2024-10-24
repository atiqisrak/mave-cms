// components/slider/SlidersHeader.jsx

import React, { useState } from "react";
import { Input, Button, Select, Modal, Form, Space } from "antd";
import {
  FilterOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const { Option } = Select;

const SlidersHeader = ({
  onAddSlider,
  searchTerm,
  setSearchTerm,
  sortType,
  setSortType,
  handleFilter,
  filterOptions,
  applyFilters,
  resetFilters,
}) => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [form] = Form.useForm();

  const openFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalVisible(false);
  };

  const onFinish = (values) => {
    applyFilters(values);
    closeFilterModal();
  };

  const handleResetFilters = () => {
    form.resetFields();
    resetFilters();
    closeFilterModal();
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 border-b-4 border-gray-300 px-6 pt-8 pb-4">
        <div className="flex items-center gap-4">
          <div className="border-2 border-gray-300 bg-white rounded-md py-2 px-3">
            <Image
              src="/icons/mave/slider.svg"
              width={24}
              height={24}
              alt="Sliders"
              className="w-6"
            />
          </div>
          <h2 className="text-2xl font-semibold">Sliders</h2>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Button
            icon={<PlusCircleOutlined />}
            onClick={onAddSlider}
            className="mavebutton"
          >
            Add New Slider
          </Button>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 px-3 py-1">
        <div className="flex items-center gap-4">
          {/* Sorting Controls */}
          <h2 className="text-lg font-semibold text-gray-500">Sort By:</h2>
          <Button
            onClick={() => setSortType("asc")}
            className={`${
              sortType === "asc" ? "mavebutton" : "mavecancelbutton"
            }`}
          >
            Newest
          </Button>
          <Button
            onClick={() => setSortType("desc")}
            className={`${
              sortType === "desc" ? "mavebutton" : "mavecancelbutton"
            }`}
          >
            Oldest
          </Button>
        </div>
        <div className="flex justify-end items-center gap-5 mt-4 md:mt-0">
          {/* Items Per Page Selector */}
          {/* <Select
            defaultValue="10"
            className="w-fit h-11 border border-gray-300 rounded-md"
            onChange={(value) => handleFilter("itemsPerPage", value)}
          >
            <Option value="10">10</Option>
            <Option value="20">20</Option>
            <Option value="30">30</Option>
          </Select> */}

          {/* Search Input */}
          <Input
            placeholder="Search Sliders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48 md:w-72 h-11 border-2 border-gray-300 rounded-md"
            allowClear
            prefix={<SearchOutlined />}
          />
        </div>
      </div>
    </>
  );
};

export default SlidersHeader;
