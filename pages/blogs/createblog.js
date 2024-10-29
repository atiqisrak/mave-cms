import { Button } from "antd";
import BlogEditor from "../../components/blogs/BlogEditor";
import BlogCreator from "../../components/blogs/BlogCreator";
import { useEffect, useState } from "react";
import instance from "../../axios";

export default function createblog() {
  const [creatorMode, setCreatorMode] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get("/pages");
      if (response.status === 200) {
        // setBlogs(response.data);
        response?.data?.map((blog, index) => {
          // setBlogs((prev) => [...prev, blog]);
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

  return (
    <div className="mavecontainer">
      <BlogCreator
        creatorMode={creatorMode}
        setCreatorMode={setCreatorMode}
        fetchBlogs={fetchBlogs}
      />
    </div>
  );
}
