// components/GenerateButton.jsx

import React from "react";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

const GenerateButton = ({ onClick, loading }) => {
  return (
    <Button
      icon={<SendOutlined />}
      onClick={onClick}
      loading={loading}
      className="mavebutton"
    >
      Generate
    </Button>
  );
};

export default GenerateButton;
