// pages/MenuItems.js

import React, { useState, useEffect } from "react";
import { message, Modal } from "antd";
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
  const [selectedItemIds, setSelectedItemIds] = useState([]);

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

  const handleSelectAll = () => {
    if (selectedItemIds.length === menuItems.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(menuItems.map((item) => item.id));
    }
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
        handleSelectAll={handleSelectAll}
        allSelected={selectedItemIds.length === menuItems.length}
      />
      <Modal
        open={isAddMenuItemOpen}
        onCancel={handleCancelAddMenuItem}
        footer={null}
        title={
          <div className="flex items-center gap-2 pb-5 border border-b-2 border-gray-200 border-t-transparent border-l-transparent border-r-transparent">
            <img
              src="/icons/mave/menuitems.svg"
              alt="Menu Items"
              className="w-6"
            />
            <span>Add Menu Item</span>
          </div>
        }
        width={800}
      >
        <AddMenuItemForm
          pages={pages}
          menuItems={menuItems}
          onCancel={handleCancelAddMenuItem}
          fetchMenuItems={fetchMenuItems}
        />
      </Modal>
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
          selectedItemIds={selectedItemIds}
          setSelectedItemIds={setSelectedItemIds}
        />
      )}
    </div>
  );
};

export default MenuItems;
