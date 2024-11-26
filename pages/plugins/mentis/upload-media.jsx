// pages/mentis/upload-media.jsx

import React from "react";
import UploadMedia from "../../../components/plugins/mentis/UploadMedia";
import { message } from "antd";

const UploadMediaPage = () => {
  const handleUploadSuccess = () => {
    message.success("Media uploaded successfully.");
    // Redirect or refresh as needed
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Upload New Media</h2>
      <UploadMedia onUploadSuccess={handleUploadSuccess} />
    </div>
  );
};

export default UploadMediaPage;
