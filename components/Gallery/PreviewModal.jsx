// components/Gallery/PreviewModal.jsx

import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Modal, Select, Table, Tag } from "antd";
import { CopyOutlined, EditOutlined } from "@ant-design/icons";
import instance from "../../axios";
import Image from "next/image";

const { Option } = Select;

const PreviewModal = ({ visible, onClose, media, mediaType, handleEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const info = {
    title: media.title || media.file_name,
    size: media.file_size ? media.file_size : "Size not available",
    type: media.file_type,
    uploadDate: new Date(media.created_at).toLocaleString(),
    // tags: media.tags ? media.tags.join(", ") : "None",
    tags: media.tags ? (
      <>
        {media.tags.map((tag) => (
          <Tag key={tag} color="orange">
            {tag}
          </Tag>
        ))}
      </>
    ) : (
      "None"
    ),
  };

  useEffect(() => {
    if (editMode) {
      form.setFieldsValue({
        title: media.title || "",
        tags: media.tags || [],
      });
    }
  }, [editMode, media, form]);

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await instance.put(`/media/${media.id}`, {
        title: values.title,
        tags: values.tags,
      });

      if (response.status === 200) {
        message.success("Media updated successfully.");
        handleEdit(response.data); // Pass the updated media back to Gallery
        setEditMode(false);
        onClose();
      } else {
        message.error("Failed to update media.");
      }
    } catch (error) {
      console.error("Error updating media:", error);
      message.error("An error occurred while updating the media.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPreviewContent = () => {
    switch (mediaType) {
      case "image":
        return (
          <div className="image-preview">
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
              alt={media.file_name}
              width={700}
              height={400}
              objectFit="cover"
              className="rounded-md"
            />
            {editMode ? (
              <Form
                layout="vertical"
                form={form}
                onFinish={handleFormSubmit}
                initialValues={{
                  title: media.title || "",
                  tags: media.tags || [],
                }}
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input a title!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Tags" name="tags">
                  <Select mode="tags" placeholder="Enter tags">
                    {media.tags &&
                      media.tags.map((tag) => (
                        <Option key={tag} value={tag}>
                          {tag}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <div className="flex justify-between">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<EditOutlined />}
                      loading={isSubmitting}
                      className="mavebutton"
                    >
                      Save
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      onClick={() => setEditMode(false)}
                      icon={<CopyOutlined />}
                      className="mavecancelbutton"
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            ) : (
              <>
                <Table
                  dataSource={Object.entries(info).map(([key, value]) => ({
                    key,
                    attribute: key.charAt(0).toUpperCase() + key.slice(1),
                    value,
                  }))}
                  columns={[
                    {
                      title: "Attribute",
                      dataIndex: "attribute",
                      key: "attribute",
                    },
                    {
                      title: "Value",
                      dataIndex: "value",
                      key: "value",
                    },
                  ]}
                  pagination={false}
                  size="middle"
                  className="my-4 text-lg font-semibold"
                />
                <div className="flex justify-between">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => setEditMode(true)}
                    className="mavebutton"
                  >
                    Edit
                  </Button>
                  <Button
                    className="mavebutton"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`
                      );
                      message.success("Link copied to clipboard.");
                    }}
                    icon={<CopyOutlined />}
                  >
                    Copy Link
                  </Button>
                </div>
              </>
            )}
          </div>
        );
      case "video":
        return (
          <video width="100%" height="400" controls className="rounded-md">
            <source
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
              type={media.file_type}
            />
            Your browser does not support the video tag.
          </video>
        );
      case "document":
        return (
          <div className="document-preview flex flex-col items-center justify-center h-96 bg-gray-50 rounded-md">
            {/* <img
              src="/icons/document-icon.svg"
              alt="Document"
              width={128}
              height={128}
            /> */}
            <iframe
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
              width="100%"
              height="100%"
            />
            <p className="mt-4 text-lg text-gray-700">{media.file_name}</p>
            <div className="mt-4 flex justify-between w-full px-4">
              <Button
                icon={<EditOutlined />}
                onClick={() => setEditMode(true)}
                className="mavebutton"
              >
                Edit
              </Button>
              <Button
                className="mavebutton"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`
                  );
                  message.success("Link copied to clipboard.");
                }}
                icon={<CopyOutlined />}
              >
                Copy Link
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      title={media.title || media.file_name}
    >
      {renderPreviewContent()}
    </Modal>
  );
};

export default PreviewModal;
