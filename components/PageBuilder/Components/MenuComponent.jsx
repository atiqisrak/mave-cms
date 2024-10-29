// components/PageBuilder/Components/MenuComponent.jsx

import React, { useState } from "react";
import { Button, Menu, Modal, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowRightOutlined,
  CodepenCircleOutlined,
  DragOutlined,
  CheckCircleOutlined,
  ExportOutlined,
} from "@ant-design/icons";
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
    deleteComponent();
  };

  const renderMenuItems = (menuItems) => {
    return menuItems?.map((item) => {
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
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">Menu Component</h3>
        <div>
          {menuData && (
            <Button
              icon={<ExportOutlined />}
              onClick={() => setIsModalVisible(true)}
              className="mavebutton"
            >
              Change
            </Button>
          )}
          <Popconfirm
            title="Are you sure you want to delete this component?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} className="mavecancelbutton" />
          </Popconfirm>
        </div>
      </div>
      {menuData ? (
        <div className="flex gap-6 items-center">
          <h2 className="text-xl font-semibold text-theme">
            Selected Menu: {menuData.name}
          </h2>
          <ArrowRightOutlined />
          <Menu mode="horizontal" className="flex-grow">
            {renderMenuItems(menuData?.menu_items)}
          </Menu>
        </div>
      ) : (
        <Button
          icon={<CheckCircleOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="mavebutton"
        >
          Choose
        </Button>
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
