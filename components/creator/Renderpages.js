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

export default function Renderpages({
  webpages,
  handleEditPage,
  handleExpand,
  expandedPageId,
  editMode,
  setEditMode,
  handleSubmit,
  handleDeletePage,
  pageNameEn,
  setPageNameEn,
  pageNameBn,
  setPageNameBn,
  pageSlug,
  setPageSlug,
  setPageType,
  editPageInfo,
  setEditPageInfo,
  handleEditPageInfo,
}) {
  return (
    <div>
      <Row gutter={[16, 16]}>
        {webpages &&
          webpages?.map((page) => (
            <Col key={page?.id} xs={24}>
              <Card
                title={`Page ID-${page?.id} : ${page?.page_name_en}`}
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
                            {editPageInfo ? (
                              <Input
                                allowClear
                                defaultValue={page.page_name_en}
                                placeholder={page.page_name_en}
                                value={pageNameEn}
                                onChange={(e) => setPageNameEn(e.target.value)}
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
                            {editPageInfo ? (
                              <Input
                                allowClear
                                defaultValue={page.page_name_bn}
                                placeholder={page.page_name_bn}
                                value={pageNameBn}
                                onChange={(e) => setPageNameBn(e.target.value)}
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
                            {editPageInfo ? (
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
                                  onChange={(e) => setPageSlug(e.target.value)}
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
                                  <span
                                    style={{
                                      color: "var(--theme)",
                                    }}
                                  >
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
                          {/* Page Type */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "2em",
                            }}
                          >
                            {editPageInfo ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1em",
                                }}
                              >
                                <Radio.Group
                                  defaultValue={
                                    page?.additional === null
                                      ? "Page"
                                      : page?.additional?.map(
                                          (type) => type.pageType
                                        )
                                  }
                                  onChange={(e) => {
                                    setPageType(e.target.value);
                                  }}
                                >
                                  <Radio value="Page">Page</Radio>
                                  <Radio value="Subpage">Subpage</Radio>
                                </Radio.Group>
                              </div>
                            ) : (
                              <h1>
                                <span
                                  style={{
                                    color: "var(--themes)",
                                  }}
                                >
                                  Page Type:{" "}
                                </span>
                                {page?.additional === null ? (
                                  <span
                                    style={{
                                      color: "var(--theme)",
                                    }}
                                  >
                                    Page
                                  </span>
                                ) : (
                                  page?.additional.map((type) => (
                                    <span
                                      style={{
                                        color: "var(--theme)",
                                      }}
                                    >
                                      {type.pageType}
                                    </span>
                                  ))
                                )}
                              </h1>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4em",
                            }}
                          >
                            {editPageInfo ? (
                              <div>
                                <Popconfirm
                                  title="Are you sure you want to edit this page name?"
                                  onConfirm={() =>
                                    handleEditPageInfo({
                                      id: page?.id,
                                      prevpen: page?.page_name_en,
                                      prevpbn: page?.page_name_bn,
                                      prevpslug: page?.slug,
                                      prevptype: page?.type,
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
                                  onClick={() => setEditPageInfo(!editPageInfo)}
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
                                onClick={() => setEditPageInfo(!editPageInfo)}
                              >
                                Edit Page Info
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </center>
                  </div>
                )}
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
}
