// components/PageBuilder/CreatePageModal.jsx

import React, { useState } from "react";
import { Modal, Input, Button, Row, Col, message } from "antd";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import instance from "../../axios";

const CreatePageModal = ({ visible, onCancel, onPageCreated }) => {
  const [newPageTitleEn, setNewPageTitleEn] = useState("");
  const [newPageTitleBn, setNewPageTitleBn] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePage = async () => {
    if (
      newPageTitleEn.trim() === "" ||
      newPageTitleBn.trim() === "" ||
      newSlug.trim() === ""
    ) {
      message.error("All fields are required.");
      return;
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(newSlug)) {
      message.error(
        "Invalid slug format. Use only lowercase letters, numbers, and hyphens."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await instance.post("/pages", {
        page_name_en: newPageTitleEn,
        page_name_bn: newPageTitleBn,
        type: "Page",
        favicon_id: 10, // Assuming default favicon_id; adjust as needed
        slug: newSlug,
      });

      if (response.status === 201) {
        message.success("Page created successfully.");
        onPageCreated(response.data);
        // Reset form fields
        setNewPageTitleEn("");
        setNewPageTitleBn("");
        setNewSlug("");
      } else {
        message.error("Failed to create page.");
      }
    } catch (error) {
      console.error("Error creating page:", error);
      message.error("An error occurred while creating the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form fields on cancel
    setNewPageTitleEn("");
    setNewPageTitleBn("");
    setNewSlug("");
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title="Create New Page"
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input
            placeholder="Page Title"
            value={newPageTitleEn}
            onChange={(e) => setNewPageTitleEn(e.target.value)}
            className="text-lg"
          />
        </Col>
        <Col span={24}>
          <Input
            placeholder="Page Alt Title"
            value={newPageTitleBn}
            onChange={(e) => setNewPageTitleBn(e.target.value)}
            className="text-lg"
          />
        </Col>
        <Col span={24}>
          <Input
            placeholder="Page Slug (e.g., about-us)"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            className="text-lg"
          />
          <span className="text-xs text-gray-500">
            *Use only lowercase letters, numbers, and hyphens.
          </span>
        </Col>
        <Col span={24} className="flex justify-end gap-2">
          <Button
            onClick={handleCreatePage}
            icon={<PlusCircleOutlined />}
            loading={loading}
            className="mavebutton"
          >
            Create Page
          </Button>
          <Button
            onClick={handleCancel}
            icon={<CloseCircleOutlined />}
            className="mavecancelbutton"
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreatePageModal;
