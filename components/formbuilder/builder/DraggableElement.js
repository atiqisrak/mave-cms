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
      ref={drag}
      className={`p-4 mb-2 text-black font-bold text-lg flex items-center gap-4 rounded transition-opacity duration-200 ${
        isDragging ? "opacity-50" : "opacity-100"
      } bg-theme cursor-grab`}
    >
      <div className="flex items-center gap-4 pl-10">
        {element.icon}
        {element.label}
      </div>
    </div>
  );
};

export default DraggableElement;
