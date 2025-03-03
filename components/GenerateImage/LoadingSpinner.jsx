// components/LoadingSpinner.jsx

import React from "react";
import { Spin } from "antd";
import { CloudSyncOutlined } from "@ant-design/icons";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpinner;
