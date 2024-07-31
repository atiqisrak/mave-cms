import React, { useState, useEffect } from "react";
import { Input, Select, Button, Form } from "antd";

const { Option } = Select;

const ElementConfig = ({ element, onUpdate }) => {
  const [label, setLabel] = useState(element.label);
  const [placeholder, setPlaceholder] = useState(element.placeholder);
  const [inputType, setInputType] = useState(element.input_type || "text");
  const [options, setOptions] = useState(element.options || []);

  useEffect(() => {
    handleUpdate();
  }, [label, placeholder, inputType, options]);

  const handleUpdate = () => {
    onUpdate({
      ...element,
      label,
      placeholder,
      input_type: inputType,
      options,
    });
  };

  const addOption = () => {
    const newOption = { _id: Date.now().toString(), title: "", value: "" };
    setOptions([...options, newOption]);
  };

  const updateOption = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <div className="element-config">
      <Form layout="vertical">
        <Form.Item label="Label">
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleUpdate}
          />
        </Form.Item>
        <Form.Item label="Placeholder">
          <Input
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            onBlur={handleUpdate}
          />
        </Form.Item>
        {element.element_type === "input" && (
          <Form.Item label="Input Type">
            <Select
              value={inputType}
              onChange={(value) => setInputType(value)}
              onBlur={handleUpdate}
            >
              <Option value="text">Text</Option>
              <Option value="email">Email</Option>
              <Option value="number">Number</Option>
              <Option value="password">Password</Option>
              <Option value="phone">Phone</Option>
              <Option value="date">Date</Option>
              <Option value="radio">Radio</Option>
              <Option value="submit">Submit</Option>
            </Select>
          </Form.Item>
        )}
        {element.element_type === "select" && (
          <Form.Item label="Options">
            {options.map((option, index) => (
              <div
                key={option._id}
                style={{ display: "flex", marginBottom: "8px" }}
              >
                <Input
                  placeholder="Title"
                  value={option.title}
                  onChange={(e) => updateOption(index, "title", e.target.value)}
                  style={{ marginRight: "8px" }}
                />
                <Input
                  placeholder="Value"
                  value={option.value}
                  onChange={(e) => updateOption(index, "value", e.target.value)}
                />
                <Button
                  type="danger"
                  onClick={() => removeOption(index)}
                  style={{ marginLeft: "8px" }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={addOption}>Add Option</Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default ElementConfig;
