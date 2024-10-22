import { message, Spin } from "antd";
import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { useRouter } from "next/router";
import PagesHeader from "../../components/PageBuilder/PagesHeader";
import CreatePageModal from "../../components/PageBuilder/CreatePageModal";
import PagesTabs from "../../components/PageBuilder/PagesTabs";

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [typePages, setTypePages] = useState([]);
  const [typeSubpages, setTypeSubpages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [expandedPageId, setExpandedPageId] = useState(null);
  const [sortType, setSortType] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  // Fetch all pages from the API
  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/pages");
      if (response.data) {
        const mainPages = response.data.filter(
          (page) =>
            page.type === "Page" &&
            (!page.additional || page.additional[0].pageType === "Page")
        );
        const subPages = response.data.filter(
          (page) =>
            page.type === "Page" &&
            page.additional &&
            page.additional[0].pageType === "Subpage"
        );
        setTypePages(mainPages);
        setTypeSubpages(subPages);
        setLoading(false);
      } else {
        message.error("Failed to fetch pages.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
      message.error("An error occurred while fetching pages.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    const sortedPages = typePages.sort((a, b) => {
      if (sortType === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setTypePages(sortedPages);
  }, [sortType]);

  const handleReset = () => {
    fetchPages();
    setSortType("asc");
    setSearchTerm("");
  };

  const handleExpand = (pageId) => {
    setExpandedPageId((prevId) => (prevId === pageId ? null : pageId));
  };

  const openCreateModal = () => {
    setCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  const handlePageCreated = (newPage) => {
    // Optionally, add the new page to the state without refetching
    setTypePages((prevPages) => [newPage, ...prevPages]);
  };

  const handleDeletePage = async (deletePageId) => {
    try {
      await instance.delete(`/pages/${deletePageId}`);
      message.success("Page deleted successfully.");
      // Remove the deleted page from state
      setTypePages((prevPages) =>
        prevPages.filter((page) => page.id !== deletePageId)
      );
    } catch (error) {
      console.error("Error deleting page:", error);
      message.error("An error occurred while deleting the page.");
    }
  };

  const handleEditPage = (id) => {
    router.push(`/page-builder/${id}`);
  };

  const handleEditPageInfo = async ({
    id,
    pageNameEn,
    pageNameBn,
    slug,
    pageType,
  }) => {
    try {
      const response = await instance.put(`/pages/${id}`, {
        page_name_en: pageNameEn,
        page_name_bn: pageNameBn,
        slug: slug,
        additional: [
          {
            pageType: pageType,
          },
        ],
      });
      if (response.status === 200) {
        message.success("Page info updated successfully.");
        // Update the page in state
        setTypePages((prevPages) =>
          prevPages.map((page) =>
            page.id === id
              ? {
                  ...page,
                  page_name_en: pageNameEn,
                  page_name_bn: pageNameBn,
                  slug: slug,
                  additional: [{ pageType }],
                }
              : page
          )
        );
        fetchPages();
      } else {
        message.error("Failed to update page info.");
      }
    } catch (error) {
      console.error("Error updating page info:", error);
      message.error("An error occurred while updating the page info.");
    }
  };

  const handlePageSearch = (searchText) => {
    if (searchText.trim() === "") {
      fetchPages();
      return;
    }

    const filteredMainPages = typePages.filter((page) =>
      page.page_name_en.toLowerCase().includes(searchText.toLowerCase())
    );

    const filteredSubPages = typeSubpages.filter((page) =>
      page.page_name_en.toLowerCase().includes(searchText.toLowerCase())
    );

    setTypePages(filteredMainPages);
    setTypeSubpages(filteredSubPages);
  };

  // Loading State
  if (loading) {
    return (
      <div className="mavecontainer flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mavecontainer bg-gray-50 rounded-xl">
      {/* Header */}
      <PagesHeader
        onSearch={handlePageSearch}
        onCreate={openCreateModal}
        createMode={createModalVisible}
        onCancelCreate={closeCreateModal}
        sortType={sortType}
        setSortType={setSortType}
      />

      {/* Create Page Modal */}
      <CreatePageModal
        visible={createModalVisible}
        onCancel={closeCreateModal}
        onPageCreated={handlePageCreated}
      />

      {/* Tabs for Pages and Subpages */}
      <PagesTabs
        typePages={typePages}
        typeSubpages={typeSubpages}
        handleExpand={handleExpand}
        expandedPageId={expandedPageId}
        handleDeletePage={handleDeletePage}
        handleEditPage={handleEditPage}
        handleEditPageInfo={handleEditPageInfo}
      />
    </div>
  );
};

export default Pages;
