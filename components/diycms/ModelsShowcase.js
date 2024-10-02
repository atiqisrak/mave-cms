import { Button, Spin } from "antd";
import router from "next/router";
import { useEffect, useState } from "react";
import instance from "../../axios";

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
        <div>
          {dynamicModels.map((model) => (
            <div
              key={model.id}
              style={{
                padding: "1em",
                border: "1px solid #ccc",
                borderRadius: "0.5em",
                marginBottom: "1em",
              }}
            >
              <h2>{model.model_name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
