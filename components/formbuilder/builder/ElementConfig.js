import React, { useState, useEffect } from "react";
import { Input, Select, Button, Form } from "antd";

const { Option } = Select;

const ElementConfig = ({ element, onUpdate }) => {
  const [label, setLabel] = useState(element.label);
  const [placeholder, setPlaceholder] = useState(element.placeholder);
  const [inputType, setInputType] = useState(element.input_type || "text");
  const [options, setOptions] = useState(element.options || []);
  const [divisionLabel, setDivisionLabel] = useState(
    element.divisionLabel || "Select Division"
  );
  const [districtLabel, setDistrictLabel] = useState(
    element.districtLabel || "Select District"
  );

  const handleUpdate = () => {
    onUpdate({
      ...element,
      label,
      placeholder,
      input_type: inputType,
      options,
      selectedValue: element.selectedValue || "",
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

  useEffect(() => {
    handleUpdate();
  }, [label, placeholder, inputType, options]);

  useEffect(() => {
    onUpdate({
      ...element,
      divisionLabel,
      districtLabel,
    });
  }, [divisionLabel, districtLabel]);

  return (
    <div className="element-config">
      {/* Title, Paragraph */}
      <Form
        layout="vertical"
        className="element-config-form p-4 border-2 border-gray-400 rounded-lg mt-5"
      >
        <Form.Item label="Label" className="text-2xl font-semibold">
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleUpdate}
          />
        </Form.Item>
        <Form.Item label="Placeholder" className="text-2xl font-semibold">
          <Input
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            onBlur={handleUpdate}
          />
        </Form.Item>
        {element.element_type === "input" && element.input_type === "radio" && (
          <Form.Item label="Radio Options" className="text-2xl font-semibold">
            {options?.map((option, index) => (
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
        {element.element_type === "select" && (
          <Form.Item label="Options" className="text-2xl font-semibold">
            {options?.map((option, index) => (
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
        {element.element_type === "location" && (
          <>
            <Form.Item
              label="Division Label"
              className="text-2xl font-semibold"
            >
              <Input
                value={divisionLabel}
                onChange={(e) => setDivisionLabel(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="District Label"
              className="text-2xl font-semibold"
            >
              <Input
                value={districtLabel}
                onChange={(e) => setDistrictLabel(e.target.value)}
              />
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
};

export default ElementConfig;
