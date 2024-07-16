// src/components/MaveFormElements.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import instance from "../../axios";

const MaveFormElements = ({ formId }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await instance.get(`/mave_forms/${formId}/elements`);
        setElements(response.data);
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    };

    if (formId) {
      fetchElements();
    }
  }, [formId]);

  return (
    <div>
      <h2>Form Elements</h2>
      <ul>
        {elements.map((element) => (
          <li key={element.id}>
            <strong>ID:</strong> {element.id}
            <br />
            <strong>Element ID:</strong> {element.mave_element_id}
            <br />
            <strong>Type:</strong> {element.mave_type}
            <br />
            <strong>Label:</strong> {element.mave_label}
            <br />
            <strong>Read Only:</strong> {element.mave_read_only ? "Yes" : "No"}
            <br />
            <strong>Placeholder:</strong> {element.mave_placeholder}
            <br />
            <strong>Required:</strong> {element.mave_required ? "Yes" : "No"}
            <br />
            <strong>Default Value:</strong> {element.mave_default_value}
            <br />
            <strong>Options:</strong>{" "}
            {element.mave_options
              ? JSON.stringify(element.mave_options)
              : "N/A"}
            <br />
            <strong>Conditional Logic:</strong>{" "}
            {element.mave_conditional_logic
              ? JSON.stringify(element.mave_conditional_logic)
              : "N/A"}
            <br />
            <strong>Validation Rules:</strong> {element.mave_validation_rules}
            <br />
            <strong>Help Text:</strong> {element.mave_help_text}
            <br />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaveFormElements;
