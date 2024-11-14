// pages/blogs/index.js

import { useEffect, useState } from "react";
import instance from "../../axios";
import BlogShowcase from "../../components/blogs/BlogShowcase";
import BlogShowcaseHeader from "../../components/blogs/BlogShowcaseHeader";
import { Spin, message } from "antd";

export default function BlogIndex() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get("/pages");
      if (response.status === 200) {
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
        <>
          {/* Blog Showcase Header */}
          <BlogShowcaseHeader
            onAddBlog={() => (window.location.href = "/blogs/createblog")}
            searchTerm="" // Implement search functionality
            setSearchTerm={() => {}} // Implement search functionality
            sortType="asc" // Implement sort functionality
            setSortType={() => {}} // Implement sort functionality
            handleFilter={() => {}} // Implement filter functionality
            handleSelectAll={() => {}} // Implement select all functionality
            allSelected={false} // Implement select all state
            filterOptions={{
              categories: [
                { id: 1, name: "News", value: "news" },
                { id: 2, name: "Tech", value: "tech" },
                { id: 3, name: "Health", value: "health" },
                { id: 4, name: "Sports", value: "sports" },
                { id: 5, name: "Entertainment", value: "entertainment" },
                { id: 6, name: "Science", value: "science" },
              ],
              tags: [
                { id: 1, name: "News", value: "news" },
                { id: 2, name: "Tech", value: "tech" },
                { id: 3, name: "Health", value: "health" },
                { id: 4, name: "Sports", value: "sports" },
                { id: 5, name: "Entertainment", value: "entertainment" },
                { id: 6, name: "Science", value: "science" },
              ],
            }}
            applyFilters={() => {}} // Implement apply filters
            resetFilters={() => {}} // Implement reset filters
          />

          {/* Blog Showcase */}
          <BlogShowcase
            blogs={blogs}
            setBlogs={setBlogs}
            fetchBlogs={fetchBlogs}
          />
        </>
      )}
    </div>
  );
}
