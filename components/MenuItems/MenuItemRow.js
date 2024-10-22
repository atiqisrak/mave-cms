// components/MenuItems/MenuItemRow.js

import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Radio,
  Popconfirm,
  message,
  Checkbox,
} from "antd";
import {
  SyncOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import instance from "../../axios";

const MenuItemRow = ({
  menuItem,
  menuItems,
  pages,
  setMenuItems,
  editingItemId,
  setEditingItemId,
  selectedItemIds,
  setSelectedItemIds,
}) => {
  const [editedTitleEn, setEditedTitleEn] = useState(menuItem.title);
  const [editedTitleBn, setEditedTitleBn] = useState(menuItem.title_bn);
  const [editedLink, setEditedLink] = useState(menuItem.link);
  const [linkType, setLinkType] = useState("independent");
  const [editedParentId, setEditedParentId] = useState(menuItem.parent_id);

  const handleUpdate = async () => {
    try {
      const updatedMenuItem = {
        ...menuItem,
        title: editedTitleEn || menuItem.title,
        title_bn: editedTitleBn || menuItem.title_bn,
        parent_id: editedParentId || null,
        link: editedLink || menuItem.link,
      };
      const response = await instance.put(
        `/menuitems/${menuItem.id}`,
        updatedMenuItem
      );
      if (response.status === 200) {
        message.success("Menu item updated successfully");
        setMenuItems((prevMenuItems) =>
          prevMenuItems.map((item) =>
            item.id === menuItem.id ? updatedMenuItem : item
          )
        );
        setEditingItemId(null);
      } else {
        message.error("Error updating menu item");
      }
    } catch (error) {
      message.error("Error updating menu item");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await instance.delete(`/menuitems/${menuItem.id}`);
      if (response.status === 200) {
        message.success("Menu item deleted successfully");
        setMenuItems((prevMenuItems) =>
          prevMenuItems.filter((item) => item.id !== menuItem.id)
        );
      } else {
        message.error("Error deleting menu item");
      }
    } catch (error) {
      message.error("Error deleting menu item");
    }
  };

  const isEditing = editingItemId === menuItem.id;

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedItemIds([...selectedItemIds, menuItem.id]);
    } else {
      setSelectedItemIds(selectedItemIds.filter((id) => id !== menuItem.id));
    }
  };

  const isSelected = selectedItemIds.includes(menuItem.id);

  return (
    <Row className="border-b py-2 items-center">
      <Col xs={2} md={1}>
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />
      </Col>
      <Col xs={2} md={2}>
        <p>{menuItem.id}</p>
      </Col>
      <Col xs={8} md={3}>
        {isEditing ? (
          <Input
            value={editedTitleEn}
            onChange={(e) => setEditedTitleEn(e.target.value)}
            className="w-11/12"
          />
        ) : (
          <p>{menuItem.title}</p>
        )}
      </Col>
      <Col xs={8} md={4}>
        {isEditing ? (
          <Input
            value={editedTitleBn}
            onChange={(e) => setEditedTitleBn(e.target.value)}
            className="w-11/12"
          />
        ) : (
          <p>{menuItem.title_bn || "N/A"}</p>
        )}
      </Col>
      <Col xs={8} md={4}>
        {isEditing ? (
          <Select
            showSearch
            placeholder="Select a Parent Menu"
            optionFilterProp="children"
            onChange={(value) => setEditedParentId(value)}
            className="w-11/12"
            allowClear
            defaultValue={menuItem.parent_id}
          >
            <Select.Option value={null}>No Parent</Select.Option>
            {menuItems
              .filter((item) => item.id !== menuItem.id)
              .map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                </Select.Option>
              ))}
          </Select>
        ) : (
          <p>
            {menuItem.parent_id
              ? menuItems.find((item) => item.id === menuItem.parent_id)?.title
              : "N/A"}
          </p>
        )}
      </Col>
      <Col xs={8} md={4}>
        {isEditing ? (
          <>
            <Radio.Group
              onChange={(e) => setLinkType(e.target.value)}
              value={linkType}
            >
              <Radio value="independent">Independent</Radio>
              <Radio value="page">Page</Radio>
            </Radio.Group>
            {linkType === "page" ? (
              <Select
                showSearch
                placeholder="Select a page"
                optionFilterProp="children"
                onChange={(value) => setEditedLink("/" + value)}
                className="w-11/12 mt-2"
              >
                {pages.map((page) => (
                  <Select.Option
                    key={page.id}
                    value={`${page.slug}?pageId=${
                      page.id
                    }&pageName=${page.page_name_en.replace(/\s/g, "-")}`}
                  >
                    {page.page_name_en}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <Input
                value={editedLink}
                onChange={(e) => setEditedLink(e.target.value)}
                className="mt-2 w-11/12"
              />
            )}
          </>
        ) : (
          <p className="text-theme underline">
            {menuItem.link.length > 20
              ? menuItem.link.slice(0, 20) + "..."
              : menuItem.link}
          </p>
        )}
      </Col>
      <Col xs={24} md={6} className="flex gap-2 mt-2 md:mt-0">
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
              onClick={() => setEditingItemId(null)}
              danger
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              icon={<EditOutlined />}
              onClick={() => setEditingItemId(menuItem.id)}
              className="mavebutton"
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this menu item?"
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

export default MenuItemRow;
