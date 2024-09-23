import React, { useState, useEffect } from "react";
import { Input, Button, Form } from "antd";

const PageForm = ({ initialData, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [pageNameEn, setPageNameEn] = useState(initialData?.page_name_en || "");
  const [pageNameBn, setPageNameBn] = useState(initialData?.page_name_bn || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  useEffect(() => {
    if (initialData) {
      setPageNameEn(initialData.page_name_en || "");
      setPageNameBn(initialData.page_name_bn || "");
      setSlug(initialData.slug || "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    const updatedData = {
      page_name_en: pageNameEn,
      page_name_bn: pageNameBn,
      slug: slug.toLowerCase().split(" ").join("-"),
    };
    onSubmit(updatedData);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Page Title (English)" required>
        <Input
          value={pageNameEn}
          onChange={(e) => setPageNameEn(e.target.value)}
          placeholder="Enter English page title"
        />
      </Form.Item>

      <Form.Item label="Page Title (Bangla)" required>
        <Input
          value={pageNameBn}
          onChange={(e) => setPageNameBn(e.target.value)}
          placeholder="Enter Bangla page title"
        />
      </Form.Item>

      <Form.Item label="Slug" required>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Enter page slug"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button style={{ marginLeft: "10px" }} onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PageForm;
