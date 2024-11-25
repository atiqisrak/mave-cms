// components/cards/CreateCardForm.jsx

import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  message,
  Radio,
  Switch,
  Drawer,
} from "antd";
import MediaSelectionModal from "../PageBuilder/Modals/MediaSelectionModal";
import RichTextEditor from "../RichTextEditor";
import instance from "../../axios";
import Image from "next/image";

const { Option } = Select;

const CreateCardForm = ({ onSuccess, onCancel, pages, media }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [isMediaModalVisible, setIsMediaModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [linkType, setLinkType] = useState("independent");

  // Placeholder image path
  const PLACEHOLDER_IMAGE = "/images/Image_Placeholder.png";

  // Handle form submission
  const handleSubmit = async (values) => {
    if (!selectedMedia) {
      message.error("Please select a media item.");
      return;
    }
    setSubmitting(true);

    let link_url = values.link_url;
    if (values.link_type === "page" && values.link_page_id) {
      const selectedPage = pages.find(
        (page) => page.id === values.link_page_id
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
      // Exclude 'link_page_id' from payload
      const { link_page_id, ...restValues } = values;

      const payload = {
        ...restValues,
        media_ids: selectedMedia.id, // Single media ID
        link_url: link_url,
        status: values.status ? 1 : 0,
      };

      await instance.post("/cards", payload);
      message.success("Card created successfully.");
      form.resetFields();
      setSelectedMedia(null);
      setLinkType("independent");
      onSuccess();
    } catch (error) {
      console.error("Create Card Error:", error);
      message.error("Failed to create card.");
    }
    setSubmitting(false);
  };

  // Handle media selection
  const handleMediaSelect = (mediaItem) => {
    setSelectedMedia(mediaItem);
    form.setFieldsValue({ media_ids: mediaItem.id });
    setIsMediaModalVisible(false);
  };

  // Handle link type change
  const handleLinkTypeChange = (e) => {
    setLinkType(e.target.value);
    if (e.target.value === "independent") {
      form.setFieldsValue({ link_page_id: undefined });
    } else {
      form.setFieldsValue({ link_url: undefined });
    }
  };

  return (
    <Drawer
      title="Create Card"
      open={true}
      onClose={onCancel}
      width={`50%`}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          link_type: "independent",
          status: true,
        }}
      >
        {/* Hidden Field for media_ids */}
        <Form.Item name="media_ids" hidden>
          <Input type="hidden" />
        </Form.Item>

        {/* Title (English) */}
        <Form.Item
          label="Title (English)"
          name="title_en"
          rules={[
            { required: true, message: "Please enter the title in English" },
          ]}
        >
          <Input placeholder="Enter title in English" />
        </Form.Item>

        {/* Title (Alternate) */}
        <Form.Item
          label="Title (Alternate)"
          name="title_bn"
          rules={[
            { required: true, message: "Please enter the title in Alternate" },
          ]}
        >
          <Input placeholder="Enter title in Alternate" />
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
            placeholder="Enter description in English"
            onChange={(value) => form.setFieldsValue({ description_en: value })}
            value={form.getFieldValue("description_en")}
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
            placeholder="Enter description in Alternate"
            onChange={(value) => form.setFieldsValue({ description_bn: value })}
            value={form.getFieldValue("description_bn")}
            editMode={true}
          />
        </Form.Item>

        {/* Media Selection */}
        <Form.Item label="Media" required>
          <div className="flex flex-col">
            <Button onClick={() => setIsMediaModalVisible(true)}>
              Select Media
            </Button>
            <div className="flex justify-between mt-4">
              {/* Selected Media */}
              {selectedMedia ? (
                <div className="flex flex-col items-center">
                  <h3 className="my-2 font-bold">Selected Media</h3>
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
              ) : (
                <div className="flex flex-col items-center">
                  <h3 className="my-2 font-bold">No Media Selected</h3>
                  <Image
                    src={PLACEHOLDER_IMAGE}
                    alt="Placeholder"
                    width={200}
                    height={150}
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </Form.Item>

        {/* Page Association */}
        <Form.Item
          label="Page Name"
          name="page_name"
          rules={[{ required: true, message: "Please select a page name" }]}
        >
          <Select placeholder="Select Page" allowClear showSearch>
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
          rules={[{ required: true, message: "Please select a link type" }]}
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
            rules={[
              { required: true, message: "Please select a page to link" },
            ]}
          >
            <Select placeholder="Select a Page to link" allowClear showSearch>
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
            <Input placeholder="Enter independent link URL" />
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
    </Drawer>
  );
};

export default CreateCardForm;
