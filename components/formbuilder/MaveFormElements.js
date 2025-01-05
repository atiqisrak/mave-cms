// components/formbuilder/MaveFormElements.jsx
import React, { useEffect, useState, useContext } from "react";
import { Spin } from "antd";
import instance from "../../axios";
import ElementsParser from "./ElementsParser";
import { FormBuilderContext } from "../../src/context/FormBuilderContext";

const MaveFormElements = ({ formId, setDrawerVisible }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const { reset } = useContext(FormBuilderContext);

  const fetchFormData = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`/form_builder/${formId}`);
      if (response.status === 200) {
        setFormData(response.data);
        reset(); // Clear form states in context if needed
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formId) {
      fetchFormData();
    }
  }, [formId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spin size="large" />
      </div>
    );
  }

  if (!formData) {
    return <p className="text-center text-gray-500">No form data available</p>;
  }

  return (
    <div className="mt-4">
      <ElementsParser form={formData} setDrawerVisible={setDrawerVisible} />
    </div>
  );
};

export default MaveFormElements;
