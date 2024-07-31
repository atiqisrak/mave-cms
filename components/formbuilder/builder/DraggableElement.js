import React from "react";
import { useDrag } from "react-dnd";
import { Card } from "antd";

const DraggableElement = ({ element }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "element",
    item: { element },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Card
      className="draggable-element"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        backgroundColor: "var(--theme)",
        color: "white",
        borderRadius: "5px",
        marginBottom: "10px",
        textAlign: "center",
        fontSize: "1.3rem",
        fontWeight: "bold",
        transition: "opacity 0.2s",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
        height: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {element.icon}
        {element.label}
      </div>
    </Card>
  );
};

export default DraggableElement;
