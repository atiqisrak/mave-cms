// components/PageBuilder/Modals/AccordionSelectionModal/AccordionSelectionModal.jsx

import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Typography,
  Select,
  Collapse,
  Space,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const AccordionSelectionModal = ({
  isVisible,
  onClose,
  onSelectAccordion,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [accordionItems, setAccordionItems] = useState(initialData || []);

  const addAccordionItem = () => {
    setAccordionItems([
      ...accordionItems,
      {
        title: `Accordion ${accordionItems.length + 1}`,
        content: "",
        contentType: "text",
      },
    ]);
  };

  const removeAccordionItem = (index) => {
    const newItems = [...accordionItems];
    newItems.splice(index, 1);
    setAccordionItems(newItems);
  };

  const handleTitleChange = (value, index) => {
    const newItems = [...accordionItems];
    newItems[index].title = value;
    setAccordionItems(newItems);
  };

  const handleContentChange = (value, index) => {
    const newItems = [...accordionItems];
    newItems[index].content = value;
    setAccordionItems(newItems);
  };

  const handleContentTypeChange = (value, index) => {
    const newItems = [...accordionItems];
    newItems[index].contentType = value;
    if (value === "accordion") {
      newItems[index].nestedAccordion = [];
    }
    setAccordionItems(newItems);
  };

  const handleNestedAccordionChange = (nestedData, index) => {
    const newItems = [...accordionItems];
    newItems[index].nestedAccordion = nestedData;
    setAccordionItems(newItems);
  };

  const handleSave = () => {
    // Basic validation
    for (let i = 0; i < accordionItems.length; i++) {
      if (!accordionItems[i].title.trim()) {
        return;
      }
      if (
        accordionItems[i].contentType === "text" &&
        !accordionItems[i].content.trim()
      ) {
        return;
      }
    }

    onSelectAccordion(accordionItems);
    form.resetFields();
  };

  return (
    <Modal
      title="Configure Accordion"
      visible={isVisible}
      onOk={handleSave}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save Accordion
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Title level={4}>Accordion Items</Title>
        {accordionItems.map((item, index) => (
          <div key={index} className="mb-4 border p-3 rounded-md">
            <Space align="baseline">
              <Form.Item label="Title" required style={{ flex: 1 }}>
                <Input
                  value={item.title}
                  onChange={(e) => handleTitleChange(e.target.value, index)}
                  placeholder="Accordion Title"
                />
              </Form.Item>
              <Button
                icon={<MinusOutlined />}
                onClick={() => removeAccordionItem(index)}
                danger
              />
            </Space>
            <Form.Item label="Content Type">
              <Select
                value={item.contentType}
                onChange={(value) => handleContentTypeChange(value, index)}
              >
                <Option value="text">Text</Option>
                <Option value="accordion">Nested Accordion</Option>
              </Select>
            </Form.Item>
            {item.contentType === "text" ? (
              <Form.Item label="Content" required>
                <Input.TextArea
                  value={item.content}
                  onChange={(e) => handleContentChange(e.target.value, index)}
                  placeholder="Accordion Content"
                  rows={4}
                />
              </Form.Item>
            ) : (
              <AccordionSelectionModalNested
                data={item.nestedAccordion}
                onChange={(nestedData) =>
                  handleNestedAccordionChange(nestedData, index)
                }
              />
            )}
          </div>
        ))}
        <Button
          type="dashed"
          onClick={addAccordionItem}
          icon={<PlusOutlined />}
          block
        >
          Add Accordion Item
        </Button>
      </Form>
    </Modal>
  );
};

const AccordionSelectionModalNested = ({ data, onChange }) => {
  const [nestedData, setNestedData] = useState(data || []);

  const addNestedItem = () => {
    setNestedData([
      ...nestedData,
      {
        title: `Nested Accordion ${nestedData.length + 1}`,
        content: "",
        contentType: "text",
      },
    ]);
  };

  const removeNestedItem = (index) => {
    const newNested = [...nestedData];
    newNested.splice(index, 1);
    setNestedData(newNested);
    onChange(newNested);
  };

  const handleTitleChange = (value, index) => {
    const newNested = [...nestedData];
    newNested[index].title = value;
    setNestedData(newNested);
    onChange(newNested);
  };

  const handleContentChange = (value, index) => {
    const newNested = [...nestedData];
    newNested[index].content = value;
    setNestedData(newNested);
    onChange(newNested);
  };

  const handleContentTypeChange = (value, index) => {
    const newNested = [...nestedData];
    newNested[index].contentType = value;
    if (value === "accordion") {
      newNested[index].nestedAccordion = [];
    }
    setNestedData(newNested);
    onChange(newNested);
  };

  const handleNestedAccordionChange = (nested, index) => {
    const newNested = [...nestedData];
    newNested[index].nestedAccordion = nested;
    setNestedData(newNested);
    onChange(newNested);
  };

  return (
    <div className="ml-4">
      <Title level={5}>Nested Accordion Items</Title>
      {nestedData.map((item, index) => (
        <div key={index} className="mb-3 border p-2 rounded-md">
          <Space align="baseline">
            <Input
              value={item.title}
              onChange={(e) => handleTitleChange(e.target.value, index)}
              placeholder="Nested Accordion Title"
              style={{ width: "70%" }}
            />
            <Button
              icon={<MinusOutlined />}
              onClick={() => removeNestedItem(index)}
              danger
              type="text"
            />
          </Space>
          <Form.Item label="Content Type">
            <Select
              value={item.contentType}
              onChange={(value) => handleContentTypeChange(value, index)}
            >
              <Option value="text">Text</Option>
              <Option value="accordion">Nested Accordion</Option>
            </Select>
          </Form.Item>
          {item.contentType === "text" ? (
            <Form.Item label="Content" required>
              <Input.TextArea
                value={item.content}
                onChange={(e) => handleContentChange(e.target.value, index)}
                placeholder="Nested Accordion Content"
                rows={3}
              />
            </Form.Item>
          ) : (
            <AccordionSelectionModalNested
              data={item.nestedAccordion}
              onChange={(nested) => handleNestedAccordionChange(nested, index)}
            />
          )}
        </div>
      ))}
      <Button
        type="dashed"
        onClick={addNestedItem}
        icon={<PlusOutlined />}
        block
      >
        Add Nested Accordion Item
      </Button>
    </div>
  );
};

export default AccordionSelectionModal;
