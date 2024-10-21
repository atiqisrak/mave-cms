// components/PageBuilder/Components/MenuComponent.jsx

import React, { useState } from "react";
import { Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MenuSelectionModal from "../Modals/MenuSelectionModal";

const MenuComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [menuData, setMenuData] = useState(component._mave);

  const handleSelectMenu = (selectedMenu) => {
    updateComponent({ ...component, _mave: selectedMenu, id: selectedMenu.id });
    setMenuData(selectedMenu);
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this component?",
      onOk: deleteComponent,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3>Menu Component</h3>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mr-2"
          />
          <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
        </div>
      </div>
      {menuData ? (
        <div>
          <p>Selected Menu: {menuData.name}</p>
        </div>
      ) : (
        <p>No menu selected.</p>
      )}
      <MenuSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectMenu={handleSelectMenu}
      />
    </div>
  );
};

export default MenuComponent;
