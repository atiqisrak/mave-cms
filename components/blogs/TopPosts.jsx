// components/Blog/TopPosts.jsx

import React from "react";
import { Input, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import router from "next/router";

const { Title } = Typography;

const TopPosts = ({ blogs }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 border border-gray-300 rounded-lg">
      <Input
        placeholder="Search for blogs"
        className="w-full mb-4"
        prefix={<SearchOutlined />}
        onChange={(e) => {
          // Implement search functionality if needed
        }}
      />
      <Title level={4}>Top Posts</Title>
      <div className="w-full">
        {blogs?.map((blog) => (
          <h4
            key={blog.id}
            className="text-theme cursor-pointer hover:underline mb-2"
            onClick={() => router.push(`/blogs/${blog.id}`)}
          >
            {blog.page_name_en}
          </h4>
        ))}
      </div>
      <Title level={4}>Follow us on social media</Title>
      <div className="flex gap-4">
        <Image
          src="/icons/social/facebook.svg"
          width={32}
          height={32}
          alt="Facebook"
          className="cursor-pointer"
          onClick={() => window.open("https://facebook.com", "_blank")}
        />
        <Image
          src="/icons/social/linkedin.svg"
          width={32}
          height={32}
          alt="LinkedIn"
          className="cursor-pointer"
          onClick={() => window.open("https://linkedin.com", "_blank")}
        />
        <Image
          src="/icons/social/instagram.svg"
          width={32}
          height={32}
          alt="Instagram"
          className="cursor-pointer"
          onClick={() => window.open("https://instagram.com", "_blank")}
        />
      </div>
    </div>
  );
};

export default TopPosts;
