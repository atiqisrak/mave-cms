// src/components/Form.js

import React, { useState } from "react";

const FormSubmissions = ({ formElements }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {formElements.map((element) => (
        <div key={element.id} className="form-element">
          <label>{element.label}</label>
          {element.type === "text_input" && (
            <input
              type="text"
              placeholder={element.label}
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "checkbox" && (
            <input
              type="checkbox"
              onChange={(e) => handleChange(element.id, e.target.checked)}
            />
          )}
          {element.type === "radio" && (
            <input
              type="radio"
              name={element.id}
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormSubmissions;
