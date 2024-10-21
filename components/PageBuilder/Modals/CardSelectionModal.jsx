// components/PageBuilder/Modals/CardSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, List, Button, Image, Typography, message } from "antd";
import instance from "../../../axios";

const { Paragraph } = Typography;

const CardSelectionModal = ({ isVisible, onClose, onSelectCard }) => {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const fetchCards = async () => {
        setLoading(true);
        try {
          const response = await instance.get("/cards"); // Replace with your actual API endpoint
          setCardList(response.data);
        } catch (error) {
          message.error("Failed to fetch cards");
        }
        setLoading(false);
      };
      fetchCards();
    }
  }, [isVisible]);

  return (
    <Modal
      title="Select Card"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <List
        loading={loading}
        grid={{ gutter: 16, column: 3 }}
        dataSource={cardList}
        renderItem={(item) => (
          <List.Item>
            <Button
              type="link"
              onClick={() => onSelectCard(item)}
              block
              className="text-left"
            >
              {item.image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${item.image.file_path}`}
                  alt={item.title}
                  width={100}
                  preview={false}
                />
              )}
              <p>{item.title}</p>
              <Paragraph ellipsis={{ rows: 2 }}>{item.description}</Paragraph>
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default CardSelectionModal;
