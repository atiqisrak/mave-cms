// pages/mentis/export-media.jsx

import React from "react";
import ExportOptions from "../../../components/plugins/mentis/ExportOptions";
import instance from "../../axios";
import { message } from "antd";

const ExportMediaPage = () => {
  const handleExport = async (exportData) => {
    try {
      const response = await instance.post("/mentis/export", exportData);
      if (response.status === 200) {
        message.success("Media exported successfully.");
        // Handle download or other actions
      } else {
        message.error("Failed to export media.");
      }
    } catch (error) {
      console.error(error);
      message.error("Error exporting media.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Export Media</h2>
      <ExportOptions onExport={handleExport} />
    </div>
  );
};

export default ExportMediaPage;
