import React, { useEffect, useState } from "react";
import Site from "../components/Site";
import {
  Breadcrumb,
  Button,
  Col,
  Input,
  Popconfirm,
  Row,
  Select,
  message,
} from "antd";
import Router, { useRouter } from "next/router";
import {
  ArrowRightOutlined,
  CloseCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  HomeFilled,
  PlusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import instance from "../axios";
import { setPageTitle } from "../global/constants/pageTitle";
import Loader from "../components/Loader";
import moment from "moment";

const Menus = () => {
  useEffect(() => {
    // Set the dynamic page title for the Home page
    setPageTitle("Menus");
  }, []);

  const [menus, setMenus] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingMenuId, setEditingMenuId] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [deleteMenuId, setDeleteMenuId] = useState(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [editedMenuName, setEditedMenuName] = useState("");
  const [editedMenuItemsIds, setEditedMenuItemsIds] = useState([]);
  const [selectedNewMenuItem, setSelectedNewMenuItem] = useState(null);
  const [menuItemsOrder, setMenuItemsOrder] = useState({}); // Use an object to store orders for each menu

  // console.log(editedMenuItemsIds, "menus");

  const { Option } = Select;
  const router = useRouter();

  // Fetch Menus
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        const response = await instance("/menus");
        if (response.data) {
          setMenus(response.data?.sort((a, b) => b.id - a.id));
          // console.log("Menus", response.data);
          // console.log("Menus fetched successfully");
          setLoading(false);
        } else {
          // console.log("Error fetching menus", response.data.message);
          message.error("Menus couldn't be fetched");
        }
      } catch (err) {
        // console.log("Error fetching menus", err);
        message.error("Menus couldn't be fetched");
      }
      setLoading(false);
    };
    fetchMenus();
  }, [isAddMenuOpen, editingMenuId]);

  // Fetch Menu Items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await instance("/menuitems");
        if (response.data) {
          setMenuItems(response.data);
          // console.log("MenuItems", response.data);
          // console.log("Menu items fetched successfully");
          setLoading(false);
        } else {
          // console.log("Error fetching menu items", response.data.message);
          message.error("Menu items couldn't be fetched");
        }
      } catch (err) {
        // console.log("Error fetching menu items", err);
        message.error("Menu items couldn't be fetched");
      }
      setLoading(false);
    };
    fetchMenuItems();
  }, []);

  // Initialize the menuItemsOrder state with the initial orders
  useEffect(() => {
    // Initialize menuItemsOrder with the initial order from your data
    const initialMenuItemsOrder = {};
    menus.forEach((menu) => {
      initialMenuItemsOrder[menu.id] = menu.menu_item_ids;
    });
    setMenuItemsOrder(initialMenuItemsOrder);
  }, [menus]);

  const handleEdit = (id) => {
    // Find the menu being edited
    const menuToEdit = menus.find((menu) => menu.id === id);

    // Retrieve the menu item IDs associated with the menu
    const menuItemsIds = menuToEdit.menu_items?.map((menuItem) => menuItem.id);

    // Set the menu item in editing mode
    setEditingMenuId(id);
    setEditedMenuName(menuToEdit.name);
    setEditedMenuItemsIds(menuItemsIds); // Store menu item IDs
  };

  const handleCancelEdit = () => {
    // Clear editing mode
    setEditingMenuId(null);
  };

  const handleUpdate = async (id) => {
    // Find the menu being edited
    const menuToEdit = menus.find((menu) => menu.id === id);

    // Check if there are changes in the edited values
    if (
      editedMenuName !== menuToEdit.name ||
      !arraysAreEqual(editedMenuItemsIds, menuToEdit.menu_item_ids)
    ) {
      try {
        const updatedMenu = {
          name: editedMenuName,
          menu_item_ids: editedMenuItemsIds, // Send menu item IDs as an array
        };

        // Send a PUT request to update the menu
        const response = await instance.put(`/menus/${id}`, updatedMenu);
        if (response.status === 200) {
          // Update the edited item in the state
          const updatedMenus = menus?.map((menu) =>
            menu.id === id
              ? {
                  ...menu,
                  name: editedMenuName,
                  menu_item_ids: editedMenuItemsIds,
                }
              : menu
          );
          setMenus(updatedMenus);
          setEditingMenuId(null); // Clear editing mode
        } else {
          console.error("Error updating menu:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating menu:", error);
      }
    } else {
      // If no changes, simply exit editing mode
      setEditingMenuId(null);
    }
  };

  const showDeleteConfirmation = (id) => {
    setDeleteMenuId(id);
    setDeleteConfirmationVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to remove the menu
      const response = await instance.delete(`/menus/${id}`);
      if (response.status === 200) {
        // Remove the deleted menu from the state
        const updatedMenus = menus.filter((menu) => menu.id !== id);
        setMenus(updatedMenus);
        setDeleteConfirmationVisible(false); // Close the confirmation modal
      } else {
        console.error("Error deleting menu:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteMenuId(null);
    setDeleteConfirmationVisible(false);
  };

  const handleAddMenu = async () => {
    // Create a new menu
    try {
      const newMenu = {
        name: editedMenuName,
        menu_item_ids: editedMenuItemsIds,
      };
      // console.log(newMenu, "newmenu");
      // Send a POST request to create a new menu
      const response = await instance.post("/menus", newMenu);
      if (response.status === 201) {
        // Add the new menu to the state
        const updatedMenus = [
          { id: response.data.id, name: editedMenuName, menu_items: [] },
          ...menus,
        ];
        setMenus(updatedMenus);
        console.log("Menu created successfully");
        // Reset input fields and exit add menu mode
        setEditedMenuName("");
        setEditedMenuItemsIds([]);
        setIsAddMenuOpen(false);
      } else {
        // console.error("Error creating menu:", response.data.message);
        message.error("Error creating menu");
      }
    } catch (error) {
      // console.error("Error creating menu:", error);
      message.error("Error creating menu");
    }
  };

  const handleCancelAddMenu = () => {
    // Reset input fields and exit add menu mode
    setEditedMenuName("");
    setEditedMenuItemsIds([]);
    setIsAddMenuOpen(false);
  };

  // Helper function to check if two arrays are equal
  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  // Sort menu by name
  const sortMenuByName = () => {
    const sortedMenus = [...menus].sort((a, b) => a.name.localeCompare(b.name));
    setMenus(sortedMenus);
  };

  // Sort by Id
  const sortMenuById = () => {
    const sortedMenus = [...menus].sort((a, b) => a.id - b.id);
    setMenus(sortedMenus);
  };

  // SOrt by create date moment
  const sortMenuByDateAsc = () => {
    const sortedMenus = [...menus].sort((a, b) =>
      moment(a.created_at).diff(moment(b.created_at))
    );
    setMenus(sortedMenus);
  };

  // SOrt by create date moment
  const sortMenuByDateDesc = () => {
    const sortedMenus = [...menus].sort((a, b) =>
      moment(b.created_at).diff(moment(a.created_at))
    );
    setMenus(sortedMenus);
  };

  // Search menu by name
  const searchMenuByName = (value) => {
    const searchedMenus = menus.filter((menu) =>
      menu.name.toLowerCase().includes(value.toLowerCase())
    );
    setMenus(searchedMenus);
  };

  const [filterMode, setFilterMode] = useState(false);

  return (
    <div className="mavecontainer">
      <div
        className="TopbarContainer"
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          alignItems: "center",
        }}
      >
        <Breadcrumb
          style={{
            fontSize: "1.2em",
            marginBottom: "1em",
          }}
          items={[
            {
              href: "/",
              title: <HomeFilled />,
            },
            {
              title: "Components",
            },
            {
              title: "Menus",
              menu: {
                items: [
                  {
                    title: "Gallery",
                    onClick: () => router.push("/gallery"),
                  },
                  {
                    title: "Menus",
                    onClick: () => router.push("/menuitems"),
                  },
                  {
                    title: "Navbars",
                    onClick: () => router.push("/navbars"),
                  },
                  {
                    title: "Sliders",
                    onClick: () => router.push("/sliders"),
                  },
                  {
                    title: "Cards",
                    onClick: () => router.push("/cards"),
                  },
                  {
                    title: "Forms",
                    onClick: () => router.push("/forms"),
                  },
                  {
                    title: "Footers",
                    onClick: () => router.push("/footer"),
                  },
                ],
              },
            },
          ]}
        />
        <div
          className="buttonHolder"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1em",
            alignItems: "flex-end",
          }}
        >
          <Button
            type="primary"
            style={{
              backgroundColor: "var(--themes)",
              borderColor: "var(--themes)",
              color: "white",
              borderRadius: "10px",
              fontSize: "1.2em",
              width: "100%",
              // paddingBottom: "1.8em",
            }}
            onClick={() => router.push("/menuitems")}
            icon={<ArrowRightOutlined />}
          >
            Show Menu Items
          </Button>

          <Button
            type="primary"
            style={{
              backgroundColor: "var(--themes)",
              borderColor: "var(--themes)",
              color: "white",
              borderRadius: "10px",
              fontSize: "1.2em",
              width: "100%",
              // paddingBottom: "1.8em",
            }}
            icon={<PlusCircleOutlined />}
            onClick={() => setIsAddMenuOpen(true)}
          >
            Add New Menu
          </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: "var(--theme)",
              borderColor: "var(--theme)",
              color: "white",
              borderRadius: "10px",
              fontSize: "1.2em",
            }}
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/menus`
              );
              message.success("API Endpoint Copied");
            }}
          >
            Copy API Endpoint
          </Button>
        </div>
      </div>

      <div className="tableContainer">
        <Button
          type="primary"
          onClick={() => setFilterMode(!filterMode)}
          style={{
            backgroundColor: "var(--theme)",
            borderColor: "var(--theme)",
            color: "white",
            borderRadius: "10px",
            fontSize: "1.2em",
            // paddingBottom: "1.8em",
            marginBottom: "1em",
            marginTop: "1em",
          }}
        >
          <FilterOutlined />
          Filter
        </Button>
        {filterMode && (
          <Row
            style={{
              padding: "2em 3em",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Col span={12}>
              <h3 style={{ fontSize: "1.4em", paddingBottom: 20 }}>
                Sort By:{" "}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
                <Button type="primary" onClick={sortMenuByName}>
                  Name
                </Button>
                <Button type="primary" onClick={sortMenuById}>
                  ID
                </Button>
                <Button type="primary" onClick={sortMenuByDateAsc}>
                  Added First
                </Button>
                <Button type="primary" onClick={sortMenuByDateDesc}>
                  Added Last
                </Button>
              </div>
            </Col>
            <Col
              span={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 30,
              }}
            >
              <h3 style={{ fontSize: "1.4em", paddingBottom: 10 }}>
                Search By:{" "}
              </h3>
              <Input
                placeholder="Search by name"
                style={{
                  padding: "0.6em 2em",
                  width: "20em",
                }}
                onChange={(e) => searchMenuByName(e.target.value)}
              />
            </Col>
          </Row>
        )}

        <Row style={{ padding: "2em 3em" }}>
          <Col span={4}>
            <h3 style={{ fontSize: "1.4em" }}>Menu ID</h3>
          </Col>
          <Col span={7}>
            <h3 style={{ fontSize: "1.4em" }}>Menu Name</h3>
          </Col>
          <Col span={7}>
            <h3 style={{ fontSize: "1.4em" }}>Menu Items</h3>
          </Col>
          <Col span={6}>
            <h3
              style={{
                fontSize: "1.4em",
                paddingLeft: "2em",
              }}
            >
              Actions
            </h3>
          </Col>
        </Row>

        {/* Add New Menu */}
        {isAddMenuOpen && (
          <Row
            style={{
              padding: "2em 3em",
              borderBottom: "1px solid #f0f0f0",
              alignItems: "center",
            }}
          >
            <Col span={4}></Col>
            <Col span={7}>
              <Input
                value={editedMenuName}
                onChange={(e) => setEditedMenuName(e.target.value)}
                placeholder="Enter Menu Name"
                style={{
                  padding: "0.6em 2em",
                  width: "20em",
                }}
              />
            </Col>
            <Col span={7}>
              <Select
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder="Select menu items"
                value={editedMenuItemsIds}
                onChange={(values) => setEditedMenuItemsIds(values)}
                style={{
                  marginRight: "1em",
                  width: "20em",
                }}
              >
                {menuItems?.map((menuItem) => (
                  <Option key={menuItem.id} value={menuItem.id}>
                    {menuItem.title}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <div
                className="actionButtons"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1em",
                }}
              >
                <Button
                  type="primary"
                  onClick={handleAddMenu}
                  style={{
                    backgroundColor: "var(--success)",
                    borderColor: "var(--success)",
                    color: "white",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    marginRight: "1em",
                    // paddingBottom: "1.8em",
                  }}
                  icon={<SyncOutlined />}
                >
                  Create
                </Button>
                <Button
                  style={{
                    backgroundColor: "var(--themes)",
                    borderColor: "var(--themes)",
                    color: "white",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    // paddingBottom: "1.8em",
                  }}
                  onClick={handleCancelAddMenu}
                  icon={<CloseCircleOutlined />}
                >
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        )}

        {/* Print saved menus */}
        {loading && <Loader />}
        {menus?.map((menu, index) => (
          <Row
            key={index}
            style={{
              padding: "2em 3em",
              borderBottom: "1px solid #f0f0f0",
              alignItems: "center",
            }}
          >
            <Col span={4}>
              <p
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  color: "var(--theme)",
                }}
              >
                {menu.id}
              </p>
            </Col>
            <Col span={7}>
              {editingMenuId === menu.id ? (
                <Input
                  value={editedMenuName}
                  onChange={(e) => setEditedMenuName(e.target.value)}
                  style={{
                    padding: "0.6em 2em",
                    width: "20em",
                  }}
                />
              ) : (
                <p style={{ fontSize: "1.2em" }}>{menu.name}</p>
              )}
            </Col>
            <Col span={7}>
              {editingMenuId === menu.id ? (
                <Select
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  mode="multiple"
                  style={{
                    marginRight: "1em",
                    width: "20em",
                  }}
                  placeholder="Select menu items"
                  value={editedMenuItemsIds}
                  onChange={(values) => setEditedMenuItemsIds(values)}
                >
                  {menuItems?.map((menuItem) => (
                    <Option key={menuItem.id} value={menuItem.id}>
                      {menuItem.title}
                    </Option>
                  ))}
                </Select>
              ) : (
                <ul style={{ listStyleType: "none" }}>
                  {menu.menu_items?.map((menuItem, itemIndex) => (
                    <li
                      key={itemIndex}
                      style={{
                        fontSize: "1.2em",
                        paddingBottom: "0.5em",
                        color: "var(--themes)",
                      }}
                    >
                      <p>{menuItem.title}</p>
                    </li>
                  ))}
                </ul>
              )}
            </Col>
            <Col span={6}>
              <div
                className="actionButtons"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1em",
                }}
              >
                {editingMenuId === menu.id ? (
                  <>
                    <Button
                      type="primary"
                      onClick={() => handleUpdate(menu.id)}
                      style={{
                        backgroundColor: "var(--success)",
                        borderColor: "var(--success)",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                        marginRight: "1em",
                        // paddingBottom: "1.8em",
                      }}
                      icon={<SyncOutlined />}
                    >
                      Update
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "var(--themes)",
                        borderColor: "var(--themes)",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                        // paddingBottom: "1.8em",
                      }}
                      onClick={handleCancelEdit}
                      icon={<CloseCircleOutlined />}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "var(--theme)",
                        borderColor: "var(--theme)",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                        marginRight: "1em",
                        // paddingBottom: "1.8em",
                      }}
                      onClick={() => handleEdit(menu.id)}
                      icon={<EditOutlined />}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Are you sure you want to delete this menu?"
                      onConfirm={() => handleDelete(menu.id)}
                      okText="Sure"
                      cancelText="Cancel"
                      open={
                        deleteConfirmationVisible && deleteMenuId === menu.id
                      }
                      onOpenChange={(visible) => {
                        if (!visible) {
                          handleCancelDelete();
                        }
                      }}
                    >
                      <Button
                        type="primary"
                        danger
                        style={{
                          borderRadius: "10px",
                          fontSize: "1.2em",
                          // paddingBottom: "1.8em",
                        }}
                        onClick={() => showDeleteConfirmation(menu.id)}
                        icon={<DeleteOutlined />}
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  </>
                )}
              </div>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default Menus;
