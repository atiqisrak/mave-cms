// components/doctoapi/ElementComponents/FooterComponent.js

import React, { useEffect } from "react";

const FooterComponent = ({ data, onDataChange }) => {
  useEffect(() => {
    const jsonData = {
      type: "footer",
      id: data.id,
    };
    onDataChange(jsonData);
  }, [data, onDataChange]);

  return null; // No UI needed
};

export default FooterComponent;
