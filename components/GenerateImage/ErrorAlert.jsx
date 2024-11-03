// components/ErrorAlert.jsx

import React from "react";
import { Alert } from "antd";

const ErrorAlert = ({ message }) => {
  return (
    <Alert
      message={message}
      type="error"
      showIcon
      className="mb-4 w-full sm:w-2/3 lg:w-1/2"
    />
  );
};

export default ErrorAlert;
