// FieldInput.js
import { Form, Input, Select, Checkbox, Button } from "antd";
import { useState, useEffect } from "react";

const { Option } = Select;

export default function FieldInput({
  initialFieldData,
  availableModels,
  onSave,
}) {
  const [fieldData, setFieldData] = useState({
    ...initialFieldData,
    required:
      initialFieldData.required !== undefined
        ? initialFieldData.required
        : false,
  });

  const handleChange = (key, value) => {
    setFieldData((prevData) => {
      const updatedData = { ...prevData, [key]: value };

      // If the field is a relationship, disable 'required' and set it to false
      if (
        key === "relationshipType" &&
        value !== "None" &&
        value !== undefined
      ) {
        updatedData.required = false;
      }

      return updatedData;
    });
  };

  useEffect(() => {
    onSave(fieldData);
  }, [fieldData]);

  // Disable 'required' and 'unique' checkboxes when a relationship is selected
  const isRelationshipField =
    !!fieldData.relationshipType && fieldData.relationshipType !== "None";

  // Dynamic relationship options for non-developer users
  const relationshipOptions = [
    {
      label: "None",
      value: "None",
    },
    {
      label: `Belongs to a single ${fieldData.relatedModel || "..."}`,
      value: "belongsTo",
    },
    {
      label: `Belongs to multiple ${fieldData.relatedModel || "..."}`,
      value: "belongsToMany",
    },
    {
      label: `Has many ${fieldData.relatedModel || "..."}`,
      value: "hasMany",
    },
    {
      label: `Has one ${fieldData.relatedModel || "..."}`,
      value: "hasOne",
    },
    {
      label: `Morph to ${fieldData.relatedModel || "..."}`,
      value: "morphTo",
    },
  ];

  return (
    <Form layout="vertical">
      <Form.Item label="Field Name" required>
        <Input
          value={fieldData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Field Type" required>
        <Select
          value={fieldData.type}
          onChange={(value) => handleChange("type", value)}
        >
          <Option value="string">String</Option>
          <Option value="text">Text</Option>
          <Option value="integer">Integer</Option>
          <Option value="boolean">Boolean</Option>
          <Option value="date">Date</Option>
          <Option value="json">JSON</Option>
          <Option value="array">Array</Option>
          <Option value="unsignedBigInteger">Unsigned Big Integer</Option>
        </Select>
      </Form.Item>

      {/* Relationship Fields */}
      <Form.Item label="Relationship Model">
        <Select
          placeholder="Select a related model"
          value={fieldData.relatedModel}
          onChange={(value) => {
            handleChange("relatedModel", value);
            // Reset relationship type when related model changes
            handleChange("relationshipType", "None");
          }}
          allowClear
        >
          {availableModels.map((model, index) => (
            <Option key={index} value={model}>
              {model}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {fieldData.relatedModel && (
        <Form.Item label="Relationship Type">
          <Select
            placeholder="Select relationship type"
            value={fieldData.relationshipType || "None"}
            onChange={(value) => handleChange("relationshipType", value)}
          >
            {relationshipOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {/* Field Options */}
      <Form.Item>
        <Checkbox
          checked={fieldData.required}
          onChange={(e) => handleChange("required", e.target.checked)}
          disabled={isRelationshipField}
        >
          Required
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={fieldData.unique}
          onChange={(e) => handleChange("unique", e.target.checked)}
          disabled={isRelationshipField}
        >
          Unique
        </Checkbox>
      </Form.Item>
    </Form>
  );
}
