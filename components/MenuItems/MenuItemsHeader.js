// components/MenuItems/MenuItemsHeader.js

import React from "react";
import { Input, Switch, Button, Select } from "antd";
import {
  CheckCircleFilled,
  FilterOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Image from "next/image";

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
}) => {
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
            Add New Menu
          </Button>
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
          >
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="20">20</Select.Option>
            <Select.Option value="30">30</Select.Option>
          </Select>
          <Button
            icon={<FilterOutlined />}
            className="bg-white text-gray-500 font-semibold text-lg py-5 shadow-md border-2 border-gray-300 w-fit"
            onClick={handleFilter}
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
    </>
  );
};

export default MenuItemsHeader;
