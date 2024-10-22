// components/PageBuilder/PagesTabs.jsx

import React from "react";
import { Spin, Tabs } from "antd";
import RenderPages from "./Renderpages";

const { TabPane } = Tabs;

const PagesTabs = ({
  typePages,
  typeSubpages,
  handleExpand,
  expandedPageId,
  handleDeletePage,
  handleEditPage,
  handleEditPageInfo,
}) => {
  return (
    <Tabs centered animated defaultActiveKey="1" className="mt-8">
      <TabPane tab="Pages" key="1">
        {typePages ? (
          <RenderPages
            webpages={typePages}
            handleEditPage={handleEditPage}
            handleExpand={handleExpand}
            expandedPageId={expandedPageId}
            handleDeletePage={handleDeletePage}
            handleEditPageInfo={handleEditPageInfo}
          />
        ) : (
          <Spin size="large" />
        )}
      </TabPane>
      <TabPane tab="Subpages" key="2">
        {typeSubpages ? (
          <RenderPages
            webpages={typeSubpages}
            handleEditPage={handleEditPage}
            handleExpand={handleExpand}
            expandedPageId={expandedPageId}
            handleDeletePage={handleDeletePage}
            handleEditPageInfo={handleEditPageInfo}
          />
        ) : (
          <Spin size="large" />
        )}
      </TabPane>
    </Tabs>
  );
};

export default PagesTabs;
