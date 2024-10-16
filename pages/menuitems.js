// pages/MenuItems.js

import React, { useState, useEffect } from "react";
import { Row, Col, Input, Switch, Button, message } from "antd";
import {
  PlusCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import instance from "../axios";
import { setPageTitle } from "../global/constants/pageTitle";
import Loader from "../components/Loader";
import MenuItemsHeader from "../components/MenuItems/MenuItemsHeader";
import AddMenuItemForm from "../components/MenuItems/AddMenuItemForm";
import MenuItemsList from "../components/MenuItems/MenuItemsList";

const MenuItems = () => {
  useEffect(() => {
    // Set the dynamic page title for the Home page
    setPageTitle("Menu Items");
  }, []);

  const [menuItems, setMenuItems] = useState([]);
  const [initialMenuItems, setInitialMenuItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [isAddMenuItemOpen, setIsAddMenuItemOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [sortType, setSortType] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await instance("/menuitems");
      if (response.data) {
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        setMenuItems(sortedData);
        setInitialMenuItems(sortedData);
        setLoading(false);
      } else {
        message.error("Menu items couldn't be fetched");
      }
    } catch (error) {
      message.error("Menu items couldn't be fetched");
    }
  };

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await instance("/pages");
      if (response.data) {
        setPages(response.data);
        setLoading(false);
      } else {
        message.error("Pages couldn't be fetched");
      }
    } catch (error) {
      message.error("Pages couldn't be fetched");
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchPages();
  }, []);

  useEffect(() => {
    // Handle search
    const results = initialMenuItems.filter((menuItem) =>
      menuItem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMenuItems(results);
  }, [searchTerm]);

  useEffect(() => {
    // Handle sorting
    const sortedMenuItems = [...menuItems].sort((a, b) =>
      sortType === "asc" ? a.id - b.id : b.id - a.id
    );
    setMenuItems(sortedMenuItems);
  }, [sortType]);

  const handleAddMenuItem = () => {
    setIsAddMenuItemOpen(true);
  };

  const handleCancelAddMenuItem = () => {
    setIsAddMenuItemOpen(false);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSortType("asc");
    fetchMenuItems();
  };

  const handleFilter = () => {
    const filteredMenuItems = menuItems.filter((menuItem) => menuItem.title);
    setMenuItems(filteredMenuItems);
  };

  const onShowChange = (value) => {
    // show number of items
    console.log(value);
  };

  return (
    <div className="mavecontainer bg-gray-50 rounded-xl">
      <MenuItemsHeader
        onAddMenuItem={handleAddMenuItem}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortType={sortType}
        setSortType={setSortType}
        handleReset={handleReset}
        handleFilter={handleFilter}
        onShowChange={onShowChange}
      />
      {isAddMenuItemOpen && (
        <AddMenuItemForm
          pages={pages}
          menuItems={menuItems}
          onCancel={handleCancelAddMenuItem}
          fetchMenuItems={fetchMenuItems}
        />
      )}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <MenuItemsList
          menuItems={menuItems}
          pages={pages}
          setMenuItems={setMenuItems}
          editingItemId={editingItemId}
          setEditingItemId={setEditingItemId}
        />
      )}
    </div>
  );
};

export default MenuItems;
