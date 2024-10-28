// pages/custom-models/[id].jsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Table, Spin, message } from "antd";
import CustomModelTable from "../../components/CustomModels/CustomModelTable";
import instance from "../../axios";

const CustomModelPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchModel = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/generated-models");
      // console.log("Response", response.data);

      // Convert id to number if necessary
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;

      // Find the model with the matching id
      const foundModel = response.data.find((m) => m.id === numericId);

      if (foundModel) {
        setModel(foundModel);
        // console.log("Model", foundModel);
      } else {
        message.error("Model not found");
        // console.warn(`Model with id ${id} not found`);
      }
    } catch (error) {
      message.error("Failed to fetch model");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady && id) {
      fetchModel();
    }
  }, [router.isReady, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!model) {
    return <div className="text-center mt-10">Model not found</div>;
  }

  return (
    <div className="mavecontainer p-4">
      <h1 className="text-4xl font-bold text-center text-theme mb-6">
        Manage{" "}
        {model.model_name.charAt(0).toUpperCase() + model.model_name.slice(1)}
      </h1>
      <CustomModelTable model={model} />
    </div>
  );
};

export default CustomModelPage;
