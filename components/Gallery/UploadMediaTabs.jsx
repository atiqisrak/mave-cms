import React, { useState } from "react";
import { Tabs } from "antd";
import UploadMedia from "./UploadMedia";

const { TabPane } = Tabs;

const UploadMediaTabs = ({ onUploadSuccess, onSelectMedia, selectionMode }) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Native Storage" key="1">
        <UploadMedia
          onUploadSuccess={onUploadSuccess}
          selectionMode={selectionMode}
          onSelectMedia={onSelectMedia}
          uploadDestination="native"
        />
      </TabPane>
      <TabPane tab="Cloudinary" key="2">
        <UploadMedia
          onUploadSuccess={onUploadSuccess}
          selectionMode={selectionMode}
          onSelectMedia={onSelectMedia}
          uploadDestination="cloudinary"
        />
      </TabPane>
    </Tabs>
  );
};

export default UploadMediaTabs;
