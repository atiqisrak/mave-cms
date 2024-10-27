// components/PageBuilder/Modals/GallerySelectionModal/GallerySelectionModal.jsx

import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Select, message, Input } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import MediaSelectionModal from "../MediaSelectionModal";
import Image from "next/image";

const { Option } = Select;

const GallerySelectionModal = ({
  isVisible,
  onClose,
  onSelectGallery,
  initialGallery,
}) => {
  const [form] = Form.useForm();
  const [selectedImages, setSelectedImages] = useState(
    initialGallery?.images || []
  );
  const [layout, setLayout] = useState(initialGallery?.layout || "grid");
  const [columns, setColumns] = useState(
    initialGallery?.settings?.columns || 3
  );
  const [spacing, setSpacing] = useState(
    initialGallery?.settings?.spacing || 16
  );
  const [isMediaModalVisible, setIsMediaModalVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setSelectedImages(initialGallery?.images || []);
      setLayout(initialGallery?.layout || "grid");
      setColumns(initialGallery?.settings?.columns || 3);
      setSpacing(initialGallery?.settings?.spacing || 16);
      form.setFieldsValue({
        layout: initialGallery?.layout || "grid",
        columns: initialGallery?.settings?.columns || 3,
        spacing: initialGallery?.settings?.spacing || 16,
      });
    } else {
      form.resetFields();
      setSelectedImages([]);
      setLayout("grid");
      setColumns(3);
      setSpacing(16);
    }
  }, [isVisible, initialGallery, form]);

  const handleOk = () => {
    if (selectedImages.length === 0) {
      message.error("Please select at least one image.");
      return;
    }

    form
      .validateFields()
      .then((values) => {
        const galleryData = {
          images: selectedImages,
          layout: values.layout,
          settings: {
            columns: values.layout !== "carousel" ? values.columns : null,
            spacing: values.spacing,
          },
        };
        onSelectGallery(galleryData);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
    setSelectedImages(initialGallery?.images || []);
    setLayout(initialGallery?.layout || "grid");
    setColumns(initialGallery?.settings?.columns || 3);
    setSpacing(initialGallery?.settings?.spacing || 16);
  };

  const handleMediaSelect = (media) => {
    setSelectedImages(media);
    setIsMediaModalVisible(false);
  };

  const removeImage = (id) => {
    setSelectedImages(selectedImages.filter((img) => img.id !== id));
  };

  return (
    <>
      <Modal
        title="Configure Gallery"
        open={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText="Save Gallery"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          {/* Media Selection */}
          <Form.Item label="Select Images" required>
            <Button
              type="dashed"
              onClick={() => setIsMediaModalVisible(true)}
              icon={<PlusOutlined />}
              style={{ marginBottom: 16 }}
            >
              Open Media Library
            </Button>
            <div className="selected-images mt-4 flex flex-wrap">
              {selectedImages?.map((image) => (
                <div
                  key={image.id}
                  className="image-thumbnail mr-2 mb-2 relative inline-block"
                  style={{ width: 100, height: 100 }}
                >
                  {console.log(
                    "image",
                    `${process.env.NEXT_PUBLIC_MEDIA_URL}/${image.file_path}`
                  )}
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image.file_path}`}
                    alt={image.alt || "Selected Image"}
                    width={100}
                    height={100}
                    objectFit="cover"
                    layout="fixed"
                  />
                  <Button
                    icon={<MinusOutlined />}
                    size="small"
                    type="text"
                    danger
                    onClick={() => removeImage(image.id)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: "rgba(255,255,255,0.7)",
                    }}
                  />
                </div>
              ))}
            </div>
          </Form.Item>

          {/* Layout Selection */}
          <Form.Item
            name="layout"
            label="Gallery Layout"
            rules={[{ required: true, message: "Please select a layout." }]}
          >
            <Select onChange={(value) => setLayout(value)}>
              <Option value="grid">Grid</Option>
              <Option value="masonry">Masonry</Option>
              <Option value="carousel">Carousel</Option>
            </Select>
          </Form.Item>

          {/* Settings for Grid and Masonry */}
          {(layout === "grid" || layout === "masonry") && (
            <>
              <Form.Item
                name="columns"
                label="Number of Columns"
                rules={[
                  {
                    required: true,
                    message: "Please enter the number of columns.",
                  },
                  {
                    type: "number",
                    min: 1,
                    max: 6,
                    message: "Columns must be between 1 and 6.",
                  },
                ]}
              >
                <Input
                  type="number"
                  min={1}
                  max={6}
                  placeholder="Enter number of columns"
                />
              </Form.Item>

              <Form.Item
                name="spacing"
                label="Spacing (px)"
                rules={[
                  { required: true, message: "Please enter the spacing." },
                  {
                    type: "number",
                    min: 0,
                    message: "Spacing must be a positive number.",
                  },
                ]}
              >
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter spacing in pixels"
                />
              </Form.Item>
            </>
          )}

          {/* Settings for Carousel */}
          {layout === "carousel" && (
            <Form.Item
              name="spacing"
              label="Spacing (px)"
              rules={[
                { required: true, message: "Please enter the spacing." },
                {
                  type: "number",
                  min: 0,
                  message: "Spacing must be a positive number.",
                },
              ]}
            >
              <Input
                type="number"
                min={0}
                placeholder="Enter spacing in pixels"
              />
            </Form.Item>
          )}
        </Form>
      </Modal>

      {/* Media Selection Modal */}
      <MediaSelectionModal
        isVisible={isMediaModalVisible}
        onClose={() => setIsMediaModalVisible(false)}
        onSelectMedia={handleMediaSelect}
        selectionMode="multiple"
        initialSelectedMedia={selectedImages}
      />
    </>
  );
};

export default GallerySelectionModal;
