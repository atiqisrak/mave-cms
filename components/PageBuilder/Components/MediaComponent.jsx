// components/PageBuilder/Components/MediaComponent.jsx

import React, { useState } from "react";
import { Image, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MediaSelectionModal from "../Modals/MediaSelectionModal";

const MediaComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mediaData, setMediaData] = useState(component._mave);

  const handleSelectMedia = (selectedMedia) => {
    updateComponent({
      ...component,
      _mave: selectedMedia,
      id: selectedMedia.id,
    });
    setMediaData(selectedMedia);
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this component?",
      onOk: deleteComponent,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3>Media Component</h3>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mr-2"
          />
          <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
        </div>
      </div>
      {mediaData ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${mediaData.file_path}`}
          alt={mediaData.file_name}
          width={200}
        />
      ) : (
        <p>No media selected.</p>
      )}
      <MediaSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectMedia={handleSelectMedia}
      />
    </div>
  );
};

export default MediaComponent;
