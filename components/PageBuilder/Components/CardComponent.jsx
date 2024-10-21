// components/PageBuilder/Components/CardComponent.jsx

import React, { useState } from "react";
import { Button, Modal, Typography, Image, List } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CardSelectionModal from "../Modals/CardSelectionModal";

const { Paragraph } = Typography;

const CardComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardData, setCardData] = useState(component._mave);

  const handleSelectCard = (selectedCard) => {
    updateComponent({ ...component, _mave: selectedCard, id: selectedCard.id });
    setCardData(selectedCard);
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
        <h3 className="text-xl font-semibold">Card Component</h3>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mr-2"
          />
          <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
        </div>
      </div>
      {cardData ? (
        <div className="p-4 border rounded-md">
          <Paragraph strong>Title: {cardData.title}</Paragraph>
          {cardData.image && (
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${cardData.image.file_path}`}
              alt={cardData.title}
              width={100}
              preview={false}
            />
          )}
          <Paragraph>{cardData.description}</Paragraph>
        </div>
      ) : (
        <Paragraph>No card selected.</Paragraph>
      )}
      <CardSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectCard={handleSelectCard}
      />
    </div>
  );
};

export default CardComponent;
