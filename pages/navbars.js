import { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Popconfirm, Select, message } from "antd";

import instance from "../axios";
import SingleMediaSelect from "../components/SingleMediaSelect";
import MediaModal from "../components/MediaModal"; // Import the MediaModal component
import { setPageTitle } from "../global/constants/pageTitle";
import Loader from "../components/Loader";

const { Option } = Select;

const Navbars = () => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  const [media, setMedia] = useState([]);
  const [menus, setMenus] = useState([]);
  const [navbars, setNavbars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [mediaSelectionVisible, setMediaSelectionVisible] = useState(false);
  const [mediaSelectionVisible2, setMediaSelectionVisible2] = useState(false);
  const [editedNavbar, setEditedNavbar] = useState(null);
  const [editedNavbarId, setEditedNavbarId] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [navbarTitleEn, setNavbarTitleEn] = useState(null);
  const [navbarTitleBn, setNavbarTitleBn] = useState(null);
  const [unfolded, setUnfolded] = useState(false);
  const [formData, setFormData] = useState({
    // logo_id: null,
    menu_id: null,
  });
  const [isCreateNavbarFormVisible, setIsCreateNavbarFormVisible] =
    useState(false);

  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(null);


  const fetchData = async () => {
    try {
      setLoading(true);

      const [mediaResponse, menuResponse, navbarsResponse] =
        await Promise.all([
          instance("/media"),
          instance("/menus"),
          instance("/navbars"),
        ]);

      if (mediaResponse.data && menuResponse.data && navbarsResponse.data) {
        setMedia(mediaResponse.data);
        setMenus(menuResponse.data);
        setNavbars(navbarsResponse.data);

        console.log("Media Data", mediaResponse.data);
        console.log("Menu Data", menuResponse.data);
        console.log("Navbar Data", navbarsResponse.data);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddMediaToNavbar = (mediaId) => {
    const updatedNavbar = {
      ...editedNavbar,
    };

    updatedNavbar.logo_id = mediaId.id;

    setEditedNavbar(updatedNavbar);
    setFormData({ logo_id: mediaId.id });
    setMediaSelectionVisible(false);
  };

  const handleEditClick = (navbar) => {
    setEditedNavbar(navbar);
    setFormData({ logo_id: navbar.logo.id, menu_id: navbar.menu.id });
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedNavbar(null);
    setFormData({ logo_id: null, menu_id: null });
  };

  const handleUpdateNavbar = (navbar) => {
    const updatedData = {
      title_en: navbarTitleEn,
      logo_id: formData.logo_id,
      menu_id: formData.menu_id,
    };

    console.log("Updating Navbar ID:", navbar.id, "with data:", updatedData);
    instance
      .put(`/navbars/${navbar.id}`, updatedData)
      .then((response) => {
        message.success("Navbar updated successfully.");
        setEditMode(false);
        setEditedNavbar(null);
        setFormData({ logo_id: null, menu_id: null });
        const getData = async () => {
          try {
            const res = await instance.get("/navbars");
            setNavbars(res.data);
            setLoading(false);
          } catch (error) { }
        };
        getData();
      })
      .catch((error) => {
        console.error("Error updating navbar:", error);
      });
  };

  const handleDeleteNavbar = async (navbarId) => {
    try {
      const response = await instance.delete(`/navbars/${navbarId}`);
      if (response.status === 200) {
        message.success("Navbar deleted successfully.");
        setNavbars((prevNavbars) =>
          prevNavbars.filter((navbar) => navbar.id !== navbarId)
        );
      } else {
        console.error("Error deleting navbar:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting navbar:", error);
    }
  };

  const handleOpenMediaSelectionModal = () => {
    setMediaSelectionVisible(true);
  };
  const handleOpenMediaSelectionModal2 = () => {
    setMediaSelectionVisible2(true);
  };

  const handleCreateNavbar = async (e) => {
    e.preventDefault();
    if (!selectedMediaId || !selectedMenuId) {
      console.error("Please select both media and menu.");
      return;
    }
    e.preventDefault();
    try {
      const newNavbar = {
        title_en: navbarTitleEn,
        title_bn: navbarTitleBn,
        logo_id: selectedMediaId,
        menu_id: selectedMenuId,
      };
      const response = await instance.post("/navbars", newNavbar);
      if (response.status === 201) {
        setIsCreateNavbarFormVisible(false);
        setSelectedLogo(`${MEDIA_URL}/${selectedMediaId}`);
        message.success("Navbar created successfully.");
        const getData = async () => {
          try {
            const res = await instance.get("/navbars");
            setNavbars(res.data);
            setLoading(false);
          } catch (error) { }
        };
        getData();
      } else {
        console.error("Error creating navbar:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating navbar:", error);
    }
  };
  const handleMediaChange = (selectedMenuId) => {
    setSelectedMenuId(selectedMenuId);
    setFormData({
      ...formData,
      menu_id: selectedMenuId,
    });
  };

  const toggleCreateNavbarForm = () => {
    setIsCreateNavbarFormVisible(!isCreateNavbarFormVisible);
  };

  return (
    <>
      <div className="ViewContainer">
        <div className="ViewContentContainer">
          <div
            className="TopbarContainer"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <h1 style={{ paddingBottom: "2em" }}>These are Navbars</h1>

            <div
              className="buttonHolder"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
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
                icon={<PlusCircleOutlined />}
                onClick={toggleCreateNavbarForm}
              >
                Add New Navbar
              </Button>
            </div>
          </div>
          <div className="NavbarListContainer">
            {/* Create Navbar */}
            {isCreateNavbarFormVisible && (
              <div>
                <form
                  onSubmit={(e) => handleCreateNavbar(e)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1em",
                    border: "2px solid var(--theme)",
                    borderRadius: "10px",
                    marginBottom: "1em",
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "2em",
                  }}>
                    <div><label>
                      Navbar Title (English)
                      <span style={{ color: "red" }}>*</span>
                    </label>
                      <Input
                        style={{
                          width: "50%"
                        }}
                        allowClear
                        type="text"
                        name="title_en"
                        placeholder="Enter Navbar Title"
                        value={navbarTitleEn}
                        onChange={(e) => setNavbarTitleEn(e.target.value)}
                      /></div>
                    <div><label>
                      Navbar Title (Bangla)
                      <span style={{ color: "red" }}>*</span>
                    </label>
                      <Input
                        style={{
                          width: "50%"
                        }}
                        allowClear
                        type="text"
                        name="title_bn"
                        placeholder="Enter Navbar Title (Bangla)"
                        value={navbarTitleBn}
                        onChange={(e) => setNavbarTitleBn(e.target.value)}
                      /></div>

                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selectedLogo ? (
                      <img
                        src={selectedLogo}
                        alt="Selected Logo"
                        style={{ width: "150px" }}
                      />
                    ) : (
                      <img
                        src="/images/Image_Placeholder.png"
                        alt="Logo"
                        style={{ width: "150px" }}
                      />
                    )}
                    <SingleMediaSelect
                      media={media}
                      onMediaSelect={(mediaId) => setSelectedMediaId(mediaId)}
                      visible={mediaSelectionVisible2}
                      onCancel={() => setMediaSelectionVisible2(false)}
                      setSelectedMenuId={setSelectedMenuId}
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
                      onClick={() => handleOpenMediaSelectionModal2()}
                    >
                      Choose Logo
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <label htmlFor="menu">Select Menu:</label>
                    <Select
                      showSearch
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select a menu"
                      onChange={(selectedMenuId) =>
                        handleMediaChange(selectedMenuId)
                      }
                      value={formData.menu_id}
                    >
                      {menus?.map((menu) => (
                        <>
                          {" "}
                          {console.log(formData, "formData")}
                          <Option key={menu.id} value={menu?.id}>
                            {menu.name}{" "}
                          </Option>
                        </>
                      ))}{" "}
                    </Select>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<CheckCircleOutlined />}
                      style={{
                        backgroundColor: "var(--theme)",
                        borderColor: "var(--theme)",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                        paddingBottom: "1.8em",
                        marginRight: "1em",
                      }}
                      onClick={handleCreateNavbar}
                    >
                      Create
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={toggleCreateNavbarForm}
                      style={{
                        backgroundColor: "var(--themes)",
                        borderColor: "var(--themes)",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                        paddingBottom: "1.8em",
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 5fr",
                gap: "1em",
                marginBottom: "1em",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--theme)",
                color: "white",
                padding: "1em",
                borderRadius: "10px",
              }}
            >
              <h3>Navbar Names</h3>
              <h3
                style={{
                  textAlign: "center",
                  borderLeft: "1px solid white",
                }}
              >
                Navbars
              </h3>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <>
                {navbars?.map((navbar) => (
                  <div
                    className="navbarContainer"
                    key={navbar.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 5fr",
                      gap: "1em",
                      marginBottom: "1em",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      {editMode && editedNavbar?.id === navbar.id ? (
                        <div className="editModeForm">
                          <form>
                            {/* <div
                              style={{
                                display: "flex",
                                gap: "1em",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Input
                                type="text"
                                name="title_en"
                                value={navbarTitleEn}
                                onChange={(e) =>
                                  setNavbarTitleEn(e.target.value)
                                }
                              />
                            </div> */}
                            <div style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              gap: "2em",
                            }}>
                              <div><label>
                                Navbar Title (English)
                                <span style={{ color: "red" }}>*</span>
                              </label>
                                <Input
                                  style={{
                                    width: "70%"
                                  }}
                                  allowClear
                                  type="text"
                                  name="title_en"
                                  placeholder={navbar?.title_en}
                                  defaultValue={navbar?.title_en}
                                  value={navbarTitleEn}
                                  onChange={(e) => setNavbarTitleEn(e.target.value)}
                                /></div>
                              <div><label>
                                Navbar Title (Bangla)
                                <span style={{ color: "red" }}>*</span>
                              </label>
                                <Input
                                  style={{
                                    width: "70%"
                                  }}
                                  allowClear
                                  type="text"
                                  name="title_bn"
                                  placeholder={navbar?.title_bn}
                                  defaultValue={navbar?.title_bn}
                                  value={navbarTitleBn}
                                  onChange={(e) => setNavbarTitleBn(e.target.value)}
                                /></div>

                            </div>
                          </form>
                        </div>
                      ) : (
                        <div>
                          <h3>{navbar.title_en}</h3>
                          <h3>{navbar.title_bn}</h3>
                        </div>
                      )}
                    </div>
                    <div
                      className="column"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 3fr 3fr",
                        padding: "1em 2em",
                        marginBottom: "1em",
                        border: "1px solid var(--themes)",
                        borderRadius: 10,
                      }}
                    >
                      {/* 1st Column: Logo */}
                      <div className="logoColumn">
                        {editMode && editedNavbar?.id === navbar.id ? (
                          <div className="editModeForm">
                            <form>
                              <div>
                                <div
                                  className="navbar-media"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {media.length > 0 ? (
                                    media[0].file_path.endsWith(".mp4") ? (
                                      <video
                                        controls
                                        muted
                                        style={{
                                          height: "200px",
                                          width: "15vw",
                                          objectFit: "cover",
                                          borderRadius: 10,
                                        }}
                                      >
                                        <source
                                          src={`${MEDIA_URL}/${media[0].file_path}`}
                                          type="video/mp4"
                                        />
                                      </video>
                                    ) : (
                                      <img
                                        alt={navbar.title_en}
                                        src={`${MEDIA_URL}/${navbar.logo.file_path}`}
                                        style={{
                                          height: "200px",
                                          width: "18vw",
                                          objectFit: "cover",
                                          borderRadius: 10,
                                        }}
                                      />
                                    )
                                  ) : (
                                    <img
                                      src="/images/Image_Placeholder.png"
                                      style={{
                                        height: "200px",
                                        width: "18vw",
                                        objectFit: "cover",
                                        borderRadius: 10,
                                      }}
                                    />
                                  )}
                                  {(!editMode ||
                                    editedNavbarId !== navbar.id) && (
                                      <>
                                        <Button
                                          className="change-media-button"
                                          style={{
                                            fontSize: "1rem",
                                            position: "absolute",
                                            background: "rgba(0, 0, 0, 0.6)",
                                            color: "#fff",
                                            padding: "18px 16px",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                          onClick={() =>
                                            handleOpenMediaSelectionModal(
                                              navbar.id
                                            )
                                          }
                                        >
                                          Change
                                        </Button>
                                      </>
                                    )}{" "}
                                </div>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <img
                            src={`${MEDIA_URL}/${navbar.logo.file_path}`}
                            alt={navbar.logo.file_name}
                            style={{ maxWidth: "150px" }}
                          />
                        )}{" "}
                      </div>

                      {/* 2nd Column: Menu Items or Selection Dropdown */}
                      <div
                        className="menuColumn"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {editMode && editedNavbar?.id === navbar.id ? (
                          <div className="editModeForm">
                            <form>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "1em",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <label htmlFor="menuItems">Menu:</label>
                                <Select
                                  showSearch
                                  allowClear
                                  style={{ width: "100%" }}
                                  placeholder="Select a menu"
                                  onChange={(selectedMenuId) =>
                                    setFormData({
                                      ...formData,
                                      menu_id: selectedMenuId,
                                    })
                                  }
                                  value={formData.menu_id}
                                >
                                  {menus?.map((menu) => (
                                    <Option key={menu.id} value={menu.id}>
                                      {menu.name}{" "}
                                    </Option>
                                  ))}{" "}
                                </Select>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <div
                            className="menu"
                            style={{
                              display: "flex",
                              gap: "1em",
                              justifyContent: "center",
                            }}
                          >
                            {/* show menu items if more than 3 items, put dropdown */}
                            {navbar.menu.menu_items.length > 4 ? (
                              <>
                                <Button
                                  icon={<MenuOutlined />}
                                  style={{
                                    backgroundColor: "var(--themes)",
                                    borderColor: "var(--themes)",
                                    color: "white",
                                    borderRadius: "10px",
                                    fontSize: "1.2em",
                                    padding: "1em 3em",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  onClick={() => {
                                    setUnfolded(prevState => ({ ...prevState, [navbar.id]: !prevState[navbar.id] }));
                                  }}
                                />
                                {unfolded[navbar.id] && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      backgroundColor: "var(--themes)",
                                      color: "white",
                                      borderRadius: "10px",
                                      fontSize: "1.2em",
                                      padding: "1em 3em",
                                      zIndex: 1,
                                      marginTop: "3em",
                                    }}
                                  >
                                    {/* arrow triangle on top */}
                                    <div
                                      style={{
                                        position: "absolute",
                                        top: "-1em",
                                        left: "5.5em",
                                        width: 0,
                                        height: 0,
                                        borderLeft: "1em solid transparent",
                                        borderRight: "1em solid transparent",
                                        borderBottom: "1em solid var(--themes)",
                                      }}
                                    />

                                    {navbar.menu.menu_items?.map((menuItem) => (
                                      <div
                                        key={menuItem.id}
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          borderBottom: "1px solid white",
                                          padding: "1em 0",
                                        }}
                                      >
                                        <p>{menuItem.title}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              navbar.menu.menu_items?.map((menuItem) => (
                                <div key={menuItem.id}>
                                  <p>{menuItem.title}</p>
                                </div>
                              ))
                            )}
                          </div>
                        )}{" "}
                      </div>

                      {/* 3rd Column: Action Buttons */}
                      <div
                        className="actionColumn"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {editMode && editedNavbar?.id === navbar.id ? (
                          <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => handleUpdateNavbar(navbar)}
                            style={{
                              marginRight: "1em",
                              backgroundColor: "var(--theme)",
                            }}
                          >
                            Update
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => handleEditClick(navbar)}
                            style={{
                              marginRight: "1em",
                              backgroundColor: "var(--theme)",
                            }}
                          >
                            Edit
                          </Button>
                        )}
                        {editMode && editedNavbar?.id === navbar.id ? (
                          <Button
                            type="primary"
                            icon={<CloseCircleOutlined />}
                            onClick={() => handleCancelEdit()}
                            danger
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Popconfirm
                            title="Are you sure you want to delete this navbar?"
                            onConfirm={() => handleDeleteNavbar(navbar.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button danger icon={<DeleteOutlined />}>
                              Delete
                            </Button>
                          </Popconfirm>
                        )}{" "}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Render the MediaModal */}
      <MediaModal
        mediaList={media}
        visible={mediaSelectionVisible}
        onCancel={() => setMediaSelectionVisible(false)}
        onSelect={(selectedMedia) => {
          handleAddMediaToNavbar(selectedMedia);
          setMediaSelectionVisible(false);
        }}
      />
    </>
  );
};

export default Navbars;
