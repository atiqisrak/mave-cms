// pages/diy-cms/models/[modelName]/index.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Spin, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
import instance from "../../../../axios";
import ModelCreator from "../../../../components/diycms/ModelCreator";
import { snakeCase } from "lodash";

export default function EditModel() {
  const router = useRouter();
  const { modelName } = router.query;
  const [loading, setLoading] = useState(true);
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    if (modelName) {
      fetchModelData();
    }
  }, [modelName]);

  const fetchModelData = async () => {
    try {
      const response = await instance.get("/generated-models");
      if (response.data) {
        const formattedModelName = snakeCase(modelName.toLowerCase());
        const existingModel = response.data.find(
          (model) => model.model_name.toLowerCase() === formattedModelName
        );
        if (existingModel) {
          setModelData(existingModel);
        } else {
          message.error("Model not found.");
          router.push("/diy-cms");
        }
      }
    } catch (error) {
      console.error("Error fetching model data:", error);
      message.error("Failed to fetch model data.");
      router.push("/diy-cms");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mavecontainer">
      <Breadcrumb
        style={{
          marginBottom: "1em",
          cursor: "pointer",
        }}
      >
        <Breadcrumb.Item
          onClick={() => {
            router.push("/");
          }}
        >
          <HomeFilled />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => {
            router.push("/diy-cms");
          }}
        >
          DIY CMS
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Model</Breadcrumb.Item>
      </Breadcrumb>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Spin size="large" />
        </div>
      ) : modelData ? (
        <ModelCreator editMode={true} existingModel={modelData} />
      ) : (
        <p>Model not found.</p>
      )}
    </div>
  );
}
