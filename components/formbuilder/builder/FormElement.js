// src/components/FormElement.js

import React from "react";
import ElementConfig from "./ElementConfig";

const FormElement = ({ element, onUpdate }) => {
  return (
    <div className="form-element">
      <ElementConfig element={element} onUpdate={onUpdate} />
      <label>{element.label}</label>
      {/* Render element based on type */}
      {element.type === "text_input" && <input type="text" />}
      {element.type === "paragraph" && <p>{element.label}</p>}
      {element.type === "checkbox" && <input type="checkbox" />}
      {element.type === "radio" && <input type="radio" />}
      {element.type === "dropdown" && (
        <select>
          <option value="">{element.label}</option>
        </select>
      )}
      {element.type === "date" && <input type="date" />}
      {element.type === "file" && <input type="file" />}
      {element.type === "button" && <button>{element.label}</button>}
      {element.type === "heading" && <h1>{element.label}</h1>}
      {element.type === "number" && <input type="number" />}
      {element.type === "email" && <input type="email" />}
      {element.type === "phone" && <input type="tel" />}
      {element.type === "password" && <input type="password" />}
      {element.type === "textarea" && <textarea></textarea>}
      {element.type === "time" && <input type="time" />}
      {element.type === "url" && <input type="url" />}
      {element.type === "color" && <input type="color" />}
      {element.type === "range" && <input type="range" />}
      {element.type === "hidden" && <input type="hidden" />}
      {element.type === "reset" && <input type="reset" />}
      {element.type === "submit" && <input type="submit" />}
      {element.type === "search" && <input type="search" />}
      {element.type === "tel" && <input type="tel" />}
      {element.type === "week" && <input type="week" />}
      {element.type === "month" && <input type="month" />}
      {element.type === "datetime-local" && <input type="datetime-local" />}
      {element.type === "image" && <input type="image" />}
      {element.type === "select" && <select></select>}
      {element.type === "text" && <input type="text" />}
      {element.type === "color" && <input type="color" />}
      {element.type === "range" && <input type="range" />}
    </div>
  );
};

export default FormElement;
