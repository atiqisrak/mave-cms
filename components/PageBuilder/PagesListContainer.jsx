// components/PageBuilder/PagesListContainer.jsx

import React, { useEffect } from "react";
import RenderPages from "./Renderpages";

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

  return (
    <RenderPages
      webpages={pages}
      handleEditPage={handleEditPage}
      handleExpand={handleExpand}
      expandedPageId={expandedPageId}
      handleDeletePage={handleDeletePage}
      handleEditPageInfo={handleEditPageInfo}
    />
  );
};

export default PagesListContainer;
