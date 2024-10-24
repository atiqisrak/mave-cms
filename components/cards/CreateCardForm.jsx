// components/cards/CreateCardForm.jsx

import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";
import MediaSelectionModal from "../PageBuilder/Modals/MediaSelectionModal";
import RichTextEditor from "../RichTextEditor";
import instance from "../../axios";
import Image from "next/image";

const { Option } = Select;

const CreateCardForm = ({ onSuccess, onCancel, pages }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [isMediaModalVisible, setIsMediaModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleSubmit = async (values) => {
    if (!selectedMedia) {
      message.error("Please select a media item.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        title_en: values.title_en,
        title_bn: values.title_bn,
        description_en: values.description_en,
        description_bn: values.description_bn,
        media_ids: selectedMedia.id,
        page_name: values.page_name,
        link_url: values.link_url,
        status: values.status,
      };

      await instance.post("/cards", payload);
      message.success("Card created successfully.");
      form.resetFields();
      setSelectedMedia(null);
      onSuccess();
    } catch (error) {
      message.error("Failed to create card.");
    }
    setSubmitting(false);
  };

  const handleMediaSelect = (media) => {
    setSelectedMedia(media);
    setIsMediaModalVisible(false);
  };

  return (
    <Modal
      title="Create Card"
      visible={true}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Title (English)"
          name="title_en"
          rules={[
            { required: true, message: "Please enter the title in English" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Title (Bangla)"
          name="title_bn"
          rules={[
            { required: true, message: "Please enter the title in Bangla" },
          ]}
        >
          <Input />
        </Form.Item>

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
          <RichTextEditor />
        </Form.Item>

        <Form.Item
          label="Description (Bangla)"
          name="description_bn"
          rules={[
            {
              required: true,
              message: "Please enter the description in Bangla",
            },
          ]}
        >
          <RichTextEditor />
        </Form.Item>

        <Form.Item label="Media" required>
          <div className="flex flex-col">
            <Button onClick={() => setIsMediaModalVisible(true)}>
              Select Media
            </Button>
            {selectedMedia && (
              <div className="mt-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedMedia.file_path}`}
                  alt="Selected Media"
                  width={200}
                  height={150}
                />
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item
          label="Page Name"
          name="page_name"
          rules={[{ required: true, message: "Please select a page" }]}
        >
          <Select placeholder="Select Page">
            {pages.map((page) => (
              <Option key={page.page_name} value={page.page_name}>
                {page.page_name_en}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Link URL"
          name="link_url"
          rules={[{ required: true, message: "Please enter the link URL" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select placeholder="Select Status">
            <Option value={1}>Active</Option>
            <Option value={0}>Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={onCancel} className="mavecancelbutton">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="mavebutton"
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>

      {/* Media Selection Modal */}
      <MediaSelectionModal
        isVisible={isMediaModalVisible}
        onClose={() => setIsMediaModalVisible(false)}
        onSelectMedia={handleMediaSelect}
        selectionMode="single"
      />
    </Modal>
  );
};

export default CreateCardForm;
