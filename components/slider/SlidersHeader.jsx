// components/slider/SlidersHeader.jsx

import React, { useState } from "react";
import { Input, Switch, Button, Select, Modal, Form, Space } from "antd";
import {
  CheckCircleFilled,
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
  onShowChange,
  handleSelectAll,
  allSelected,
  filterOptions,
  applyFilters,
  resetFilters,
  isFormVisible,
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
        <div className="flex items-center gap-2 mt-4 md:mt-0">
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
      <div className="flex items-center justify-between gap-4 mb-4 px-3 py-1">
        <div className="flex items-center gap-4">
          <Button
            icon={<CheckCircleFilled />}
            className="bg-white text-gray-500 font-semibold text-lg py-6 shadow-md border-2 border-gray-300"
            onClick={handleSelectAll}
          >
            {allSelected ? "Unselect All" : "Select All"}
          </Button>
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-500">Sort By:</h2>
            <Switch
              checkedChildren="Newest"
              unCheckedChildren="Oldest"
              checked={sortType === "asc"}
              onChange={(checked) => setSortType(checked ? "asc" : "desc")}
            />
          </div>
        </div>
        <div className="flex justify-end items-center gap-5">
          <Select
            defaultValue="10"
            className="w-fit h-11 border border-gray-300 rounded-md"
            onChange={onShowChange}
          >
            <Option value="10">10</Option>
            <Option value="20">20</Option>
            <Option value="30">30</Option>
          </Select>
          <Button
            icon={<FilterOutlined />}
            className="bg-white text-gray-500 font-semibold text-lg py-5 shadow-md border-2 border-gray-300 w-fit"
            onClick={openFilterModal}
          >
            Filter
          </Button>
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

      {/* Filter Modal */}
      <Modal
        title="Filter Sliders"
        open={isFilterModalVisible}
        onCancel={closeFilterModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            type: undefined,
            parent_id: undefined,
          }}
        >
          {/* Example Filter Fields */}
          <Form.Item label="Slider Type" name="type">
            <Select placeholder="Select slider type" allowClear>
              <Option value="image">Image</Option>
              <Option value="card">Card</Option>
            </Select>
          </Form.Item>
          {/* Add more filter fields as needed */}
          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={handleResetFilters} className="mavecancelbutton">
                Reset
              </Button>
              <Button type="primary" htmlType="submit" className="mavebutton">
                Apply
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SlidersHeader;
