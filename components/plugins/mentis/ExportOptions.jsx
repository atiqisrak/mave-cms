// components/mentis/ExportOptions.jsx

import React, { useState } from "react";
import { Button, Select, Form, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const ExportOptions = ({ editedMedia }) => {
  const [format, setFormat] = useState("jpg");
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/media/export", {
        mediaIds: editedMedia.map((media) => media.id),
        format,
        quality,
      });
      if (response.status === 200) {
        // Handle the exported media URLs
        const { exportedMedia } = response.data;
        // For example, trigger downloads or provide download links
        exportedMedia.forEach((media) => {
          const link = document.createElement("a");
          link.href = media.url;
          link.download = `${media.id}.${format}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
        message.success("Media exported successfully.");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to export media.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <Form layout="vertical">
        <Form.Item label="Export Format">
          <Select
            value={format}
            onChange={setFormat}
            placeholder="Select export format"
          >
            <Option value="jpg">JPG</Option>
            <Option value="png">PNG</Option>
            <Option value="webp">WEBP</Option>
            <Option value="mp4">MP4</Option>
            <Option value="avi">AVI</Option>
          </Select>
        </Form.Item>
        {format !== "mp4" && format !== "avi" && (
          <Form.Item label="Quality">
            <Select
              value={quality}
              onChange={setQuality}
              placeholder="Select quality"
            >
              <Option value={50}>50%</Option>
              <Option value={75}>75%</Option>
              <Option value={100}>100%</Option>
            </Select>
          </Form.Item>
        )}
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleExport}
          loading={loading}
          disabled={editedMedia.length === 0}
        >
          Export Media
        </Button>
      </Form>
    </div>
  );
};

export default ExportOptions;
