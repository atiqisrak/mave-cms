import {
  Button,
  Card,
  Col,
  Row,
  Table,
  AntCard,
  Image,
  Carousel,
  Space,
  Select,
  Modal,
} from "antd";
import React, { useState, useEffect } from "react";
import instance from "../axios";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteFilled,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import MultipleMediaSelectModal from "../components/MultipleMediaSelectModal";
import MediaSelectionModal from "../components/MediaSelectionModal";
import CreateHomePage from "../components/CreateHomePage";

const Home = () => {
  const { Title } = Typography;
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [loading, setLoading] = useState(true);
  const [expandedHomepageId, setExpandedHomepageId] = useState(null);
  const [editmode, setEditMode] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [updateResponse, setUpdateResponse] = useState();
  const [videos, setVideos] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleExpand = (homepageId) => {
    if (expandedHomepageId === homepageId) {
      // Collapse the expanded card if it's clicked again
      setExpandedHomepageId(null);
    } else {
      setExpandedHomepageId(homepageId);
    }
  };

  const handleEditPageClick = (pageId) => {
    setSelectedPageId(pageId);
    setEditMode(true);

    // Initialize formData with existing data fetched from /home
    setFormData({
      navbar_id: homepages.navbar_id,
      slider_id: homepages.slider_id,
      card_id: homepages.card_id,
      cards_id: homepages.cards_id,
      media_id: homepages.media_id,
      media_ids: homepages.media_ids,
      footer_id: homepages.footer_id,
    });
  };

  // Delete Page
  const handleDeletePage = async (pageId) => {
    try {
      Modal.confirm({
        title: "Confirm",
        content: "Are you sure you want to delete this card?",
        okText: "Yes",
        cancelText: "No",
        onOk: () => {
          instance.delete(`/home/${pageId}`).then((res) => {
            console.log("Deleted Page: ", res);
            // Refresh card data after deletion
            instance.get("/home").then((res) => {
              setHomepages(res.data);
            });
          });
        },
      });
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  const handleFormChange = (fieldName, value) => {
    // Update the formData with the edited field
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedPageId || !formData) {
      return;
    }

    try {
      // Send a PUT request with the formData as the payload
      const response = await instance.put(`/home/${selectedPageId}`, formData);

      if (response?.status === 200) {
        setUpdateResponse(response);
      }

      // Disable edit mode and perform any other necessary actions
      setEditMode(false);
      setSelectedPageId(null);
      console.log("Page updated");
    } catch (error) {
      console.error("Error updating page:", error);
    }
  };

  // Fetch Media Assets
  const [media, setMedia] = useState([]);
  useEffect(() => {
    const fetchMediaAssets = async () => {
      try {
        setLoading(true);
        const response = await instance("/media");
        if (response.data) {
          setMedia(response.data);
          // console.log("Media Assets: ", response.data);
          setLoading(false);
        } else {
          console.error("Error fetching media assets:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching media assets:", error);
      }
    };

    fetchMediaAssets();
  }, []);

  const [homepage, setHomepage] = useState({
    medias: [],
  });

  // Filter videos
  const video = media.filter((mediaItem) =>
    mediaItem.file_type.startsWith("video")
  );

  useEffect(() => {
    setVideos(video);
  }, [media]);

  // Fetch Navbars
  const [navbars, setNavbars] = useState([]);
  const fetchNavbars = async () => {
    try {
      setLoading(true);
      const response = await instance("/navbars");
      if (response.data) {
        setNavbars(response.data);
        // console.log("Navbar Assets: ", response.data);
        setLoading(false);
      } else {
        console.error("Error fetching media assets:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching media assets:", error);
    }
  };

  useEffect(() => {
    fetchNavbars();
  }, []);

  // Fetch Slider Data
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setLoading(true);
        const response = await instance("/sliders");
        if (response.data) {
          setSliders(response.data);
          // console.log("Slider Assets: ", response.data);
          setLoading(false);
        } else {
          console.error("Error fetching media assets:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching media assets:", error);
      }
    };

    fetchSliders();
  }, []);

  // Fetch Card Data
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await instance("/cards");
        if (response.data) {
          setCards(response.data);
          // console.log("Card Assets: ", response.data);
          setLoading(false);
        } else {
          console.error("Error fetching media assets:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching media assets:", error);
      }
    };

    fetchCards();
  }, []);

  // Fetch Footers
  const [footers, setFooters] = useState([]);
  const fetchFooters = async () => {
    try {
      setLoading(true);
      const response = await instance("/footers");
      if (response.data) {
        setFooters(response.data);
        // console.log("Footer Assets: ", response.data);
        setLoading(false);
      } else {
        console.error("Error fetching media assets:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching media assets:", error);
    }
  };

  useEffect(() => {
    fetchFooters();
  }, []);

  //   Fetch Page Data
  const [homepages, setHomepages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const response = await instance("/home");
        if (response.data) {
          setHomepages(response.data);
          console.log("Page Assets: ", response.data);
          setLoading(false);
        } else {
          console.error("Error fetching media assets:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching media assets:", error);
      }
    };

    fetchPages();
  }, [updateResponse]);

  // Slider arrows
  const CustomPrevArrow = ({ onClick }) => (
    <Button
      icon={<LeftOutlined />}
      onClick={onClick}
      size="large"
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        zIndex: "1",
        backgroundColor: "#bababa80",
        border: "none",
        color: "var(--black)",
        width: "100px",
        height: "60px",
        marginLeft: "20px",
      }}
    ></Button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <Button
      icon={<RightOutlined />}
      onClick={onClick}
      size="large"
      style={{
        position: "absolute",
        top: "50%",
        right: 0,
        zIndex: "1",
        backgroundColor: "transparent",
        border: "none",
        backgroundColor: "#bababaac",
        border: "none",
        color: "var(--black)",
        width: "100px",
        height: "60px",
        marginRight: "20px",
      }}
    ></Button>
  );

  useEffect(() => {
    // Update formData when selectedMedia changes
    if (selectedMedia) {
      setFormData({
        ...formData,
        media_ids: selectedMedia,
      });
    }
  }, [selectedMedia]);

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleCreateHomepage = async (formData) => {
    try {
      setLoading(true);

      // Make a POST request with the formData
      const response = await instance.post("/home", formData);

      if (response?.status === 200) {
        message.success("Homepage created successfully.");
        setCreateMode(false);
      }
    } catch (error) {
      message.error("Error creating homepage: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="ViewContainer">
        <div className="ViewContentContainer">
          {/* Page Header */}
          <div
            className="PageHeader"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1>Home Page</h1>

            {createMode ? (
              <Button
                danger
                style={{
                  borderRadius: "10px",
                  fontSize: "1.2em",
                  marginRight: "1em",
                  paddingBottom: "1.8em",
                }}
                icon={<CloseCircleFilled />}
                onClick={() => setCreateMode(false)}
              >
                Cancel Create
              </Button>
            ) : (
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
                icon={<CheckCircleFilled />}
                onClick={() => setCreateMode(true)}
              >
                Create New
              </Button>
            )}
            <CreateHomePage
              visible={createMode}
              onCreate={handleCreateHomepage}
              onCancel={() => setCreateMode(false)}
              navbars={navbars}
              media={media}
              loading={loading}
              sliders={sliders}
              cards={cards}
              footers={footers}
              videos={videos}
            />
          </div>

          {/* Page Body */}
          <div className="pageContainers">
            <div className="pageContainer">
              {createMode ? (
                <>
                  <div
                    className="createMode"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      border: "3px solid var(--theme)",
                      borderRadius: 10,
                      backgroundColor: "#f0f0f0",
                      padding: "4em 1em",
                    }}
                  >
                    <h1>Create Mode on</h1>
                    <div
                      className="createModeContainer"
                      style={{
                        padding: "2em 0",
                      }}
                    >
                      <div className="navbar">
                        <h2
                          style={{
                            paddingBottom: "1em",
                          }}
                        >
                          <center>Navbar Section</center>
                        </h2>
                        <Select
                          showSearch
                          value={formData?.navbar_id} // Set the selected value to formData.navbar_id
                          onChange={(value) =>
                            handleFormChange("navbar_id", value)
                          }
                          style={{ width: "50vw" }}
                          defaultValue={homepage.navbar_id}
                        >
                          {navbars?.map((navbar) => (
                            <Option key={navbar.id} value={navbar.id} large>
                              <div
                                className="navbarList"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "1em 5em",
                                  height: "100%",
                                }}
                              >
                                <div className="logoColumn">
                                  <img
                                    src={`${MEDIA_URL}/${navbar.logo.file_path}`}
                                    alt={navbar.logo.file_name}
                                    style={{ maxWidth: "150px" }}
                                  />
                                </div>
                                <div
                                  className="menuColumn"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    className="menu"
                                    style={{
                                      display: "flex",
                                      gap: "1em",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      fontSize: "1.5em",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {/* Render the menu items */}
                                    {navbar.menu.menu_items?.map((menuItem) => (
                                      <div key={menuItem.id}>
                                        <p>{menuItem.title}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </div>
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
                        icon={<CheckCircleFilled />}
                        onClick={() => handleCreateHomepage()}
                      >
                        Create New
                      </Button>
                    </div>
                  </div>
                </>
              ) : null}

              <Row gutter={16}>
                {homepages?.map((homepage) => (
                  <Col key={homepage.id} xs={24}>
                    <Card
                      title={`Page ID: ${homepage.id}`}
                      extra={
                        <Button onClick={() => handleExpand(homepage.id)}>
                          {expandedHomepageId === homepage.id
                            ? "Collapse"
                            : "Expand"}
                        </Button>
                      }
                      style={{
                        marginBottom: "5em",
                        marginTop: "3em",
                        border: "1px solid var(--theme)",
                        borderRadius: 10,
                      }}
                    >
                      {expandedHomepageId === homepage.id && (
                        <div>
                          <center>
                            {editmode ? (
                              <>
                                <Button
                                  danger
                                  style={{
                                    borderRadius: "10px",
                                    fontSize: "1.2em",
                                    marginRight: "1em",
                                    paddingBottom: "1.8em",
                                  }}
                                  icon={<CloseCircleFilled />}
                                  onClick={() => {
                                    setEditMode(false);
                                  }}
                                >
                                  Cancel Edit
                                </Button>
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
                                  icon={<CheckCircleFilled />}
                                  onClick={handleSubmit}
                                >
                                  Submit
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
                                  icon={<EditOutlined />}
                                  onClick={() => {
                                    handleEditPageClick(homepage.id);
                                  }}
                                >
                                  Edit Page
                                </Button>
                                <Button
                                  danger
                                  style={{
                                    borderRadius: "10px",
                                    fontSize: "1.2em",
                                    marginRight: "1em",
                                    paddingBottom: "1.8em",
                                  }}
                                  icon={<DeleteFilled />}
                                  onClick={() => {
                                    handleDeletePage(homepage.id);
                                  }}
                                >
                                  Delete Page
                                </Button>
                              </>
                            )}
                          </center>

                          {/* Navbar */}
                          <h2 style={{ paddingTop: "5em" }}>
                            <center>Navbar Section</center>
                          </h2>
                          <div className="navbars">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingBottom: "1em",
                              }}
                            >
                              <h3>Navbar ID: {homepage.navbar_id}</h3>
                            </div>
                            <div
                              className="navbar"
                              style={{
                                display: "grid",
                                gridTemplateColumns: "2fr 5fr 3fr",
                                padding: "1em 2em",
                                marginBottom: "3em",
                                borderRadius: 10,
                              }}
                            >
                              {editmode ? (
                                <>
                                  {/* <label>Navbar ID:</label> */}
                                  <Select
                                    showSearch
                                    value={formData?.navbar_id} // Set the selected value to formData.navbar_id
                                    onChange={(value) =>
                                      handleFormChange("navbar_id", value)
                                    }
                                    style={{ width: "50vw" }}
                                    defaultValue={homepage.navbar_id}
                                  >
                                    {navbars?.map((navbar) => (
                                      <Option
                                        key={navbar.id}
                                        value={navbar.id}
                                        large
                                      >
                                        <div
                                          className="navbarList"
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "1em 5em",
                                            height: "100%",
                                          }}
                                        >
                                          <div className="logoColumn">
                                            <img
                                              src={`${MEDIA_URL}/${navbar.logo.file_path}`}
                                              alt={navbar.logo.file_name}
                                              style={{ maxWidth: "150px" }}
                                            />
                                          </div>
                                          <div
                                            className="menuColumn"
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            <div
                                              className="menu"
                                              style={{
                                                display: "flex",
                                                gap: "1em",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                fontSize: "1.5em",
                                                fontWeight: "600",
                                              }}
                                            >
                                              {/* Render the menu items */}
                                              {navbar.menu.menu_items?.map(
                                                (menuItem) => (
                                                  <div key={menuItem.id}>
                                                    <p>{menuItem.title}</p>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </Option>
                                    ))}
                                  </Select>
                                </>
                              ) : (
                                <>
                                  <div className="logoColumn">
                                    <img
                                      src={`${MEDIA_URL}/${homepage?.navbar?.logo?.file_path}`}
                                      alt={homepage?.navbar?.logo?.file_name}
                                      style={{ maxWidth: "150px" }}
                                    />
                                  </div>
                                  <div
                                    className="menuColumn"
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      className="menu"
                                      style={{
                                        display: "flex",
                                        gap: "1em",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {/* Render the menu items */}
                                      {homepage?.navbar?.menu?.menu_items?.map(
                                        (menuItem) => (
                                          <div key={menuItem.id}>
                                            <p>{menuItem.title}</p>
                                          </div>
                                        )
                                      )}{" "}
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Slider */}
                          <h2 style={{ paddingTop: "5em" }}>
                            <center>Slider Section</center>
                          </h2>

                          <div className="slider">
                            <div
                              className="elementHeading"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <h3>Slider ID: {homepage.slider?.id}</h3>
                            </div>

                            {editmode ? (
                              <Select
                                showSearch
                                value={formData?.slider_id}
                                onChange={(value) =>
                                  handleFormChange("slider_id", value)
                                }
                                defaultValue={homepage.slider.title_en}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "50vw",
                                }}
                              >
                                {sliders?.map((slider) => (
                                  <Option key={slider.id} value={slider.id}>
                                    {slider.title_en}
                                  </Option>
                                ))}
                              </Select>
                            ) : (
                              <>
                                {homepage.slider &&
                                Array.isArray(homepage.slider.medias) ? (
                                  <div
                                    style={{
                                      border: "1px solid var(--themes)",
                                      padding: "1em 2em",
                                      borderRadius: 10,
                                      marginBottom: "1em",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Carousel
                                      style={{
                                        position: "relative",
                                        width: "50vw",
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                      autoplay
                                      arrows={true}
                                      prevArrow={<CustomPrevArrow />}
                                      nextArrow={<CustomNextArrow />}
                                    >
                                      {homepage.slider.medias?.map(
                                        (mediaItem, index) => (
                                          <div key={index}>
                                            <Image
                                              src={`${MEDIA_URL}/${mediaItem.file_path}`}
                                              alt={mediaItem.file_name}
                                              width="50vw"
                                              height={600}
                                              style={{
                                                objectFit: "cover",
                                                borderRadius: 10,
                                              }}
                                            />
                                          </div>
                                        )
                                      )}
                                    </Carousel>

                                    <Space
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        paddingTop: "2em",
                                      }}
                                    >
                                      <Title level={4}>
                                        Title: {homepage.slider?.title_en}
                                      </Title>
                                      <Title level={5}>
                                        শিরোনাম: {homepage.slider?.title_bn}
                                      </Title>
                                    </Space>
                                  </div>
                                ) : (
                                  <p>No slider images available</p>
                                )}
                              </>
                            )}
                          </div>

                          {/* Cards */}
                          <h2 style={{ paddingTop: "5em" }}>
                            <center>Card Section</center>
                          </h2>

                          {editmode ? (
                            <Select
                              showSearch
                              value={formData?.card_id}
                              onChange={(value) =>
                                handleFormChange("card_id", value)
                              }
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "50vw",
                                marginBottom: "4em",
                              }}
                              defaultValue={homepage.card.title_en}
                            >
                              {cards?.map((card) => (
                                <Option key={card.id} value={card.id}>
                                  <div
                                    className="cardList"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "50vw",
                                    }}
                                  >
                                    {card.title_en}
                                  </div>
                                </Option>
                              ))}
                            </Select>
                          ) : (
                            <>
                              <div
                                className="cards"
                                style={{
                                  paddingBottom: "5em",
                                  paddingTop: "2em",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingBottom: "1em",
                                  }}
                                >
                                  <h3>Card Title: {homepage.card.page_name}</h3>
                                </div>

                                <div className="card">
                                  {homepage.card && (
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingBottom: "1em",
                                        border: "1px solid var(--themes)",
                                        borderRadius: 10,
                                        padding: "1em 2em",
                                        marginBottom: "2em",
                                      }}
                                    >
                                      <Col span={16} key={homepage.card.id}>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                            marginBottom: "2rem",
                                            gap: "1rem",
                                          }}
                                        >
                                          <h3>Descriptions</h3>
                                          <p>
                                            <strong
                                              style={{ color: "var(--themes)" }}
                                            >
                                              Card ID:
                                            </strong>
                                            {homepage.card.id}
                                          </p>
                                          <p>
                                            <strong
                                              style={{ color: "var(--themes)" }}
                                            >
                                              Title EN:
                                              <br />
                                            </strong>
                                            {homepage.card.title_en}
                                          </p>
                                          <p>
                                            <strong
                                              style={{ color: "var(--themes)" }}
                                            >
                                              Title BN:
                                              <br />
                                            </strong>
                                            {homepage.card.title_bn}
                                          </p>

                                          <p>
                                            <strong
                                              style={{ color: "var(--themes)" }}
                                            >
                                              Page Name:
                                              <br />
                                            </strong>
                                            {homepage.card.page_name}
                                          </p>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                homepage.card.description_en,
                                            }}
                                            style={{
                                              fontSize: "1.2rem",
                                            }}
                                          />
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                homepage.card.description_bn,
                                            }}
                                            style={{
                                              fontSize: "1.2rem",
                                            }}
                                          />
                                        </div>
                                        <br />
                                        <br />
                                        <Button
                                          type="primary"
                                          style={{ marginTop: "1rem" }}
                                          onClick={() => {}}
                                        >
                                          Learn More
                                        </Button>
                                      </Col>
                                      <Col span={8} key={homepage.card.id}>
                                        <div className="card-media">
                                          <div
                                            className="card-media"
                                            style={{}}
                                          >
                                            {homepage.card.media_files &&
                                            homepage.card.media_files.file_type.startsWith(
                                              "image"
                                            ) ? (
                                              <Image
                                                src={`${MEDIA_URL}/${homepage.card.media_files.file_path}`}
                                                alt="Card Media"
                                                style={{
                                                  height: "200px",
                                                  width: "18vw",
                                                  objectFit: "contain",
                                                  borderRadius: 10,
                                                }}
                                              />
                                            ) : homepage.card.media_files &&
                                              homepage.card.media_files.file_type.startsWith(
                                                "video"
                                              ) ? (
                                              <video
                                                controls
                                                width="100%"
                                                height="200"
                                                objectFit="cover"
                                                src={`${MEDIA_URL}/${homepage.card.media_files.file_path}`}
                                              >
                                                Your browser does not support
                                                the video tag.
                                              </video>
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
                                          </div>
                                        </div>
                                      </Col>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          )}

                          {/* Why United Aygaz */}
                          <h2 style={{ paddingBottom: "2em" }}>
                            <center>Why United Aygaz Section</center>
                          </h2>
                          {/* Show Cards in carousel */}
                          <div className="cardscarousel">
                            {editmode ? (
                              <Select
                                allowClear
                                showSearch
                                filterOption={(input, option) =>
                                  option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }
                                mode="multiple"
                                size="large"
                                value={formData?.cards_id}
                                onChange={(value) =>
                                  handleFormChange("cards_id", value)
                                }
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "50vw",
                                }}
                                defaultValue={homepage.cards?.map(
                                  (card) => card.title_en
                                )}
                              >
                                {cards?.map((card) => (
                                  <Option
                                    key={card.id}
                                    value={card.id}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "50vw",
                                    }}
                                  >
                                    {card.title_en}
                                  </Option>
                                ))}
                              </Select>
                            ) : (
                              <Carousel
                                autoplay
                                arrows={true}
                                prevArrow={<CustomPrevArrow />}
                                nextArrow={<CustomNextArrow />}
                              >
                                {homepage.cards?.map((card) => (
                                  <div key={card.id}>
                                    <Card title={card.title_en}>
                                      <div
                                        className="cardContainer"
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        {/* <Image
                                                                                        src={`${MEDIA_URL}/${card.media_files.file_path}`}
                                                                                        alt={card.media_files.file_name}
                                                                                        width="65%"
                                                                                        height="40em"
                                                                                        objectFit="cover"
                                                                                    /> */}
                                        {card.media_files.file_type.startsWith(
                                          "image"
                                        ) ? (
                                          <Image
                                            preview={false}
                                            src={`${MEDIA_URL}/${card.media_files.file_path}`}
                                            alt={card.media_files.file_name}
                                            style={{
                                              width: "35vw",
                                              height: "450px",
                                              objectFit: "cover",
                                              borderRadius: 10,
                                            }}
                                          />
                                        ) : card.media_files.file_type.startsWith(
                                            "video"
                                          ) ? (
                                          <video
                                            autoPlay
                                            loop
                                            muted
                                            width="450px"
                                            height="450px"
                                            objectFit="cover"
                                            src={`${MEDIA_URL}/${card.media_files.file_path}`}
                                          >
                                            Your browser does not support the
                                            video tag.
                                          </video>
                                        ) : (
                                          <Image
                                            src="/images/Image_Placeholder.png"
                                            style={{
                                              height: "200px",
                                              width: "18vw",
                                              objectFit: "cover",
                                              borderRadius: 10,
                                            }}
                                          />
                                        )}
                                        <div
                                          style={{
                                            width: "35%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "1em",
                                            backgroundColor: "var(--themes)",
                                            color: "white",
                                          }}
                                        >
                                          <h3
                                            style={{
                                              fontSize: "2.5em",
                                              paddingBottom: "1em",
                                            }}
                                          >
                                            {card.title_en}
                                          </h3>
                                          {/* <p style={{
                                                                                            fontSize: "1.2rem",

                                                                                        }}>{card.description_en}</p> */}
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: card.description_en,
                                            }}
                                            style={{
                                              fontSize: "1.2rem",
                                            }}
                                          />
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: card.description_bn,
                                            }}
                                            style={{
                                              fontSize: "1.2rem",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </Card>
                                  </div>
                                ))}
                              </Carousel>
                            )}
                          </div>

                          {/* Video Section */}
                          <h2 style={{ paddingTop: "5em" }}>
                            <center>Video Section</center>
                          </h2>
                          <div className="videoSection">
                            {homepage.media && (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingBottom: "1em",
                                  }}
                                >
                                  <h3>Video ID: {homepage.media.id}</h3>
                                </div>
                                <div className="videoContent">
                                  {editmode ? (
                                    <>
                                      <Select
                                        showSearch
                                        value={formData?.media_id}
                                        onChange={(value) =>
                                          handleFormChange("media_id", value)
                                        }
                                        style={{ width: "50vw" }}
                                        defaultValue="Select Video"
                                      >
                                        {videos?.map((video) => (
                                          <Option
                                            key={video.id}
                                            value={video.id}
                                          >
                                            <div
                                              className="videoList"
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                width: "50vw",
                                              }}
                                            >
                                              {/* {video.file_name} */}
                                              <video
                                                autoPlay
                                                width="100%"
                                                height="200"
                                                objectFit="cover"
                                                src={`${MEDIA_URL}/${video.file_path}`}
                                              />
                                            </div>
                                          </Option>
                                        ))}
                                      </Select>
                                    </>
                                  ) : (
                                    <>
                                      <div
                                        className="video"
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          paddingBottom: "1em",
                                          border: "1px solid var(--themes)",
                                          borderRadius: 10,
                                          padding: "1em 2em",
                                          marginBottom: "2em",
                                        }}
                                      >
                                        <video
                                          controls
                                          width="100%"
                                          height="600"
                                          objectFit="cover"
                                          src={`${MEDIA_URL}/${homepage.media.file_path}`}
                                        >
                                          Your browser does not support the
                                          video tag.
                                        </video>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Media Library */}
                          <h2
                            style={{ paddingTop: "5em", paddingBottom: "2em" }}
                          >
                            <center>Media Library Section</center>
                          </h2>
                          {editmode ? (
                            <>
                              <Button
                                type="primary"
                                onClick={() => setModalVisible(true)}
                                style={{ marginTop: "1rem" }}
                              >
                                Update Gallery
                              </Button>
                              <Modal
                                width={"60%"}
                                title="Upload Media"
                                open={modalVisible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                className="uploadMediaModal"
                              >
                                <MediaSelectionModal
                                  media={media}
                                  visible={modalVisible}
                                  onCancel={() => setModalVisible(false)}
                                  selectedMedia={selectedMedia}
                                  setSelectedMedia={setSelectedMedia}
                                />
                              </Modal>
                            </>
                          ) : (
                            <div className="mediaLibrary">
                              {homepage.medias &&
                                Array.isArray(homepage.medias) &&
                                homepage.medias.length > 0 && (
                                  <div
                                    className="mediaGrid"
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(5, 1fr)",
                                      gap: "1em",
                                    }}
                                  >
                                    {homepage.medias
                                      .slice(0, 10)
                                      ?.map((mediaItem, index) => (
                                        <div
                                          key={index}
                                          className="mediaItem"
                                          style={{
                                            position: "relative",
                                            overflow: "hidden",
                                            borderRadius: 10,
                                          }}
                                        >
                                          {mediaItem.file_type.startsWith(
                                            "image"
                                          ) ? (
                                            <img
                                              src={`${MEDIA_URL}/${mediaItem.file_path}`}
                                              alt={mediaItem.file_name}
                                              style={{
                                                height: "200px",
                                                width: "18vw",
                                                objectFit: "cover",
                                                borderRadius: 10,
                                              }}
                                            />
                                          ) : mediaItem.file_type.startsWith(
                                              "video"
                                            ) ? (
                                            <video
                                              controls
                                              width="100%"
                                              height="200"
                                              objectFit="cover"
                                              src={`${MEDIA_URL}/${mediaItem.file_path}`}
                                            >
                                              Your browser does not support the
                                              video tag.
                                            </video>
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
                                        </div>
                                      ))}
                                  </div>
                                )}
                            </div>
                          )}

                          {/* Footer */}
                          <h2
                            style={{ paddingTop: "5em", paddingBottom: "2em" }}
                          >
                            <center>Footer Section</center>
                          </h2>
                          {editmode ? (
                            <>
                              <Select
                                showSearch
                                value={formData?.footer_id}
                                onChange={(value) =>
                                  handleFormChange("footer_id", value)
                                }
                                defaultValue={homepage.footer.title_en}
                                style={{ width: "50vw" }}
                              >
                                {footers?.map((footer) => (
                                  <Option
                                    key={footer.id}
                                    value={footer.id}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "50vw",
                                    }}
                                  >
                                    {footer.title_en}
                                  </Option>
                                ))}
                              </Select>
                            </>
                          ) : (
                            <>
                              <div className="footerSection">
                                {homepage.footer && (
                                  <>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingBottom: "1em",
                                      }}
                                    >
                                      <h3>Footer ID: {homepage.footer.id}</h3>
                                    </div>
                                    <div className="footerContent">
                                      <div
                                        className="footer"
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          paddingBottom: "1em",
                                          border: "1px solid var(--themes)",
                                          borderRadius: 10,
                                          padding: "5em 3em",
                                          marginBottom: "2em",
                                          backgroundColor: "var(--black)",
                                        }}
                                      >
                                        <Row
                                          gutter={{
                                            xs: 8,
                                            sm: 16,
                                            md: 24,
                                            lg: 32,
                                          }}
                                        >
                                          <Col span={8}>
                                            <img
                                              src={`${MEDIA_URL}/${homepage.footer?.logo?.file_path}`}
                                              width={292}
                                              alt=""
                                            />
                                            <div
                                              className="address1"
                                              style={{ marginTop: "2rem" }}
                                            >
                                              <h4>
                                                {
                                                  homepage.footer
                                                    ?.address1_title_en
                                                }
                                              </h4>
                                              <h4 style={{ color: "#c3c3c3" }}>
                                                {
                                                  homepage.footer
                                                    ?.address1_description_en
                                                }
                                              </h4>
                                            </div>
                                            <div
                                              className="address1"
                                              style={{ marginTop: "4rem" }}
                                            >
                                              <h4>
                                                {
                                                  homepage.footer
                                                    ?.address2_title_en
                                                }
                                              </h4>
                                              <h4 style={{ color: "#c3c3c3" }}>
                                                {
                                                  homepage.footer
                                                    ?.address2_description_en
                                                }
                                              </h4>
                                            </div>
                                          </Col>
                                          <Col span={4}>
                                            <h2>Quick Links</h2>

                                            <h4
                                              style={{
                                                color: "#c3c3c3",
                                                marginTop: "1rem",
                                              }}
                                            >
                                              {homepage.footer?.column2_menu?.menu_items?.map(
                                                (item) => (
                                                  <p
                                                    style={{
                                                      color: "#fff",
                                                      marginTop: "1rem",
                                                    }}
                                                  >
                                                    {item?.title}
                                                  </p>
                                                )
                                              )}
                                            </h4>
                                            {/*  */}
                                          </Col>
                                          <Col span={6}>
                                            <h2>Can We Help?</h2>
                                            <h4
                                              style={{
                                                color: "#c3c3c3",
                                                marginTop: "1rem",
                                              }}
                                            >
                                              {homepage.footer?.column3_menu?.menu_items?.map(
                                                (item) => (
                                                  <p
                                                    style={{
                                                      color: "#fff",
                                                      marginTop: "1rem",
                                                    }}
                                                  >
                                                    {item?.title}
                                                  </p>
                                                )
                                              )}
                                            </h4>
                                            <h2 style={{ marginTop: ".5rem" }}>
                                              Parent Sites
                                            </h2>
                                            <div
                                              className="img"
                                              style={{
                                                display: "flex",
                                                justifyItems: "center",
                                                columnGap: "1rem",
                                                marginTop: "1rem",
                                              }}
                                            >
                                              <img
                                                src={
                                                  "https://unitedaygaz.com/assets/images/icons/united-footer.svg"
                                                }
                                                alt=""
                                                width={80}
                                              />
                                              <img
                                                src={
                                                  "https://unitedaygaz.com/assets/images/icons/aygaz-footer.webp"
                                                }
                                                alt=""
                                                width={80}
                                              />
                                            </div>
                                            <img
                                              src={
                                                "https://unitedaygaz.com/assets/images/icons/koc-footer.webp"
                                              }
                                              alt=""
                                              style={{ marginTop: "1rem" }}
                                              width={80}
                                            />
                                          </Col>
                                          <Col span={6}>
                                            <h2>Member Of</h2>

                                            <img
                                              src={
                                                "https://unitedaygaz.com/assets/images/icons/wlpg-footer.webp"
                                              }
                                              style={{
                                                color: "#c3c3c3",
                                                marginTop: ".5rem",
                                              }}
                                              width={80}
                                            />
                                            <p
                                              style={{
                                                marginTop: ".5rem",
                                                display: "flex",
                                                justifyItems: "center",
                                                columnGap: "1rem",
                                              }}
                                            >
                                              <img
                                                src={
                                                  "https://unitedaygaz.com/assets/images/icons/call.svg"
                                                }
                                                width={30}
                                              />{" "}
                                              {
                                                homepage.footer
                                                  ?.column4_description_en
                                              }
                                            </p>
                                          </Col>
                                          <Col
                                            span={24}
                                            style={{ marginTop: "1rem" }}
                                          >
                                            <hr
                                              style={{
                                                backgroundColor: "#fff",
                                              }}
                                            />
                                            <div
                                              className="buttom_menu"
                                              style={{
                                                display: "flex",
                                                columnGap: "4rem",
                                                alignItems: "center",
                                                marginTop: "1rem",
                                              }}
                                            >
                                              <h4>
                                                © 2023 UNITED AYGAZ LPG LTD.
                                              </h4>
                                              <h4
                                                style={{
                                                  color: "#c3c3c3",
                                                  display: "flex",
                                                  columnGap: "2rem",
                                                }}
                                              >
                                                {homepage.footer?.bottom_menu?.menu_items?.map(
                                                  (item) => (
                                                    <>
                                                      {" "}
                                                      <p
                                                        style={{
                                                          color: "#fff",
                                                          textTransform:
                                                            "uppercase",
                                                        }}
                                                      >
                                                        {item?.title}
                                                      </p>
                                                    </>
                                                  )
                                                )}
                                              </h4>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
