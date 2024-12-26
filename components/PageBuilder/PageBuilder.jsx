// components/PageBuilder/PageBuilder.jsx

import React, { useEffect, useRef, useState, useCallback } from "react";
import SectionList from "./Sections/SectionList";
import { Button, message, Spin } from "antd"; // Removed Tooltip for simplicity
import { SaveOutlined, EyeOutlined } from "@ant-design/icons"; // Changed to EyeOutlined for Preview
import instance from "../../axios";
import PagePreview from "./PagePreview";
import { useRouter } from "next/router";

const PageBuilder = ({ pageId }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false); // Track unsaved changes
  const router = useRouter();
  const initialLoadRef = useRef(true); // To prevent setting isDirty on initial load

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
        initialLoadRef.current = false; // Mark initial load as done
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
      setIsDirty(false); // Reset isDirty after saving
    } catch (error) {
      message.error("Failed to save page data");
    }
  };

  // Update isDirty when pageData changes
  useEffect(() => {
    if (initialLoadRef.current) return; // Do not set isDirty on initial load
    setIsDirty(true);
  }, [pageData]);

  // Handle browser/tab close or refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome to show the prompt
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  // Handle in-app navigation
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (isDirty) {
        const confirmLeave = window.confirm(
          "All unsaved changes will be discarded. Do you want to leave?"
        );
        if (!confirmLeave) {
          throw "Route change aborted due to unsaved changes.";
        }
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [isDirty, router.events]);

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
        setIsDirty={setIsDirty} // Pass setIsDirty to track changes
      />

      {/* Floating Save Button */}
      <Button
        icon={<SaveOutlined style={{ fontSize: "1.5rem" }} />}
        onClick={savePageData}
        className="text-lg font-bold fixed bottom-16 right-10 bg-theme hover:bg-theme text-black px-4 py-6 rounded-full shadow-lg z-50  border-2 border-themedark"
      >
        Save
      </Button>

      {/* Floating Preview Button */}
      <Button
        icon={<EyeOutlined style={{ fontSize: "1.5rem" }} />}
        onClick={() => setPreview(true)}
        className="text-lg font-bold fixed bottom-16 right-40 bg-theme hover:bg-theme text-black p-4 rounded-full shadow-lg z-50 h-16 w-16 flex justify-center items-center border-2 border-themedark"
      />

      {/* Page Preview Modal */}
      <PagePreview pageData={pageData} open={preview} setOpen={setPreview} />
    </div>
  );
};

export default PageBuilder;
