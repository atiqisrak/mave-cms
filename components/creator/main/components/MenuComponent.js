import React from "react";
import { Menu } from "antd";

const MenuComponent = ({ data, editMode, onMenuChange }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {editMode ? (
        <input
          type="text"
          value={data.menuItems}
          onChange={(e) => onMenuChange(e.target.value.split(","))}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
          }}
          placeholder="Enter comma-separated menu items"
        />
      ) : (
        <Menu mode="horizontal">
          {data.menuItems.map((item, index) => (
            <Menu.Item key={index}>{item}</Menu.Item>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default MenuComponent;
