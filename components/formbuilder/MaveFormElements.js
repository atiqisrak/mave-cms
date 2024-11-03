import React, { useEffect, useState } from "react";
import instance from "../../axios";
import ElementsParser from "./ElementsParser";
import { Spin } from "antd";

const MaveFormElements = ({ formId, setDrawerVisible }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const fetchFormData = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`/form_builder/${formId}`);
      if (response.status === 200) {
        setFormData(response.data); // Store full form data
      } else {
        console.error("Error fetching elements:", response);
      }
    } catch (error) {
      console.error("Error fetching elements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formId) {
      fetchFormData();
    }
  }, [formId]);

  if (loading) return <Spin size="large" />;
  if (!formData) return <p>No form data available</p>;

  return (
    <div>
      <ElementsParser form={formData} setDrawerVisible={setDrawerVisible} />{" "}
      {/* Pass full form data */}
    </div>
  );
};

export default MaveFormElements;
