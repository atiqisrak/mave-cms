// components/PageBuilder/PagesListContainer.jsx

import React, { useEffect } from "react";
import RenderPages from "./Renderpages";
import { Spin } from "antd";

const PagesListContainer = ({
  pages,
  handleExpand,
  expandedPageId,
  handleDeletePage,
  handleEditPage,
  handleEditPageInfo,
}) => {
  useEffect(() => {
    // Any additional logic if needed
  }, [pages]);

  return pages ? (
    <RenderPages
      webpages={pages}
      handleEditPage={handleEditPage}
      handleExpand={handleExpand}
      expandedPageId={expandedPageId}
      handleDeletePage={handleDeletePage}
      handleEditPageInfo={handleEditPageInfo}
    />
  ) : (
    <Spin size="large" />
  );
};

export default PagesListContainer;
