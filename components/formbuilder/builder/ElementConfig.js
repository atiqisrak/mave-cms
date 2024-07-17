// src/components/ElementConfig.js

import React, { useState } from "react";

const ElementConfig = ({ element, onUpdate }) => {
  const [label, setLabel] = useState(element.label);

  const handleUpdate = () => {
    onUpdate({ ...element, label });
  };

  return (
    <div className="element-config">
      <label>Label:</label>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={handleUpdate}
      />
      {/* Add more configuration options as needed */}
    </div>
  );
};

export default ElementConfig;
