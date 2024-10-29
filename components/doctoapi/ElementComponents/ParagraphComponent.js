// components/doctoapi/ElementComponents/ParagraphComponent.js

import React, { useEffect } from "react";

const ParagraphComponent = ({ data, onDataChange }) => {
  useEffect(() => {
    const jsonData = {
      type: "description",
      value: data.value,
    };
    onDataChange(jsonData);
  }, [data, onDataChange]);

  return null; // No UI needed
};

export default ParagraphComponent;
