// pages/mentis/index.jsx

import React, { useEffect, useState } from "react";
import { Tabs, Upload, Button, message, Modal } from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import MentisDashboard from "../../../components/plugins/mentis/MentisDashboard";
import UploadMediaModal from "../../../components/plugins/mentis/UploadMediaModal.jsx";

const { TabPane } = Tabs;

const MentisPage = () => {
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [refreshDashboard, setRefreshDashboard] = useState(false);

  const handleMediaSelect = (media) => {
    setSelectedMedia(media);
  };

  const handleUploadSuccess = () => {
    setIsUploadModalVisible(false);
    setRefreshDashboard(!refreshDashboard);
    message.success("Media uploaded successfully!");
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Mentis - Media Editor
      </h1>
      <Tabs defaultActiveKey="1" centered type="card">
        <TabPane
          tab={
            <span>
              <EyeOutlined />
              Dashboard
            </span>
          }
          key="1"
        >
          <MentisDashboard
            selectedMedia={selectedMedia}
            onSelectMedia={handleMediaSelect}
            refresh={refreshDashboard}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <UploadOutlined />
              Upload Media
            </span>
          }
          key="2"
        >
          <div className="flex justify-center items-center h-full">
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={() => setIsUploadModalVisible(true)}
              className="flex items-center gap-2"
            >
              Upload New Media
            </Button>
          </div>
        </TabPane>
      </Tabs>

      {/* Upload Media Modal */}
      <UploadMediaModal
        visible={isUploadModalVisible}
        onCancel={() => setIsUploadModalVisible(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default MentisPage;
