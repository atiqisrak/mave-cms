// components/PageBuilder/Modals/MenuSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, List, Button } from "antd";
import instance from "../../../axios";

const MenuSelectionModal = ({ isVisible, onClose, onSelectMenu }) => {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    if (isVisible) {
      const fetchMenus = async () => {
        try {
          const response = await instance.get("/menus");
          setMenuList(response.data);
        } catch (error) {
          console.error("Error fetching menus:", error);
        }
      };
      fetchMenus();
    }
  }, [isVisible]);

  return (
    <Modal
      title="Select Menu"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <List
        dataSource={menuList}
        renderItem={(item) => (
          <List.Item>
            <Button type="link" onClick={() => onSelectMenu(item)} block>
              {item.name}
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default MenuSelectionModal;
