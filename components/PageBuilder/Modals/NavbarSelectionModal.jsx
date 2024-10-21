// components/PageBuilder/Modals/NavbarSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, List, Button, Image, message } from "antd";
import instance from "../../../axios";

const NavbarSelectionModal = ({ isVisible, onClose, onSelectNavbar }) => {
  const [navbarList, setNavbarList] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <Modal
      title="Select Navbar"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <List
        loading={loading}
        grid={{ gutter: 16, column: 4 }}
        dataSource={navbarList}
        renderItem={(item) => (
          <List.Item>
            <Button
              type="link"
              onClick={() => onSelectNavbar(item)}
              block
              className="text-left"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${item.logo.file_path}`} // Assuming navbar has a logo
                alt={item.name}
                width={100}
                preview={false}
              />
              <p>{item.name}</p>
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default NavbarSelectionModal;
