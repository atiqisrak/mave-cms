// components/PageBuilder/Components/NavbarComponent.jsx

import React, { useState } from "react";
import { Button, Modal, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import NavbarSelectionModal from "../Modals/NavbarSelectionModal";

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

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3>Navbar Component</h3>
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
          <Paragraph strong>Name: {navbarData.name}</Paragraph>
          {/* You can display more details about the navbar if available */}
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
