// src/components/ElementPanel.js

import React from "react";
import DraggableElement from "./DraggableElement";
import {
  AlignLeftOutlined,
  CheckSquareOutlined,
  EditOutlined,
  SwapOutlined,
} from "@ant-design/icons";

const elements = [
  { type: "text_input", label: "Text Input", icon: <EditOutlined /> },
  { type: "paragraph", label: "Paragraph", icon: <AlignLeftOutlined /> },
  { type: "checkbox", label: "Checkbox", icon: <CheckSquareOutlined /> },
  { type: "radio", label: "Radio Button", icon: <SwapOutlined /> },
];

const ElementPanel = () => {
  return (
    <div
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
      {elements?.map((element, index) => (
        <DraggableElement key={index} element={element} />
      ))}
    </div>
  );
};

export default ElementPanel;
