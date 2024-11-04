// components/PageBuilder/PagesHeader.jsx

import {
  CloseCircleFilled,
  FilterOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Breadcrumb, Switch, Select } from "antd";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const PagesHeader = ({
  onSearch,
  onCreate,
  onFooterCreate,
  createMode,
  onCancelCreate,
  sortType,
  setSortType,
  onShowChange,
  handleFilter,
}) => {
  const router = useRouter();

  return (
    <>
      {/* Top Header with Logo and Create/Cancel Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 border-b-4 border-gray-300 px-6 pt-8 pb-4">
        <div className="flex items-center gap-4">
          <div
            className="border-2 border-gray-300 bg-white rounded-md py-2 px-3 hover:bg-theme cursor-pointer"
            onClick={() => router.push("/build-with-ai")}
          >
            <Image
              src="/icons/mave/forms.svg"
              width={24}
              height={24}
              alt="Pages"
              className="w-6"
            />
          </div>
          <h2 className="text-2xl font-semibold">Pages</h2>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          {createMode ? (
            <Button
              icon={<CloseCircleFilled />}
              onClick={onCancelCreate}
              className="mavecancelbutton"
            >
              Cancel Create
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                icon={<PlusCircleOutlined />}
                className="mavebutton"
                onClick={onCreate}
              >
                Create Page
              </Button>
              <Button
                icon={<PlusCircleOutlined />}
                className="mavecancelbutton"
                onClick={onFooterCreate}
              >
                Create Footer
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Sorting, Filtering, Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 px-6 py-2">
        {/* Sorting */}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-500">Sort By:</h2>
          <Switch
            checkedChildren="Last"
            unCheckedChildren="First"
            checked={sortType === "asc"}
            onChange={(checked) => setSortType(checked ? "asc" : "desc")}
          />
        </div>

        {/* Actions: Select, Filter, Search */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Select
            defaultValue="10"
            className="w-32 h-11 border border-gray-300 rounded-md"
            onChange={onShowChange}
          >
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="20">20</Select.Option>
            <Select.Option value="50">50</Select.Option>
            <Select.Option value="100">100</Select.Option>
            <Select.Option value="200">200</Select.Option>
          </Select>
          <Button
            icon={<FilterOutlined />}
            className="bg-white text-gray-500 font-semibold text-lg py-2 px-4 shadow-md border-2 border-gray-300 rounded-md"
            onClick={handleFilter}
          >
            Filter
          </Button>
          <Input
            placeholder="Search (e.g. Home)"
            className="w-full md:w-72 h-11 border-2 border-gray-300 rounded-md"
            allowClear
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default PagesHeader;
