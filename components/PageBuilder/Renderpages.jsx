// components/PageBuilder/RenderPages.jsx

import React from "react";
import { Row, Col, Spin } from "antd";
import PageCard from "./Components/PageCard";

const RenderPages = ({
  webpages = [], // Ensure default value is an empty array
  handleEditPage,
  handleExpand,
  expandedPageId,
  handleDeletePage,
  handleEditPageInfo,
}) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        {webpages.length > 0 ? (
          webpages.map((page) => (
            <Col key={page.id} xs={24} sm={24} md={12} lg={12} xl={12}>
              <PageCard
                page={page}
                handleExpand={handleExpand}
                expandedPageId={expandedPageId}
                handleDeletePage={handleDeletePage}
                handleEditPageInfo={handleEditPageInfo}
              />
            </Col>
          ))
        ) : (
          <div className="flex items-center justify-center w-full">
            <Spin size="large" />
          </div>
        )}
      </Row>
    </div>
  );
};

export default RenderPages;
