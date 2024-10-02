import React, { useState, useEffect } from "react";
import { Form, Input, Select, Checkbox, Button } from "antd";

const { Option } = Select;

const FieldInput = ({ initialFieldData, availableModels, onSave }) => {
  const [fieldName, setFieldName] = useState(initialFieldData.name || "");
  const [fieldType, setFieldType] = useState(initialFieldData.type || "string");
  const [isRequired, setIsRequired] = useState(
    initialFieldData.required || false
  );
  const [isUnique, setIsUnique] = useState(initialFieldData.unique || false);
  const [relatedModel, setRelatedModel] = useState(null);
  const [relatedField, setRelatedField] = useState(null);
  const [relationshipType, setRelationshipType] = useState("");

  // Filter available connection types based on field type
  const relationshipOptions = [
    { label: "A Task can have One Contributor", value: "hasOne" },
    { label: "A Task can have Multiple Contributors", value: "hasMany" },
    { label: "A Task belongs to One Contributor", value: "belongsTo" },
    { label: "A Task belongs to Many Contributors", value: "belongsToMany" },
  ];

  useEffect(() => {
    // Reset relationships if array/json are selected
    if (fieldType === "array" || fieldType === "json") {
      setRelatedModel(null);
      setRelatedField(null);
      setRelationshipType("");
    }
  }, [fieldType]);

  // const addField = () => {
  //   const fieldData = {
  //     name: fieldName,
  //     type: fieldType,
  //     required: isRequired,
  //     unique: isUnique,
  //     relatedModel,
  //     relatedField,
  //     relationshipType,
  //   };
  //   onSave(fieldData);
  // };
  const addField = () => {
    if (!fieldName || !fieldType) {
      alert("Field name and type are required.");
      return;
    }

    // If relationships are involved, ensure they are properly filled
    if (relatedModel && (!relatedField || !relationshipType)) {
      alert("Please select the related field and relationship type.");
      return;
    }

    const fieldData = {
      // name: fieldName,
      name: fieldName.toLowerCase().replace(/ /g, "_"),
      type: fieldType,
      required: isRequired,
      unique: isUnique,
      relatedModel: relatedModel || null, // Handle empty relationships
      relatedField: relatedField || null,
      relationshipType: relationshipType || null,
    };

    onSave(fieldData);
  };

  return (
    <div>
      <Form.Item label="Field Name" required>
        <Input
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Field Type">
        <Select value={fieldType} onChange={(value) => setFieldType(value)}>
          <Option value="string">String</Option>
          <Option value="integer">Number</Option>
          <Option value="boolean">Boolean</Option>
          <Option value="date">Date</Option>
          <Option value="array">Array</Option>
          <Option value="json">JSON</Option>
        </Select>
      </Form.Item>

      {fieldType !== "array" && fieldType !== "json" && (
        <>
          <Form.Item label="Connect to Other Model">
            <Select
              value={relatedModel}
              onChange={(value) => setRelatedModel(value)}
              placeholder="Select Model"
            >
              {availableModels.map((model) => (
                <Option key={model.name} value={model.name}>
                  {model.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {relatedModel && (
            <Form.Item label="Field in Related Model">
              <Select
                value={relatedField}
                onChange={(value) => setRelatedField(value)}
                placeholder="Select Field"
              >
                {availableModels
                  .find((model) => model.name === relatedModel)
                  ?.fields.map((field) => (
                    <Option key={field} value={field}>
                      {field}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          )}

          {relatedModel && relatedField && (
            <Form.Item label="Relationship Type">
              <Select
                value={relationshipType}
                onChange={(value) => setRelationshipType(value)}
                placeholder="Select Relationship Type"
              >
                {relationshipOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </>
      )}

      <Form.Item>
        <Checkbox
          checked={isRequired}
          onChange={(e) => setIsRequired(e.target.checked)}
        >
          Required
        </Checkbox>
        <Checkbox
          checked={isUnique}
          onChange={(e) => setIsUnique(e.target.checked)}
        >
          Unique
        </Checkbox>
      </Form.Item>

      <center>
        <Button
          onClick={addField}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "14px 20px",
            margin: "8px 0",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
            boxSizing: "border-box",
            fontSize: "16px",
          }}
        >
          Save Field
        </Button>
      </center>
    </div>
  );
};

export default FieldInput;
