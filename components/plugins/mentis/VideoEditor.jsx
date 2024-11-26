// components/mentis/VideoEditor.jsx
import React, { useState } from "react";
import { Button, Slider, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import axios from "axios";

const VideoEditor = ({ media, onSave }) => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDuration = (duration) => {
    setDuration(duration);
    setEndTime(duration);
  };

  const handleCut = async () => {
    if (endTime <= startTime) {
      message.error("End time must be greater than start time.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/media/videos/cut", {
        mediaId: media.id,
        startTime,
        endTime,
      });

      if (response.status === 200) {
        onSave(response.data);
        message.success("Video cut and uploaded successfully!");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to cut and upload video.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      {media.url && (
        <div className="w-full max-w-xl">
          <ReactPlayer
            url={media.url}
            controls
            width="100%"
            height="240px"
            onDuration={handleDuration}
          />
          <Form layout="vertical" className="mt-4">
            <Form.Item label="Start Time (seconds)">
              <Slider
                min={0}
                max={duration}
                value={startTime}
                onChange={setStartTime}
              />
              <div>Start: {startTime.toFixed(2)}s</div>
            </Form.Item>
            <Form.Item label="End Time (seconds)">
              <Slider
                min={0}
                max={duration}
                value={endTime}
                onChange={setEndTime}
              />
              <div>End: {endTime.toFixed(2)}s</div>
            </Form.Item>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={handleCut}
              loading={loading}
            >
              Cut Video
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default VideoEditor;
