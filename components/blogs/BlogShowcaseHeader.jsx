// components/Blog/BlogShowcaseHeader.jsx

import React, { useState } from "react";
import {
  Input,
  Button,
  Select,
  Popconfirm,
  message,
  Tooltip,
  Form,
  Switch,
  Modal,
} from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  CopyOutlined,
  FilterOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import Image from "next/image";
import router from "next/router";

const { Option } = Select;
const { Search } = Input;

const BlogShowcaseHeader = ({
  onAddBlog,
  searchTerm,
  setSearchTerm,
  sortType,
  setSortType,
  handleFilter,
  handleSelectAll,
  allSelected,
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 border-b-4 border-gray-300 px-6 pt-8 pb-4">
        {/* Left Section: Icon and Title */}
        <div className="flex items-center gap-4">
          <div className="border-2 border-gray-300 bg-white rounded-md py-2 px-3">
            <Image
              src="/icons/mave/blog.svg" // Ensure this path exists
              width={24}
              height={24}
              alt="Blog Icon"
              className="w-6"
            />
          </div>
          <h2 className="text-2xl font-semibold">Blogs</h2>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Tooltip title="Copy API Endpoint">
            <Button
              icon={<CopyOutlined />}
              className="mavecancelbutton"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`
                );
                message.success("API Endpoint copied to clipboard");
              }}
            />
          </Tooltip>
          <Button
            icon={<PlusCircleOutlined />}
            onClick={onAddBlog}
            className="mavebutton"
          >
            Create Blog
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-4 px-6 py-2">
        {/* Left Controls: Select All and Sort */}
        <div className="flex items-center gap-4">
          <Button
            icon={<CheckCircleFilled />}
            className="mavebutton"
            onClick={handleSelectAll}
          >
            {allSelected ? "Unselect All" : "Select All"}
          </Button>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-500">Sort By:</h2>
            <Switch
              checkedChildren="Last"
              unCheckedChildren="First"
              checked={sortType === "asc"}
              onChange={(checked) => setSortType(checked ? "asc" : "desc")}
            />
          </div>
        </div>

        {/* Right Controls: Pagination, Filter, and Search */}
        <div className="flex justify-end items-center gap-5">
          <Select
            defaultValue="10"
            className="w-fit h-11 border border-gray-300 rounded-md"
            onChange={(value) => handleFilter({ itemsPerPage: value })}
            showSearch
          >
            <Option value="10">10</Option>
            <Option value="20">20</Option>
            <Option value="30">30</Option>
          </Select>
          <Button
            icon={<FilterOutlined />}
            className="mavecancelbutton"
            onClick={openFilterModal}
          >
            Filter
          </Button>
          <Search
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48 md:w-72 h-11 border border-gray-300 rounded-md"
            allowClear
            prefix={<SearchOutlined />}
          />
        </div>
      </div>

      {/* Filter Modal */}
      <Modal
        title="Filter Blogs"
        open={isFilterModalVisible}
        onCancel={closeFilterModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            category: undefined,
            tag: undefined,
          }}
        >
          <Form.Item label="Category" name="category">
            <Select placeholder="Select a Category" allowClear showSearch>
              {filterOptions?.categories?.map((cat) => (
                <Option key={cat.id} value={cat.value}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Tags" name="tags">
            <Select
              mode="multiple"
              placeholder="Select Tags"
              allowClear
              showSearch
            >
              {filterOptions?.tags?.map((tag) => (
                <Option key={tag.id} value={tag.value}>
                  {tag.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Add more filter fields here if needed */}

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

export default BlogShowcaseHeader;
