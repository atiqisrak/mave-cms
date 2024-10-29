// components/cards/CardsPreviewModal.jsx

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Table,
  message,
  Switch,
  Radio,
  Drawer,
} from "antd";
import MediaSelectionModal from "../PageBuilder/Modals/MediaSelectionModal";
import RichTextEditor from "../RichTextEditor";
import Image from "next/image";

const { Option } = Select;

const CardsPreviewModal = ({
  visible,
  onCancel,
  selectedCard,
  isEditing,
  setIsEditing,
  form,
  handleSaveEdit,
  handleEditCard,
  handleCancelEdit,
  pages,
  media,
}) => {
  console.log("selectedCard", selectedCard);
  const [isMediaModalVisible, setIsMediaModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [linkType, setLinkType] = useState("independent");

  // Placeholder image path
  const PLACEHOLDER_IMAGE = "/images/Image_Placeholder.png";

  // Initialize selectedMedia and linkType when selectedCard changes
  useEffect(() => {
    if (selectedCard) {
      // Set link type based on link_url
      const computedLinkType =
        selectedCard.link_url &&
        (selectedCard.link_url.includes("page_id") ||
          selectedCard.link_url.includes("pageName"))
          ? "page"
          : "independent";
      setLinkType(computedLinkType);

      // Set selectedMedia based on media_ids
      const mediaItem = media.find((m) => m.id === selectedCard.media_ids);
      setSelectedMedia(mediaItem || null);

      // Set initial form values
      form.setFieldsValue({
        title_en: selectedCard.title_en,
        title_bn: selectedCard.title_bn,
        description_en: selectedCard.description_en,
        description_bn: selectedCard.description_bn,
        media_ids: selectedCard.media_ids || null, // Handle missing media_ids
        page_name: selectedCard.page_name,
        link_type: computedLinkType,
        link_page_id:
          computedLinkType === "page"
            ? extractPageId(selectedCard.link_url)
            : undefined,
        link_url:
          computedLinkType === "independent"
            ? selectedCard.link_url
            : undefined,
        status: selectedCard.status === 1,
      });
    } else {
      // Reset form when no card is selected
      form.resetFields();
      setSelectedMedia(null);
      setLinkType("independent");
    }
  }, [selectedCard, media, form]);

  // Utility function to extract page_id from link_url
  const extractPageId = (url) => {
    try {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      return urlParams.get("page_id");
    } catch (error) {
      console.error("Error extracting page_id:", error);
      return undefined;
    }
  };

  // Handle media selection
  const handleMediaSelect = (mediaItem) => {
    if (Array.isArray(mediaItem)) {
      mediaItem = mediaItem[0]; // Ensure single media selection
    }
    setSelectedMedia(mediaItem);
    form.setFieldsValue({ media_ids: mediaItem.id });
    setIsMediaModalVisible(false);
  };

  // Handle link type change
  const handleLinkTypeChange = (e) => {
    setLinkType(e.target.value);
    if (e.target.value === "page") {
      form.setFieldsValue({ link_url: undefined });
    } else {
      form.setFieldsValue({ link_page_id: undefined });
    }
  };

  // Prepare data for display
  const data = selectedCard
    ? [
        {
          key: "1",
          infoType: "Title (English)",
          details: selectedCard.title_en,
        },
        {
          key: "2",
          infoType: "Title (Alternate)",
          details: selectedCard.title_bn,
        },
        {
          key: "3",
          infoType: "Description (English)",
          details: (
            <div
              dangerouslySetInnerHTML={{ __html: selectedCard.description_en }}
            />
          ),
        },
        {
          key: "4",
          infoType: "Description (Alternate)",
          details: (
            <div
              dangerouslySetInnerHTML={{ __html: selectedCard.description_bn }}
            />
          ),
        },
        {
          key: "5",
          infoType: "Media",
          details: selectedMedia ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedMedia.file_path}`}
              alt="Card Media"
              width={200}
              height={150}
              objectFit="cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = PLACEHOLDER_IMAGE;
              }}
            />
          ) : selectedCard.media_files ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedCard.media_files.file_path}`}
              alt="Card Media"
              width={200}
              height={150}
              objectFit="cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = PLACEHOLDER_IMAGE;
              }}
            />
          ) : (
            <Image
              src={PLACEHOLDER_IMAGE}
              alt="Placeholder"
              width={200}
              height={150}
              objectFit="cover"
            />
          ),
        },
        {
          key: "6",
          infoType: "Page Name",
          details: selectedCard.page_name || "N/A",
        },
        {
          key: "7",
          infoType: "Link URL",
          details: selectedCard.link_url || "N/A",
        },
        {
          key: "8",
          infoType: "Status",
          details: selectedCard.status === 1 ? "Active" : "Inactive",
        },
      ]
    : [];

  const columns = [
    {
      title: "Info Type",
      dataIndex: "infoType",
      key: "infoType",
      width: "30%",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
  ];

  return (
    <Drawer
      title={isEditing ? "Edit Card" : "Card Details"}
      open={visible}
      onClose={onCancel}
      footer={null}
      width={`50%`}
    >
      {selectedCard && (
        <>
          {isEditing ? (
            <Form form={form} layout="vertical" onFinish={handleSaveEdit}>
              {/* Hidden Field for media_ids */}
              <Form.Item name="media_ids" hidden>
                <Input type="hidden" />
              </Form.Item>

              {/* Title (English) */}
              <Form.Item
                label="Title (English)"
                name="title_en"
                rules={[
                  {
                    required: true,
                    message: "Please enter the title in English",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Title (Alternate) */}
              <Form.Item
                label="Title (Alternate)"
                name="title_bn"
                rules={[
                  {
                    required: true,
                    message: "Please enter the title in Alternate",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Description (English) */}
              <Form.Item
                label="Description (English)"
                name="description_en"
                rules={[
                  {
                    required: true,
                    message: "Please enter the description in English",
                  },
                ]}
              >
                <RichTextEditor
                  value={selectedCard.description_en}
                  onChange={(value) =>
                    form.setFieldsValue({ description_en: value })
                  }
                  defaultValue={selectedCard.description_en}
                  editMode={true}
                />
              </Form.Item>

              {/* Description (Alternate) */}
              <Form.Item
                label="Description (Alternate)"
                name="description_bn"
                rules={[
                  {
                    required: true,
                    message: "Please enter the description in Alternate",
                  },
                ]}
              >
                <RichTextEditor
                  value={selectedCard.description_bn}
                  onChange={(value) =>
                    form.setFieldsValue({ description_bn: value })
                  }
                  defaultValue={selectedCard.description_bn}
                  editMode={true}
                />
              </Form.Item>

              {/* Media Selection */}
              <Form.Item label="Media" required>
                <div className="flex flex-col">
                  <Button onClick={() => setIsMediaModalVisible(true)}>
                    Change Media
                  </Button>
                  <div className="flex justify-between mt-4">
                    {/* Current Media */}
                    <div className="flex flex-col items-center">
                      <h3 className="my-2 font-bold">Current Media</h3>
                      <Image
                        src={
                          selectedCard.media_files
                            ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedCard.media_files.file_path}`
                            : PLACEHOLDER_IMAGE
                        }
                        alt="Current Media"
                        width={200}
                        height={150}
                        objectFit="cover"
                        className="rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                    </div>
                    {/* Changed Media */}
                    {selectedMedia && (
                      <div className="flex flex-col items-center">
                        <h3 className="my-2 font-bold">Changed Media</h3>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedMedia.file_path}`}
                          alt="Selected Media"
                          width={200}
                          height={150}
                          objectFit="cover"
                          className="rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = PLACEHOLDER_IMAGE;
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Form.Item>

              {/* Page Association */}
              <Form.Item
                label="Page"
                name="page_name"
                rules={[{ required: true, message: "Please select a page" }]}
              >
                <Select placeholder="Select Page" allowClear>
                  {pages
                    ?.filter((page) => page.page_name_en)
                    ?.map((page) => (
                      <Option key={page.id} value={page.page_name_en}>
                        {page.page_name_en}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              {/* Link Type Selection */}
              <Form.Item
                label="Link Type"
                name="link_type"
                initialValue={linkType}
              >
                <Radio.Group onChange={handleLinkTypeChange}>
                  <Radio value="page">Page Link</Radio>
                  <Radio value="independent">Independent Link</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Conditional Link Fields */}
              {linkType === "page" && (
                <Form.Item
                  label="Select the page to link"
                  name="link_page_id"
                  rules={[{ required: true, message: "Please select a page" }]}
                >
                  <Select placeholder="Select a Page to link" allowClear>
                    {pages?.map((page) => (
                      <Select.Option key={page.id} value={page.id}>
                        {page.page_name_en}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}

              {linkType === "independent" && (
                <Form.Item
                  label="Link URL"
                  name="link_url"
                  rules={[
                    { required: true, message: "Please enter the link URL" },
                    { type: "url", message: "Please enter a valid URL" },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}

              {/* Status Switch */}
              <Form.Item
                label="Status"
                name="status"
                valuePropName="checked"
                rules={[{ required: true, message: "Please select a status" }]}
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>

              {/* Form Actions */}
              <Form.Item>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={handleCancelEdit}
                    className="mavecancelbutton"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="mavebutton"
                  >
                    Save Changes
                  </Button>
                </div>
              </Form.Item>

              {/* Media Selection Modal */}
              <MediaSelectionModal
                isVisible={isMediaModalVisible}
                onClose={() => setIsMediaModalVisible(false)}
                onSelectMedia={handleMediaSelect}
                selectionMode="single"
              />
            </Form>
          ) : (
            <>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                showHeader={false}
              />
              <div className="flex justify-end mt-4">
                <Button
                  type="primary"
                  onClick={handleEditCard}
                  className="mavebutton"
                >
                  Edit
                </Button>
              </div>
            </>
          )}
        </>
      )}
      {/* Media Selection Modal */}
      {isEditing && (
        <MediaSelectionModal
          isVisible={isMediaModalVisible}
          onClose={() => setIsMediaModalVisible(false)}
          onSelectMedia={handleMediaSelect}
          selectionMode="single"
        />
      )}
    </Drawer>
  );
};

export default CardsPreviewModal;
