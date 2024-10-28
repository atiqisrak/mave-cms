// components/PageBuilder/Components/GalleryComponent.jsx

import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import GallerySelectionModal from "../Modals/GallerySelectionModal/GallerySelectionModal";
import Image from "next/image";
import { Carousel } from "antd";

const { Paragraph } = Typography;

const GalleryComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [galleryData, setGalleryData] = useState(component._mave || {});
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    setGalleryData(component._mave || {});
  }, [component._mave]);

  const handleSelectGallery = (newGalleryData) => {
    updateComponent({
      ...component,
      _mave: newGalleryData,
      id: component._id,
    });
    setGalleryData(newGalleryData);
    setIsModalVisible(false);
    message.success("Gallery updated successfully.");
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this gallery?",
      onOk: deleteComponent,
      okText: "Yes",
      cancelText: "No",
    });
  };

  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxVisible(true);
  };

  const renderGallery = () => {
    if (!galleryData.images || galleryData.images.length === 0) {
      return <Paragraph>No images selected.</Paragraph>;
    }

    switch (galleryData.layout) {
      case "grid":
        return (
          <div
            className="grid-gallery"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${
                galleryData.settings.columns || 3
              }, 1fr)`,
              gap: `${galleryData.settings.spacing || 16}px`,
            }}
          >
            {galleryData.images?.map((image) => (
              <div
                key={image.id}
                className="grid-item"
                onClick={() => openLightbox(image)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image.file_path}`}
                  alt={image.title || "Gallery Image"}
                  width={300}
                  height={200}
                  objectFit="cover"
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL="/Image_Placeholder.png"
                />
              </div>
            ))}
          </div>
        );
      case "masonry":
        return (
          <div
            className="masonry-gallery"
            style={{
              columnCount: galleryData.settings.columns || 3,
              columnGap: `${galleryData.settings.spacing || 16}px`,
            }}
          >
            {galleryData.images?.map((image) => (
              <div
                key={image.id}
                className="masonry-item"
                onClick={() => openLightbox(image)}
                style={{
                  marginBottom: `${galleryData.settings.spacing || 16}px`,
                  cursor: "pointer",
                }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image.file_path}`}
                  alt={image.alt || "Gallery Image"}
                  width={300}
                  height={200}
                  objectFit="cover"
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL="/Image_Placeholder.png"
                />
              </div>
            ))}
          </div>
        );
      case "carousel":
        return (
          <Carousel
            autoplay
            dotPosition="bottom"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            {galleryData.images?.map((image) => (
              <div key={image.id} onClick={() => openLightbox(image)}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image.file_path}`}
                  alt={image.alt || "Gallery Image"}
                  width={800}
                  height={450}
                  objectFit="cover"
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL="/Image_Placeholder.png"
                />
              </div>
            ))}
          </Carousel>
        );
      default:
        return <Paragraph>Unknown gallery layout.</Paragraph>;
    }
  };

  return (
    <div className="border p-4 rounded-md bg-gray-50">
      {/* Header with Component Title and Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Gallery Component</h3>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mr-2"
          />
          <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
        </div>
      </div>

      {/* Gallery Display */}
      {renderGallery()}

      {/* Lightbox Modal */}
      {currentImage && (
        <Modal
          open={lightboxVisible}
          footer={null}
          onCancel={() => setLightboxVisible(false)}
          centered
          width="40%"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${currentImage.file_path}`}
            alt={currentImage.alt || "Gallery Image"}
            width={800}
            height={600}
            objectFit="contain"
            layout="responsive"
          />
          {currentImage.title && (
            <Typography.Title level={4}>{currentImage.title}</Typography.Title>
          )}
        </Modal>
      )}

      {/* Gallery Selection Modal */}
      <GallerySelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectGallery={handleSelectGallery}
        initialGallery={galleryData}
      />
    </div>
  );
};

export default GalleryComponent;
