import React from "react";
import { Button, Card, Col, Row, Input, Popconfirm } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EditOutlined,
  DeleteFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";

const Renderpages = ({
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
}) => (
  <Row gutter={[16, 16]}>
    {webpages?.map((page) => (
      <Col key={page.id} xs={24}>
        <Card
          title={`Page ID-${page.id}: ${page.page_name_en}`}
          extra={
            <div style={{ display: "flex", gap: "1em" }}>
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEditPage(page.id)}
              >
                Edit Page
              </Button>
              <Button onClick={() => handleExpand(page.id)}>
                {expandedPageId === page.id ? "Collapse" : "Expand"}
                {expandedPageId === page.id ? (
                  <CloseCircleFilled />
                ) : (
                  <PlusCircleOutlined />
                )}
              </Button>
            </div>
          }
        >
          {expandedPageId === page.id && (
            <center>
              {editMode ? (
                <>
                  <Button
                    icon={<CloseCircleFilled />}
                    danger
                    onClick={() => setEditMode(false)}
                  >
                    Cancel Edit
                  </Button>
                  <Button
                    icon={<CheckCircleFilled />}
                    type="primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEditPage(page.id)}
                  >
                    Edit Page
                  </Button>
                  <Popconfirm
                    title="Delete page?"
                    onConfirm={() => handleDeletePage(page.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<DeleteFilled />} danger>
                      Delete Page
                    </Button>
                  </Popconfirm>
                </>
              )}
              <div className="pageContainer" style={{ padding: "2em 0" }}>
                {editPageInfo ? (
                  <Input
                    placeholder={page.page_name_en}
                    value={pageNameEn}
                    onChange={(e) => setPageNameEn(e.target.value)}
                  />
                ) : (
                  <h1>{page.page_name_en}</h1>
                )}
                {editPageInfo && (
                  <Input
                    placeholder={page.page_name_bn}
                    value={pageNameBn}
                    onChange={(e) => setPageNameBn(e.target.value)}
                  />
                )}
                <h1>{page.page_name_bn}</h1>
                <h1>{`Link: /${page.slug}`}</h1>
              </div>
            </center>
          )}
        </Card>
      </Col>
    ))}
  </Row>
);

export default Renderpages;
