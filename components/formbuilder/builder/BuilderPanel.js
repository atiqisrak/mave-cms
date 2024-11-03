import React from "react";
import { useDrop } from "react-dnd";
import FormElement from "./FormElement";
import { Card } from "antd";

const BuilderPanel = ({ formElements, addElement, updateElement }) => {
  const [, drop] = useDrop({
    accept: "element",
    drop: (item) => addElement(item.element),
  });

  const handleUpdateElement = (updatedElement, index) => {
    const newElements = [...formElements];
    if (updatedElement === null) {
      // Remove element
      newElements.splice(index, 1);
    } else {
      // Update element
      newElements[index] = updatedElement;
    }
    updateElement(newElements);
  };

  const handleMoveElement = (fromIndex, toIndex) => {
    const newElements = [...formElements];
    const [movedElement] = newElements.splice(fromIndex, 1);
    newElements.splice(toIndex, 0, movedElement);
    updateElement(newElements);
  };

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
        <h3 className="text-3xl font-bold text-black mb-10">
          Form Builder Canvas
        </h3>
      </center>
      {formElements?.map((element, index) => (
        <FormElement
          key={element._id}
          element={element}
          index={index}
          totalElements={formElements.length}
          onUpdate={handleUpdateElement}
          onMove={handleMoveElement}
        />
      ))}
    </Card>
  );
};

export default BuilderPanel;
