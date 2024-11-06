// CustomModelData.js
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Collapse,
  Divider,
  Form,
  Input,
} from "antd";
import instance from "../../axios"; // Existing Axios instance
import ModelDataForm from "./ModelDataForm";
import { PlusOutlined } from "@ant-design/icons";

export default function CustomModelData({ model }) {
  const [customModelData, setCustomModelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createModeVisible, setCreateModeVisible] = useState(false);

  // Function to fetch custom model data using flyURL
  const fetchCustomModelData = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`${model?.api_route}`, {
        flyURL: process.env.NEXT_PUBLIC_DYNAMIC_MODEL_URL,
      });
      const data = response.data;
      if (data) {
        console.log("Custom Model Data", data);
        setCustomModelData(data);
      } else {
        console.log("No custom model data found");
      }
    } catch (error) {
      console.error("Error fetching custom model data", error);
      message.error("Error fetching custom model data");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch custom models using default baseURL
  const fetchCustomModels = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/generated-models"); // Uses default baseURL
      const data = response.data;
      if (data) {
        console.log("Custom Models", data);
      } else {
        console.log("No custom models found");
      }
    } catch (error) {
      console.error("Error fetching custom models", error);
      message.error("Error fetching custom models");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomModelData();
    fetchCustomModels();
  }, [model?.api]);

  return (
    <div>
      {/* Your component's UI goes here */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        customModelData?.length > 0 && (
          <>
            <h1>Custom Model Data</h1>
            <Table dataSource={customModelData} />
          </>
        )
      )}

      <Button
        icon={<PlusOutlined />}
        className="mavebutton"
        onClick={() => setCreateModeVisible(true)}
      >
        Create {model?.model_name}
      </Button>

      <ModelDataForm
        createModeVisible={createModeVisible}
        setCreateModeVisible={setCreateModeVisible}
        fields={model?.fields}
        customModelData={customModelData}
        setCustomModelData={setCustomModelData}
      />
    </div>
  );
}
