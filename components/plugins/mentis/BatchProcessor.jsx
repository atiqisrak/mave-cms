// components/mentis/BatchProcessor.jsx
import React, { useState } from "react";
import { Button, Select, Slider, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const BatchProcessor = ({ selectedMedia, onProcess }) => {
  const [processType, setProcessType] = useState(null);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!processType || value === null) {
      message.error("Please select a process type and value.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/media/batch/process", {
        mediaIds: selectedMedia.map((media) => media.id),
        processType,
        value,
      });
      if (response.status === 200) {
        message.success("Batch processing completed successfully.");
        onProcess();
      }
    } catch (error) {
      console.error(error);
      message.error("Batch processing failed.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <Form layout="vertical">
        <Form.Item label="Process Type" required>
          <Select placeholder="Select process type" onChange={setProcessType}>
            <Option value="resize">Resize</Option>
            <Option value="compress">Compress</Option>
            <Option value="rotate">Rotate</Option>
          </Select>
        </Form.Item>
        {processType === "resize" && (
          <Form.Item label="Resize Percentage">
            <Slider
              min={10}
              max={200}
              onChange={setValue}
              value={typeof value === "number" ? value : 100}
            />
          </Form.Item>
        )}
        {processType === "compress" && (
          <Form.Item label="Compression Level">
            <Slider
              min={10}
              max={90}
              onChange={setValue}
              value={typeof value === "number" ? value : 50}
            />
          </Form.Item>
        )}
        {processType === "rotate" && (
          <Form.Item label="Rotation Angle">
            <Select onChange={setValue} placeholder="Select angle">
              <Option value={90}>90°</Option>
              <Option value={180}>180°</Option>
              <Option value={270}>270°</Option>
            </Select>
          </Form.Item>
        )}
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={handleProcess}
          loading={loading}
          disabled={!processType || value === null}
        >
          Apply to Selected Media
        </Button>
      </Form>
    </div>
  );
};

export default BatchProcessor;
