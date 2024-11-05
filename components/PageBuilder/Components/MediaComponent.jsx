// components/PageBuilder/Components/MediaComponent.jsx

import React, { useState } from "react";
import { Button, Modal, Popconfirm, Typography, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  ArrowRightOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import MediaSelectionModal from "../Modals/MediaSelectionModal";
import Image from "next/image";

const { Paragraph } = Typography;

const MediaComponent = ({
  component,
  updateComponent,
  deleteComponent,
  preview = false, // New prop with default value
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mediaData, setMediaData] = useState(component._mave);
  const [selectedMediaData, setSelectedMediaData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle selection from MediaSelectionModal
  const handleSelectMedia = (selectedMedia) => {
    if (selectedMedia.length > 1 && component.selectionMode !== "multiple") {
      message.error("Please select only one media item for this component.");
      return;
    }
    // For single selection, take the first item
    const media =
      component.selectionMode === "multiple" ? selectedMedia : selectedMedia[0];
    setSelectedMediaData(media);
    setIsModalVisible(false);
    setIsEditing(true);
  };

  // Handle Submit (Confirm) Changes
  const handleSubmit = () => {
    if (component.selectionMode === "multiple") {
      if (selectedMediaData.length === 0) {
        message.error("Please select at least one media item.");
        return;
      }
      updateComponent({
        ...component,
        _mave: selectedMediaData,
        id: selectedMediaData?.map((media) => media.id),
      });
    } else {
      if (!selectedMediaData) {
        message.error("Please select a media item.");
        return;
      }
      updateComponent({
        ...component,
        _mave: selectedMediaData,
        id: selectedMediaData.id,
      });
    }
    setMediaData(selectedMediaData);
    setSelectedMediaData(null);
    setIsEditing(false);
    message.success("Media updated successfully.");
  };

  // Handle Cancel Changes
  const handleCancel = () => {
    setSelectedMediaData(null);
    setIsEditing(false);
    message.info("Media update canceled.");
  };

  // Handle Delete Component
  const handleDelete = () => {
    deleteComponent();
  };

  // If in preview mode, render the media content only
  if (preview) {
    return (
      <div className="preview-media-component p-4 bg-gray-100 rounded-md">
        {mediaData ? (
          component.selectionMode === "multiple" ? (
            <div className="grid grid-cols-2 gap-4">
              {mediaData.map((media) => (
                <Image
                  key={media.id}
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
                  alt={media.title}
                  width={250}
                  height={200}
                  objectFit="cover"
                  preview={false}
                  className="rounded-lg"
                />
              ))}
            </div>
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${mediaData.file_path}`}
              alt={mediaData.title}
              width={250}
              height={200}
              objectFit="cover"
              preview={false}
              className="rounded-lg"
            />
          )
        ) : (
          <p className="text-gray-500">No media selected.</p>
        )}
      </div>
    );
  }

  return (
    <div className="border p-4 rounded-md bg-gray-50">
      {/* Header with Component Title and Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Media Component</h3>
        <div>
          {!isEditing ? (
            <>
              {mediaData && (
                <Button
                  icon={<ExportOutlined />}
                  onClick={() => setIsModalVisible(true)}
                  className="mavebutton"
                >
                  Change
                </Button>
              )}
              <Popconfirm
                title="Are you sure you want to delete this component?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={<DeleteOutlined />}
                  className="mavecancelbutton"
                />
              </Popconfirm>
            </>
          ) : (
            <>
              <Button
                icon={<CheckOutlined />}
                onClick={handleSubmit}
                className="mavebutton"
              >
                Done
              </Button>
              <Button
                icon={<CloseOutlined />}
                onClick={handleCancel}
                className="mavecancelbutton"
              >
                Discard
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Display Current and Selected Media Side by Side */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Current Media */}
        <div className="flex flex-col items-center">
          {mediaData && (
            <h4 className="mb-2 text-md font-semibold">Current Media</h4>
          )}
          {mediaData ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${mediaData.file_path}`}
              alt={mediaData.title}
              width={250}
              height={200}
              objectFit="cover"
              preview={false}
              className="rounded-lg"
            />
          ) : (
            <Button
              icon={<ExportOutlined />}
              onClick={() => setIsModalVisible(true)}
              className="mavebutton"
            >
              Choose
            </Button>
          )}
        </div>

        {/* Selected Media (Shown Only When Editing) */}
        {isEditing && selectedMediaData && (
          <div className="flex justify-between items-center">
            <ArrowRightOutlined className="text-2xl mx-20" />
            <div className="flex flex-col items-center">
              <h4 className="mb-2 text-md font-medium">Selected Media</h4>
              {component.selectionMode === "multiple" ? (
                <div className="grid grid-cols-2 gap-4">
                  {selectedMediaData?.map((media) => (
                    <Image
                      key={media.id}
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
                      alt={media.title}
                      width={250}
                      height={200}
                      objectFit="cover"
                      preview={false}
                      className="rounded-lg"
                    />
                  ))}
                </div>
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedMediaData.file_path}`}
                  alt={selectedMediaData.title}
                  width={250}
                  height={200}
                  objectFit="cover"
                  preview={false}
                  className="rounded-lg"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Media Selection Modal */}
      <MediaSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectMedia={handleSelectMedia}
        selectionMode={component.selectionMode} // Pass the selection mode
      />
    </div>
  );
};

export default MediaComponent;
