// src/components/BuilderPanel.js

import React from "react";
import { useDrop } from "react-dnd";
import FormElement from "./FormElement";

const BuilderPanel = ({ formElements, addElement }) => {
  const [, drop] = useDrop({
    accept: "element",
    drop: (item) => addElement(item.element),
  });

  return (
    <div className="builder-panel" ref={drop}>
      <h3>Form Builder</h3>
      {formElements.map((element, index) => (
        <FormElement key={index} element={element} />
      ))}
    </div>
  );
};

export default BuilderPanel;
