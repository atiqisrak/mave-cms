// components/formbuilder/builder/BuilderPanel.js
import React from "react";
import { Card } from "antd";
import { useDrop } from "react-dnd";
import FormElement from "./FormElement";

const BuilderPanel = ({ formElements, addElement, updateElement }) => {
  // Accept BOTH new items ("element") and reorder items ("formElement")
  const [, dropRef] = useDrop({
    accept: ["element", "formElement"],
    drop: (item, monitor) => {
      if (monitor.getItemType() === "element") {
        // If it's a new element from ElementPanel
        addElement(item.element);
      }
      // If it's "formElement", the reorder logic happens in FormElement itself
    },
  });

  // Reorder existing elements in state
  const moveElement = (dragIndex, hoverIndex) => {
    const updated = [...formElements];
    const [dragged] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, dragged);
    updateElement(updated);
  };

  // Update or remove single element
  const handleUpdateElement = (updatedElement, index) => {
    const newElements = [...formElements];
    if (updatedElement === null) {
      newElements.splice(index, 1);
    } else {
      newElements[index] = updatedElement;
    }
    updateElement(newElements);
  };

  return (
    <Card
      ref={dropRef}
      className="border-2 border-dashed border-theme h-[60vh] overflow-auto p-4"
    >
      <h3 className="text-xl font-bold text-center mb-4">
        Form Builder Canvas
      </h3>
      {formElements?.map((element, index) => (
        <FormElement
          key={element.updated_on}
          element={element}
          index={index}
          moveElement={moveElement}
          onUpdateElement={handleUpdateElement}
        />
      ))}
    </Card>
  );
};

export default BuilderPanel;
