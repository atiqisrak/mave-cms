import React from "react";
import DraggableElement from "./DraggableElement";
import {
  AlignLeftOutlined,
  CheckSquareOutlined,
  EditOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Card } from "antd";

const elements = [
  { type: "input", label: "Input", icon: <EditOutlined /> },
  { type: "textarea", label: "Textarea", icon: <AlignLeftOutlined /> },
  { type: "checkbox", label: "Checkbox", icon: <CheckSquareOutlined /> },
  { type: "radio", label: "Radio Button", icon: <SwapOutlined /> },
  { type: "select", label: "Select", icon: <SwapOutlined /> },
  { type: "submit", label: "Submit", icon: <SwapOutlined /> },
];

const ElementPanel = () => {
  return (
    <Card
      className="element-panel"
      style={{
        backgroundColor: "var(--theme-transparent)",
        padding: "20px",
        borderRadius: "5px",
        height: "85vh",
        borderLeft: "2px solid var(--theme)",
        borderTop: "2px solid var(--theme)",
      }}
    >
      <center>
        <h3
          style={{
            color: "var(--theme)",
            fontSize: "1.5rem",
            marginBottom: "20px",
          }}
        >
          Elements
        </h3>
      </center>
      {elements.map((element, index) => (
        <DraggableElement key={index} element={element} />
      ))}
    </Card>
  );
};

export default ElementPanel;
