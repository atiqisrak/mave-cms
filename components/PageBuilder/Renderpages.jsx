// components/PageBuilder/RenderPages.jsx

import React from "react";
import { Spin } from "antd";
import PageCard from "./PageCard";

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
      {webpages.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          {webpages.map((page) => (
            <PageCard
              key={page.id}
              page={page}
              handleEditPage={handleEditPage}
              handleExpand={handleExpand}
              expandedPageId={expandedPageId}
              handleDeletePage={handleDeletePage}
              handleEditPageInfo={handleEditPageInfo}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default RenderPages;
