import { Form, Input, Button, Collapse } from "antd";
import FieldInput from "./FieldInput";
import SQLGenerator from "./SQLGenerator"; // Import the SQLGenerator
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

export default function ModelCreator() {
  const [fields, setFields] = useState([]);
  const [modelName, setModelName] = useState("");
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    // Mock fetching models from localhost
    const fetchAvailableModels = async () => {
      const models = [
        { name: "User", fields: ["id", "name", "email"] },
        { name: "Post", fields: ["id", "title", "content"] },
      ];
      setAvailableModels(models);
    };

    fetchAvailableModels();
  }, []);

  const handleFieldChange = (fieldData) => {
    setFields([...fields, fieldData]); // Add field data to the state
  };

  const handleFieldEdit = (updatedField, index) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    setFields(updatedFields);
  };

  const handleFieldDelete = (index) => {
    setFields(fields.filter((_, idx) => idx !== index)); // Delete a field
  };

  const handleFormSubmit = () => {
    // Generate SQL query using SQLGenerator
    const query = SQLGenerator.generateCreateTableQuery(modelName, fields);

    // Create the JSON payload to send to the backend
    const jsonPayload = {
      modelName,
      fields,
      query, // SQL query that creates the table
    };

    // Log the query and JSON payload in the console
    console.log("Generated SQL Query:", query);
    console.log(
      "Payload to send to backend:",
      JSON.stringify(jsonPayload, null, 2)
    );

    // Here you would send jsonPayload to your backend
    // Example: api.createModel(jsonPayload);  // Send to backend
  };

  return (
    <div className="ViewContentContainer">
      <Form layout="vertical" onFinish={handleFormSubmit}>
        {/* Model Name */}
        <Form.Item label="Model Name" required>
          <Input
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            style={{
              height: "3rem",
            }}
          />
        </Form.Item>

        {/* Collapsible Fields */}
        <Collapse accordion>
          {fields.map((field, index) => (
            <Panel
              header={`${field.name} (${field.type})`}
              key={index}
              extra={
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFieldDelete(index);
                  }}
                  danger
                >
                  Delete
                </Button>
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Add Field Button */}
          <Button
            type="dashed"
            onClick={() => handleFieldChange({ name: "", type: "string" })}
            style={{ marginTop: "20px" }}
            icon={<PlusOutlined />}
          >
            Add Field
          </Button>

          {/* Generate Model Button */}
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginTop: "20px",
              padding: "2rem 2rem",
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
          >
            Generate Model
          </Button>
        </div>
      </Form>
    </div>
  );
}
