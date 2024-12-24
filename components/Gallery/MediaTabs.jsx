// components/Gallery/MediaTabs.jsx

import React from "react";
import { Tabs } from "antd";
import MediaGrid from "./MediaGrid";
import Cloudinary from "./Cloudinary";

const { TabPane } = Tabs;

const MediaTabs = ({
  images,
  videos,
  docs,
  handleEdit,
  handleDelete,
  handlePreview,
  availableTags, // New prop for available tags
}) => {
  return (
    <Tabs defaultActiveKey="1" centered animated type="card">
      <TabPane tab={`Images (${images.length})`} key="1">
        <MediaGrid
          mediaItems={images}
          mediaType="image"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handlePreview={handlePreview}
          availableTags={availableTags} // Pass availableTags
        />
      </TabPane>
      <TabPane tab={`Videos (${videos.length})`} key="2">
        <MediaGrid
          mediaItems={videos}
          mediaType="video"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handlePreview={handlePreview}
          availableTags={availableTags} // Pass availableTags
        />
      </TabPane>
      <TabPane tab={`Docs (${docs.length})`} key="3">
        <MediaGrid
          mediaItems={docs}
          mediaType="document"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handlePreview={handlePreview}
          availableTags={availableTags} // Pass availableTags
        />
      </TabPane>

      <TabPane tab="Cloudinary" key="4">
        <Cloudinary availableTags={availableTags} />{" "}
        {/* Pass availableTags if needed */}
      </TabPane>
    </Tabs>
  );
};

export default MediaTabs;
