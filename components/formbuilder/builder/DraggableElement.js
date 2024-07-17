// src/components/DraggableElement.js

import React from "react";
import { useDrag } from "react-dnd";

const DraggableElement = ({ element }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "element",
    item: { element },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className="draggable-element"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {element.label}
    </div>
  );
};

export default DraggableElement;
