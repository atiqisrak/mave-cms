// components/FormInput.jsx

import React from "react";
import { Input } from "antd";

const FormInput = ({ value, onChange, placeholder }) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full"
    />
  );
};

export default FormInput;
