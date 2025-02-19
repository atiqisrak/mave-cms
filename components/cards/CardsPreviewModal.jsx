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
import instance from "../../axios";
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
  uniqueTags,
  fetchCards,
}) => {
  const [isMediaModalVisible, setIsMediaModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [linkType, setLinkType] = useState("independent");

  const PLACEHOLDER_IMAGE = "/images/Image_Placeholder.png";

  useEffect(() => {
    if (selectedCard) {
      // Determine link type and page_id from link_url
      let computedLinkType = "independent";
      let link_page_id;

      if (selectedCard.link_url) {
        try {
          // Check if it's a media link first
          if (
            selectedCard.link_url.startsWith(process.env.NEXT_PUBLIC_MEDIA_URL)
          ) {
            computedLinkType = "media";
            // Extract the media path from the full URL
            const mediaPath = selectedCard.link_url.replace(
              process.env.NEXT_PUBLIC_MEDIA_URL,
              ""
            );
            form.setFieldsValue({ media_link_path: mediaPath });
          } else {
            const url = new URL(selectedCard.link_url, window.location.origin);
            const params = new URLSearchParams(url.search);
            const pageId = params.get("page_id");
            if (pageId) {
              computedLinkType = "page";
              link_page_id = parseInt(pageId, 10);
            }
          }
        } catch (e) {
          console.warn("Invalid URL format:", selectedCard.link_url);
        }
      }

      setLinkType(computedLinkType);

      // Set selectedMedia
      const mediaItem = media.find((m) => m.id === selectedCard.media_ids);
      setSelectedMedia(mediaItem || null);

      // Extract tags from additional
      const tags = selectedCard?.additional?.tags || [];

      // Populate form
      form.setFieldsValue({
        title_en: selectedCard.title_en,
        title_bn: selectedCard.title_bn,
        description_en: selectedCard.description_en,
        description_bn: selectedCard.description_bn,
        media_ids: selectedCard.media_ids || null,
        page_name: selectedCard.page_name,
        link_type: computedLinkType,
        link_page_id: link_page_id,
        link_url:
          computedLinkType === "independent"
            ? selectedCard.link_url
            : undefined,
        status: selectedCard.status === 1,
        tags: tags,
      });
    } else {
      form.resetFields();
      setSelectedMedia(null);
      setLinkType("independent");
    }
  }, [selectedCard, media, form]);

  // Media selection
  const handleMediaSelect = (mediaItem) => {
    setSelectedMedia(mediaItem);
    form.setFieldsValue({ media_ids: mediaItem.id });
    setIsMediaModalVisible(false);
  };

  // Link type change
  const handleLinkTypeChange = (e) => {
    setLinkType(e.target.value);
    if (e.target.value === "page") {
      form.setFieldsValue({
        link_url: undefined,
        media_link_path: undefined,
      });
    } else if (e.target.value === "media") {
      form.setFieldsValue({
        link_url: undefined,
        link_page_id: undefined,
      });
    } else {
      form.setFieldsValue({
        link_page_id: undefined,
        media_link_path: undefined,
      });
    }
  };

  // Data for Table in display mode
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
              dangerouslySetInnerHTML={{
                __html:
                  selectedCard.description_en?.length > 300
                    ? selectedCard.description_en?.slice(0, 300) + "..."
                    : selectedCard.description_en,
              }}
            />
          ),
        },
        {
          key: "4",
          infoType: "Description (Alternate)",
          details: (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  selectedCard.description_bn?.length > 300
                    ? selectedCard.description_bn?.slice(0, 300) + "..."
                    : selectedCard.description_bn,
              }}
            />
          ),
        },
        {
          key: "5",
          infoType: "Media",
          details: selectedMedia ? (
            selectedMedia.file_type?.startsWith("video/") ? (
              <video
                width="200"
                height="150"
                controls
                className="rounded-lg"
                style={{ objectFit: "cover" }}
              >
                <source
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedMedia.file_path}`}
                  type={selectedMedia.file_type}
                />
                Your browser does not support the video tag.
              </video>
            ) : (
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
            )
          ) : selectedCard.media_files ? (
            selectedCard.media_files.file_type?.startsWith("video/") ? (
              <video
                width="200"
                height="150"
                controls
                className="rounded-lg"
                style={{ objectFit: "cover" }}
              >
                <source
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedCard.media_files.file_path}`}
                  type={selectedCard.media_files.file_type}
                />
                Your browser does not support the video tag.
              </video>
            ) : (
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
            )
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
        {
          key: "9",
          infoType: "Tags",
          details:
            selectedCard?.additional?.tags?.length > 0
              ? selectedCard.additional.tags.join(", ")
              : "No Tags",
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

  // Build final link
  const buildLink = (values, pages) => {
    if (values.link_type === "page" && values.link_page_id) {
      const selectedPage = pages.find((p) => p.id === values.link_page_id);
      if (!selectedPage) {
        throw new Error("Selected page not found.");
      }
      return `/${selectedPage.slug}?page_id=${selectedPage.id}&pageName=${selectedPage.page_name_en}`;
    } else if (values.link_type === "media" && values.media_link_path) {
      // Ensure the path starts with a forward slash
      const mediaPath = values.media_link_path.startsWith("/")
        ? values.media_link_path
        : `/${values.media_link_path}`;
      return `${process.env.NEXT_PUBLIC_MEDIA_URL}${mediaPath}`;
    }
    return values.link_url; // Return the independent link URL if not a page or media link
  };

  const onFinishEdit = async () => {
    try {
      const values = await form.validateFields();
      const finalLink = buildLink(values, pages);
      const additional = { tags: values.tags || [] };

      const payload = {
        ...values,
        link_url: finalLink,
        status: values.status ? 1 : 0,
        additional,
      };
      delete payload.link_page_id;
      delete payload.link_type;
      delete payload.media_link_path;

      await instance.put(`/cards/${selectedCard.id}`, payload);
      message.success("Card updated successfully.");
      setIsEditing(false);
      onCancel();
      fetchCards();
    } catch (err) {
      console.error(err);
      message.error("Failed to save changes.");
    }
  };

  return (
    <Drawer
      title={isEditing ? "Edit Card" : "Card Details"}
      open={visible}
      onClose={onCancel}
      footer={null}
      width="50%"
    >
      {selectedCard && (
        <>
          {isEditing ? (
            <Form form={form} layout="vertical" onFinish={onFinishEdit}>
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
                  editMode={true}
                  onChange={(val) =>
                    form.setFieldsValue({ description_en: val })
                  }
                  defaultValue={selectedCard?.description_en}
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
                  editMode={true}
                  onChange={(val) =>
                    form.setFieldsValue({ description_bn: val })
                  }
                  defaultValue={selectedCard?.description_bn}
                />
              </Form.Item>

              {/* Media */}
              <Form.Item label="Media" required>
                <div className="flex flex-col">
                  <Button
                    onClick={() => setIsMediaModalVisible(true)}
                    className="mavebutton"
                  >
                    Change Media
                  </Button>
                  <div className="flex justify-between mt-4">
                    {/* Current Media */}
                    <div className="flex flex-col items-center">
                      <h3 className="my-2 font-bold">Current Media</h3>
                      {selectedCard.media_files?.file_type?.startsWith(
                        "video/"
                      ) ? (
                        <video
                          width="200"
                          height="150"
                          controls
                          className="rounded-lg"
                          style={{ objectFit: "cover" }}
                        >
                          <source
                            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedCard.media_files.file_path}`}
                            type={selectedCard.media_files.file_type}
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
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
                      )}
                    </div>
                    {/* Changed Media */}
                    {selectedMedia && (
                      <div className="flex flex-col items-center">
                        <h3 className="my-2 font-bold">Changed Media</h3>
                        {selectedMedia.file_type?.startsWith("video/") ? (
                          <video
                            width="200"
                            height="150"
                            controls
                            className="rounded-lg"
                            style={{ objectFit: "cover" }}
                          >
                            <source
                              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedMedia.file_path}`}
                              type={selectedMedia.file_type}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
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
                        )}
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
                <Select placeholder="Select Page" allowClear showSearch>
                  {pages
                    ?.filter((p) => p.page_name_en)
                    ?.map((p) => (
                      <Option key={p.id} value={p.page_name_en}>
                        {p.page_name_en}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              {/* Link Type */}
              <Form.Item label="Link Type" name="link_type">
                <Radio.Group onChange={handleLinkTypeChange}>
                  <Radio value="page">Page Link</Radio>
                  <Radio value="independent">Independent Link</Radio>
                  <Radio value="media">Link to a Media</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Link Fields */}
              {linkType === "page" && (
                <Form.Item
                  label="Select the page to link"
                  name="link_page_id"
                  rules={[{ required: true, message: "Please select a page" }]}
                >
                  <Select
                    placeholder="Select a Page to link"
                    allowClear
                    showSearch
                  >
                    {pages?.map((p) => (
                      <Option key={p.id} value={p.id}>
                        {p.page_name_en}
                      </Option>
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
                    {
                      validator: async (_, value) => {
                        if (!value) return;
                        if (
                          value.startsWith("/") ||
                          value.match(/^https?:\/\//)
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Please enter a valid URL or path")
                        );
                      },
                    },
                  ]}
                >
                  <Input placeholder="Enter URL or path (e.g., /about or https://example.com)" />
                </Form.Item>
              )}
              {linkType === "media" && (
                <Form.Item
                  label="Media Path"
                  name="media_link_path"
                  rules={[
                    { required: true, message: "Please enter the media path" },
                    {
                      validator: async (_, value) => {
                        if (!value) return;
                        // Basic validation for media path
                        if (value.includes("..") || value.includes("//")) {
                          return Promise.reject(
                            new Error("Invalid media path")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  extra={`The full URL will be: ${process.env.NEXT_PUBLIC_MEDIA_URL}/<your-path>`}
                >
                  <Input placeholder="Enter media path (e.g., media/example.pdf)" />
                </Form.Item>
              )}

              {/* Tags */}
              <Form.Item label="Tags" name="tags">
                <Select
                  mode="tags"
                  placeholder="Add or select tags"
                  style={{ width: "100%" }}
                  showSearch
                >
                  {/* Tags will be populated here */}
                  {uniqueTags?.map((tag) => (
                    <Option key={tag} value={tag}>
                      {tag}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Status */}
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
    </Drawer>
  );
};

export default CardsPreviewModal;
