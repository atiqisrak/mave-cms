import React, { useState } from "react";
import {
  Input,
  Select,
  DatePicker,
  Button,
  Form,
  Tooltip,
  Radio,
  message,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import instance from "../../axios";

const { Option } = Select;

export default function ElementsParser({ form, setDrawerVisible }) {
  console.log("Form data:", form); // Debugging: Log form data
  const [loading, setLoading] = useState(false);
  const formId = form.id;

  const handleSubmit = async (values) => {
    console.log("Collected form values:", values); // Debugging: Log form values
    const submissionData = {
      form_id: formId,
      form_data: values, // Use values directly from onFinish
    };

    try {
      setLoading(true);
      const response = await instance.post(
        form?.attributes?.action_url,
        submissionData
      );
      if (response.status === 201) {
        message.success("Form submitted successfully");
        setDrawerVisible(false);
      } else {
        message.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  // Function to derive name from label if input_name is absent
  const deriveName = (element) => {
    if (element.input_name) {
      return element.input_name;
    }
    // Fallback to sanitized label
    return element.label.replace(/\s+/g, "_").toLowerCase();
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      layout="vertical"
      className="text-2xl font-semibold text-gray-800"
      onFinish={handleSubmit} // Trigger handleSubmit on form submission
    >
      {form.elements.map((element) => {
        // Handle Submit Button Separately
        if (
          element.element_type === "input" &&
          element.input_type === "submit"
        ) {
          return (
            <Form.Item key={element.updated_on}>
              <Button
                type="primary"
                htmlType="submit"
                className="mavebutton"
                loading={loading}
              >
                {element.placeholder || "Submit"}
              </Button>
            </Form.Item>
          );
        }

        return (
          <Form.Item
            key={element.updated_on}
            name={deriveName(element)} // Use existing input_name or derived name
            label={element.label}
            rules={[{ required: element.required, message: element.help_text }]}
            tooltip={
              element.help_text ? (
                <Tooltip title={element.help_text}>
                  <InfoCircleOutlined />
                </Tooltip>
              ) : null
            }
          >
            {(() => {
              switch (element.element_type) {
                case "input":
                  switch (element.input_type) {
                    case "text":
                      return <Input placeholder={element.placeholder} />;
                    case "number":
                      return (
                        <Input
                          type="number"
                          placeholder={element.placeholder}
                        />
                      );
                    case "email":
                      return (
                        <Input type="email" placeholder={element.placeholder} />
                      );
                    case "password":
                      return (
                        <Input.Password placeholder={element.placeholder} />
                      );
                    case "date":
                      return (
                        <DatePicker
                          placeholder={element.placeholder}
                          style={{ width: "100%" }}
                        />
                      );
                    case "radio":
                      return (
                        <Radio.Group>
                          {element.options.map((option) => (
                            <Radio key={option._id} value={option.value}>
                              {option.title}
                            </Radio>
                          ))}
                        </Radio.Group>
                      );
                    case "tel": // Updated to use 'tel' instead of 'phone'
                    case "phone":
                      return (
                        <Input type="tel" placeholder={element.placeholder} />
                      );
                    default:
                      return <Input placeholder={element.placeholder} />;
                  }
                case "textarea":
                  return (
                    <Input.TextArea
                      autoSize={{ minRows: 3, maxRows: 5 }}
                      style={{
                        resize: "none",
                        borderRadius: "5px",
                        border: "1px solid var(--theme)",
                        marginBottom: "1rem",
                      }}
                      placeholder={element.placeholder}
                    />
                  );
                case "select":
                  return (
                    <Select
                      allowClear
                      showSearch
                      mode="multiple"
                      placeholder={element.placeholder}
                    >
                      {element.options.map((option) => (
                        <Option key={option._id} value={option.value}>
                          {option.title}
                        </Option>
                      ))}
                    </Select>
                  );
                case "button":
                  return (
                    <Button
                      htmlType={element.input_type}
                      className="mavebutton"
                    >
                      {element.placeholder || element.label || "Button"}
                    </Button>
                  );
                default:
                  return <Input placeholder={element.placeholder} />;
              }
            })()}
          </Form.Item>
        );
      })}
    </Form>
  );
}
