import React, { useState, useEffect } from "react";
import { Input, Button, Form } from "antd";

const SectionForm = ({ initialData, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [sectionTitle, setSectionTitle] = useState(
    initialData?.sectionTitle || ""
  );

  useEffect(() => {
    if (initialData) {
      setSectionTitle(initialData.sectionTitle || "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    const updatedSection = {
      ...initialData,
      sectionTitle: sectionTitle,
    };
    onSubmit(updatedSection);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Section Title" required>
        <Input
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          placeholder="Enter section title"
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

export default SectionForm;
