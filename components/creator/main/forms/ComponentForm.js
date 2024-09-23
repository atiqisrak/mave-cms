import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Upload, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const componentFieldsMap = {
  title: [
    {
      name: "value",
      label: "Title Text",
      component: Input,
      placeholder: "Enter title",
    },
  ],
  media: [
    {
      name: "src",
      label: "Media Source",
      component: Upload,
      placeholder: "Upload media",
    },
    {
      name: "alt",
      label: "Alt Text",
      component: Input,
      placeholder: "Enter alt text",
    },
  ],
  form: [
    {
      name: "fields",
      label: "Form Fields",
      component: TextArea,
      placeholder: "Enter form fields as JSON",
    },
  ],
  // Add other component fields as needed
};

const ComponentForm = ({ componentType, initialData, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [componentFields, setComponentFields] = useState([]);

  useEffect(() => {
    if (componentType && componentFieldsMap[componentType]) {
      setComponentFields(componentFieldsMap[componentType]);
      form.setFieldsValue(initialData || {}); // Populate form with initial data if editing
    }
  }, [componentType, initialData, form]);

  const handleSubmit = (values) => {
    onSubmit(values); // Pass the form values to the parent component
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      {componentFields.map(
        ({ name, label, component: Component, placeholder }) => (
          <Form.Item key={name} name={name} label={label} required>
            {name === "src" ? (
              <Upload listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>{placeholder}</Button>
              </Upload>
            ) : (
              <Component placeholder={placeholder} />
            )}
          </Form.Item>
        )
      )}

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

export default ComponentForm;
