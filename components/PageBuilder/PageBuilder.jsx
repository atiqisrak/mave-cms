// components/PageBuilder/PageBuilder.jsx

import React, { useEffect, useState } from "react";
import SectionList from "./Sections/SectionList";
import { Button, message, Spin } from "antd";
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
    return (
      <div className="m-auto">
        <Spin />
      </div>
    );
  }

  if (!pageData) {
    return <div>Error loading page data.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{pageData.page_name_en} Page</h1>
        <Button onClick={savePageData} className="mavebutton">
          Save Page
        </Button>
      </div>
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
