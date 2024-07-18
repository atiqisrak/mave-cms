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
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        backgroundColor: "var(--theme)",
        color: "white",
        padding: "15px 0",
        borderRadius: "5px",
        marginBottom: "10px",
        textAlign: "center",
        fontSize: "1.3rem",
        fontWeight: "bold",
        transition: "opacity 0.2s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {element.icon}
      {element.label}
    </div>
  );
};

export default DraggableElement;
