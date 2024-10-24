// components/cards/CreateCardForm.jsx

import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  message,
  Radio,
  Switch,
} from "antd";
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
  const [linkType, setLinkType] = useState("independent");

  const handleSubmit = async (values) => {
    if (!selectedMedia) {
      message.error("Please select a media item.");
      return;
    }
    setSubmitting(true);

    let link_url = values.link_url;
    if (values.link_type === "page" && values.page_name) {
      const selectedPage = pages.find(
        (page) => page.page_name === values.page_name
      );
      if (selectedPage) {
        link_url = `/${selectedPage.slug}?page_id=${selectedPage.id}&pageName=${selectedPage.page_name_en}`;
      } else {
        message.error("Selected page not found.");
        setSubmitting(false);
        return;
      }
    }

    try {
      const payload = {
        title_en: values.title_en,
        title_bn: values.title_bn,
        description_en: values.description_en,
        description_bn: values.description_bn,
        media_ids: selectedMedia.id,
        page_name: values.link_type === "page" ? values.page_name : null,
        link_url: link_url,
        status: values.status ? 1 : 0,
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

  const handleLinkTypeChange = (e) => {
    setLinkType(e.target.value);
    if (e.target.value === "page") {
      form.setFieldsValue({ link_url: "" });
    }
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
          label="Title (Alternate)"
          name="title_bn"
          rules={[
            { required: true, message: "Please enter the title in Alternate" },
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
          label="Description (Alternate)"
          name="description_bn"
          rules={[
            {
              required: true,
              message: "Please enter the description in Alternate",
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

        <Form.Item label="Link Type" name="link_type" initialValue={linkType}>
          <Radio.Group onChange={handleLinkTypeChange}>
            <Radio value="page">Page Link</Radio>
            <Radio value="independent">Independent Link</Radio>
          </Radio.Group>
        </Form.Item>

        {linkType === "page" && (
          <Form.Item
            label="Page Name"
            name="page_name"
            rules={[{ required: true, message: "Please select a page" }]}
          >
            <Select placeholder="Select Page" allowClear>
              {pages
                ?.filter((page) => page.page_name_en)
                .map((page) => (
                  <Option key={page.page_name} value={page.page_name}>
                    {page.page_name_en}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        )}

        {linkType === "independent" && (
          <Form.Item
            label="Link URL"
            name="link_url"
            rules={[{ required: true, message: "Please enter the link URL" }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Status"
          name="status"
          valuePropName="checked"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
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
