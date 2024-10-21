// components/PageBuilder/Components/NavbarComponent.jsx

import React, { useState } from "react";
import { Button, Menu, Modal, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import NavbarSelectionModal from "../Modals/NavbarSelectionModal";
import Image from "next/image";

const { Paragraph } = Typography;

const NavbarComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [navbarData, setNavbarData] = useState(component._mave);

  const handleSelectNavbar = (selectedNavbar) => {
    updateComponent({
      ...component,
      _mave: selectedNavbar,
      id: selectedNavbar.id,
    });
    setNavbarData(selectedNavbar);
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this component?",
      onOk: deleteComponent,
    });
  };

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

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">Navbar Component</h3>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mr-2"
          />
          <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
        </div>
      </div>
      {navbarData ? (
        <div className="p-4 border rounded-md">
          <Paragraph strong className="text-theme">
            Name: {navbarData.menu?.name}
          </Paragraph>
          <div className="navbar-preview flex items-center">
            <Image
              src={
                process.env.NEXT_PUBLIC_MEDIA_URL +
                "/" +
                navbarData?.logo?.file_path
              }
              width={60}
              height={50}
              alt="Navbar Logo"
              objectFit="cover"
            />
            <Menu mode="horizontal" className="flex-grow">
              {renderMenuItems(navbarData?.menu?.menu_items)}
            </Menu>
          </div>
        </div>
      ) : (
        <Paragraph>No navbar selected.</Paragraph>
      )}
      <NavbarSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectNavbar={handleSelectNavbar}
      />
    </div>
  );
};

export default NavbarComponent;
