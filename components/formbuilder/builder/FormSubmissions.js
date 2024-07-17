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
          {element.type === "dropdown" && (
            <select onChange={(e) => handleChange(element.id, e.target.value)}>
              <option value="">{element.label}</option>
              {element.options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {element.type === "date" && (
            <input
              type="date"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "file" && (
            <input
              type="file"
              onChange={(e) => handleChange(element.id, e.target.files[0])}
            />
          )}
          {element.type === "button" && (
            <button onClick={(e) => handleChange(element.id, e.target.value)}>
              {element.label}
            </button>
          )}
          {element.type === "heading" && <h1>{element.label}</h1>}
          {element.type === "number" && (
            <input
              type="number"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "email" && (
            <input
              type="email"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "phone" && (
            <input
              type="tel"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "password" && (
            <input
              type="password"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "textarea" && (
            <textarea
              onChange={(e) => handleChange(element.id, e.target.value)}
            ></textarea>
          )}
          {element.type === "time" && (
            <input
              type="time"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "url" && (
            <input
              type="url"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "color" && (
            <input
              type="color"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "range" && (
            <input
              type="range"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "hidden" && (
            <input
              type="hidden"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "reset" && (
            <input
              type="reset"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "submit" && (
            <input
              type="submit"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "search" && (
            <input
              type="search"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "tel" && (
            <input
              type="tel"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "week" && (
            <input
              type="week"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "month" && (
            <input
              type="month"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "datetime-local" && (
            <input
              type="datetime-local"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "image" && (
            <input
              type="image"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "select" && (
            <select onChange={(e) => handleChange(element.id, e.target.value)}>
              <option value="">{element.label}</option>
              {element.options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {element.type === "text" && (
            <input
              type="text"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "color" && (
            <input
              type="color"
              onChange={(e) => handleChange(element.id, e.target.value)}
            />
          )}
          {element.type === "range" && (
            <input
              type="range"
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
