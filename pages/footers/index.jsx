// pages/footers/index.jsx

import { message, Spin } from "antd";
import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { useRouter } from "next/router";
import PagesHeader from "../../components/PageBuilder/PagesHeader";
import CreatePageModal from "../../components/PageBuilder/CreatePageModal";
import RenderPages from "../../components/PageBuilder/Renderpages";

const Footers = () => {
  const [footers, setFooters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createFooterModalVisible, setCreateFooterModalVisible] =
    useState(false);
  const [expandedPageId, setExpandedPageId] = useState(null);
  const [sortType, setSortType] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const router = useRouter();

  // Fetch footers from the API
  const fetchFooters = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/pages?type=Footer");
      if (response.data) {
        setFooters(response.data);
      } else {
        message.error("Failed to fetch footers.");
      }
    } catch (error) {
      console.error("Error fetching footers:", error);
      message.error("An error occurred while fetching footers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooters();
  }, []);

  // Sort footers whenever sortType changes
  useEffect(() => {
    const sortedFooters = [...footers].sort((a, b) => {
      if (sortType === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setFooters(sortedFooters);
  }, [sortType]);

  const handleExpand = (pageId) => {
    setExpandedPageId((prevId) => (prevId === pageId ? null : pageId));
  };

  const openCreateFooterModal = () => {
    setCreateFooterModalVisible(true);
  };

  const closeCreateFooterModal = () => {
    setCreateFooterModalVisible(false);
  };

  const handleFooterCreated = (newFooter) => {
    setFooters((prevFooters) => [newFooter, ...prevFooters]);
  };

  const handleDeleteFooter = async (deletePageId) => {
    try {
      await instance.delete(`/pages/${deletePageId}`);
      message.success("Footer deleted successfully.");
      setFooters((prevFooters) =>
        prevFooters.filter((page) => page.id !== deletePageId)
      );
    } catch (error) {
      console.error("Error deleting footer:", error);
      message.error("An error occurred while deleting the footer.");
    }
  };

  const handleEditFooter = (id) => {
    router.push(`/page-builder/${id}`);
  };

  const handleEditFooterInfo = async (updatedData) => {
    try {
      const response = await instance.put(`/pages/${updatedData.id}`, {
        page_name_en: updatedData.pageNameEn,
        page_name_bn: updatedData.pageNameBn,
        slug: updatedData.slug,
        additional: [
          {
            pageType: updatedData.pageType,
            metaTitle: updatedData.metaTitle,
            metaDescription: updatedData.metaDescription,
            keywords: updatedData.keywords,
            metaImage: updatedData.metaImage,
            metaImageAlt: updatedData.metaImageAlt,
          },
        ],
      });
      if (response.status === 200) {
        message.success("Footer info updated successfully.");
        setFooters((prevFooters) =>
          prevFooters.map((page) =>
            page.id === updatedData.id
              ? {
                  ...page,
                  ...updatedData,
                  additional: [
                    {
                      pageType: updatedData.pageType,
                      metaTitle: updatedData.metaTitle,
                      metaDescription: updatedData.metaDescription,
                      keywords: updatedData.keywords,
                      metaImage: updatedData.metaImage,
                      metaImageAlt: updatedData.metaImageAlt,
                    },
                  ],
                }
              : page
          )
        );
      } else {
        message.error("Failed to update footer info.");
      }
    } catch (error) {
      console.error("Error updating footer info:", error);
      message.error("An error occurred while updating the footer info.");
    }
  };

  const handleFooterSearch = (searchText) => {
    if (searchText.trim() === "") {
      fetchFooters();
      return;
    }
    const filteredFooters = footers.filter((page) =>
      page.page_name_en.toLowerCase().includes(searchText.toLowerCase())
    );
    setFooters(filteredFooters);
  };

  const handleShowChange = (value) => {
    setItemsPerPage(value);
  };

  const handleFilter = () => {
    message.info("Filter functionality is not implemented yet.");
  };

  if (loading) {
    return (
      <div className="mavecontainer flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mavecontainer bg-gray-50 rounded-xl p-4">
      <PagesHeader
        onSearch={handleFooterSearch}
        onCreate={openCreateFooterModal}
        createMode={createFooterModalVisible}
        onCancelCreate={closeCreateFooterModal}
        sortType={sortType}
        setSortType={setSortType}
        onShowChange={handleShowChange}
        handleFilter={handleFilter}
        title="Footers"
      />

      <CreatePageModal
        visible={createFooterModalVisible}
        onCancel={closeCreateFooterModal}
        onPageCreated={handleFooterCreated}
        fetchPages={fetchFooters}
        type="Footer"
      />

      <RenderPages
        webpages={footers.slice(0, itemsPerPage)}
        handleEditPage={handleEditFooter}
        handleExpand={handleExpand}
        expandedPageId={expandedPageId}
        handleDeletePage={handleDeleteFooter}
        handleEditPageInfo={handleEditFooterInfo}
      />
    </div>
  );
};

export default Footers;
