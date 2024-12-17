// pages/MenuItems.js

import React, { useState, useEffect } from "react";
import { message, Modal, Pagination } from "antd";
import instance from "../../axios";
import { setPageTitle } from "../../global/constants/pageTitle";
import Loader from "../../components/Loader";
import MenuItemsHeader from "../../components/MenuItems/MenuItemsHeader";
import AddMenuItemForm from "../../components/MenuItems/AddMenuItemForm";
import MenuItemsList from "../../components/MenuItems/MenuItemsList";

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
  const [sortType, setSortType] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalMenuItems, setTotalMenuItems] = useState(0);

  // Filter States
  const [filters, setFilters] = useState({
    parent_id: undefined,
    // Add more filter fields if needed
  });

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await instance("/menuitems");
      if (response.data) {
        let sortedData = response.data.sort((a, b) =>
          sortType === "asc" ? a.id - b.id : b.id - a.id
        );
        setMenuItems(sortedData);
        setAllMenuItems(response.data);
        setInitialMenuItems(sortedData);
        setTotalMenuItems(sortedData.length);
        setLoading(false);
      } else {
        message.error("Menu items couldn't be fetched");
        setLoading(false);
      }
    } catch (error) {
      message.error("Menu items couldn't be fetched");
      setLoading(false);
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
        setLoading(false);
      }
    } catch (error) {
      message.error("Pages couldn't be fetched");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchPages();
  }, [sortType]);

  useEffect(() => {
    // Handle search and filter
    let filteredItems = [...initialMenuItems];

    if (searchTerm) {
      filteredItems = filteredItems.filter((menuItem) =>
        menuItem.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.parent_id) {
      filteredItems = filteredItems.filter(
        (menuItem) => menuItem.parent_id === filters.parent_id
      );
    }

    setMenuItems(filteredItems);
    setTotalMenuItems(filteredItems.length);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, initialMenuItems]);

  const handleAddMenuItem = () => {
    setIsAddMenuItemOpen(true);
  };

  const handleCancelAddMenuItem = () => {
    setIsAddMenuItemOpen(false);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSortType("asc");
    setFilters({
      parent_id: undefined,
    });
    fetchMenuItems();
  };

  const handleFilter = () => {
    // The filter modal is handled within MenuItemsHeader
  };

  const onShowChange = (value) => {
    // show number of items
    setItemsPerPage(parseInt(value, 10));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  const handleSelectAll = () => {
    if (selectedItemIds.length === menuItems.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(menuItems?.map((item) => item.id));
    }
  };

  const applyFilters = (filterValues) => {
    setFilters(filterValues);
  };

  const resetFilters = () => {
    setFilters({
      parent_id: undefined,
    });
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMenuItems = menuItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // return loading if menuItems length is less than or equal to 0
  if (menuItems.length <= 0) {
    return <Loader />;
  }

  return (
    <div className="mavecontainer bg-gray-50 rounded-xl">
      <MenuItemsHeader
        onAddMenuItem={handleAddMenuItem}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortType={sortType}
        setSortType={setSortType}
        handleFilter={handleFilter}
        onShowChange={onShowChange}
        handleSelectAll={handleSelectAll}
        allSelected={selectedItemIds.length === menuItems.length}
        filterOptions={{
          parentMenus: pages, // Assuming pages are used as parent menus
        }}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
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
        <>
          <MenuItemsList
            menuItems={paginatedMenuItems}
            pages={pages}
            setMenuItems={setMenuItems}
            allMenuItems={allMenuItems}
            editingItemId={editingItemId}
            setEditingItemId={setEditingItemId}
            selectedItemIds={selectedItemIds}
            setSelectedItemIds={setSelectedItemIds}
          />
          <div className="flex justify-end mt-4">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={totalMenuItems}
              onChange={handlePaginationChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MenuItems;
