import React, { useState } from "react";
import { Input, Select, Button } from "antd";

const { Option } = Select;

const NavbarCreator = ({
  media,
  menus,
  selectedMediaId,
  setSelectedMediaId,
  selectedMenuId,
  setSelectedMenuId,
  navbarTitleEn,
  setNavbarTitleEn,
  navbarTitleBn,
  setNavbarTitleBn,
  handleCreateNavbar,
  toggleCreateNavbarForm,
  handleOpenMediaSelectionModal2,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateNavbar();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1em",
        border: "2px solid var(--theme)",
        borderRadius: "10px",
        marginBottom: "1em",
      }}
    >
      <div style={{ marginBottom: "1em" }}>
        <label htmlFor="title_en">Title (English):</label>
        <Input
          allowClear
          type="text"
          id="title_en"
          name="title_en"
          placeholder="Enter English title"
          value={navbarTitleEn}
          onChange={(e) => setNavbarTitleEn(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "1em" }}>
        <label htmlFor="title_bn">Title (Bengali):</label>
        <Input
          allowClear
          type="text"
          id="title_bn"
          name="title_bn"
          placeholder="Enter Bengali title"
          value={navbarTitleBn}
          onChange={(e) => setNavbarTitleBn(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "1em" }}>
        <img
          src={`/images/Image_Placeholder.png`}
          alt="Logo"
          style={{ width: "150px" }}
        />
        <Button
          className="change-media-button"
          style={{
            fontSize: "1rem",
            background: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
            padding: "18px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "1em",
          }}
          onClick={handleOpenMediaSelectionModal2}
        >
          Choose Logo
        </Button>
      </div>
      <div style={{ marginBottom: "1em" }}>
        <label htmlFor="menu">Select Menu:</label>
        <Select
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Select a menu"
          onChange={(selectedMenuId) => setSelectedMenuId(selectedMenuId)}
          value={selectedMenuId}
        >
          {menus?.map((menu) => (
            <Option key={menu.id} value={menu?.id}>
              {menu.name}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <Button
          type="primary"
          onClick={handleCreateNavbar}
          style={{
            backgroundColor: "var(--theme)",
            borderColor: "var(--theme)",
            color: "white",
            borderRadius: "10px",
            fontSize: "1.2em",
            marginBottom: "0.5em",
          }}
        >
          Create Navbar
        </Button>
        <Button
          type="default"
          onClick={toggleCreateNavbarForm}
          className="mavecancelbutton"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NavbarCreator;
