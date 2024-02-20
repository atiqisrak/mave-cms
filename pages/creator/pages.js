import {
  CheckCircleFilled,
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteFilled,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Row, Col, Input, Modal, message } from "antd";
import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { useRouter } from "next/router";

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [expandedPageId, setExpandedPageId] = useState(null);
  const [newPageTitleEn, setNewPageTitleEn] = useState("");
  const [newPageTitleBn, setNewPageTitleBn] = useState("");
  const router = useRouter();

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/pages");
      if (response.data) {
        setPages(response.data);
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
      });
      if (response.status === 201) {
        const newPage = response.data;
        setPages((prevPages) => [...prevPages, newPage]);
        message.success("New page added successfully");
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

            message.success("Page deleted successfully");
            fetchPages();
          }
          );
        }
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

          {createMode ? (
            <Button
              danger
              style={{
                borderRadius: "10px",
                fontSize: "1.2em",
                marginRight: "1em",
                paddingBottom: "1.8em",
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
                paddingBottom: "1.8em",
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
                          <Col span={16} style={{
                            display: "flex",
                            gap: "1em"
                          }}>
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
                                paddingBottom: "1.8em",
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
                                paddingBottom: "1.8em",
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

              <Row gutter={[16, 16]}>
                {pages?.map((page) => (
                  <Col key={page?.id} xs={24}>
                    {console.log("Pages fetched:", page)}
                    <Card
                      title={`Page ID: ${page?.id}`}
                      extra={
                        <Button onClick={() => handleExpand(page?.id)}>
                          {expandedPageId === page.id ? "Collapse" : "Expand"}
                        </Button>
                      }
                      style={{
                        marginBottom: "5em",
                        marginTop: "3em",
                        border: "1px solid var(--theme)",
                        borderRadius: 10,
                      }}
                    >
                      {expandedPageId === page?.id && (
                        <div>
                          <center>
                            {editMode ? (
                              <>
                                <Button
                                  danger
                                  style={{
                                    borderRadius: "10px",
                                    fontSize: "1.2em",
                                    marginRight: "1em",
                                    paddingBottom: "1.8em",
                                  }}
                                  icon={<CloseCircleFilled />}
                                  onClick={() => {
                                    setEditMode(false);
                                  }}
                                >
                                  Cancel Edit
                                </Button>
                                <Button
                                  type="primary"
                                  style={{
                                    backgroundColor: "var(--theme)",
                                    borderColor: "var(--theme)",
                                    color: "white",
                                    borderRadius: "10px",
                                    fontSize: "1.2em",
                                    marginRight: "1em",
                                    paddingBottom: "1.8em",
                                  }}
                                  icon={<CheckCircleFilled />}
                                  onClick={handleSubmit}
                                >
                                  Submit
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  type="primary"
                                  style={{
                                    backgroundColor: "var(--theme)",
                                    borderColor: "var(--theme)",
                                    color: "white",
                                    borderRadius: "10px",
                                    fontSize: "1.2em",
                                    marginRight: "1em",
                                    paddingBottom: "1.8em",
                                  }}
                                  icon={<EditOutlined />}
                                  onClick={() => {
                                    handleEditPage(page.id);
                                  }}
                                >
                                  Edit Page
                                </Button>
                                <Button
                                  danger
                                  style={{
                                    borderRadius: "10px",
                                    fontSize: "1.2em",
                                    marginRight: "1em",
                                    paddingBottom: "1.8em",
                                  }}
                                  icon={<DeleteFilled />}
                                  onClick={() => {
                                    handleDeletePage(page.id);
                                  }}
                                >
                                  Delete Page
                                </Button>
                              </>
                            )}
                            <div
                              className="pageContainer"
                              style={{
                                padding: "2em 0",
                              }}
                            >
                              <h1>Page Name: {page.page_name_en}</h1>
                              <h1>Page Name (Bangla): {page.page_name_bn}</h1>
                            </div>
                          </center>
                        </div>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
