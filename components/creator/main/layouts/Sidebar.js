import React from "react";
import { Button } from "antd";

const Sidebar = ({ componentMap, onComponentSelect }) => {
  return (
    <div
      style={{ padding: "1rem", backgroundColor: "#f0f0f0", height: "100vh" }}
    >
      <h3>Available Components</h3>
      {Object.keys(componentMap).map((componentType, index) => (
        <Button
          key={index}
          style={{ marginBottom: "1rem", width: "100%" }}
          onClick={() => onComponentSelect(componentType)}
        >
          {componentType}
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;
