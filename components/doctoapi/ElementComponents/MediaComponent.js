// components/doctoapi/ElementComponents/MediaComponent.js

import React, { useEffect } from "react";

const MediaComponent = ({ data, onDataChange }) => {
  useEffect(() => {
    const jsonData = {
      type: "media",
      id: data.id,
    };
    onDataChange(jsonData);
  }, [data, onDataChange]);

  return null; // No UI needed
};

export default MediaComponent;
