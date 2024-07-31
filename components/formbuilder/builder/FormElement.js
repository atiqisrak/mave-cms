import React, { useState } from "react";
import { Input, Select, DatePicker, Button, Radio, Popconfirm } from "antd";
import ElementConfig from "./ElementConfig";
import RichTextEditor from "../../RichTextEditor";
import { DownOutlined, RightOutlined, UpOutlined } from "@ant-design/icons";

const { Option } = Select;

const FormElement = ({ element, onUpdate }) => {
  const [configVisible, setConfigVisible] = useState(false);

  const handleConfigChange = (updatedElement) => {
    console.log("Updated element:", updatedElement);
    console.log("Config visible:", configVisible);
    onUpdate(updatedElement);
    // setConfigVisible(false);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          paddingBottom: "1rem",
        }}
      >
        <h4>
          {element.label}
          {element.help_text && (
            <span style={{ marginLeft: "10px" }} title={element.help_text}>
              <i className="fas fa-info-circle"></i>
            </span>
          )}
        </h4>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          {
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setConfigVisible(!configVisible);
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "var(--themes)",
                color: "white",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              {configVisible ? "Hide Config" : "Show Config"}
            </Button>
          }

          <Popconfirm
            title="Are you sure you want to remove this item?"
            onConfirm={(e) => {
              e.stopPropagation();
              onUpdate(null);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              Remove Item
            </Button>
          </Popconfirm>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <Button
              style={{
                backgroundColor: "var(--theme-transparent)",
                color: "var(--theme)",
                fontWeight: "bold",
              }}
              icon={<UpOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                console.log("Move up");
              }}
            />
            <Button
              style={{
                backgroundColor: "var(--theme-transparent)",
                fontWeight: "bold",
                color: "var(--theme)",
              }}
              icon={<DownOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                console.log("Move down");
              }}
            />
          </div>
        </div>
      </div>
      {renderElement()}
      {configVisible && (
        <ElementConfig element={element} onUpdate={handleConfigChange} />
      )}
    </div>
  );
};

export default FormElement;
