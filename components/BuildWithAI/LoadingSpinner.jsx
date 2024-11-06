// components/BuildWithAI/LoadingSpinner.jsx

import React from "react";
import { Spin } from "antd";

const LoadingSpinner = ({ loading, text }) => {
  if (!loading) return null;

  return (
    <div className="flex justify-center mt-4">
      <Spin tip={text || "Processing..."} />
    </div>
  );
};

export default LoadingSpinner;
