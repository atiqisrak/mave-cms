import React, { useState } from "react";
import { Input, Select, DatePicker, Button, Radio } from "antd";
import ElementConfig from "./ElementConfig";
import RichTextEditor from "../../RichTextEditor";

const { Option } = Select;

const FormElement = ({ element, onUpdate }) => {
  const [configVisible, setConfigVisible] = useState(false);

  const handleConfigChange = (updatedElement) => {
    onUpdate(updatedElement);
    setConfigVisible(false);
  };

  const renderElement = () => {
    switch (element.element_type) {
      case "input":
        switch (element.input_type) {
          case "text":
          case "email":
          case "number":
          case "password":
          case "phone":
            return (
              <Input
                type={element.input_type}
                placeholder={element.placeholder}
              />
            );
          case "date":
            return <DatePicker placeholder={element.placeholder} />;
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
          case "submit":
            return (
              <Button type="primary">
                {element.default_value || "Submit"}
              </Button>
            );
          default:
            return <Input placeholder={element.placeholder} />;
        }
      case "textarea":
        return <RichTextEditor editMode={true} />;
      case "select":
        return (
          <Select placeholder={element.placeholder}>
            {element.options.map((option) => (
              <Option key={option._id} value={option.value}>
                {option.title}
              </Option>
            ))}
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="form-element"
      style={{
        padding: "1rem",
        borderRadius: "5px",
        border: "1px solid var(--theme)",
        marginBottom: "10px",
      }}
    >
      <div onClick={() => setConfigVisible(!configVisible)}>
        {element.label || "Edit Element"}
      </div>
      {renderElement()}
      {configVisible && (
        <ElementConfig element={element} onUpdate={handleConfigChange} />
      )}
    </div>
  );
};

export default FormElement;
