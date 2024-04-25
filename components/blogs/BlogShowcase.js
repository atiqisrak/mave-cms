import { Button } from "antd";
import React from "react";
import router from "next/router";
import { EyeOutlined } from "@ant-design/icons";

const BlogShowcase = ({ blogs }) => {
  return (
    <div>
      {blogs?.map((blog, index) => {
        return (
          <div
            key={index}
            className="blog"
            style={{
              display: "flex",
              justifyContent: "space-between",
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
            <h2>{blog?.page_name_en}</h2>
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
            >
              View
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default BlogShowcase;
