import { Button } from "antd";
import { useEffect, useState } from "react";
import instance from "../../axios";
import router from "next/router";
import BlogShowcase from "../../components/blogs/BlogShowcase";
import { RightCircleFilled } from "@ant-design/icons";
import BlogCreator from "../../components/blogs/BlogCreator";

export default function index() {
  const [creatorMode, setCreatorMode] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get("/pages");
      if (response.status === 200) {
        response?.data?.map((blog, index) => {
          blog?.type === "Blog" && setBlogs((prev) => [...prev, blog]);
        });
      }
    } catch (error) {
      console.log("Error fetching blogs: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log("Blog data: ", blogs);

  return (
    <div className="mavecontainer">
      <center>
        <h1
          style={{
            margin: "2rem 0",
            color: "var(--theme)",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Welcome to blogs
        </h1>
        <BlogShowcase
          blogs={blogs}
          setBlogs={setBlogs}
          fetchBlogs={fetchBlogs}
        />
      </center>

      {/* <BlogEditor /> */}
      {/* <Button
        style={{
          display: creatorMode ? "none" : "block",
          margin: "1rem",
          backgroundColor: "var(--theme)",
          color: "white",
          fontSize: "1rem",
          fontWeight: "bold",
          border: "none",
          position: "absolute",
          top: "30px",
          right: "0",
        }}
        onClick={() => {
          setCreatorMode(!creatorMode);
        }}
      >
        Create Blog
      </Button> */}
      <center>
        <Button
          style={{
            margin: "1rem",
            backgroundColor: "var(--themes)",
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "none",
            height: "3rem",
          }}
          onClick={() => {
            router.push("/blogs/createblog");
          }}
          icon={<RightCircleFilled />}
        >
          Go to Creator Page
        </Button>
      </center>
      {creatorMode && (
        <BlogCreator
          creatorMode={creatorMode}
          setCreatorMode={setCreatorMode}
          fetchBlogs={fetchBlogs}
        />
      )}
    </div>
  );
}
