import { Button, Input, Popconfirm } from "antd";
import React from "react";
import router from "next/router";
import {
  DeleteOutlined,
  EyeOutlined,
  FacebookOutlined,
  InstagramFilled,
  LinkedinOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import instance from "../../axios";
import Image from "next/image";

const BlogShowcase = ({ blogs, setBlogs, fetchBlogs }) => {
  const handleDelete = async (id) => {
    const response = await instance.delete(`/pages/${id}`);
    if (response.status === 200) {
      fetchBlogs();
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        gap: "2rem",
      }}
    >
      <div
        className="top-posts"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
          border: "1px solid var(--theme)",
          borderRadius: "15px",
        }}
      >
        <Input
          placeholder="Search for blogs"
          style={{
            width: "90%",
            margin: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "15px",
            border: "1px solid var(--theme)",
          }}
          prefix={<SearchOutlined />}
        />
        <h3>Top Posts</h3>
        <div>
          {blogs?.map((blog, index) => {
            return (
              <h4
                style={{
                  color: "var(--theme)",
                  cursor: "pointer",
                  borderBottom: "1px solid #f0f0f0",
                  padding: "0.5rem",
                }}
                key={index}
                onClick={() => {
                  router.push(`/blogs/${blog?.id}`);
                }}
              >
                {blog?.page_name_en}
              </h4>
            );
          })}
        </div>
        <h3>Follow us on social media</h3>
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <FacebookOutlined
            style={{
              fontSize: "2rem",
              color: "#4267B2",
              cursor: "pointer",
            }}
          />
          <LinkedinOutlined
            style={{
              fontSize: "2rem",
              color: "#2867B2",
              cursor: "pointer",
            }}
          />
          <InstagramFilled
            style={{
              fontSize: "2rem",
              color: "#E1306C",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <div>
        {blogs?.map((blog, index) => {
          return (
            <div
              style={{
                display: "flex",
                // justifyContent: "space-between",
                flexDirection: "column",
                gap: "1rem",
                padding: "1rem",
                border: "1px solid var(--theme)",
                borderRadius: "5px",
                marginBottom: "2rem",
                boxShadow: "0px 0px 5px 0px var(--theme)",
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <div
                key={index}
                className="blog"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <div>
                  {blog?.thumbnail && (
                    <Image
                      src={blog?.thumbnail}
                      width={100}
                      height={100}
                      alt="blog-thumbnail"
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <h4>{blog?.page_name_en}</h4>
                    {blog?.head?.seoDescription && (
                      <p>{blog?.head?.seoDescription}</p>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "var(--theme)",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      border: "none",
                    }}
                    onClick={() => {
                      router.push(`/blogs/${blog?.id}`);
                    }}
                    icon={<EyeOutlined />}
                  />
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={() => {
                      handleDelete(blog?.id);
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        border: "none",
                      }}
                      icon={<DeleteOutlined />}
                    />
                  </Popconfirm>
                </div>
              </div>

              <h5
                style={{
                  borderTop: "1px solid #f0f0f0",
                  paddingTop: "0.5rem",
                  width: "100%",
                }}
              >
                {blog?.updated_at && new Date(blog?.updated_at).toDateString()}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogShowcase;
