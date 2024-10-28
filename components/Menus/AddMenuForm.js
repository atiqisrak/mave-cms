// components/Menus/AddMenuForm.js

import React, { useState } from "react";
import { Row, Col, Input, Select, Button, message } from "antd";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import instance from "../../axios";

const AddMenuForm = ({ menuItems, onCancel, fetchMenus }) => {
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuItemsIds, setNewMenuItemsIds] = useState([]);

  const handleAddMenu = async () => {
    try {
      const newMenu = {
        name: newMenuName,
        menu_item_ids: newMenuItemsIds,
      };
      const response = await instance.post("/menus", newMenu);
      if (response.status === 201) {
        message.success("Menu created successfully");
        fetchMenus();
        onCancel();
      } else {
        message.error("Error creating menu");
      }
    } catch (error) {
      message.error("Error creating menu");
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} className="flex items-center">
          <Input
            placeholder="Enter Menu Name"
            value={newMenuName}
            onChange={(e) => setNewMenuName(e.target.value)}
            className="w-full"
          />
        </Col>
        <Col xs={24} md={12}>
          <Select
            allowClear
            showSearch
            mode="multiple"
            placeholder="Select menu items"
            value={newMenuItemsIds}
            onChange={(values) => setNewMenuItemsIds(values)}
            className="w-full"
            optionFilterProp="children"
          >
            {menuItems?.map((menuItem) => (
              <Select.Option key={menuItem.id} value={menuItem.id}>
                {menuItem.title}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <div className="flex justify-end mt-4 gap-5">
        <Button
          icon={<PlusCircleOutlined />}
          onClick={handleAddMenu}
          className="mavebutton"
        >
          Create
        </Button>
        <Button
          icon={<CloseCircleOutlined />}
          onClick={onCancel}
          className="mavecancelbutton"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddMenuForm;
