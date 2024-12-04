// components/MenuItems/MenuItemsHeader.js

import React, { useState } from "react";
import {
  Input,
  Switch,
  Button,
  Select,
  Modal,
  Form,
  Tooltip,
  message,
} from "antd";
import {
  CheckCircleFilled,
  CopyOutlined,
  FilterOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const { Option } = Select;

const MenuItemsHeader = ({
  onAddMenuItem,
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
        <div className="flex items-center gap-4">
          <div className=" border-2 border-gray-300 bg-white rounded-md py-2 px-3">
            <Image
              src="/icons/mave/menuitems.svg"
              width={24}
              height={24}
              alt="Menu Items"
              className="w-6"
            />
          </div>
          <h2 className="text-2xl font-semibold">Menu Items</h2>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button
            icon={<PlusCircleOutlined />}
            onClick={onAddMenuItem}
            className="mavebutton"
          >
            Create Menu Item
          </Button>
          <Tooltip title="Copy API Endpoint">
            <Button
              icon={<CopyOutlined />}
              className="mavecancelbutton"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}/menuitems`
                );
                message.success("API Endpoint copied to clipboard");
              }}
            ></Button>
          </Tooltip>
        </div>
      </div>
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
              checkedChildren="Last"
              unCheckedChildren="First"
              checked={sortType === "asc"}
              onChange={(checked) => setSortType(checked ? "asc" : "desc")}
            />
          </div>
        </div>
        <div className="flex justify-end items-center gap-5">
          <Select
            defaultValue="10"
            className=" w-fit h-11 border-1 border-gray-300 rounded-md"
            onChange={onShowChange}
            showSearch
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
            placeholder="Search (e.g. Home)"
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
        title="Filter Menu Items"
        open={isFilterModalVisible}
        onCancel={closeFilterModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            parent_id: undefined,
          }}
        >
          {filterOptions && (
            <Form.Item label="Parent Menu" name="parent_id">
              <Select placeholder="Select a Parent Menu" allowClear showSearch>
                {filterOptions?.parentMenus?.map((menu) => (
                  <Option key={menu.id} value={menu.id}>
                    {menu.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
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

export default MenuItemsHeader;
