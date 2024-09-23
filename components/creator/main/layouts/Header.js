import React from "react";
import { Button } from "antd";

const Header = ({ title, onSave }) => {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#1890ff",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2>{title}</h2>
      <Button type="primary" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default Header;
