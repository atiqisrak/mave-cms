import { Form, Input, Select, Checkbox, Button } from "antd";
import { useState } from "react";

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
  const [connectionType, setConnectionType] = useState(null);

  const handleSave = () => {
    const fieldData = {
      name: fieldName,
      type: fieldType,
      required: isRequired,
      unique: isUnique,
      connection: relatedModel
        ? {
            model: relatedModel,
            field: relatedField,
            type: connectionType,
          }
        : null,
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
          <Option value="number">Number</Option>
          <Option value="boolean">Boolean</Option>
          <Option value="date">Date</Option>
        </Select>
      </Form.Item>

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

      {/* Connection Section */}
      <Form.Item label="Connect to another model?">
        <Select
          placeholder="Select Model"
          onChange={(value) => setRelatedModel(value)}
        >
          {availableModels.map((model, index) => (
            <Option key={index} value={model.name}>
              {model.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {relatedModel && (
        <Form.Item label="Select Field from Model">
          <Select
            placeholder="Select Field"
            onChange={(value) => setRelatedField(value)}
          >
            {availableModels
              .find((model) => model.name === relatedModel)
              ?.fields.map((field, index) => (
                <Option key={index} value={field}>
                  {field}
                </Option>
              ))}
          </Select>
        </Form.Item>
      )}

      {relatedModel && relatedField && (
        <Form.Item label="Connection Type">
          <Select
            placeholder="Select Connection Type"
            onChange={(value) => setConnectionType(value)}
          >
            <Option value="hasMany">Has Many</Option>
            <Option value="hasOne">Has One</Option>
            <Option value="belongsTo">Belongs To</Option>
          </Select>
        </Form.Item>
      )}

      <Button type="primary" onClick={handleSave}>
        Save Field
      </Button>
    </div>
  );
};

export default FieldInput;
