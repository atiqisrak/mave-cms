// components/Gallery/MediaTabs.jsx

import React, { useState } from "react";
import { Tabs } from "antd";
import MediaGrid from "./MediaGrid";

const { TabPane } = Tabs;

const MediaTabs = ({
  images,
  videos,
  docs,
  handleEdit,
  handleDelete,
  handlePreview,
}) => {
  return (
    <Tabs defaultActiveKey="1" centered animated type="card">
      <TabPane tab="Images" key="1">
        <MediaGrid
          mediaItems={images}
          mediaType="image"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handlePreview={handlePreview}
        />
      </TabPane>
      <TabPane tab="Videos" key="2">
        <MediaGrid
          mediaItems={videos}
          mediaType="video"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handlePreview={handlePreview}
        />
      </TabPane>
      <TabPane tab="Docs" key="3">
        <MediaGrid
          mediaItems={docs}
          mediaType="document"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handlePreview={handlePreview}
        />
      </TabPane>
    </Tabs>
  );
};

export default MediaTabs;
