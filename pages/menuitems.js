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
  message,
  Radio,
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

const MenuItems = () => {
  useEffect(() => {
    // Set the dynamic page title for the Home page
    setPageTitle("Menu Items");
  }, []);

  const [menuItems, setMenuItems] = useState([]);
  const [initialMenuItem, setInitialMenuItem] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editedTitleEn, setEditedTitleEn] = useState("");
  const [editedTitleBn, setEditedTitleBn] = useState("");
  const [editedLink, setEditedLink] = useState("");
  const [editedMenuItem, setEditedMenuItem] = useState(null);
  const [originalMenuItem, setOriginalMenuItem] = useState(null);
  const [isAddMenuItemOpen, setIsAddMenuItemOpen] = useState(false);
  const [newMenuItemTitle, setNewMenuItemTitle] = useState("");
  const [newMenuItemTitleBn, setNewMenuItemTitleBn] = useState("");
  const [newMenuItemLink, setNewMenuItemLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [linkType, setLinkType] = useState("independent");
  const [sisterConcernSelected, setSisterConcernSelected] = useState(false);
  const [newParentId, setNewParentId] = useState(null);
  const [editedParentId, setEditedParentId] = useState(null);
  const [parentType, setParentType] = useState();

  const router = useRouter();

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await instance("/menuitems");
      if (response.data) {
        // setMenuItems(response.data);
        setMenuItems(response.data?.sort((a, b) => b.id - a.id));
        setInitialMenuItem(response.data?.sort((a, b) => b.id - a.id));
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
        // console.log("Pages: ", response.data);
        // message.success("Pages fetched successfully");
        setLoading(false);
      } else {
        // console.error("Error fetching pages:", response.data.message);
        message.error("Pages couldn't be fetched");
      }
    } catch (error) {
      // console.error("Error fetching pages:", error);
      message.error("Pages couldn't be fetched");
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchPages();
  }, [isAddMenuItemOpen, editingItemId]);

  const handleEdit = (id, e) => {
    // setMenuItems(searchResults);
    e.preventDefault();
    const menuItemToEdit = menuItems?.find((menuItem) => menuItem?.id === id);

    setEditingItemId(id);
    setEditedMenuItem({
      ...menuItemToEdit,
    });
    setOriginalMenuItem({
      ...menuItemToEdit,
    });
    setEditedTitleEn(menuItemToEdit.title);
    setEditedTitleBn(menuItemToEdit.title_bn);
    setEditedLink(menuItemToEdit.link);
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const handleUpdate = async (id) => {
    const menuItemToEdit = menuItems.find((menuItem) => menuItem.id === id);
    try {
      const updatedMenuItem = {
        ...menuItemToEdit,
        title: editedTitleEn ? editedTitleEn : menuItemToEdit.title,
        title_bn: editedTitleBn ? editedTitleBn : menuItemToEdit.title_bn,
        parent_id: editedParentId ? editedParentId : menuItemToEdit.parent_id,
        link: "/" + editedLink ? editedLink : menuItemToEdit.link,
      };

      const response = await instance.put(`/menuitems/${id}`, updatedMenuItem);
      if (response.status === 200) {
        const updatedMenuItems = menuItems?.map((menuItem) =>
          menuItem.id === id ? updatedMenuItem : menuItem
        );
        setMenuItems(updatedMenuItems);
        setEditingItemId(null);
        setEditedMenuItem(null);
        setOriginalMenuItem(null);
      } else {
        console.error("Error updating menu item:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating menu item:", error);
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
        const updatedMenuItems = menuItems.filter(
          (menuItem) => menuItem.id !== deleteItemId
        );
        setMenuItems(updatedMenuItems);
        setDeleteConfirmationVisible(false);
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
    setNewMenuItemTitleBn("");
    setNewMenuItemLink("");
  };

  const handleAddMenuItem = async () => {
    try {
      const response = await instance.post("/menuitems", [
        {
          title: newMenuItemTitle ? newMenuItemTitle : "N/A",
          title_bn: newMenuItemTitleBn ? newMenuItemTitleBn : "N/A",
          parent_id: newParentId ? newParentId : null,
          link: newMenuItemLink ? "/" + newMenuItemLink : "/",
        },
      ]);
      if (response.status === 201) {
        const newMenuItem = response.data;
        setMenuItems((prevMenuItems) => [...prevMenuItems, newMenuItem]);

        closeAddMenuItemCard();
      } else {
        console.error("Error adding menu item:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const [sortType, setSortType] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = initialMenuItem?.filter((menuItem) =>
      menuItem?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
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
    // searchTerm !== "" ? setMenuItems(searchResults) : setMenuItems(menuItems);
    searchTerm === ""
      ? setMenuItems(initialMenuItem)
      : setMenuItems(searchResults);
  }, [searchResults, searchTerm]);

  console.log("Menu Items: ", menuItems);

  const handleReset = () => {
    setSearchTerm("");
    setSortType("asc");
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
          <Row
            style={{
              padding: "2em 3em",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
                  width: "20vw",
                  height: "2.8em",
                  borderRadius: "10px",
                  fontSize: "1.2em",
                  padding: "0 1em",
                  margin: "0 1em",
                }}
              />
              <Button
                danger
                // disabled={searchTerm === ""}
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
            <Col span={2}>
              <h3 style={{ fontSize: "1.4em" }}>Item ID</h3>
            </Col>
            <Col span={4}>
              <h3 style={{ fontSize: "1.4em" }}>Item Name</h3>
            </Col>
            <Col span={4}>
              <h3 style={{ fontSize: "1.4em" }}>আইটেম নাম</h3>
            </Col>
            <Col span={4}>
              <h3 style={{ fontSize: "1.4em" }}>Parent Menu</h3>
            </Col>
            <Col span={4}>
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
                span={24}
                style={{
                  padding: "2em 3em",
                  alignItems: "center",
                  gap: "1em",
                }}
              >
                <Col span={1}>
                  <h3 style={{ fontSize: "1.4em" }}>New</h3>
                </Col>
                <Col span={4} style={{ marginRight: "0em" }}>
                  <Input
                    placeholder="Menu Item Title"
                    value={newMenuItemTitle}
                    onChange={(e) => setNewMenuItemTitle(e.target.value)}
                    style={{
                      // width: "16vw",
                      height: "2.8em",
                      borderRadius: "10px",
                      fontSize: "1.2em",
                      padding: "0 1em",
                    }}
                  />
                </Col>
                <Col span={4} style={{ marginRight: "0em" }}>
                  <Input
                    placeholder="মেনু আইটেম শিরোনাম"
                    value={newMenuItemTitleBn}
                    onChange={(e) => setNewMenuItemTitleBn(e.target.value)}
                    style={{
                      // width: "16vw",
                      height: "2.8em",
                      borderRadius: "10px",
                      fontSize: "1.2em",
                      padding: "0 1em",
                    }}
                  />
                </Col>
                <Col span={4} style={{ marginRight: "0em" }}>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select a Parent Menu"
                    optionFilterProp="children"
                    onChange={(value) => setNewParentId(value)}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option>No Parent</Select.Option>
                    {menuItems?.map((menuItem) => (
                      <Select.Option value={menuItem.id}>
                        {menuItem.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col
                  span={4}
                  style={{
                    marginLeft: "0em",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                  }}
                >
                  <br />
                  <Radio.Group
                    onChange={(e) => setLinkType(e.target.value)}
                    value={linkType}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Radio value="independent">Independent</Radio>
                    <Radio value="page">Page</Radio>
                    {/* <Radio value="sisterConcern">Sister Concern</Radio> */}
                  </Radio.Group>

                  {linkType === "page" ? (
                    <>
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select a page"
                        optionFilterProp="children"
                        onChange={(value) => setNewMenuItemLink(value)}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {pages?.map((page) => (
                          <Select.Option
                            value={`${page.slug}?pageId=${page?.id}&pageName=${page?.page_name_en}`}
                          >
                            {page.page_name_en}
                          </Select.Option>
                        ))}
                      </Select>
                    </>
                  ) : (
                    // linkType === "sisterConcern" ? (
                    //   <Select
                    //     showSearch
                    //     style={{ width: "100%" }}
                    //     placeholder="Select a Sister Concern"
                    //     optionFilterProp="children"
                    //     onChange={(value) => setNewMenuItemLink(value)}
                    //     filterOption={(input, option) =>
                    //       option.children
                    //         .toLowerCase()
                    //         .indexOf(input.toLowerCase()) >= 0
                    //     }
                    //   >
                    //     {pages?.map((page) => {
                    //       if (page.page_name_en?.includes("Ltd")) {
                    //         return (
                    //           <Select.Option
                    //             value={`sister-concerns?pageId=${page.id}`}
                    //           >
                    //             {page.page_name_en}
                    //           </Select.Option>
                    //         );
                    //       }
                    //     })}
                    //   </Select>
                    // ) :
                    <Input
                      placeholder="Menu Item Link"
                      value={newMenuItemLink}
                      onChange={(e) => setNewMenuItemLink(e.target.value)}
                      style={{
                        // width: "16vw",
                        height: "2.8em",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                        padding: "0 1em",
                      }}
                    />
                  )}
                </Col>
                <Col span={5}>
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
                <Col span={2}>
                  <p style={{ fontSize: "1.2em" }}>{menuItem.id} </p>
                </Col>
                <Col span={4}>
                  {editingItemId === menuItem?.id ? (
                    <Input
                      allowClear
                      showSearch
                      name="title"
                      value={editedTitleEn}
                      onChange={(e) => setEditedTitleEn(e.target.value)}
                    />
                  ) : (
                    <p
                      style={{
                        fontSize: "1.2em",
                        textWrap: "wrap",
                        wordWrap: "break-word",
                        paddingRight: "1em",
                      }}
                    >
                      {menuItem.title}{" "}
                    </p>
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
                    <p
                      style={{
                        fontSize: "1.2em",

                        textWrap: "wrap",
                        wordWrap: "break-word",
                        paddingRight: "1em",
                      }}
                    >
                      {menuItem?.title_bn ? menuItem?.title_bn : "N/A"}{" "}
                    </p>
                  )}{" "}
                </Col>
                <Col span={4}>
                  {editingItemId === menuItem.id ? (
                    <>
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select a Parent Menu"
                        optionFilterProp="children"
                        onChange={(value) => setEditedParentId(value)}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Select.Option>No Parent</Select.Option>
                        {menuItems?.map((menuItem) => (
                          <Select.Option value={menuItem.id}>
                            {menuItem.title}
                          </Select.Option>
                        ))}
                      </Select>
                    </>
                  ) : (
                    <p
                      style={{
                        fontSize: "1.2em",
                        textWrap: "wrap",
                        wordWrap: "break-word",
                        paddingRight: "1em",
                      }}
                    >
                      {menuItem?.parent_id
                        ? menuItems?.find(
                            (item) => item.id === parseInt(menuItem?.parent_id)
                          )?.title
                        : "N/A"}
                    </p>
                  )}{" "}
                </Col>
                <Col
                  span={4}
                  style={{
                    marginLeft: "0em",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                  }}
                >
                  {editingItemId === menuItem.id ? (
                    <>
                      {/* <h3 style={{ fontSize: "1.4em" }}>Parent Menu</h3>
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select a Parent Menu"
                        optionFilterProp="children"
                        onChange={(value) => setParentId(value)}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {
                          menuItems?.map((menuItem) => (
                            <Select.Option
                              value={menuItem.id}>
                              {menuItem.title}
                            </Select.Option>
                          ))
                        }
                      </Select> */}
                      <Radio.Group
                        onChange={(e) => setLinkType(e.target.value)}
                        value={linkType}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Radio value="independent">Independent</Radio>
                        <Radio value="page">Page</Radio>
                        {/* <Radio value="sisterConcern">Sister Concern</Radio> */}
                      </Radio.Group>
                      {linkType === "page" ? (
                        <>
                          <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Select a page"
                            optionFilterProp="children"
                            onChange={(value) => setEditedLink("/" + value)}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {pages?.map((page) => (
                              <Select.Option
                                value={`${page.slug}?pageId=${page?.id}&pageName=${page?.page_name_en}`}
                              >
                                {page.page_name_en}
                              </Select.Option>
                            ))}
                          </Select>
                        </>
                      ) : (
                        // :
                        // linkType === "sisterConcern" ? (
                        //   <Select
                        //     showSearch
                        //     style={{ width: "100%" }}
                        //     placeholder="Select a Sister Concern"
                        //     optionFilterProp="children"
                        //     onChange={(value) => setEditedLink(value)}
                        //     filterOption={(input, option) =>
                        //       option.children
                        //         .toLowerCase()
                        //         .indexOf(input.toLowerCase()) >= 0
                        //     }
                        //   >
                        //     {pages?.map((page) => {
                        //       if (page.page_name_en?.includes("Ltd")) {
                        //         return (
                        //           <Select.Option
                        //             value={`sister-concerns?pageId=${page.id}`}
                        //           >
                        //             {page.page_name_en}
                        //           </Select.Option>
                        //         );
                        //       }
                        //     })}
                        //   </Select>
                        // )
                        <Input
                          allowClear
                          showSearch
                          name="link"
                          value={editedLink}
                          onChange={(e) => setEditedLink(e.target.value)}
                        />
                      )}
                    </>
                  ) : (
                    <p
                      style={{
                        color: "var(--themes)",
                        textDecoration: "underline",
                        fontSize: "1.2em",
                        textWrap: "wrap",
                        wordWrap: "break-word",
                        paddingRight: "1em",
                      }}
                    >
                      {menuItem.link}{" "}
                    </p>
                  )}{" "}
                </Col>
                <Col span={6} style={{ paddingLeft: "2em" }}>
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
                          fontSize: "1em",
                          width: "clamp(100px, 4vw, 200px)",
                          marginRight: "1em",
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
                          fontSize: "1em",
                          width: "clamp(100px, 4vw, 200px)",
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
                        htmlType="button"
                        style={{
                          backgroundColor: "var(--theme)",
                          borderColor: "var(--theme)",
                          color: "white",
                          borderRadius: "10px",
                          fontSize: "1.2em",
                          marginRight: "1em",
                          paddingBottom: "1.8em",
                        }}
                        onClick={(e) => handleEdit(menuItem?.id, e)}
                        icon={<EditOutlined />}
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Are you sure you want to delete this menu item?"
                        onConfirm={() => handleDelete(menuItem?.id)}
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
              {/* <Loader /> */}
              {!loading && menuItems.length === 0 ? (
                <h1>No Menu Items Found</h1>
              ) : (
                <Loader />
              )}
            </div>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default MenuItems;
