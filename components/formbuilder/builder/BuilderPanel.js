import React from "react";
import { useDrop } from "react-dnd";
import FormElement from "./FormElement";
import { Card } from "antd";

const BuilderPanel = ({ formElements, addElement, updateElement }) => {
  const [, drop] = useDrop({
    accept: "element",
    drop: (item) => addElement(item.element),
  });

  return (
    <Card
      className="builder-panel"
      ref={drop}
      style={{
        padding: "1rem",
        borderRadius: "5px",
        minHeight: "50vh",
        border: "2px dashed var(--themes)",
      }}
    >
      <center>
        <h3
          style={{
            color: "var(--themes)",
            fontSize: "1.5rem",
            marginBottom: "20px",
          }}
        >
          Form Builder
        </h3>
      </center>
      {formElements.map((element, index) => (
        <FormElement key={index} element={element} onUpdate={updateElement} />
      ))}
    </Card>
  );
};

export default BuilderPanel;
