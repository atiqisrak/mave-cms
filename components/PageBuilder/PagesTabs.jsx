// components/PageBuilder/PagesTabs.jsx

import React from "react";
import { Tabs } from "antd";
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
    <Tabs centered animated defaultActiveKey="1" type="card" className="mt-8">
      <TabPane tab="Pages" key="1">
        <RenderPages
          webpages={typePages}
          handleEditPage={handleEditPage}
          handleExpand={handleExpand}
          expandedPageId={expandedPageId}
          handleDeletePage={handleDeletePage}
          handleEditPageInfo={handleEditPageInfo}
        />
      </TabPane>
      <TabPane tab="Subpages" key="2">
        <RenderPages
          webpages={typeSubpages}
          handleEditPage={handleEditPage}
          handleExpand={handleExpand}
          expandedPageId={expandedPageId}
          handleDeletePage={handleDeletePage}
          handleEditPageInfo={handleEditPageInfo}
        />
      </TabPane>
    </Tabs>
  );
};

export default PagesTabs;
