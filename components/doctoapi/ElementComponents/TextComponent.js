// components/doctoapi/ElementComponents/TextComponent.js

import React, { useEffect } from "react";

const TextComponent = ({ data, onDataChange }) => {
  useEffect(() => {
    const jsonData = {
      type: "title",
      value: data.value,
    };
    onDataChange(jsonData);
  }, [data, onDataChange]);

  return null; // No UI needed
};

export default TextComponent;
