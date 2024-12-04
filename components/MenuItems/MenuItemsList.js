// components/MenuItems/MenuItemsList.js

import React from "react";
import { Row, Col, Checkbox } from "antd";
import MenuItemRow from "./MenuItemRow";

const MenuItemsList = ({
  menuItems,
  pages,
  setMenuItems,
  editingItemId,
  setEditingItemId,
  selectedItemIds,
  setSelectedItemIds,
}) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItemIds(menuItems.map((item) => item.id));
    } else {
      setSelectedItemIds([]);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md border-t-2 border-gray-300">
      <Row className="font-semibold border-b pb-2 mb-2">
        <Col xs={2} md={1}>
          <Checkbox
            checked={
              selectedItemIds.length === menuItems.length &&
              menuItems.length > 0
            }
            onChange={handleSelectAll}
          />
        </Col>
        <Col xs={8} md={4}>
          Item Name
        </Col>
        <Col xs={8} md={4}>
          আইটেম নাম
        </Col>
        <Col xs={8} md={4}>
          Parent Menu
        </Col>
        <Col xs={8} md={4}>
          Item Link
        </Col>
        <Col xs={24} md={6}>
          Actions
        </Col>
      </Row>
      {menuItems.length > 0 ? (
        menuItems.map((menuItem) => (
          <MenuItemRow
            key={menuItem.id}
            menuItem={menuItem}
            menuItems={menuItems}
            pages={pages}
            setMenuItems={setMenuItems}
            editingItemId={editingItemId}
            setEditingItemId={setEditingItemId}
            selectedItemIds={selectedItemIds}
            setSelectedItemIds={setSelectedItemIds}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <h2>No Menu Items Found</h2>
        </div>
      )}
    </div>
  );
};

export default MenuItemsList;
