// components/doctoapi/ElementComponents/MenuComponent.js

import React, { useEffect } from "react";

const MenuComponent = ({ data, onDataChange }) => {
  useEffect(() => {
    const jsonData = {
      type: "menu",
      id: data.id,
    };
    onDataChange(jsonData);
  }, [data, onDataChange]);

  return null; // No UI needed
};

export default MenuComponent;
