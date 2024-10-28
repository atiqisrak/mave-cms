// components/MenuItems/AddMenuItemForm.js

import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Radio,
  message,
  Typography,
} from "antd";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import instance from "../../axios";

const AddMenuItemForm = ({ pages, menuItems, onCancel, fetchMenuItems }) => {
  const [newMenuItemTitle, setNewMenuItemTitle] = useState("");
  const [newMenuItemTitleBn, setNewMenuItemTitleBn] = useState("");
  const [newMenuItemLink, setNewMenuItemLink] = useState("");
  const [linkType, setLinkType] = useState("independent");
  const [newParentId, setNewParentId] = useState(null);

  const handleAddMenuItem = async () => {
    try {
      const response = await instance.post("/menuitems", [
        {
          title: newMenuItemTitle || "N/A",
          title_bn: newMenuItemTitleBn || "N/A",
          parent_id: newParentId || null,
          link: newMenuItemLink ? "/" + newMenuItemLink : "/",
        },
      ]);
      if (response.status === 201) {
        message.success("Menu item added successfully");
        fetchMenuItems();
        onCancel();
      } else {
        message.error("Error adding menu item");
      }
    } catch (error) {
      message.error("Error adding menu item");
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Typography.Title level={5}>Item Name</Typography.Title>
          <Input
            placeholder="Menu Item Title"
            value={newMenuItemTitle}
            onChange={(e) => setNewMenuItemTitle(e.target.value)}
          />
        </Col>
        <Col xs={24} md={12}>
          <Typography.Title level={5}>আইটেম নাম</Typography.Title>
          <Input
            placeholder="মেনু আইটেম শিরোনাম"
            value={newMenuItemTitleBn}
            onChange={(e) => setNewMenuItemTitleBn(e.target.value)}
          />
        </Col>
        <Col xs={24} md={12}>
          <Typography.Title level={5}>Parent Menu</Typography.Title>
          <Select
            showSearch
            placeholder="Select a Parent Menu"
            optionFilterProp="children"
            onChange={(value) => setNewParentId(value)}
            className="w-full mt-2"
            allowClear
          >
            <Select.Option value={null}>No Parent</Select.Option>
            {menuItems?.map((menuItem) => (
              <Select.Option key={menuItem.id} value={menuItem.id}>
                {menuItem.title}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} md={12}>
          <div className="flex justify-between">
            <Typography.Title level={5}>Item Link</Typography.Title>
            <Radio.Group
              onChange={(e) => setLinkType(e.target.value)}
              value={linkType}
            >
              <Radio value="independent">Independent</Radio>
              <Radio value="page">Page</Radio>
            </Radio.Group>
          </div>
          {linkType === "page" ? (
            <Select
              showSearch
              placeholder="Select a page"
              optionFilterProp="children"
              onChange={(value) => setNewMenuItemLink(value)}
              className="w-full mt-2"
            >
              {pages?.map((page) => (
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
              placeholder="Menu Item Link"
              value={newMenuItemLink}
              onChange={(e) => setNewMenuItemLink(e.target.value)}
              className="mt-2"
            />
          )}
        </Col>
      </Row>
      <div className="flex justify-end mt-4 gap-5">
        <Button
          icon={<PlusCircleOutlined />}
          onClick={handleAddMenuItem}
          className="mavebutton"
        >
          Add
        </Button>
        <Button
          icon={<CloseCircleOutlined />}
          onClick={onCancel}
          className="mr-2 bg-gray-500 text-white"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddMenuItemForm;
