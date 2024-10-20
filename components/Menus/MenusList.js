// components/Menus/MenusList.js

import React from "react";
import { Row, Col, Checkbox } from "antd";
import MenuRow from "./MenuRow";

const MenusList = ({
  menus,
  menuItems,
  setMenus,
  editingMenuId,
  setEditingMenuId,
  selectedMenuIds,
  setSelectedMenuIds,
}) => {
  const allSelected =
    selectedMenuIds.length === menus.length && menus.length > 0;
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedMenuIds(menus.map((item) => item.id));
    } else {
      setSelectedMenuIds([]);
    }
  };
  return (
    <div className="bg-white p-4 shadow-md border-t-2 border-gray-300">
      <Row className="font-semibold border-b pb-2 mb-2">
        <Col xs={2} md={1}>
          <Checkbox checked={allSelected} onChange={handleSelectAll} />
        </Col>
        <Col xs={2} md={2}>
          Menu ID
        </Col>
        <Col xs={8} md={5}>
          Menu Name
        </Col>
        <Col xs={8} md={10}>
          Menu Items
        </Col>
        <Col xs={24} md={6}>
          Actions
        </Col>
      </Row>
      {menus.length > 0 ? (
        menus.map((menu) => (
          <MenuRow
            key={menu.id}
            menu={menu}
            menuItems={menuItems}
            setMenus={setMenus}
            editingMenuId={editingMenuId}
            setEditingMenuId={setEditingMenuId}
            selectedMenuIds={selectedMenuIds}
            setSelectedMenuIds={setSelectedMenuIds}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <h2>No Menus Found</h2>
        </div>
      )}
    </div>
  );
};

export default MenusList;
