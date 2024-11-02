// components/GenerateButton.jsx

import React from "react";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

const GenerateButton = ({ onClick, loading }) => {
  return (
    <Button
      type="primary"
      icon={<SendOutlined />}
      onClick={onClick}
      loading={loading}
      className="w-full sm:w-auto"
    >
      Generate
    </Button>
  );
};

export default GenerateButton;
