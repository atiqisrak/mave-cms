// components/Navbars/NavbarRow.js

import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Popconfirm,
  message,
  Checkbox,
  Collapse,
} from "antd";
import {
  SyncOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  FileImageFilled,
} from "@ant-design/icons";
import instance from "../../axios";
import MediaModal from "./MediaModal";
import Image from "next/image";

const NavbarRow = ({
  navbar,
  menus,
  media,
  setNavbars,
  editingNavbarId,
  setEditingNavbarId,
  selectedNavbarIds,
  setSelectedNavbarIds,
}) => {
  const [editedNavbarTitleEn, setEditedNavbarTitleEn] = useState(
    navbar.title_en
  );
  const [editedNavbarTitleBn, setEditedNavbarTitleBn] = useState(
    navbar.title_bn
  );
  const [editedLogoId, setEditedLogoId] = useState(navbar.logo.id);
  const [editedMenuId, setEditedMenuId] = useState(navbar.menu.id);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);

  const handleUpdate = async () => {
    try {
      const updatedNavbar = {
        title_en: editedNavbarTitleEn,
        title_bn: editedNavbarTitleBn,
        logo_id: editedLogoId,
        menu_id: editedMenuId,
      };
      const response = await instance.put(
        `/navbars/${navbar.id}`,
        updatedNavbar
      );
      if (response.status === 200) {
        message.success("Navbar updated successfully");
        setNavbars((prevNavbars) =>
          prevNavbars.map((item) =>
            item.id === navbar.id ? { ...item, ...updatedNavbar } : item
          )
        );
        setEditingNavbarId(null);
      } else {
        message.error("Error updating navbar");
      }
    } catch (error) {
      message.error("Error updating navbar");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await instance.delete(`/navbars/${navbar.id}`);
      if (response.status === 200) {
        message.success("Navbar deleted successfully");
        setNavbars((prevNavbars) =>
          prevNavbars.filter((item) => item.id !== navbar.id)
        );
      } else {
        message.error("Error deleting navbar");
      }
    } catch (error) {
      message.error("Error deleting navbar");
    }
  };

  const isEditing = editingNavbarId === navbar.id;

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedNavbarIds([...selectedNavbarIds, navbar.id]);
    } else {
      setSelectedNavbarIds(selectedNavbarIds.filter((id) => id !== navbar.id));
    }
  };

  const isSelected = selectedNavbarIds.includes(navbar.id);

  return (
    <Row className="border-b py-2 items-center">
      <Col xs={2} md={1}>
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </Col>
      <Col xs={8} md={5}>
        {isEditing ? (
          <>
            <Input
              value={editedNavbarTitleEn}
              onChange={(e) => setEditedNavbarTitleEn(e.target.value)}
              className="w-full mb-2"
              placeholder="Title (English)"
            />
            <Input
              value={editedNavbarTitleBn}
              onChange={(e) => setEditedNavbarTitleBn(e.target.value)}
              className="w-full"
              placeholder="Title (Bangla)"
            />
          </>
        ) : (
          <>
            <p>{navbar.title_en}</p>
            {/* <p>{navbar.title_bn}</p> */}
          </>
        )}
      </Col>
      <Col xs={8} md={4}>
        {isEditing ? (
          <>
            <Button
              icon={<FileImageFilled />}
              onClick={() => setMediaModalVisible(true)}
            >
              Change Logo
            </Button>
            <MediaModal
              mediaList={media}
              visible={mediaModalVisible}
              onCancel={() => setMediaModalVisible(false)}
              onSelect={(selectedMedia) => {
                setEditedLogoId(selectedMedia.id);
                setMediaModalVisible(false);
              }}
            />
          </>
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${navbar.logo.file_path}`}
            alt={navbar.logo.file_name}
            className="w-16 h-16 object-cover"
            width={64}
            height={64}
          />
        )}
      </Col>
      <Col xs={8} md={10}>
        {isEditing ? (
          <Select
            showSearch
            placeholder="Select a Menu"
            optionFilterProp="children"
            onChange={(value) => setEditedMenuId(value)}
            className="w-full"
            allowClear
            defaultValue={navbar.menu.id}
          >
            {menus.map((menu) => (
              <Select.Option key={menu.id} value={menu.id}>
                {menu.name}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Collapse
            defaultActiveKey={["0"]}
            ghost
            className="w-full"
            expandIconPosition="right"
          >
            <Collapse.Panel header={navbar.menu.name} key="1" className="w-56">
              {navbar.menu.menu_items.map((item) => (
                <p key={item.id}>{item.title}</p>
              ))}
            </Collapse.Panel>
          </Collapse>
        )}
      </Col>
      <Col xs={24} md={4} className="flex gap-2 mt-2 md:mt-0">
        {isEditing ? (
          <>
            <Button
              icon={<SyncOutlined />}
              onClick={handleUpdate}
              className="mavebutton"
            >
              Update
            </Button>
            <Button
              icon={<CloseCircleOutlined />}
              onClick={() => setEditingNavbarId(null)}
              danger
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              icon={<EditOutlined />}
              onClick={() => setEditingNavbarId(navbar.id)}
              className="mavebutton"
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this navbar?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </>
        )}
      </Col>
    </Row>
  );
};

export default NavbarRow;
