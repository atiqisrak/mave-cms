// components/PageBuilder/Modals/MediaSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, Image, List } from "antd";
import axios from "axios";

const MediaSelectionModal = ({ isVisible, onClose, onSelectMedia }) => {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    if (isVisible) {
      const fetchMedia = async () => {
        try {
          const response = await axios.get("/media");
          setMediaList(response.data);
        } catch (error) {
          console.error("Error fetching media:", error);
        }
      };
      fetchMedia();
    }
  }, [isVisible]);

  return (
    <Modal
      title="Select Media"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={mediaList}
        renderItem={(item) => (
          <List.Item>
            <div onClick={() => onSelectMedia(item)} className="cursor-pointer">
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${item.file_path}`}
                alt={item.file_name}
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
              />
              <p>{item.title}</p>
            </div>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default MediaSelectionModal;
