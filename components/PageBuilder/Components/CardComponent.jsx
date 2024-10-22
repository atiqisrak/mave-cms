// components/PageBuilder/Components/CardComponent.jsx

import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import CardSelectionModal from "../Modals/CardSelectionModal";
import Image from "next/image";

const { Paragraph } = Typography;

// Helper function to render card media
const renderCardMedia = (media) => {
  if (!media || !media.file_path) {
    return (
      <div className="w-40 h-40 bg-gray-300 flex items-center justify-center rounded-md">
        <Image
          src="/public/images/Image_Placholder.png"
          alt="No Image"
          width={160}
          height={160}
          objectFit="cover"
          className="rounded-md"
          priority
        />
      </div>
    );
  }
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
      alt={media.title_en || "Card Image"}
      width={160}
      height={160}
      objectFit="cover"
      className="rounded-md"
      priority
    />
  );
};

const CardComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardData, setCardData] = useState(component._mave);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Synchronize cardData with component._mave when it changes
  useEffect(() => {
    setCardData(component._mave);
  }, [component._mave]);

  // Handle selection from CardSelectionModal
  const handleSelectCard = (selectedCard) => {
    setSelectedCardData(selectedCard);
    setIsModalVisible(false);
    setIsEditing(true);
  };

  // Handle Submit (Confirm) Changes
  const handleSubmit = () => {
    if (!selectedCardData) {
      Modal.error({
        title: "Validation Error",
        content: "No card selected.",
      });
      return;
    }
    updateComponent({
      ...component,
      _mave: selectedCardData,
      id: selectedCardData.id,
    });
    setCardData(selectedCardData);
    setSelectedCardData(null);
    setIsEditing(false);
    message.success("Card updated successfully.");
  };

  // Handle Cancel Changes
  const handleCancel = () => {
    setSelectedCardData(null);
    setIsEditing(false);
    message.info("Card update canceled.");
  };

  // Handle Delete Component
  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this component?",
      onOk: deleteComponent,
      okText: "Yes",
      cancelText: "No",
    });
  };

  return (
    <div className="border p-4 rounded-md bg-gray-50">
      {/* Header with Component Title and Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Card Component</h3>
        <div>
          {!isEditing ? (
            <>
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsModalVisible(true)}
                className="mr-2"
              />
              <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
            </>
          ) : (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={handleSubmit}
                className="mr-2"
              >
                Submit
              </Button>
              <Button icon={<CloseOutlined />} onClick={handleCancel} danger>
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Display Current and Selected Card Side by Side */}
      <div className="flex flex-col md:flex-row items-start gap-4">
        {/* Current Card */}
        <div className="flex flex-col w-full md:w-1/2">
          <h4 className="mb-2 text-md font-medium">Current Card</h4>
          {cardData ? (
            <div className="flex items-center border p-4 rounded-md bg-white">
              {/* Media on the Left */}
              <div className="mr-4">
                {renderCardMedia(cardData.media_files)}
              </div>
              {/* Content on the Right */}
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">
                  {cardData.title_en || "Card Title"}
                </h2>
                <Paragraph>
                  {cardData.description_en ? (
                    cardData.description_en.length > 100 ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: cardData.description_en.slice(0, 100) + "...",
                        }}
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: cardData.description_en,
                        }}
                      />
                    )
                  ) : (
                    "No description."
                  )}
                </Paragraph>
                {/* <a href={cardData.link_url} className="text-blue-500">
                  {cardData.link_url}
                </a> */}
              </div>
            </div>
          ) : (
            <Paragraph>No card selected.</Paragraph>
          )}
        </div>

        {/* Selected Card (Shown Only When Editing) */}
        {isEditing && selectedCardData && (
          <div className="flex flex-col w-full md:w-1/2">
            <h4 className="mb-2 text-md font-medium">Selected Card</h4>
            <div className="flex items-center border p-4 rounded-md bg-white">
              {/* Media on the Left */}
              <div className="mr-4">
                {renderCardMedia(selectedCardData.media_files)}
              </div>
              {/* Content on the Right */}
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">
                  {selectedCardData.title_en || "Card Title"}
                </h2>
                <Paragraph>
                  {selectedCardData.description_en ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedCardData.description_en,
                      }}
                    />
                  ) : (
                    "No description."
                  )}
                </Paragraph>
                {/* <a href={selectedCardData.link_url} className="text-blue-500">
                  {selectedCardData.link_url}
                </a> */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Selection Modal */}
      <CardSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectCard={handleSelectCard}
      />
    </div>
  );
};

export default CardComponent;