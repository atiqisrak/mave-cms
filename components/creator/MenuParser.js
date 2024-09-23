import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import instance from "../../axios";

const MenuParser = ({ item, editMode, onMenuSelect }) => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await instance.get("/menus");
        if (response.data) setMenus(response.data);
      } catch {
        message.error("Error fetching menus");
      }
    };
    if (editMode) fetchMenus();
  }, [editMode]);

  const handleMenuChange = (value) => {
    const selectedMenu = menus.find((menu) => menu.id === value);
    onMenuSelect({ _mave: selectedMenu, type: "menu", id: value });
  };

  return editMode ? (
    <Select
      placeholder="Select menu"
      onChange={handleMenuChange}
      style={{ width: 200 }}
    >
      {menus.map((menu) => (
        <Select.Option key={menu.id} value={menu.id}>
          {menu.title_en}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <ul>
      {item?._mave?.menu_items?.map((menuItem) => (
        <li key={menuItem.id}>{menuItem.title}</li>
      ))}
    </ul>
  );
};

export default MenuParser;
