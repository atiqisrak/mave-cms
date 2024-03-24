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
} from "antd";
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
  const [newSlug, setNewSlug] = useState("");
  // Page name change
  const [pageNameEn, setPageNameEn] = useState("");
  const [pageNameBn, setPageNameBn] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [editPageName, setEditPageName] = useState(false);
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
        // slug = lowercased page_name_en, if space then hyphen
        slug: newPageTitleEn.toLowerCase().split(" ").join("-"),
      });
      if (response.status === 201) {
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

  const handleEditPageName = async ({ id, prevpen, prevpbn, prevpslug }) => {
    try {
      const response = await instance.put(`/pages/${id}`, {
        page_name_en: pageNameEn ? pageNameEn : prevpen,
        page_name_bn: pageNameBn ? pageNameBn : prevpbn,
        slug: pageSlug ? pageSlug : prevpslug,
      });
      if (response.status === 200) {
        message.success("Page info updated successfully");
        setEditPageName(false);
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
    // filter pages by page_name_en
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
                    <Card
                      title={`Page ID-${page?.id} : ${page?.page_name_en}`}
                      // title={page?.page_name_en}
                      extra={
                        <div
                          style={{
                            display: "flex",
                            gap: "2em",
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "var(--themes)",
                              borderColor: "var(--themes)",
                              color: "white",
                              borderRadius: "10px",
                              fontSize: "1.2em",
                              paddingBottom: "1.8em",
                            }}
                            onClick={() => handleEditPage(page.id)}
                            icon={<EditOutlined />}
                          >
                            Edit Page
                          </Button>
                          <Button
                            style={{
                              backgroundColor: "var(--theme)",
                              borderColor: "var(--theme)",
                              color: "white",
                              borderRadius: "10px",
                              fontSize: "1.2em",
                              paddingBottom: "1.8em",
                            }}
                            onClick={() => handleExpand(page?.id)}
                          >
                            {expandedPageId === page.id ? "Collapse" : "Expand"}
                            {expandedPageId === page.id ? (
                              <CloseCircleFilled />
                            ) : (
                              <PlusCircleOutlined />
                            )}
                          </Button>
                        </div>
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
                              className="pageContainer flexed-center"
                              style={{
                                padding: "2em 0",
                                gap: "2em",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: "2em",
                                  marginBottom: "2em",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2em",
                                  }}
                                >
                                  {editPageName ? (
                                    <Input
                                      allowClear
                                      defaultValue={page.page_name_en}
                                      placeholder={page.page_name_en}
                                      value={pageNameEn}
                                      onChange={(e) =>
                                        setPageNameEn(e.target.value)
                                      }
                                      style={{
                                        width: "16vw",
                                        height: "2.8em",
                                        borderRadius: "10px",
                                        fontSize: "1.2em",
                                        padding: "0 1em",
                                      }}
                                    />
                                  ) : (
                                    <h1>
                                      <span
                                        style={{
                                          color: "var(--themes)",
                                        }}
                                      >
                                        Page Name:
                                      </span>{" "}
                                      {page.page_name_en}
                                    </h1>
                                  )}
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2em",
                                  }}
                                >
                                  {editPageName ? (
                                    <Input
                                      allowClear
                                      defaultValue={page.page_name_bn}
                                      placeholder={page.page_name_bn}
                                      value={pageNameBn}
                                      onChange={(e) =>
                                        setPageNameBn(e.target.value)
                                      }
                                      style={{
                                        width: "16vw",
                                        height: "2.8em",
                                        borderRadius: "10px",
                                        fontSize: "1.2em",
                                        padding: "0 1em",
                                      }}
                                    />
                                  ) : (
                                    <h1>
                                      <span
                                        style={{
                                          color: "var(--themes)",
                                        }}
                                      >
                                        পৃষ্ঠার নাম:
                                      </span>{" "}
                                      {page.page_name_bn}
                                    </h1>
                                  )}
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2em",
                                  }}
                                >
                                  {editPageName ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1em",
                                      }}
                                    >
                                      <Input
                                        allowClear
                                        defaultValue={page.slug}
                                        placeholder={page.slug}
                                        value={pageSlug}
                                        onChange={(e) =>
                                          setPageSlug(e.target.value)
                                        }
                                        style={{
                                          width: "16vw",
                                          height: "2.8em",
                                          borderRadius: "10px",
                                          fontSize: "1.2em",
                                          padding: "0 1em",
                                        }}
                                      />
                                      <p
                                        style={{
                                          fontSize: "0.8em",
                                          color: "var(--themes)",
                                          textAlign: "left",
                                        }}
                                      >
                                        *Use only lowercase letters
                                        <br />
                                        *No spaces, use hyphen
                                        <br />
                                        *no special characters
                                        <br />
                                        <span style={{ color: "var(--theme)" }}>
                                          *Example: about-us
                                        </span>
                                      </p>
                                    </div>
                                  ) : (
                                    <h1>
                                      <span
                                        style={{
                                          color: "var(--themes)",
                                        }}
                                      >
                                        Link:{" "}
                                      </span>
                                      <a
                                        href="#"
                                        style={{
                                          color: "var(--theme)",
                                        }}
                                      >
                                        /{page.slug}
                                      </a>
                                    </h1>
                                  )}
                                </div>
                              </div>
                              {editPageName ? (
                                <div>
                                  <Popconfirm
                                    title="Are you sure you want to edit this page name?"
                                    onConfirm={() =>
                                      handleEditPageName({
                                        id: page?.id,
                                        prevpen: page?.page_name_en,
                                        prevpbn: page?.page_name_bn,
                                        prevpslug: page?.slug,
                                      })
                                    }
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <Button
                                      type="primary"
                                      icon={<CheckCircleFilled />}
                                      style={{
                                        backgroundColor: "green",
                                        borderColor: "green",
                                        color: "white",
                                        borderRadius: "10px",
                                        fontSize: "1.2em",
                                        paddingBottom: "1.8em",
                                        marginRight: "1em",
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </Popconfirm>

                                  <Button
                                    icon={<CloseCircleFilled />}
                                    danger
                                    onClick={() =>
                                      setEditPageName(!editPageName)
                                    }
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  type="primary"
                                  icon={<EditOutlined />}
                                  style={{
                                    backgroundColor: "var(--themes)",
                                    borderColor: "var(--themes)",
                                    color: "white",
                                    borderRadius: "10px",
                                    fontSize: "1.2em",
                                    paddingBottom: "1.8em",
                                  }}
                                  onClick={() => setEditPageName(!editPageName)}
                                >
                                  Edit Page Name
                                </Button>
                              )}
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
