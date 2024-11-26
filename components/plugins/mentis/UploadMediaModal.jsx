// components/mentis/UploadMediaModal.jsx

import React, { useState, useEffect } from "react";
import {
  Modal,
  Tabs,
  Upload,
  Button,
  List,
  message,
  Spin,
  Image as AntImage,
} from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import instance from "../../../axios";
import ImageEditor from "./ImageEditor";
import VideoEditor from "./VideoEditor";

const { TabPane } = Tabs;

const UploadMediaModal = ({
  isVisible,
  onClose,
  onSelectMedia,
  selectionMode = "single",
  initialSelectedMedia = [],
}) => {
  const [existingMedia, setExistingMedia] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(initialSelectedMedia);
  const [editingMedia, setEditingMedia] = useState(null);
  const [editedMediaURL, setEditedMediaURL] = useState(null);

  useEffect(() => {
    if (isVisible) {
      fetchExistingMedia();
      setSelectedMedia(initialSelectedMedia);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const fetchExistingMedia = async () => {
    setLoadingMedia(true);
    try {
      const response = await instance.get("/media");
      if (response.status === 200) {
        setExistingMedia(response.data);
      } else {
        message.error("Failed to fetch existing media.");
      }
    } catch (error) {
      console.error("Fetch Media Error:", error);
      message.error("Failed to fetch existing media.");
    }
    setLoadingMedia(false);
  };

  const handleUploadChange = ({ file, fileList }) => {
    if (file.status === "uploading") {
      setUploading(true);
    }
    if (file.status === "done") {
      setUploading(false);
      message.success(`${file.name} uploaded successfully.`);
      fetchExistingMedia();
    } else if (file.status === "error") {
      setUploading(false);
      message.error(`${file.name} upload failed.`);
    }
  };

  const customUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name);

    try {
      const response = await instance.post("/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        onSuccess(response.data, file);
        setSelectedMedia([...selectedMedia, response.data]);
      } else {
        onError("Upload failed.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      onError("Upload failed.");
    }
  };

  const handleSelect = (media) => {
    if (selectionMode === "single") {
      setSelectedMedia([media]);
    } else {
      if (selectedMedia.some((m) => m.id === media.id)) {
        setSelectedMedia(selectedMedia.filter((m) => m.id !== media.id));
      } else {
        setSelectedMedia([...selectedMedia, media]);
      }
    }
  };

  const handleEdit = (media) => {
    setEditingMedia(media);
    setEditedMediaURL(null);
  };

  const handleSaveEdit = async (editedBlob) => {
    if (!editingMedia) return;

    const formData = new FormData();
    formData.append("file", editedBlob, editingMedia.title || "edited_media");

    try {
      const response = await instance.post("/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        message.success("Edited media uploaded successfully.");
        fetchExistingMedia();
        setEditingMedia(null);
        setEditedMediaURL(null);
        onSelectMedia(response.data);
      } else {
        message.error("Failed to upload edited media.");
      }
    } catch (error) {
      console.error("Save Edit Error:", error);
      message.error("Failed to upload edited media.");
    }
  };

  const renderMediaList = () => {
    if (loadingMedia) {
      return (
        <div className="flex justify-center items-center h-64">
          <Spin tip="Loading media..." />
        </div>
      );
    }

    if (existingMedia.length === 0) {
      return <p>No media available.</p>;
    }

    return (
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 6,
        }}
        dataSource={existingMedia}
        renderItem={(item) => (
          <List.Item>
            <div
              className={`border-2 rounded-md cursor-pointer relative ${
                selectedMedia.some((m) => m.id === item.id)
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => handleSelect(item)}
            >
              {item.file_type.startsWith("image/") ? (
                <AntImage
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.file_path}`}
                  alt={item.title || "Media"}
                  width={200}
                  height={150}
                  objectFit="cover"
                  preview={false}
                />
              ) : item.file_type.startsWith("video/") ? (
                <video
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.file_path}`}
                  className="w-full h-40 object-cover"
                  muted
                  preload="metadata"
                />
              ) : (
                <div className="flex items-center justify-center h-40 bg-gray-200">
                  <EyeOutlined style={{ fontSize: 24, color: "#555" }} />
                </div>
              )}
              <p className="text-center mt-2 text-sm truncate px-2">
                {item.title || "Untitled"}
              </p>
              {selectedMedia.some((m) => m.id === item.id) && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-25 flex justify-center items-center rounded-md">
                  <span className="text-white font-semibold">Selected</span>
                </div>
              )}
              <Button
                type="link"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(item);
                }}
              >
                Edit
              </Button>
            </div>
          </List.Item>
        )}
      />
    );
  };

  return (
    <Modal
      title="Media Selection"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      className="ant-modal-body p-4"
    >
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Select Existing" key="1">
          {renderMediaList()}
        </TabPane>
        <TabPane tab="Upload New" key="2">
          <Upload
            customRequest={customUpload}
            onChange={handleUploadChange}
            multiple
            showUploadList={false}
            accept="image/*,video/*"
          >
            <Button
              icon={<UploadOutlined />}
              loading={uploading}
              className="w-full flex justify-center"
            >
              Click to Upload
            </Button>
          </Upload>
        </TabPane>
      </Tabs>

      {/* Editing Modal */}
      <Modal
        title="Edit Media"
        visible={!!editingMedia}
        onCancel={() => setEditingMedia(null)}
        footer={null}
        width={800}
        centered
      >
        {editingMedia && editingMedia.file_type.startsWith("image/") ? (
          <ImageEditor
            imageSrc={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${editingMedia.file_path}`}
            onSave={handleSaveEdit}
          />
        ) : editingMedia && editingMedia.file_type.startsWith("video/") ? (
          <VideoEditor
            videoSrc={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${editingMedia.file_path}`}
            onSave={handleSaveEdit}
          />
        ) : (
          <p>Unsupported media type.</p>
        )}
      </Modal>
    </Modal>
  );
};

export default UploadMediaModal;
