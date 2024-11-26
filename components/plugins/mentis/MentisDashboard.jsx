// components/mentis/MentisDashboard.jsx
import React, { useState } from "react";
import { Tabs, Upload, Button, message } from "antd";
import {
  PictureOutlined,
  VideoCameraOutlined,
  BatchOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ImageEditor from "./ImageEditor";
import VideoEditor from "./VideoEditor";
import BatchProcessor from "./BatchProcessor";
import ExportOptions from "./ExportOptions";
import UndoRedoControls from "./UndoRedoControls";
import instance from "../../../axios";

const { TabPane } = Tabs;

const MentisDashboard = ({ selectedMedia, onSelectMedia, refresh }) => {
  const [activeTab, setActiveTab] = useState("1");
  // const [selectedMedia, setSelectedMedia] = useState([]);
  const [editedMedia, setEditedMedia] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await instance.post("/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        setSelectedMedia([...selectedMedia, response.data]);
        message.success("Media uploaded successfully.");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to upload media.");
    }
  };

  const handleProcess = () => {
    // Implement batch processing logic if needed
  };

  const handleExport = () => {
    // Implement export logic if needed
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previous = undoStack.pop();
      setRedoStack([...redoStack, editedMedia]);
      setEditedMedia(previous);
      setUndoStack([...undoStack]);
      message.success("Undo successful.");
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const next = redoStack.pop();
      setUndoStack([...undoStack, editedMedia]);
      setEditedMedia(next);
      setRedoStack([...redoStack]);
      message.success("Redo successful.");
    }
  };

  const handleImageSave = (edited) => {
    setUndoStack([...undoStack, editedMedia]);
    setEditedMedia([...editedMedia, edited]);
    message.success("Image saved successfully.");
  };

  const handleVideoSave = (edited) => {
    setUndoStack([...undoStack, editedMedia]);
    setEditedMedia([...editedMedia, edited]);
    message.success("Video saved successfully.");
  };

  return (
    <div className="p-4">
      <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
        <TabPane
          tab={
            <span>
              <PictureOutlined />
              Image Editor
            </span>
          }
          key="1"
        >
          <UndoRedoControls
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={undoStack.length > 0}
            canRedo={redoStack.length > 0}
          />
          {selectedMedia
            .filter((media) => media.file_type.startsWith("image/"))
            .map((media) => (
              <ImageEditor
                key={media.id}
                imageSrc={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${media.file_path}`}
                onSave={handleImageSave}
              />
            ))}
        </TabPane>
        <TabPane
          tab={
            <span>
              <VideoCameraOutlined />
              Video Editor
            </span>
          }
          key="2"
        >
          <UndoRedoControls
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={undoStack.length > 0}
            canRedo={redoStack.length > 0}
          />
          {selectedMedia
            .filter((media) => media.file_type.startsWith("video/"))
            .map((media) => (
              <VideoEditor
                key={media.id}
                videoSrc={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${media.file_path}`}
                onSave={handleVideoSave}
              />
            ))}
        </TabPane>
        <TabPane
          tab={
            <span>
              <BatchOutlined />
              Batch Processor
            </span>
          }
          key="3"
        >
          <BatchProcessor
            selectedMedia={selectedMedia}
            onProcess={() => {
              // Refresh or update state after batch processing
              setSelectedMedia([]);
              setEditedMedia([]);
              setUndoStack([]);
              setRedoStack([]);
              message.success("Batch processing completed.");
            }}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <DownloadOutlined />
              Export Options
            </span>
          }
          key="4"
        >
          <ExportOptions editedMedia={editedMedia} />
        </TabPane>
      </Tabs>
      <Upload
        beforeUpload={(file) => {
          handleFileUpload(file);
          return false; // Prevent automatic upload
        }}
        multiple
        showUploadList={false}
      >
        <Button
          icon={<UploadOutlined />}
          className="mt-4 w-full flex justify-center"
        >
          Upload Media
        </Button>
      </Upload>
    </div>
  );
};

export default MentisDashboard;
