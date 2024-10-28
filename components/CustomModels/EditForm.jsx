// components/CustomModels/EditForm.jsx
import React from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const EditForm = ({ initialValues, fields, onSave, onCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSave(values);
  };

  const renderFormItem = (field) => {
    switch (field.type) {
      case "string":
        return <Input />;
      case "text":
        return <Input.TextArea />;
      case "number":
        return <Input type="number" />;
      case "select":
        return (
          <Select>
            {/* Assuming relatedModel and relatedField are used to fetch options */}
            {/* You might need to fetch options based on relatedModel */}
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
          </Select>
        );
      default:
        return <Input />;
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          rules={[
            { required: field.required, message: `${field.name} is required` },
            field.unique
              ? {
                  validator: async (_, value) => {
                    // Implement unique validation if needed
                  },
                }
              : {},
          ]}
        >
          {renderFormItem(field)}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="mr-2">
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default EditForm;
