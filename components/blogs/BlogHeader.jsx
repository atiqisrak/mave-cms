// components/Blog/BlogHeader.jsx

import React from "react";
import { Breadcrumb, Button, Tooltip } from "antd";
import {
  HomeFilled,
  PlusCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import router from "next/router";
import { message } from "antd";

const BlogHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b-4 border-gray-300 pb-4 px-6">
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
        <h2 className="text-2xl font-semibold">Create Blog</h2>
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
          onClick={() => {
            // Placeholder for additional actions
            message.info("Create Another Blog functionality not implemented.");
          }}
          className="mavebutton"
        >
          Create Another Blog
        </Button>
      </div>
    </div>
  );
};

export default BlogHeader;
