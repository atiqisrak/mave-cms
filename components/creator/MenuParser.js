import { Select, message } from "antd";
import React, { useState, useEffect } from "react";
import instance from "../../axios";

const MenuParser = ({ item, editMode, onMenuSelect }) => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await instance("/menus");
      if (response.data) {
        setMenus(response.data);
        // console.log("Menus: ", response.data);
        message.success("Menus fetched successfully");
        setLoading(false);
      } else {
        console.error("Error fetching media assets:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching media assets:", error);
    }
  };

  useEffect(() => {
    if (editMode) {
      fetchMenus();
    }
  }, [editMode]);

  // if (editMode) {
  //   fetchMenus();
  // }

  // const handleMenuChange = (value) => {
  //   setSelectedMenu(value);
  //   onMenuSelect(value);
  // };

  const handleMenuChange = (value) => {
    const selectedMenu = menus.find((menu) => menu.id === value);
    setSelectedMenu(value);
    onMenuSelect({ _mave: selectedMenu, type: "menu", id: value });
  };

  return (
    <>
      <div>
        {editMode ? (
          <div className="menu">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a menu"
              optionFilterProp="children"
              onChange={handleMenuChange}
            >
              {menus?.map((menu) => (
                <Option value={menu?.id}>{menu?.name}</Option>
              ))}
            </Select>
          </div>
        ) : (
          <div
            style={{
              margin: "2em 1em",
              // border: "2px solid var(--theme)",
              borderRadius: 10,
              padding: "2em 1em",
            }}
          >
            {item?._mave
              ? item._mave.menu_items?.map((menuItem) => (
                <div key={menuItem.id}>
                  <p>{menuItem.title}</p>
                </div>
              ))
              : item?.menu_items?.map((menuItem) => (
                <div key={menuItem.id}>
                  <p>{menuItem.title}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MenuParser;
