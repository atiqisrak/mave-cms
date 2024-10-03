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
            // gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
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
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{}}>
                <h2>{model.model_name}</h2>
                {JSON.parse(model.fields).map((field) => (
                  <p key={field.id}>{field.name}</p>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1em",
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
