// components/doctoapi/ElementComponents/SliderComponent.js

import React, { useEffect } from "react";

const SliderComponent = ({ data, onDataChange }) => {
  useEffect(() => {
    const jsonData = {
      type: "slider",
      id: data.id,
    };
    onDataChange(jsonData);
  }, [data, onDataChange]);

  return null; // No UI needed
};

export default SliderComponent;
