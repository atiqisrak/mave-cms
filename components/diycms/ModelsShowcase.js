import { Button, message, Spin } from "antd";
import router from "next/router";
import { useEffect, useState } from "react";
import instance from "../../axios";
import { CopyOutlined } from "@ant-design/icons";

export default function ModelsShowcase() {
  const [loading, setLoading] = useState(false);
  const [dynamicModels, setDynamicModels] = useState([]);

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

  console.log("dynamicModels:", dynamicModels);

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #f6f8fc, #eef1f7)",
        padding: "2em",
        minHeight: "100vh",
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
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "1.5em",
            padding: "1em",
          }}
        >
          {dynamicModels?.map((model) => (
            <div
              key={model.id}
              style={{
                padding: "1.5em",
                border: "2px solid #00b894",
                borderRadius: "1em",
                backgroundColor: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease-in-out",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              className="model-card"
            >
              <div style={{ marginBottom: "1em" }}>
                <h2
                  style={{
                    fontSize: "1.5em",
                    color: "#2d3436",
                    fontWeight: "bold",
                  }}
                >
                  {model.model_name
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, function (str) {
                      return str.toUpperCase();
                    })}
                </h2>
                <div style={{ paddingLeft: "1em" }}>
                  {JSON.parse(model.fields).map((field, index) => (
                    <p
                      key={index}
                      style={{
                        margin: "0.25em 0",
                        fontSize: "1.1em",
                        color: "#636e72",
                      }}
                    >
                      {field.name}
                    </p>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <code
                  style={{
                    backgroundColor: "#f0f4f8",
                    padding: "0.5em 1em",
                    borderRadius: "0.5em",
                    fontSize: "0.9em",
                    backgroundColor: "#00b89420",
                  }}
                >
                  {model.api_route}
                </code>
                <Button
                  type="primary"
                  icon={<CopyOutlined />}
                  onClick={() => {
                    const url = `${process.env.NEXT_PUBLIC_DYNAMIC_MODEL_URL}${model.api_route}`;
                    navigator.clipboard.writeText(url);
                    message.success("Copied to clipboard!");
                  }}
                  style={{
                    backgroundColor: "#0984e3",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
