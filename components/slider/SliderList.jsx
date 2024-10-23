// components/slider/SliderList.jsx

import React, { useState } from "react";
import { Tabs, Input, Select, Pagination, Space, Button } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import ImageSlider from "./ImageSlider";
import CardSlider from "./CardSlider";

const { TabPane } = Tabs;
const { Option } = Select;

const SliderList = ({
  imageSliders,
  cardSliders,
  CustomNextArrow,
  CustomPrevArrow,
  MEDIA_URL,
  handleEditClick,
  handleDeleteSlider,
  handleSearch,
  handleFilter,
  sortType,
  setSortType,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  totalSliders,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = (value) => {
    handleSearch(value);
  };

  const onChangeItemsPerPage = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <Space className="flex justify-between mb-4">
        <Input
          placeholder="Search Sliders"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={onSearch}
          className="w-1/3"
          allowClear
        />
        <Button
          icon={<FilterOutlined />}
          onClick={handleFilter}
          className="bg-blue-500 text-white"
        >
          Filter
        </Button>
        <Select
          defaultValue={itemsPerPage}
          onChange={onChangeItemsPerPage}
          className="w-24"
        >
          <Option value={6}>6</Option>
          <Option value={12}>12</Option>
          <Option value={24}>24</Option>
        </Select>
      </Space>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Image Sliders" key="1">
          {imageSliders.length > 0 ? (
            imageSliders.map((slider) => (
              <ImageSlider
                key={slider.id}
                slider={slider}
                CustomNextArrow={CustomNextArrow}
                CustomPrevArrow={CustomPrevArrow}
                MEDIA_URL={MEDIA_URL}
                handleEditClick={handleEditClick}
                handleDeleteSlider={handleDeleteSlider}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <h2>No Image Sliders Found</h2>
            </div>
          )}
        </TabPane>
        <TabPane tab="Card Sliders" key="2">
          {cardSliders.length > 0 ? (
            cardSliders.map((slider) => (
              <CardSlider
                key={slider.id}
                slider={slider}
                CustomNextArrow={CustomNextArrow}
                CustomPrevArrow={CustomPrevArrow}
                MEDIA_URL={MEDIA_URL}
                handleEditClick={handleEditClick}
                handleDeleteSlider={handleDeleteSlider}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <h2>No Card Sliders Found</h2>
            </div>
          )}
        </TabPane>
      </Tabs>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={totalSliders}
        onChange={(page) => setCurrentPage(page)}
        className="mt-4 flex justify-center"
      />
    </div>
  );
};

export default SliderList;
