// components/Navbars/AddNavbarForm.js

import React, { useState } from "react";
import { Row, Col, Input, Select, Button, message } from "antd";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import instance from "../../axios";
import MediaModal from "./MediaModal";

const AddNavbarForm = ({ menus, media, onCancel, fetchNavbars }) => {
  const [newNavbarTitleEn, setNewNavbarTitleEn] = useState("");
  const [newNavbarTitleBn, setNewNavbarTitleBn] = useState("");
  const [newLogoId, setNewLogoId] = useState(null);
  const [newMenuId, setNewMenuId] = useState(null);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);

  const handleAddNavbar = async () => {
    if (!newNavbarTitleEn || !newLogoId || !newMenuId) {
      message.error("Please fill in all required fields");
      return;
    }
    try {
      const newNavbar = {
        title_en: newNavbarTitleEn,
        title_bn: newNavbarTitleBn,
        logo_id: newLogoId,
        menu_id: newMenuId,
      };
      const response = await instance.post("/navbars", newNavbar);
      if (response.status === 201) {
        message.success("Navbar created successfully");
        fetchNavbars();
        onCancel();
      } else {
        message.error("Error creating navbar");
      }
    } catch (error) {
      message.error("Error creating navbar");
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Input
            placeholder="Navbar Title (English)"
            value={newNavbarTitleEn}
            onChange={(e) => setNewNavbarTitleEn(e.target.value)}
          />
        </Col>
        <Col xs={24} md={12}>
          <Input
            placeholder="Navbar Title (Bangla)"
            value={newNavbarTitleBn}
            onChange={(e) => setNewNavbarTitleBn(e.target.value)}
          />
        </Col>
        <Col xs={24} md={12}>
          <Button onClick={() => setMediaModalVisible(true)}>
            {newLogoId ? "Change Logo" : "Select Logo"}
          </Button>
        </Col>
        <Col xs={24} md={12}>
          <Select
            showSearch
            placeholder="Select a Menu"
            optionFilterProp="children"
            onChange={(value) => setNewMenuId(value)}
            className="w-full"
            allowClear
          >
            {menus.map((menu) => (
              <Select.Option key={menu.id} value={menu.id}>
                {menu.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <div className="flex justify-end mt-4 gap-4">
        <Button
          icon={<CloseCircleOutlined />}
          onClick={onCancel}
          className="bg-gray-500 border-2 border-gray-600 py-5 font-bold text-lg text-white"
        >
          Cancel
        </Button>
        <Button
          icon={<PlusCircleOutlined />}
          onClick={handleAddNavbar}
          className="mavebutton"
        >
          Create
        </Button>
      </div>
      <MediaModal
        mediaList={media}
        visible={mediaModalVisible}
        onCancel={() => setMediaModalVisible(false)}
        onSelect={(selectedMedia) => {
          setNewLogoId(selectedMedia.id);
          setMediaModalVisible(false);
        }}
      />
    </div>
  );
};

export default AddNavbarForm;
