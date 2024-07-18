// src/components/FormElement.js

import React from "react";
import ElementConfig from "./ElementConfig";
import { Input } from "antd";
import RichTextEditor from "../../RichTextEditor";

const FormElement = ({ element, onUpdate }) => {
  return (
    <div
      className="form-element"
      style={{
        padding: "1rem",
        borderRadius: "5px",
        border: "1px solid var(--theme)",
        marginBottom: "10px",
        // backgroundColor: "var(--theme-transparent)",
      }}
    >
      <ElementConfig element={element} onUpdate={onUpdate} />
      {element.type === "text_input" && <Input type="text" />}
      {element.type === "paragraph" && (
        <RichTextEditor
          editMode={true}
          onChange={(value) => console.log(value)}
        />
      )}
      {element.type === "checkbox" && <input type="checkbox" />}
      {element.type === "radio" && <input type="radio" />}
    </div>
  );
};

export default FormElement;
