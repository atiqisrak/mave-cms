// components/Navbars/NavbarsList.js

import React from "react";
import { Row, Col, Checkbox } from "antd";
import NavbarRow from "./NavbarRow";

const NavbarsList = ({
  navbars,
  menus,
  media,
  setNavbars,
  editingNavbarId,
  setEditingNavbarId,
  selectedNavbarIds,
  setSelectedNavbarIds,
  fetchNavbars,
}) => {
  const allSelected =
    selectedNavbarIds.length === navbars.length && navbars.length > 0;
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedNavbarIds(navbars.map((item) => item.id));
    } else {
      setSelectedNavbarIds([]);
    }
  };
  return (
    <div className="bg-white p-4 shadow-md border-t-2 border-gray-300">
      <Row className="font-semibold border-b pb-2 mb-2">
        <Col xs={2} md={1}>
          <Checkbox checked={allSelected} onChange={handleSelectAll} />
        </Col>
        <Col xs={8} md={5}>
          Navbar Name
        </Col>
        <Col xs={8} md={4}>
          Logo
        </Col>
        <Col xs={8} md={10}>
          Menu Items
        </Col>
        <Col xs={24} md={4}>
          Actions
        </Col>
      </Row>
      {navbars.length > 0 ? (
        navbars.map((navbar) => (
          <NavbarRow
            key={navbar.id}
            navbar={navbar}
            menus={menus}
            media={media}
            setNavbars={setNavbars}
            editingNavbarId={editingNavbarId}
            setEditingNavbarId={setEditingNavbarId}
            selectedNavbarIds={selectedNavbarIds}
            setSelectedNavbarIds={setSelectedNavbarIds}
            fetchNavbars={fetchNavbars}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <h2>No Navbars Found</h2>
        </div>
      )}
    </div>
  );
};

export default NavbarsList;
