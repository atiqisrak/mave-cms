// components/PageBuilder/Modals/MenuSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, List, message } from "antd";
import instance from "../../../axios";
import { Menu } from "antd";
import Image from "next/image";

const { SubMenu, Item } = Menu;

const MenuSelectionModal = ({ isVisible, onClose, onSelectMenu }) => {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  useEffect(() => {
    if (isVisible) {
      const fetchMenus = async () => {
        setLoading(true);
        try {
          const response = await instance.get("/menus");
          setMenuList(response.data);
        } catch (error) {
          message.error("Failed to fetch menus.");
        }
        setLoading(false);
      };
      fetchMenus();
    }
  }, [isVisible]);

  // Helper function to recursively render menu items
  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => {
      if (item.all_children && item.all_children.length > 0) {
        return (
          <SubMenu key={item.id} title={item.title}>
            {renderMenuItems(item.all_children)}
          </SubMenu>
        );
      } else {
        return <Item key={item.id}>{item.title}</Item>;
      }
    });
  };

  // Handle menu selection
  const handleMenuSelect = (item) => {
    setSelectedMenuId(item.id);
    onSelectMenu(item); // Pass the selected menu back to the parent component
    onClose(); // Close the modal after selection
  };

  return (
    <Modal
      title="Select Menu"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
      bodyStyle={{ padding: "20px" }}
    >
      <List
        loading={loading}
        dataSource={menuList}
        renderItem={(item) => (
          <List.Item>
            <div
              className="relative w-full cursor-pointer border rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleMenuSelect(item)}
            >
              {/* Menu Preview */}
              <div className="flex items-center p-4 bg-white">
                {/* Menu Name on the Left */}
                <div className="w-1/4">
                  <span className="font-semibold text-lg">{item.name}</span>
                </div>

                {/* Menu Items on the Right */}
                <div className="w-3/4">
                  {item.menu_items && item.menu_items.length > 0 ? (
                    <Menu mode="horizontal" selectable={false}>
                      {renderMenuItems(item.menu_items)}
                    </Menu>
                  ) : (
                    <span className="text-gray-500">No Menu Items</span>
                  )}
                </div>
              </div>

              {/* Selected Overlay */}
              {selectedMenuId === item.id && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Selected</span>
                </div>
              )}
            </div>
          </List.Item>
        )}
        // Ensure the list is vertically stacked
        grid={false}
      />
    </Modal>
  );
};

export default MenuSelectionModal;
