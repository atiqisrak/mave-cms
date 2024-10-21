// components/PageBuilder/Modals/NavbarSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, List, message } from "antd";
import instance from "../../../axios";
import Image from "next/image";
import { Menu } from "antd";

const NavbarSelectionModal = ({ isVisible, onClose, onSelectNavbar }) => {
  const [navbarList, setNavbarList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNavbarId, setSelectedNavbarId] = useState(null);

  useEffect(() => {
    if (isVisible) {
      const fetchNavbars = async () => {
        setLoading(true);
        try {
          const response = await instance.get("/navbars"); // Replace with your actual API endpoint
          setNavbarList(response.data);
        } catch (error) {
          message.error("Failed to fetch navbars");
        }
        setLoading(false);
      };
      fetchNavbars();
    }
  }, [isVisible]);

  // Helper function to recursively render menu items
  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => {
      if (item.all_children && item.all_children.length > 0) {
        return (
          <Menu.SubMenu key={item.id} title={item.title}>
            {renderMenuItems(item.all_children)}
          </Menu.SubMenu>
        );
      } else {
        return <Menu.Item key={item.id}>{item.title}</Menu.Item>;
      }
    });
  };

  // Handle navbar selection
  const handleNavbarSelect = (item) => {
    setSelectedNavbarId(item.id);
    onSelectNavbar(item); // Pass the selected navbar back to the parent component
    onClose(); // Close the modal after selection
  };

  return (
    <Modal
      title="Select Navbar"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
      bodyStyle={{ padding: "20px" }}
    >
      <List
        loading={loading}
        dataSource={navbarList}
        renderItem={(item) => (
          <List.Item>
            <div
              className="relative w-full cursor-pointer border rounded-md overflow-hidden"
              onClick={() => handleNavbarSelect(item)}
            >
              {/* Navbar Preview */}
              <div className="flex items-center p-4 bg-white">
                {/* Logo on the Left */}
                {item.logo?.file_path ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${item.logo.file_path}`}
                    alt={`${item.menu.name} Logo`}
                    width={80}
                    height={80}
                    objectFit="cover"
                    className="rounded-full mr-4"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-white text-lg">No Logo</span>
                  </div>
                )}

                {/* Menu Items on the Right */}
                <div className="flex-grow">
                  {item.menu?.menu_items && item.menu.menu_items.length > 0 ? (
                    <Menu mode="horizontal">
                      {renderMenuItems(item.menu.menu_items)}
                    </Menu>
                  ) : (
                    <span className="text-gray-500">No Menu Items</span>
                  )}
                </div>
              </div>

              {/* Selected Overlay */}
              {selectedNavbarId === item.id && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Selected</span>
                </div>
              )}
            </div>
          </List.Item>
        )}
        // Remove grid to have a vertical list
        grid={false}
      />
    </Modal>
  );
};

export default NavbarSelectionModal;
