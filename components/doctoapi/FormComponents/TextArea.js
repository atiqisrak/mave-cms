// components/doctoapi/FormComponents/TextArea.js

import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

const CustomTextArea = ({ onChange, ...props }) => {
  return <TextArea onChange={(e) => onChange(e.target.value)} {...props} />;
};

export default CustomTextArea;
