// src/components/ElementPanel.js

import React from "react";
import DraggableElement from "./DraggableElement";

const elements = [
  { type: "text_input", label: "Text Input" },
  { type: "paragraph", label: "Paragraph" },
  { type: "checkbox", label: "Checkbox" },
  { type: "radio", label: "Radio Button" },
  { type: "dropdown", label: "Dropdown" },
  { type: "date", label: "Date" },
  { type: "file", label: "File Upload" },
  { type: "button", label: "Button" },
  { type: "heading", label: "Heading" },
  { type: "number", label: "Number" },
  { type: "email", label: "Email" },
  { type: "phone", label: "Phone" },
  { type: "password", label: "Password" },
  { type: "textarea", label: "Textarea" },
  { type: "time", label: "Time" },
  { type: "url", label: "URL" },
  { type: "color", label: "Color" },
  { type: "range", label: "Range" },
  { type: "hidden", label: "Hidden" },
  { type: "reset", label: "Reset" },
  { type: "submit", label: "Submit" },
  { type: "search", label: "Search" },
  { type: "tel", label: "Tel" },
  { type: "week", label: "Week" },
  { type: "month", label: "Month" },
  { type: "datetime-local", label: "Datetime Local" },
  { type: "image", label: "Image" },
  { type: "button", label: "Button" },
  { type: "radio", label: "Radio" },
  { type: "checkbox", label: "Checkbox" },
  { type: "select", label: "Select" },
  { type: "file", label: "File" },
  { type: "text", label: "Text" },
  { type: "password", label: "Password" },
  { type: "email", label: "Email" },
  { type: "number", label: "Number" },
  { type: "tel", label: "Tel" },
  { type: "url", label: "URL" },
  { type: "search", label: "Search" },
  { type: "date", label: "Date" },
  { type: "time", label: "Time" },
  { type: "datetime-local", label: "Datetime Local" },
  { type: "month", label: "Month" },
  { type: "week", label: "Week" },
  { type: "color", label: "Color" },
  { type: "range", label: "Range" },
];

const ElementPanel = () => {
  return (
    <div className="element-panel">
      <h3>Elements</h3>
      {elements.map((element, index) => (
        <DraggableElement key={index} element={element} />
      ))}
    </div>
  );
};

export default ElementPanel;
