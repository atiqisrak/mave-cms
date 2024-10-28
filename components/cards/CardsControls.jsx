// components/cards/CardsControls.jsx

import React from "react";
import { Input, Select, Button } from "antd";
import {
  UnorderedListOutlined,
  AppstoreOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const CardsControls = ({
  searchTerm,
  onSearchChange,
  sortType,
  setSortType,
  sortField,
  setSortField,
  viewType,
  setViewType,
  pages,
  selectedPageFilter,
  setSelectedPageFilter,
  onRefresh,
}) => {
  return (
    <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex gap-4 items-center">
        {/* Search */}
        <Input
          placeholder="Search Cards"
          value={searchTerm}
          onChange={onSearchChange}
          allowClear
          className="w-48 md:w-72"
        />

        {/* Filter by page */}
        <Select
          placeholder="Filter by page"
          allowClear
          value={selectedPageFilter}
          onChange={(value) => setSelectedPageFilter(value)}
          className="w-48 md:w-72"
        >
          {pages?.map((page) => (
            <Select.Option key={page.slug} value={page.page_name}>
              {page.page_name_en}
            </Select.Option>
          ))}
        </Select>

        {/* Sort Field */}
        <Select
          placeholder="Sort by"
          value={sortField}
          onChange={(value) => setSortField(value)}
          className="w-36"
        >
          <Select.Option value="name">Name</Select.Option>
          <Select.Option value="date">Date</Select.Option>
        </Select>

        {/* Sort Order */}
        <Select
          placeholder="Order"
          value={sortType}
          onChange={(value) => setSortType(value)}
          className="w-36"
        >
          <Select.Option value="asc">Ascending</Select.Option>
          <Select.Option value="desc">Descending</Select.Option>
        </Select>
      </div>

      <div className="flex gap-4 items-center">
        {/* View Type Toggle */}
        {viewType === "grid" ? (
          <Button
            icon={<UnorderedListOutlined />}
            onClick={() => setViewType("list")}
            className="mavebutton"
          >
            List View
          </Button>
        ) : (
          <Button
            icon={<AppstoreOutlined />}
            onClick={() => setViewType("grid")}
            className="mavebutton"
          >
            Grid View
          </Button>
        )}

        {/* Refresh */}
        <Button
          icon={<SyncOutlined />}
          onClick={onRefresh}
          className="mavebutton"
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default CardsControls;
