// components/PageBuilder/PageBuilder.jsx

import React, { useEffect, useState } from "react";
import SectionList from "./Sections/SectionList";
import { Button, message, Spin, Tooltip } from "antd"; // Added Tooltip
import { SaveOutlined } from "@ant-design/icons"; // Importing an icon for better visuals
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
        message.error("Failed to load page data.");
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
    if (!pageData) {
      message.error("No page data to save.");
      return;
    }

    try {
      await instance.put(`/pages/${pageData.id}`, pageData);
      message.success("Page saved successfully");
    } catch (error) {
      message.error("Failed to save page data");
    }
  };

  if (loading) {
    return (
      <div className="m-auto flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="text-center text-red-500">Error loading page data.</div>
    );
  }

  return (
    <div className="p-4 relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{pageData.page_name_en} Page</h1>
      </div>

      {/* Section List */}
      <SectionList
        sections={pageData.body}
        setSections={(newSections) => {
          setPageData({ ...pageData, body: newSections });
        }}
      />

      {/* Floating Save Button */}
      <Button
        icon={
          <SaveOutlined
            style={{
              fontSize: "2.5rem",
            }}
          />
        }
        onClick={savePageData}
        className="text-xl font-bold fixed bottom-11 right-10 bg-theme hover:bg-theme text-black p-4 rounded-full shadow-lg z-50 h-16 flex justify-center items-center border-2 border-themedark
        animate-bounce"
      >
        Save
      </Button>
    </div>
  );
};

export default PageBuilder;
