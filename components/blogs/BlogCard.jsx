// components/Blog/BlogCard.jsx

import React from "react";
import { Button, Popconfirm, Tooltip } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import router from "next/router";

const BlogCard = ({ blog, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Blog Thumbnail */}
        {blog?.thumbnail && (
          <div className="flex-shrink-0">
            <Image
              src={blog.thumbnail}
              width={150}
              height={100}
              alt="Blog Thumbnail"
              className="rounded-md object-cover"
            />
          </div>
        )}
        {/* Blog Details */}
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h3
              className="text-xl font-semibold text-theme cursor-pointer hover:underline"
              onClick={() => router.push(`/blogs/${blog.id}`)}
            >
              {blog.page_name_en}
            </h3>
            <p className="text-gray-600 mt-2">{blog.head?.seoDescription}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              {blog.updated_at && new Date(blog.updated_at).toDateString()}
            </span>
            <div className="flex items-center gap-2">
              <Tooltip title="View Blog">
                <Button
                  icon={<EyeOutlined />}
                  className="mavebutton"
                  onClick={() => router.push(`/blogs/${blog.id}`)}
                />
              </Tooltip>
              <Popconfirm
                title="Are you sure you want to delete this blog?"
                onConfirm={() => onDelete(blog.id)}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Delete Blog">
                  <Button
                    icon={<DeleteOutlined />}
                    className="mavecancelbutton"
                  />
                </Tooltip>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
