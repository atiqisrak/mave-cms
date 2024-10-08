// ModelsShowcase.js
import { Button, message, Popconfirm, Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import instance from "../../axios";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";

export default function ModelsShowcase() {
  const [loading, setLoading] = useState(false);
  const [dynamicModels, setDynamicModels] = useState([]);
  const router = useRouter();

  const fetchDynamicModels = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/generated-models");
      if (response.data) {
        setDynamicModels(response.data);
      } else {
        setDynamicModels([]);
      }
    } catch (error) {
      console.error("Error fetching dynamic models:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDynamicModels();
  }, []);

  const handleDeleteModel = async (modelId) => {
    setLoading(true);
    try {
      const response = await instance.delete(`/generated-models/${modelId}`);
      if (response.data) {
        message.success("Model deleted successfully!");
        fetchDynamicModels();
      }
    } catch (error) {
      console.error("Error deleting model:", error);
      message.error("Error deleting model. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="ViewContentContainer"
      style={{
        backgroundColor: "white",
      }}
    >
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1em",
            padding: "1em",
          }}
        >
          {dynamicModels.map((model) => (
            <div
              key={model.id}
              style={{
                padding: "1em",
                border: "1px solid #ccc",
                borderRadius: "0.5em",
                marginBottom: "1em",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <h2>{model.model_name}</h2>
                <p>
                  <strong>Status:</strong>{" "}
                  {model.status ? "Active" : "Inactive"}
                </p>
                <p>
                  <strong>Fields:</strong>
                </p>
                <ul>
                  {model.fields.map((field, index) => (
                    <li key={index}>
                      {field.name} ({field.type})
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1em",
                  marginTop: "1em",
                }}
              >
                <code
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "0.5em",
                    borderRadius: "0.5em",
                  }}
                >
                  {model.api_route}
                </code>
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => {
                    const url = `${process.env.NEXT_PUBLIC_DYNAMIC_MODEL_URL}${model.api_route}`;
                    navigator.clipboard.writeText(url);
                    message.success("Copied to clipboard!");
                  }}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    router.push(`/diy-cms/models/${model.model_name}`);
                  }}
                >
                  Manage Data
                </Button>
                <Popconfirm
                  title="Are you sure you want to delete this model?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={async () => {
                    handleDeleteModel(model.id);
                  }}
                >
                  <DeleteOutlined style={{ color: "red" }} />
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
