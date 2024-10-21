// components/PageBuilder/PageBuilder.jsx

import React, { useEffect, useState } from "react";
import SectionList from "./Sections/SectionList";
import { Button, message } from "antd";
import instance from "../../axios";

const PageBuilder = ({ pageId }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch page data from the backend
  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`/pages/${pageId}`);

        if (response.data) {
          setPageData(response.data);
        } else {
          setPageData(null);
        }
      } catch (error) {
        setPageData(null);
      } finally {
        setLoading(false);
      }
    };

    if (pageId) {
      fetchPageData();
    }
  }, [pageId]);

  // Save the page data to the backend
  const savePageData = async () => {
    try {
      await instance.put(`/pages/${pageData.id}`, pageData);
      message.success("Page saved successfully");
    } catch (error) {
      message.error("Failed to save page data");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pageData) {
    return <div>Error loading page data.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{pageData.page_name_en}</h1>
      <Button type="primary" onClick={savePageData} className="mb-4">
        Save Page
      </Button>
      <SectionList
        sections={pageData.body}
        setSections={(newSections) => {
          setPageData({ ...pageData, body: newSections });
        }}
      />
    </div>
  );
};

export default PageBuilder;
