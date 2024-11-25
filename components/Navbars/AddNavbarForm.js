// components/Navbars/AddNavbarForm.js

import React, { useState } from "react";
import { Row, Col, Input, Select, Button, message } from "antd";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import instance from "../../axios";
import MediaSelectionModal from "../PageBuilder/Modals/MediaSelectionModal";
import Image from "next/image";

const AddNavbarForm = ({ menus, media, onCancel, fetchNavbars }) => {
  const [newNavbarTitleEn, setNewNavbarTitleEn] = useState("");
  const [newNavbarTitleBn, setNewNavbarTitleBn] = useState("");
  const [newLogoId, setNewLogoId] = useState(null);
  const [newMenuId, setNewMenuId] = useState(null);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

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
            placeholder="Navbar Title (Alternate)"
            value={newNavbarTitleBn}
            onChange={(e) => setNewNavbarTitleBn(e.target.value)}
          />
        </Col>
        <Col xs={24} md={12}>
          <Button onClick={() => setMediaModalVisible(true)}>
            {newLogoId ? "Change Logo" : "Select Logo"}
          </Button>
          {newLogoId && selectedMedia ? (
            <div className="mt-2">
              <Image
                src={
                  selectedMedia.file_path
                    ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedMedia.file_path}`
                    : "/images/Image_placeholder.png"
                }
                alt={selectedMedia.file_name || "Navbar Logo"}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
            </div>
          ) : null}
        </Col>
        <Col xs={24} md={12}>
          <Select
            showSearch
            placeholder="Select a Menu"
            optionFilterProp="children"
            onChange={(value) => setNewMenuId(value)}
            className="w-full"
            allowClear
            value={newMenuId}
          >
            {menus?.map((menu) => (
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
      <MediaSelectionModal
        isVisible={mediaModalVisible}
        onClose={() => setMediaModalVisible(false)}
        selectionMode="single"
        onSelectMedia={(selected) => {
          if (selected) {
            setNewLogoId(selected.id);
            setSelectedMedia(selected);
          }
          setMediaModalVisible(false);
        }}
      />
    </div>
  );
};

export default AddNavbarForm;
