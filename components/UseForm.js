import React, { useState } from "react";
import instance from "../axios";

const useForm = (initialValues) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    // Add the form data to the FormData object
    formData.append("title_en", form.title_en);
    formData.append("title_bn", form.title_bn);
    formData.append("description_en", form.description_en);
    formData.append("description_bn", form.description_bn);
    formData.append("submit_direction", form.submit_direction);
    formData.append("status", form.status);
    formData.append("fields", JSON.stringify(form.fields));
  };

  return {
    form,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
