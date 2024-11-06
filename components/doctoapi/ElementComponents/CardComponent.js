// components/doctoapi/ElementComponents/CardComponent.js

import React, { useEffect } from "react";

const CardComponent = ({ data, onDataChange }) => {
  useEffect(() => {
    const jsonData = {
      type: "card",
      id: data.id,
    };
    onDataChange(jsonData);
  }, [data, onDataChange]);

  return null; // No UI needed
};

export default CardComponent;
