import {
  CheckCircleFilled,
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteFilled,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Row,
  Col,
  Input,
  Modal,
  message,
  Popconfirm,
  Table,
  Switch,
  Radio,
  Tabs,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { useRouter } from "next/router";
import Renderpages from "../../components/creator/Renderpages";

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [expandedPageId, setExpandedPageId] = useState(null);
  const [newPageTitleEn, setNewPageTitleEn] = useState("");
  const [newPageTitleBn, setNewPageTitleBn] = useState("");
  const [newSlug, setNewSlug] = useState("");
  // Page name change
  const [pageNameEn, setPageNameEn] = useState("");
  const [pageNameBn, setPageNameBn] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [editPageInfo, setEditPageInfo] = useState(false);
  const [editPageType, setEditPageType] = useState(false);
  const [pageType, setPageType] = useState("");
  const [typePages, setTypePages] = useState([]);
  const [typeSubpages, setTypeSubpages] = useState([]);
  const router = useRouter();

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/pages");
      if (response.data) {
        // setPages(response.data);
        response?.data?.map((page, index) => {
          page?.type === "Page" && setPages((prev) => [...prev, page]);
        });
        setLoading(false);
      } else {
        console.error("Error fetching pages:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const filterPages = (pages) => {
    const mainPages = pages?.filter(
      (page) =>
        page?.additional === null || page?.additional[0]?.pageType === "Page"
    );
    const subPages = pages?.filter(
      (page) =>
        page?.additional !== null && page?.additional[0]?.pageType === "Subpage"
    );
    setTypePages(mainPages);
    setTypeSubpages(subPages);
  };

  useEffect(() => {
    filterPages(pages);
  }, [pages]);

  // console.log("Pages:", pages);
  // console.log("Type Pages:", typePages);
  // console.log("Type Subpages:", typeSubpages);

  const handleExpand = (pageId) => {
    if (expandedPageId === pageId) {
      setExpandedPageId(null);
    } else {
      setExpandedPageId(pageId);
    }
  };

  const openAddNewPageCard = () => {
    setCreateMode(true);
  };

  const closeAddNewPageCard = () => {
    setNewPageTitleEn("");
    setNewPageTitleBn("");
  };

  const handleAddNewPage = async () => {
    try {
      const response = await instance.post("/pages", {
        page_name_en: newPageTitleEn,
        page_name_bn: newPageTitleBn,
        type: "Page",
        favicon_id: 10,
        slug: newPageTitleEn.toLowerCase().split(" ").join("-"),
      });
      if (response.status === 201) {
        // console.log("New page added successfully");
        closeAddNewPageCard();
        fetchPages();
        setCreateMode(false);
      } else {
        console.error("Error adding New page:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding New page:", error);
    }
  };

  const handleDeletePage = async (deletePageId) => {
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this page?",
        content: "This action cannot be undone.",
        okText: "Yes",
        cancelText: "No",
        onOk: () => {
          instance.delete(`/pages/${deletePageId}`).then((response) => {
            if (response.status === 204) {
              setPages((prevPages) =>
                prevPages.filter((page) => page.id !== deletePageId)
              );
            } else {
              console.error("Error deleting page:", response.data.message);
            }

            console.log("Page deleted successfully");
            fetchPages();
          });
        },
      });
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setDeleteConfirmationVisible(false);
  };

  const handleEditPage = (id) => {
    setCreateMode(true);
    localStorage.setItem("creatorMode", true);
    router.push({ pathname: "/creator", query: { id: id } });
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const handleEditPageInfo = async ({
    id,
    prevpen,
    prevpbn,
    prevpslug,
    prevptype,
  }) => {
    try {
      const response = await instance.put(`/pages/${id}`, {
        page_name_en: pageNameEn ? pageNameEn : prevpen,
        page_name_bn: pageNameBn ? pageNameBn : prevpbn,
        slug: pageSlug ? pageSlug : prevpslug,
        additional: [
          {
            pageType: pageType ? pageType : prevptype,
          },
        ],
      });
      if (response.status === 200) {
        console.log("Page info updated successfully");
        setEditPageInfo(false);
        fetchPages();
      } else {
        console.error("Error updating page info:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating page info:", error);
    }
  };

  // filter pages
  const handlePageSearch = async (searchText) => {
    try {
      searchText === "" ? fetchPages() : null;

      const filteredPages = pages.filter((page) =>
        page.page_name_en.toLowerCase().includes(searchText.toLowerCase())
      );
      setPages(filteredPages);
    } catch (error) {
      console.error("Error filtering pages:", error);
    }
  };

  // spin on loading
  if (loading) {
    return (
      <div className="ViewContainer">
        <div className="ViewContentContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ViewContainer">
      <div className="ViewContentContainer">
        <div
          className="PageHeader"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>Pages</h1>

          <Input
            placeholder="Search Pages"
            suffix={<SearchOutlined />}
            style={{
              width: "20vw",
              height: "2em",
              borderRadius: "10px",
              fontSize: "1.2em",
              padding: "0 1em",
            }}
            onChange={(e) => handlePageSearch(e.target.value)}
          />

          {createMode ? (
            <Button
              danger
              style={{
                borderRadius: "10px",
                fontSize: "1.2em",
                marginRight: "1em",
                // paddingBottom: "1.8em",
              }}
              icon={<CloseCircleFilled />}
              onClick={() => setCreateMode(false)}
            >
              Cancel Create
            </Button>
          ) : (
            <Button
              type="primary"
              style={{
                backgroundColor: "var(--theme)",
                borderColor: "var(--theme)",
                color: "white",
                borderRadius: "10px",
                fontSize: "1.2em",
                marginRight: "1em",
                // paddingBottom: "1.8em",
              }}
              icon={<CheckCircleFilled />}
              onClick={() => openAddNewPageCard()}
            >
              Create New
            </Button>
          )}
        </div>

        <div>
          <div className="pageContainers">
            <div className="pageContainer">
              {createMode ? (
                <>
                  <div
                    className="createMode"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      border: "3px solid var(--theme)",
                      borderRadius: 10,
                      backgroundColor: "#f0f0f0",
                      padding: "4em 1em",
                      marginTop: "2em",
                    }}
                  >
                    <h1>Create Mode on</h1>
                    <div
                      className="createModeContainer"
                      style={{
                        padding: "2em 0",
                      }}
                    >
                      <div>
                        <Row
                          style={{
                            padding: "2em 3em",
                            alignItems: "center",
                          }}
                        >
                          <Col
                            span={16}
                            style={{
                              display: "flex",
                              gap: "1em",
                            }}
                          >
                            <Input
                              placeholder="Page Title En"
                              value={newPageTitleEn}
                              onChange={(e) =>
                                setNewPageTitleEn(e.target.value)
                              }
                              style={{
                                width: "16vw",
                                height: "2.8em",
                                borderRadius: "10px",
                                fontSize: "1.2em",
                                padding: "0 1em",
                              }}
                            />
                            <Input
                              placeholder="Page Title Bn"
                              value={newPageTitleBn}
                              onChange={(e) =>
                                setNewPageTitleBn(e.target.value)
                              }
                              style={{
                                width: "16vw",
                                height: "2.8em",
                                borderRadius: "10px",
                                fontSize: "1.2em",
                                padding: "0 1em",
                              }}
                            />
                          </Col>

                          <Col span={8} style={{ paddingLeft: "2em" }}>
                            <Button
                              type="primary"
                              onClick={handleAddNewPage}
                              style={{
                                marginRight: "1em",
                                backgroundColor: "var(--success)",
                                borderColor: "var(--success)",
                                color: "white",
                                borderRadius: "10px",
                                fontSize: "1.2em",
                                // paddingBottom: "1.8em",
                              }}
                              icon={<PlusCircleOutlined />}
                            >
                              Create Page
                            </Button>
                            <Button
                              // onClick={closeAddNewPageCard}
                              onClick={() => setCreateMode(false)}
                              style={{
                                backgroundColor: "var(--themes)",
                                borderColor: "var(--themes)",
                                color: "white",
                                borderRadius: "10px",
                                fontSize: "1.2em",
                                // paddingBottom: "1.8em",
                              }}
                              icon={<CloseCircleOutlined />}
                            >
                              Cancel
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {/* Pages and Subpages */}
              <Tabs
                centered
                animated
                defaultActiveKey="1"
                type="card"
                style={{
                  marginTop: "2em",
                }}
              >
                <Tabs.TabPane tab="Pages" key="1">
                  <Renderpages
                    webpages={typePages}
                    handleEditPage={handleEditPage}
                    handleExpand={handleExpand}
                    expandedPageId={expandedPageId}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    handleSubmit={handleEditPageInfo}
                    handleDeletePage={handleDeletePage}
                    pageNameEn={pageNameEn}
                    setPageNameEn={setPageNameEn}
                    pageNameBn={pageNameBn}
                    setPageNameBn={setPageNameBn}
                    pageSlug={pageSlug}
                    setPageSlug={setPageSlug}
                    setPageType={setPageType}
                    editPageInfo={editPageInfo}
                    setEditPageInfo={setEditPageInfo}
                    handleEditPageInfo={handleEditPageInfo}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Subpages" key="2">
                  <Renderpages
                    webpages={typeSubpages}
                    handleEditPage={handleEditPage}
                    handleExpand={handleExpand}
                    expandedPageId={expandedPageId}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    handleSubmit={handleEditPageInfo}
                    handleDeletePage={handleDeletePage}
                    pageNameEn={pageNameEn}
                    setPageNameEn={setPageNameEn}
                    pageNameBn={pageNameBn}
                    setPageNameBn={setPageNameBn}
                    pageSlug={pageSlug}
                    setPageSlug={setPageSlug}
                    setPageType={setPageType}
                    editPageInfo={editPageInfo}
                    setEditPageInfo={setEditPageInfo}
                    handleEditPageInfo={handleEditPageInfo}
                  />
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
