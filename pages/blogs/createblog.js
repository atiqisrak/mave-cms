// pages/blogs/createblog.js

import { useState, useEffect } from "react";
import instance from "../../axios";
import BlogCreator from "../../components/blogs/BlogCreator";
import { Spin, message } from "antd";

export default function CreateBlog() {
  const [creatorMode, setCreatorMode] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get("/pages");
      if (response.status === 200) {
        console.log("Blog Data: ", response.data);
        const blogData = response.data.filter((blog) => blog.type === "Blog");
        setBlogs(blogData);
      }
    } catch (error) {
      console.error("Error fetching blogs: ", error);
      message.error("Failed to fetch blogs. Please try again.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="mavecontainer max-w-7xl mx-auto p-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <BlogCreator
          creatorMode={creatorMode}
          setCreatorMode={setCreatorMode}
          fetchBlogs={fetchBlogs}
        />
      )}
    </div>
  );
}
