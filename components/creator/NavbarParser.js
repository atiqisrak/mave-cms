import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import instance from "../../axios";

const NavbarParser = ({ item, editMode, onNavbarSelect }) => {
  const [navbars, setNavbars] = useState([]);

  useEffect(() => {
    const fetchNavbars = async () => {
      try {
        const response = await instance.get("/navbars");
        if (response.data) setNavbars(response.data);
      } catch {
        message.error("Error fetching navbars");
      }
    };
    if (editMode) fetchNavbars();
  }, [editMode]);

  const handleNavbarChange = (value) => {
    const selectedNavbar = navbars.find((navbar) => navbar.id === value);
    onNavbarSelect({ _mave: selectedNavbar, type: "navbar", id: value });
  };

  return editMode ? (
    <Select
      placeholder="Select navbar"
      onChange={handleNavbarChange}
      style={{ width: 200 }}
    >
      {navbars.map((navbar) => (
        <Select.Option key={navbar.id} value={navbar.id}>
          {navbar.title_en}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <div>
      <h3>{item?._mave?.title_en}</h3>
      <ul>
        {item?._mave?.menu?.menu_items?.map((menuItem) => (
          <li key={menuItem.id}>{menuItem.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarParser;
