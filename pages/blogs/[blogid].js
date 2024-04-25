import React, { useEffect, useState } from "react";
import instance from "../../axios";
import { useRouter } from "next/router";

export default function BlogPost() {
  const router = useRouter();
  const { blogid } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState({});

  const fetchBlogData = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get(`/pages/${blogid}`);
      if (response.status === 200) {
        setBlogData(response.data);
      }
    } catch (error) {
      console.log("Error fetching blog data: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogData();
  }, [blogid]);

  console.log("Blog data: ", blogData);

  return (
    <div className="ViewContainer">
      <h1>{blogData.page_name_en}</h1>
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        {blogData?.body?.map((blog, index) => {
          return (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: blog.value }}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
