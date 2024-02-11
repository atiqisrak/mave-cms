import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card as AntCard,
  Image,
  Spin,
  Button,
  Input,
  Modal,
  Switch,
  Popconfirm,
  Select,
} from "antd";
import instance from "../axios";
import { useRouter } from "next/router";
import {
  ArrowLeftOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { setPageTitle } from "../global/constants/pageTitle";
import Loader from "../components/Loader";

export default function MenuItems() {
  useEffect(() => {
    // Set the dynamic page title for the Home page
    setPageTitle("Menu Items");
  }, []);

  const [menuItems, setMenuItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editedTitleEn, setEditedTitleEn] = useState("");
  const [editedTitleBn, setEditedTitleBn] = useState("");
  const [editedLink, setEditedLink] = useState("");
  const [editedMenuItem, setEditedMenuItem] = useState(null);
  const [originalMenuItem, setOriginalMenuItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddMenuItemOpen, setIsAddMenuItemOpen] = useState(false);
  const [newMenuItemTitle, setNewMenuItemTitle] = useState("");
  const [newMenuItemLink, setNewMenuItemLink] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchMenuItems = async () => {
    try {
      const response = await instance("/menuitems");
      if (response.data) {
        setMenuItems(response.data);
        console.log("Menu Items: ", response.data);
      } else {
        console.error("Error fetching menu items:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [isAddMenuItemOpen, editingItemId]);

  const handleEdit = (id) => {
    // Find the menu item being edited
    const menuItemToEdit = menuItems.find((menuItem) => menuItem.id === id);

    // Store the original values and edited values in state
    setEditingItemId(id);
    setEditedMenuItem({
      ...menuItemToEdit,
    });
    setOriginalMenuItem({
      ...menuItemToEdit,
    });

    // Initialize editedTitleEn and editedLink with current values
    setEditedTitleEn(menuItemToEdit.title);
    setEditedLink(menuItemToEdit.link);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const handleUpdate = async (id) => {
    // Find the menu item being edited
    const menuItemToEdit = menuItems.find((menuItem) => menuItem.id === id);

    // Check if there are changes in the edited values
    if (
      // editedTitleEn !== originalMenuItem.title ||
      // editedLink !== originalMenuItem.link
      editedTitleEn !== menuItemToEdit.title ||
      editedTitleBn !== menuItemToEdit.title_bn ||
      editedLink !== menuItemToEdit.link
    ) {
      try {
        const updatedMenuItem = {
          ...menuItemToEdit,
          title: editedTitleEn,
          title_bn: editedTitleBn,
          link: editedLink,
        };

        const response = await instance.put(
          `/menuitems/${id}`,
          updatedMenuItem
        );
        if (response.status === 200) {
          // Update the edited item in the state
          const updatedMenuItems = menuItems?.map((menuItem) =>
            menuItem.id === id ? updatedMenuItem : menuItem
          );
          setMenuItems(updatedMenuItems);
          setEditingItemId(null); // Clear editing mode
          setEditedMenuItem(null); // Clear edited values
          setOriginalMenuItem(null); // Clear original values
        } else {
          console.error("Error updating menu item:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating menu item:", error);
      }
    } else {
      // If no changes, simply exit editing mode
      setEditingItemId(null);
      setEditedMenuItem(null);
      setOriginalMenuItem(null);
    }
  };

  const showDeleteConfirmation = (id) => {
    setDeleteItemId(id);
    setDeleteConfirmationVisible(true);
  };

  const handleDelete = async () => {
    try {
      const response = await instance.delete(`/menuitems/${deleteItemId}`);
      if (response.status === 200) {
        // Remove the deleted item from the state
        const updatedMenuItems = menuItems.filter(
          (menuItem) => menuItem.id !== deleteItemId
        );
        setMenuItems(updatedMenuItems);
        setDeleteConfirmationVisible(false); // Close the confirmation modal
      } else {
        console.error("Error deleting menu item:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setDeleteConfirmationVisible(false);
  };

  const openAddMenuItemCard = () => {
    setIsAddMenuItemOpen(true);
  };

  const closeAddMenuItemCard = () => {
    setIsAddMenuItemOpen(false);
    // Reset the input fields
    setNewMenuItemTitle("");
    setNewMenuItemLink("");
  };

  const handleNewMenuItemTitleChange = (e) => {
    setNewMenuItemTitle(e.target.value);
  };

  const handleNewMenuItemLinkChange = (e) => {
    setNewMenuItemLink(e.target.value);
  };

  const handleAddMenuItem = async () => {
    try {
      const response = await instance.post("/menuitems", [
        {
          title: newMenuItemTitle,
          link: newMenuItemLink,
        },
      ]);
      if (response.status === 201) {
        // Successfully added the menu item, update the state
        const newMenuItem = response.data;
        setMenuItems((prevMenuItems) => [...prevMenuItems, newMenuItem]);

        // Close the "Add menu item" card
        closeAddMenuItemCard();
      } else {
        console.error("Error adding menu item:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  // Sort, Filter and Search
  const [sortType, setSortType] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = menuItems?.filter((menuItem) =>
      menuItem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  useEffect(() => {
    if (sortType === "asc") {
      const sortedMenuItems = menuItems?.sort((a, b) => a.id - b.id);
      setMenuItems(sortedMenuItems);
    } else if (sortType === "desc") {
      const sortedMenuItems = menuItems?.sort((a, b) => b.id - a.id);
      setMenuItems(sortedMenuItems);
    }
  }, [sortType]);

  useEffect(() => {
    if (searchTerm !== "") {
      setMenuItems(searchResults);
    }
  }, [searchResults]);

  const handleReset = () => {
    setSearchTerm("");
    setSortType("asc");
    // Refresh the page
    fetchMenuItems();
  };

  return (
    <>
      <div className="ViewContainer">
        <div className="ViewContentContainer">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <h1 style={{ paddingBottom: "2em" }}>These are Menu Items</h1>

            <div
              className="buttonHolder"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1em",
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
                  paddingBottom: "1.8em",
                }}
                onClick={() => router.push("/menus")}
                icon={<ArrowLeftOutlined />}
              >
                Show Menus
              </Button>

              <Button
                type="primary"
                style={{
                  backgroundColor: "var(--themes)",
                  borderColor: "var(--themes)",
                  color: "white",
                  borderRadius: "10px",
                  fontSize: "1.2em",
                  paddingBottom: "1.8em",
                }}
                onClick={openAddMenuItemCard}
                icon={<PlusCircleOutlined />}
              >
                Add New Menu Item
              </Button>
            </div>
          </div>
          {console.log("Menu Items: ", menuItems)}
          <Row
            style={{
              padding: "2em 3em",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Filter Button and Search Button */}
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {" "}
              <h3 style={{ fontSize: "1.4em" }}>Search: </h3>
              <Input
                placeholder="Search Menu Items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "16vw",
                  height: "2.8em",
                  borderRadius: "10px",
                  fontSize: "1.2em",
                  padding: "0 1em",
                  marginLeft: "1em",
                }}
              />
              {/* Reset Button */}
              <Button
                type="primary"
                style={{
                  backgroundColor: "var(--theme)",
                  borderColor: "var(--theme)",
                  color: "white",
                  borderRadius: "10px",
                  fontSize: "1.2em",
                  marginLeft: "1em",
                  paddingBottom: "1.8em",
                }}
                onClick={() => handleReset()}
                icon={<CloseCircleOutlined />}
              >
                Clear
              </Button>
            </Col>
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <h3 style={{ fontSize: "1.4em" }}>Sort by:</h3>
              {/* Toggle Switch Button */}
              <Switch
                size="large"
                checkedChildren="Added Last"
                unCheckedChildren="Added First"
                defaultChecked
                onChange={(checked) =>
                  checked ? setSortType("asc") : setSortType("desc")
                }
                style={{
                  marginLeft: "1em",
                  backgroundColor: "var(--theme)",
                }}
              />
            </Col>
          </Row>
          <Row style={{ padding: "2em 3em" }}>
            <Col span={4}>
              <h3 style={{ fontSize: "1.4em" }}>Item ID</h3>
            </Col>
            <Col span={8}>
              <h3 style={{ fontSize: "1.4em" }}>Item Name</h3>
            </Col>
            <Col span={6}>
              <h3 style={{ fontSize: "1.4em" }}>Item Link</h3>
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
          {isAddMenuItemOpen ? (
            <div>
              <Row
                style={{
                  padding: "2em 3em",
                  alignItems: "center",
                }}
              >
                <Col span={8} style={{ marginRight: "0em" }}>
                  <Input
                    placeholder="Menu Item Title"
                    value={newMenuItemTitle}
                    onChange={(e) => setNewMenuItemTitle(e.target.value)}
                    style={{
                      width: "16vw",
                      height: "2.8em",
                      borderRadius: "10px",
                      fontSize: "1.2em",
                      padding: "0 1em",
                    }}
                  />
                </Col>
                <Col span={8} style={{ marginLeft: "0em" }}>
                  <Input
                    placeholder="Menu Item Link"
                    value={newMenuItemLink}
                    onChange={(e) => setNewMenuItemLink(e.target.value)}
                    style={{
                      width: "16vw",
                      height: "2.8em",
                      borderRadius: "10px",
                      fontSize: "1.2em",
                      padding: "0 1em",
                    }}
                  />
                </Col>
                <Col span={8} style={{ paddingLeft: "2em" }}>
                  <Button
                    type="primary"
                    onClick={handleAddMenuItem}
                    style={{
                      marginRight: "1em",
                      backgroundColor: "var(--success)",
                      borderColor: "var(--success)",
                      color: "white",
                      borderRadius: "10px",
                      fontSize: "1.2em",
                      paddingBottom: "1.8em",
                    }}
                    icon={<PlusCircleOutlined />}
                  >
                    Add
                  </Button>
                  <Button
                    onClick={closeAddMenuItemCard}
                    style={{
                      backgroundColor: "var(--themes)",
                      borderColor: "var(--themes)",
                      color: "white",
                      borderRadius: "10px",
                      fontSize: "1.2em",
                      paddingBottom: "1.8em",
                    }}
                    icon={<CloseCircleOutlined />}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </div>
          ) : (
            ""
          )}
          {menuItems.length !== 0 ? (
            menuItems?.map((menuItem) => (
              <Row
                style={{
                  padding: "2em 3em",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Col span={4}>
                  <p style={{ fontSize: "1.2em" }}>{menuItem.id} </p>
                </Col>
                <Col span={4}>
                  {editingItemId === menuItem.id ? (
                    <Input
                      allowClear
                      showSearch
                      name="title"
                      value={editedTitleEn}
                      onChange={(e) => setEditedTitleEn(e.target.value)}
                    />
                  ) : (
                    <p style={{ fontSize: "1.2em" }}>{menuItem.title} </p>
                  )}{" "}
                </Col>
                {/* Title BN */}
                <Col span={4}>
                  {editingItemId === menuItem.id ? (
                    <Input
                      allowClear
                      showSearch
                      name="title_bn"
                      value={editedTitleBn}
                      onChange={(e) => setEditedTitleBn(e.target.value)}
                    />
                  ) : (
                    <p style={{ fontSize: "1.2em" }}>
                      {menuItem?.title_bn ? menuItem?.title_bn : "N/A"}{" "}
                    </p>
                  )}{" "}
                </Col>
                <Col span={4}>
                  {editingItemId === menuItem.id ? (
                    <Input
                      name="link"
                      value={editedLink}
                      onChange={(e) => setEditedLink(e.target.value)}
                    />
                  ) : (
                    <p
                      style={{
                        color: "var(--themes)",
                        textDecoration: "underline",
                        fontSize: "1.2em",
                      }}
                    >
                      {menuItem.link}{" "}
                    </p>
                  )}{" "}
                </Col>
                <Col span={8} style={{ paddingLeft: "2em" }}>
                  {editingItemId === menuItem.id ? (
                    <>
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "var(--success)",
                          borderColor: "var(--success)",
                          color: "white",
                          borderRadius: "10px",
                          fontSize: "1.2em",
                          marginRight: "1em",
                          paddingBottom: "1.8em",
                        }}
                        onClick={() => handleUpdate(menuItem.id)}
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
                          paddingBottom: "1.8em",
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
                          paddingBottom: "1.8em",
                        }}
                        onClick={() => handleEdit(menuItem.id)}
                        icon={<EditOutlined />}
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Are you sure you want to delete this menu item?"
                        onConfirm={() => handleDelete(menuItem.id)}
                        okText="Sure"
                        cancelText="Cancel"
                        open={
                          deleteConfirmationVisible &&
                          deleteItemId === menuItem.id
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
                            paddingBottom: "1.8em",
                          }}
                          onClick={() => showDeleteConfirmation(menuItem.id)}
                          icon={<DeleteOutlined />}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    </>
                  )}{" "}
                </Col>
              </Row>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <Loader />
            </div>
          )}{" "}
        </div>
      </div>
    </>
  );
}
