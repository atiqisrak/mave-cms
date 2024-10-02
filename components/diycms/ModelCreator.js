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
import SQLGenerator from "./SQLGenerator";
import RouteGenerator from "./RouteGenerator";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ControllerGenerator from "./ControllerGenerator";
import instance from "../../axios";

const { Panel } = Collapse;

export default function ModelCreator() {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [modelSingular, setModelSingular] = useState("");
  const [modelPlural, setModelPlural] = useState("");
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
    // Convert model names to lowercase and replace spaces
    const formattedModelSingular = modelSingular
      .trim()
      .replace(/\s+/g, "_")
      .toLowerCase();
    const formattedModelPlural = modelPlural
      .trim()
      .replace(/\s+/g, "_")
      .toLowerCase();

    // Generate the migration, model, routes, and controller
    const migration = SQLGenerator.generateCreateTableQuery(
      formattedModelSingular,
      fields
    );
    const model = SQLGenerator.generateModel(formattedModelSingular, fields);
    const routes = RouteGenerator.generateRoutes(formattedModelSingular);
    const controller = ControllerGenerator.generateController(
      formattedModelSingular,
      fields
    );

    // Create the JSON payload to send to the backend
    const jsonPayload = {
      modelSingular: formattedModelSingular,
      modelPlural: formattedModelPlural,
      fields,
      status: false,
      // migration,
      // model,
      // routes,
      // controller,
    };

    // Log the generated code and payload in the console
    // console.log("Generated Migration Query:", migration);
    // console.log("Generated Model:", model);
    // console.log("Generated Routes:", routes);
    // console.log("Generated Controller:", controller);
    console.log(
      "Payload to send to backend:",
      JSON.stringify(jsonPayload, null, 2)
    );

    // Send the payload to the backend
    setLoading(true);
    try {
      const response = await instance.post("/diy-cms", jsonPayload);
      if (response.status === 201) {
        message.success("Model created successfully!");
      } else {
        message.error("Failed to create model. Please try again.");
      }
    } catch (error) {
      message.error("Failed to create model. Please try again.");
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
              placeholder="Enter the singular form of the model (e.g., Task)"
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
              placeholder="Enter the plural form of the model (e.g., Tasks)"
            />
          </Form.Item>
        </div>

        {/* Collapsible Fields */}
        <Collapse accordion>
          {fields.map((field, index) => (
            <Panel
              header={`${field.name} (${field.type})`}
              key={index}
              extra={
                // <Button
                //   onClick={(e) => {
                //     e.stopPropagation();
                //     handleFieldDelete(index);
                //   }}
                //   danger
                // >
                //   Delete
                // </Button>
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            type="dashed"
            onClick={() => handleFieldChange({ name: "", type: "string" })}
            style={{ marginTop: "20px" }}
            icon={<PlusOutlined />}
          >
            Add Field
          </Button>

          {/* Status Boolean Switch default false */}
          <Form.Item label="Status" style={{ width: "100%" }}>
            <Switch
              checkedChildren="Active"
              unCheckedChildren="Inactive"
              defaultChecked={false}
            />
          </Form.Item>

          <Popconfirm
            title="Are you sure you want to generate the model?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleFormSubmit()}
            onCancel={() => message.info("Model generation cancelled.")}
          >
            <Button
              type="primary"
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
          </Popconfirm>
        </div>
      </Form>
    </div>
  );
}
