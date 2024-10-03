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
  const [relatedModel, setRelatedModel] = useState(
    initialFieldData.relatedModel || null
  );
  const [relatedField, setRelatedField] = useState(
    initialFieldData.relatedField || null
  );
  const [relationshipType, setRelationshipType] = useState(
    initialFieldData.relationshipType || ""
  );

  // Relationship options with human-readable language
  const relationshipOptions = [
    { label: "A Contributor can have One Post", value: "hasOne" },
    { label: "A Contributor can have Many Posts", value: "hasMany" },
    { label: "A Post belongs to One Contributor", value: "belongsTo" },
    { label: "A Post belongs to Many Contributors", value: "belongsToMany" },
  ];

  // If array or json type is selected, reset relationships
  useEffect(() => {
    if (fieldType === "json") {
      setRelatedModel(null);
      setRelatedField(null);
      setRelationshipType("");
    }
  }, [fieldType]);

  const addField = () => {
    if (!fieldName || !fieldType) {
      alert("Field name and type are required.");
      return;
    }

    // Ensure proper data for relationships
    if (relatedModel && (!relatedField || !relationshipType)) {
      alert("Please select the related field and relationship type.");
      return;
    }

    const fieldData = {
      name: fieldName.toLowerCase().replace(/ /g, "_"),
      type: fieldType,
      required: isRequired,
      unique: isUnique,
      relatedModel: relatedModel || null,
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
          <Option value="json">JSON (Use for array-like data)</Option>
          <Option value="relationship">Relationship</Option>{" "}
          {/* New relationship type */}
        </Select>
      </Form.Item>

      {/* Relationship Handling */}
      <Form.Item label="Connect to Other Model">
        <Select
          value={relatedModel}
          onChange={(value) => setRelatedModel(value)}
          placeholder="Select Model"
        >
          {availableModels?.map((model) => (
            <Option key={model.model_name} value={model.model_name}>
              {model.model_name}
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
            {/* {availableModels
              .find((model) => model.model_name === relatedModel)
              ?.fields.map((field, index) => (
                <Option key={index} value={field.name}>
                  {field.name}
                </Option>
              ))} */}
            {availableModels.find((model) => model.model_name === relatedModel)
              ?.fields &&
              JSON.parse(
                availableModels.find(
                  (model) => model.model_name === relatedModel
                )?.fields
              ).map((field, index) => (
                <Option key={index} value={field.name}>
                  {field.name}
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
