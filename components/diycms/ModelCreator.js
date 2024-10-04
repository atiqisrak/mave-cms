import {
  Form,
  Input,
  Button,
  Collapse,
  message,
  Popconfirm,
  Switch,
} from "antd";
import FieldInput from "./FieldInput";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import instance from "../../axios";

const { Panel } = Collapse;

export default function ModelCreator() {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [modelSingular, setModelSingular] = useState("");
  const [modelPlural, setModelPlural] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  const [status, setStatus] = useState(false); // Handle model status

  // Fetch models for relationships from backend
  const fetchAvailableModels = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/generated-models");
      if (response.data) {
        setAvailableModels(response.data);
      } else {
        setAvailableModels([]);
      }
    } catch (error) {
      console.error("Error fetching available models:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAvailableModels();
  }, []);

  const handleFieldChange = (fieldData) => {
    setFields([...fields, fieldData]);
  };

  const handleFieldEdit = (updatedField, index) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? updatedField : field
    );
    setFields(updatedFields);
  };

  const handleFieldDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleFormSubmit = async () => {
    // Format model names
    const formattedModelSingular = modelSingular.trim().toLowerCase();
    const formattedModelPlural = modelPlural.trim().toLowerCase();

    // Create the payload
    const jsonPayload = {
      modelSingular: formattedModelSingular,
      modelPlural: formattedModelPlural,
      fields,
      status: status, // Reflect status switch
    };

    console.log(
      "Payload to send to backend:",
      JSON.stringify(jsonPayload, null, 2)
    );

    // Submit to backend
    setLoading(true);
    try {
      const response = await instance.post("/diy-cms", jsonPayload);
      if (response.status === 201) {
        message.success("Model created successfully!");
        setFields([]);
        setModelSingular("");
        setModelPlural("");
      } else {
        message.error("Failed to create model.");
      }
    } catch (error) {
      message.error("Error occurred while creating the model.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "var(--white)",
      }}
    >
      <Form layout="vertical" onFinish={handleFormSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Singular and Plural Model Name */}
          <Form.Item
            label="Model Name (Singular)"
            required
            style={{ width: "48%" }}
          >
            <Input
              value={modelSingular}
              onChange={(e) => setModelSingular(e.target.value)}
              placeholder="e.g., Post"
            />
          </Form.Item>
          <Form.Item
            label="Model Name (Plural)"
            required
            style={{ width: "48%" }}
          >
            <Input
              value={modelPlural}
              onChange={(e) => setModelPlural(e.target.value)}
              placeholder="e.g., Posts"
            />
          </Form.Item>
        </div>

        {/* Fields with Collapsible Panels */}
        <Collapse accordion>
          {fields.map((field, index) => (
            <Panel
              header={`${field.name} (${field.type})`}
              key={index}
              extra={
                <Popconfirm
                  title="Are you sure you want to delete this field?"
                  onConfirm={() => handleFieldDelete(index)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              }
            >
              <FieldInput
                initialFieldData={field}
                availableModels={availableModels}
                onSave={(updatedField) => handleFieldEdit(updatedField, index)}
              />
            </Panel>
          ))}
        </Collapse>

        {/* Add New Field Button */}
        <Button
          type="dashed"
          onClick={() => handleFieldChange({ name: "", type: "string" })}
          style={{ marginTop: "20px" }}
          icon={<PlusOutlined />}
        >
          Add Field
        </Button>

        {/* Status Boolean Switch */}
        <Form.Item label="Status" style={{ marginTop: "20px" }}>
          <Switch
            checked={status}
            onChange={(checked) => setStatus(checked)}
            checkedChildren="Active"
            unCheckedChildren="Inactive"
          />
        </Form.Item>

        <Popconfirm
          title="Are you sure you want to generate the model?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleFormSubmit}
          onCancel={() => message.info("Model generation cancelled.")}
        >
          <Button
            type="primary"
            style={{
              marginTop: "20px",
              padding: "2rem",
              fontSize: "1.5rem",
              borderRadius: "0.5rem",
              backgroundColor: "var(--theme)",
              color: "var(--black)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              fontWeight: "bold",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
            loading={loading}
          >
            Generate Model
          </Button>
        </Popconfirm>
      </Form>
    </div>
  );
}
