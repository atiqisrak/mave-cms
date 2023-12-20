import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, Select, Image, Carousel, message } from "antd";
import instance from "../axios";
import { CheckCircleFilled, CloseCircleFilled, DeleteFilled, EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import RichTextEditor from "../components/RichTextEditor";
import SingleMediaSelect from "../components/SingleMediaSelect";


const HealthandSafety = () => {
  const [loading, setLoading] = useState(false);
  const [healthnsafetyPages, setHealthnsafetyPages] = useState([]);
  const [updateResponse, setUpdateResponse] = useState(null);
  const [cards, setCards] = useState([]);
  const [media, setMedia] = useState([]);
  const [videos, setVideos] = useState([]);
  const [expandedHealthnsafetyPageId, setExpandedHealthnsafetyPageId] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;


  // Media select


  const fetchHealthnsafetyPages = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/healthnsafety");
      if (response.data) {
        setHealthnsafetyPages(response.data);
        setLoading(false);
        console.log("Page Data: ", response.data);
      } else {
        console.log("No data was returned");
        message.error("No data was returned");
      }
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  }
  useEffect(() => {
    fetchHealthnsafetyPages();
  }, [setUpdateResponse]);

  // Fetch Cards
  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/cards");
      if (response.data) {
        setCards(response.data);
        setLoading(false);
      } else {
        console.log("No data was returned");
        message.error("No data was returned");
      }
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  }

  useEffect(() => {
    fetchCards();
  }
    , []);

  // Fetch Media
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/media");
      if (response.data) {
        setMedia(response.data);
        setLoading(false);
      } else {
        console.log("No data was returned");
        message.error("No data was returned");
      }
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  }

  useEffect(() => {
    fetchMedia();
  }, []);



  // --------------- Page Operations --------------- //
  // Filter videos
  const video = media.filter((mediaItem) => mediaItem.file_type.startsWith('video'));

  useEffect(() => {
    setVideos(video);
  }, [media]);

  const handleExpand = (healthnsafetypageId) => {
    if (expandedHealthnsafetyPageId === healthnsafetypageId) {
      setExpandedHealthnsafetyPageId(null);
    } else {
      setExpandedHealthnsafetyPageId(healthnsafetypageId);
    }
  };

  const handleEditPageClick = (pageId) => {
    setSelectedPageId(pageId);
    setEditMode(true);

    const selectedData = healthnsafetyPages.find((healthnsafetyPage) => healthnsafetyPage.id === pageId);
    setFormData({
      hero_title_en: selectedData.hero_title_en,
      hero_title_bn: selectedData.hero_title_bn,
      hero_bg: selectedData.hero_bg,
      tab1_section1_description_en: selectedData.tab1_section1_description_en,
      tab1_section1_description_bn: selectedData.tab1_section1_description_bn,
      tab1_section2_title_en: selectedData.tab1_section2_title_en,
      tab1_section2_title_bn: selectedData.tab1_section2_title_bn,
      tab1_section_2_media: selectedData.tab1_section_2_media,
      tab1_section_2_iconlist: selectedData.tab1_section_2_iconlist,
      tab1_section_3_title_en: selectedData.tab1_section_3_title_en,
      tab1_section_3_title_bn: selectedData.tab1_section_3_title_bn,
      tab1_section_3_media: selectedData.tab1_section_3_media,
      tab1_section_3_iconlist: selectedData.tab1_section_3_iconlist,
      tab1_section_4_title_en: selectedData.tab1_section_4_title_en,
      tab1_section_4_title_bn: selectedData.tab1_section_4_title_bn,
      tab1_section_4_cards: selectedData.tab1_section_4_cards,
      tab1_section_5_cards: selectedData.tab1_section_5_cards,
      tab1_section_6_title_en: selectedData.tab1_section_6_title_en,
      tab1_section_6_title_bn: selectedData.tab1_section_6_title_bn,
      tab1_section_6_description_en: selectedData.tab1_section_6_description_en,
      tab1_section_6_description_bn: selectedData.tab1_section_6_description_bn,
      tab1_section_6_iconlist: selectedData.tab1_section_6_iconlist,
      tab2_section_1_title_en: selectedData.tab2_section_1_title_en,
      tab2_section_1_title_bn: selectedData.tab2_section_1_title_bn,
      tab2_section_1_description_en: selectedData.tab2_section_1_description_en,
      tab2_section_1_description_bn: selectedData.tab2_section_1_description_bn,
      tab2_section_2_title_en: selectedData.tab2_section_2_title_en,
      tab2_section_2_title_bn: selectedData.tab2_section_2_title_bn,
      tab2_section_2_description_en: selectedData.tab2_section_2_description_en,
      tab2_section_2_description_bn: selectedData.tab2_section_2_description_bn,
      tab2_section_3_title_en: selectedData.tab2_section_3_title_en,
      tab2_section_3_title_bn: selectedData.tab2_section_3_title_bn,
      tab2_section_3_cards: selectedData.tab2_section_3_cards,
      tab2_section_4_title_en: selectedData.tab2_section_4_title_en,
      tab2_section_4_title_bn: selectedData.tab2_section_4_title_bn,
      tab2_section_4_title_2_en: selectedData.tab2_section_4_title_2_en,
      tab2_section_4_title_2_bn: selectedData.tab2_section_4_title_2_bn,
      tab2_section_4_iconlist_2: selectedData.tab2_section_4_iconlist_2,
      tab2_section_4_title_3_en: selectedData.tab2_section_4_title_3_en,
      tab2_section_4_title_3_bn: selectedData.tab2_section_4_title_3_bn,
      tab2_section_4_iconlist_3: selectedData.tab2_section_4_iconlist_3,
      tab2_section_4_description_2_en: selectedData.tab2_section_4_description_2_en,
      tab2_section_4_description_2_bn: selectedData.tab2_section_4_description_2_bn,

    });
  };

  // Delete Page
  const handleDeletePage = async (pageId) => {
    try {
      Modal.confirm({
        title: 'Confirm',
        content: 'Are you sure you want to delete this card?',
        okText: 'Yes',
        cancelText: 'No',
        onOk: () => {
          instance.delete(`/healthnsafety/${pageId}`).then((res) => {
            // Refresh card data after deletion
            instance.get('/healthnsafety').then((res) => {
              setHealthnsafetyPages(res.data);
            });
          });
        }
      });
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };
  const handleFormChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };


  const handleSubmit = async () => {
    if (!selectedPageId || !formData) {
      return;
    }

    try {
      const response = await instance.put(`/healthnsafety/${selectedPageId}`, formData);
      if (response?.status === 200) {
        setUpdateResponse(response);
      }
      setFormData(null);
      fetchHealthnsafetyPages();
      setEditMode(false);
      setSelectedPageId(null);
    }
    catch (error) {
      console.error('Error updating page:', error);
    }
  };

  // ------------------- Media Select ------------------- 
  const [media1, setMedia1] = useState([]);
  const [media2, setMedia2] = useState([]);
  const [media3, setMedia3] = useState([]);

  const handleMediaSelection = (mediaId) => {
    if (media1.length < 1) {
      setMedia1([...hero_bg, mediaId]);
    }
    if (media2.length < 1) {
      setMedia2([...tab1_section_2_media, mediaId]);
    }
    if (media3.length < 1) {
      setMedia3([...tab1_section_3_media, mediaId]);
    }
  };

  


  // ------------------- Media Select -------------------

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);

  };

  const handleOpenModal = () => {
    setModalVisible(true);
  }
  const handleModalCancel = () => {
    setModalVisible(false);
  };



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

  return (
    <>
      <div className="ViewContainer ViewContentContainer">
        <div className="PageHeader" style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
          <h1>Health & Safety Page</h1>
          {
            createMode ? (
              <Button danger
                style={{
                  borderRadius: "10px",
                  fontSize: "1.2em",
                  marginRight: "1em",
                  paddingBottom: "1.8em",
                }} icon={<CloseCircleFilled />}
                onClick={() => setCreateMode(false)}>Cancel Create</Button>
            ) : <Button type="primary"
              style={{
                backgroundColor: "var(--theme)",
                borderColor: "var(--theme)",
                color: "white",
                borderRadius: "10px",
                fontSize: "1.2em",
                marginRight: "1em",
                paddingBottom: "1.8em",
              }} icon={<CheckCircleFilled />}
              onClick={() => setCreateMode(true)}>Create New</Button>
          }
        </div>

        {
          createMode ? (
            <h3>Create mode on</h3>
          ) : null
        }


        <Row gutter={[16, 16]}>
          {
            healthnsafetyPages?.map((healthnsafetyPage) => (
              <Col key={healthnsafetyPage?.id} xs={24} sm={24}>
                <Card
                  title={`Page ID: ${healthnsafetyPage?.id}`}
                  extra={
                    <Button onClick={() => handleExpand(healthnsafetyPage?.id)}>
                      {expandedHealthnsafetyPageId === healthnsafetyPage.id ? 'Collapse' : 'Expand'}
                    </Button>
                  }
                  style={{ marginBottom: "5em", marginTop: "3em", border: "1px solid var(--theme)", borderRadius: 10, }}
                >
                  {
                    expandedHealthnsafetyPageId === healthnsafetyPage?.id && (
                      <div>
                        <center>
                          {
                            editMode ?
                              (
                                <>
                                  <Button danger
                                    style={{
                                      borderRadius: "10px",
                                      fontSize: "1.2em",
                                      marginRight: "1em",
                                      paddingBottom: "1.8em",
                                    }}
                                    icon={<CloseCircleFilled />}
                                    onClick={() => {
                                      setEditMode(false);
                                    }}>Cancel Edit</Button>
                                  <Button
                                    type="primary"
                                    style={{
                                      backgroundColor: 'var(--theme)',
                                      borderColor: 'var(--theme)',
                                      color: 'white',
                                      borderRadius: '10px',
                                      fontSize: '1.2em',
                                      marginRight: '1em',
                                      paddingBottom: '1.8em',
                                    }}
                                    icon={<CheckCircleFilled />}
                                    onClick={handleSubmit}
                                  >
                                    Submit
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button type="primary"
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
                                      handleEditPageClick(healthnsafetyPage.id);
                                    }}>Edit Page</Button>
                                  <Button danger
                                    style={{
                                      borderRadius: "10px",
                                      fontSize: "1.2em",
                                      marginRight: "1em",
                                      paddingBottom: "1.8em",
                                    }}
                                    icon={<DeleteFilled />}
                                    onClick={() => {
                                      handleDeletePage(healthnsafetyPage.id);
                                    }}>Delete Page</Button>
                                </>
                              )
                          }
                        </center>
                        <div className="pageContainer" style={{
                          padding: "2em 0",
                        }}>

                          {/* Content goes here */}
                          <h2 style={{
                            marginTop: "2em",
                            color: "var(--theme)",
                            textAlign: "center",
                          }}>Hero Section</h2>
                          {
                            editMode ? (
                              <>
                                <Input
                                  defaultValue={healthnsafetyPage?.hero_title_en}
                                  value={formData?.hero_title_en}
                                  onChange={(e) => handleFormChange('hero_title_en', e.target.value)} />
                                <br /><br />
                                <Input
                                  defaultValue={healthnsafetyPage?.hero_title_bn}
                                  value={formData?.hero_title_bn}
                                  onChange={(e) => handleFormChange('hero_title_bn', e.target.value)} />
                                <Button type="primary">
                                  Change Hero Background
                                </Button>

                                <SingleMediaSelect
                                />

                                <div style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                  textAlign: "center",
                                }}>
                                  {
                                    healthnsafetyPage?.hero_bg_mave?.file_type.startsWith('image') ? (
                                      <Image
                                        src={`${MEDIA_URL}/${healthnsafetyPage?.hero_bg_mave?.file_path}`}
                                        alt="Hero Image"
                                        style={{
                                          height: '200px',
                                          width: '18vw',
                                          objectFit: 'contain',
                                          borderRadius: 10,
                                        }}
                                      />
                                    ) : healthnsafetyPage?.hero_bg_mave?.file_type.startsWith('video') ? (
                                      <video
                                        autoPlay
                                        muted
                                        width="30%"
                                        height="auto"
                                        objectFit="contain"
                                        src={`${MEDIA_URL}/${healthnsafetyPage?.hero_bg_mave?.file_path}`}
                                      >
                                        Your browser does not support the video tag.
                                      </video>
                                    ) : (
                                      <img
                                        src="/images/Image_Placeholder.png"
                                        style={{
                                          height: "200px",
                                          width: "18vw",
                                          objectFit: 'cover',
                                          borderRadius: 10,
                                        }}
                                      />
                                    )
                                  }
                                </div>
                                <br /><br />
                                <h2 style={{
                                  color: "var(--theme)",
                                  textAlign: "center",
                                }}>Tabs</h2>

                                <h2 style={{
                                  color: "var(--theme)",
                                  textAlign: "center",
                                }}>
                                  {healthnsafetyPage?.tabs[0]?.title_en} Tab content
                                </h2>
                                <h3>Section 1 Description</h3>
                                <RichTextEditor editMode={editMode}
                                  defaultValue={healthnsafetyPage?.tab1_section1_description_en}
                                  value={formData?.tab1_section1_description_en}
                                  onChange={(value) => handleFormChange('tab1_section1_description_en', value)} />
                                <RichTextEditor editMode={editMode}
                                  defaultValue={healthnsafetyPage?.tab1_section1_description_bn}
                                  value={formData?.tab1_section1_description_bn}
                                  onChange={(value) => handleFormChange('tab1_section1_description_bn', value)} />


                                {/* ------------------- Section 2 ------------------- */}
                                <div>

                                  <h2 style={{
                                    color: "var(--theme)",
                                    textAlign: "center",
                                  }}>Section 2</h2>
                                  <h3>Title</h3>
                                  <Input
                                    defaultValue={healthnsafetyPage?.tab1_section2_title_en}
                                    value={formData?.tab1_section2_title_en}
                                    onChange={(e) => handleFormChange('tab1_section2_title_en', e.target.value)} />
                                  <Input
                                    defaultValue={healthnsafetyPage?.tab1_section2_title_bn}
                                    value={formData?.tab1_section2_title_bn}
                                    onChange={(e) => handleFormChange('tab1_section2_title_bn', e.target.value)} />

                                  <h3>Icon List</h3>
                                  <div className="iconlist" style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}>
                                    <Select
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                      }
                                      placeholder="Select Cards"
                                      value={formData?.tab1_section_2_iconlist}
                                      onChange={(value) => handleFormChange('tab1_section_2_iconlist', value)}
                                      style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                      {
                                        cards?.map((card) => (
                                          <Select.Option key={card.id} value={card.id}>
                                            {card.title_en}
                                          </Select.Option>
                                        ))
                                      }
                                    </Select>
                                  </div>


                                  <h3>Media</h3>
                                  <Button type="primary" onClick={() => setModalVisibleSection2(true)} style={{ marginTop: "1rem" }}>
                                    Change Section 2 Media
                                  </Button>

                                  <SingleMediaSelect
                                  />
                                  <div style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}>
                                    {
                                      healthnsafetyPage?.tab1_section_2_media_mave?.file_type.startsWith('image') ? (
                                        <Image
                                          src={`${MEDIA_URL}/${healthnsafetyPage?.tab1_section_2_media_mave?.file_path}`}
                                          alt="Hero Image"
                                          style={{
                                            height: '200px',
                                            width: '18vw',
                                            objectFit: 'contain',
                                            borderRadius: 10,
                                          }}
                                        />
                                      ) : healthnsafetyPage?.tab1_section_2_media_mave?.file_type.startsWith('video') ? (
                                        <video
                                          autoPlay
                                          muted
                                          width="30%"
                                          height="auto"
                                          objectFit="contain"
                                          src={`${MEDIA_URL}/${healthnsafetyPage?.tab1_section_2_media_mave?.file_path}`}
                                        >
                                          Your browser does not support the video tag.
                                        </video>
                                      ) : (
                                        <img
                                          src="/images/Image_Placeholder.png"
                                          style={{
                                            height: "200px",
                                            width: "18vw",
                                            objectFit: 'cover',
                                            borderRadius: 10,
                                          }}
                                        />
                                      )
                                    }
                                  </div>
                                </div>

                                {/* ------------------- Section 3 ------------------- */}
                                <div>

                                  <h2 style={{
                                    color: "var(--theme)",
                                    textAlign: "center",
                                  }}>Section 3</h2>

                                  <h3>Media</h3>
                                  <Button type="primary" onClick={() => setModalVisibleSection3(true)} style={{ marginTop: "1rem" }}>
                                    Change Section 3 Media
                                  </Button>

                                  <SingleMediaSelect
                                  />
                                  <div style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}>
                                    {
                                      healthnsafetyPage?.tab1_section_3_media_mave?.file_type.startsWith('image') ? (
                                        <Image
                                          src={`${MEDIA_URL}/${healthnsafetyPage?.tab1_section_3_media_mave?.file_path}`}
                                          alt="Hero Image"
                                          style={{
                                            height: '200px',
                                            width: '18vw',
                                            objectFit: 'contain',
                                            borderRadius: 10,
                                          }}
                                        />
                                      ) : healthnsafetyPage?.tab1_section_3_media_mave?.file_type.startsWith('video') ? (
                                        <video
                                          autoPlay
                                          muted
                                          width="30%"
                                          height="auto"
                                          objectFit="contain"
                                          src={`${MEDIA_URL}/${healthnsafetyPage?.tab1_section_3_media_mave?.file_path}`}
                                        >
                                          Your browser does not support the video tag.
                                        </video>
                                      ) : (
                                        <img
                                          src="/images/Image_Placeholder.png"
                                          style={{
                                            height: "200px",
                                            width: "18vw",
                                            objectFit: 'cover',
                                            borderRadius: 10,
                                          }}
                                        />
                                      )
                                    }
                                  </div>

                                  <h3>Title</h3>
                                  <Input
                                    defaultValue={healthnsafetyPage?.tab1_section_3_title_en}
                                    value={formData?.tab1_section_3_title_en}
                                    onChange={(e) => handleFormChange('tab1_section_3_title_en', e.target.value)} />
                                  <Input
                                    defaultValue={healthnsafetyPage?.tab1_section_3_title_bn}
                                    value={formData?.tab1_section_3_title_bn}
                                    onChange={(e) => handleFormChange('tab1_section_3_title_bn', e.target.value)} />

                                  <h3>Icon List</h3>
                                  <div className="iconlist" style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}>
                                    <Select
                                      mode="multiple"
                                      allowClear
                                      showSearch
                                      filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                      }
                                      placeholder="Select Cards"
                                      value={formData?.tab1_section_3_iconlist}
                                      onChange={(value) => handleFormChange('tab1_section_3_iconlist', value)}
                                      style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                      {
                                        cards?.map((card) => (
                                          <Select.Option key={card.id} value={card.id}>
                                            {card.title_en}
                                          </Select.Option>
                                        ))
                                      }
                                    </Select>
                                  </div>

                                  {/* ------------------- Section 4 ------------------- */}
                                  <div>

                                    <h2 style={{
                                      color: "var(--theme)",
                                      textAlign: "center",
                                    }}>Section 4</h2>

                                    <h3>Title</h3>
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab1_section_4_title_en}
                                      value={formData?.tab1_section_4_title_en}
                                      onChange={(e) => handleFormChange('tab1_section_4_title_en', e.target.value)} />
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab1_section_4_title_bn}
                                      value={formData?.tab1_section_4_title_bn}
                                      onChange={(e) => handleFormChange('tab1_section_4_title_bn', e.target.value)} />

                                    <h3>Cards</h3>
                                    <div className="cardlist" style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(3, 1fr)",
                                      paddingBottom: "2em",
                                      borderBottom: "1px solid var(--theme)",
                                    }}>
                                      <Select
                                        mode="multiple"
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) =>
                                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        placeholder="Select Cards"
                                        value={formData?.tab1_section_4_cards}
                                        onChange={(value) => handleFormChange('tab1_section_4_cards', value)}
                                        style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                        {
                                          cards?.map((card) => (
                                            <Select.Option key={card.id} value={card.id}>
                                              {card.title_en}
                                            </Select.Option>
                                          ))
                                        }
                                      </Select>
                                    </div>
                                  </div>

                                  {/* ------------------- Section 5 ------------------- */}
                                  <div>

                                    <h2 style={{
                                      color: "var(--theme)",
                                      textAlign: "center",
                                    }}>Section 5</h2>

                                    <h3>Cards</h3>
                                    <div className="cardlist" style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(3, 1fr)",
                                      paddingBottom: "2em",
                                      borderBottom: "1px solid var(--theme)",
                                    }}>
                                      <Select
                                        mode="multiple"
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) =>
                                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        placeholder="Select Cards"
                                        value={formData?.tab1_section_5_cards}
                                        onChange={(value) => handleFormChange('tab1_section_5_cards', value)}
                                        style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                        {
                                          cards?.map((card) => (
                                            <Select.Option key={card.id} value={card.id}>
                                              {card.title_en}
                                            </Select.Option>
                                          ))
                                        }
                                      </Select>
                                    </div>
                                  </div>

                                  {/* ------------------- Section 6 ------------------- */}
                                  <div>
                                    <h2 style={{
                                      color: "var(--theme)",
                                      textAlign: "center",
                                    }}>Section 6</h2>
                                    <h3>Title</h3>
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab1_section_6_title_en}
                                      value={formData?.tab1_section_6_title_en}
                                      onChange={(e) => handleFormChange('tab1_section_6_title_en', e.target.value)} />
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab1_section_6_title_bn}
                                      value={formData?.tab1_section_6_title_bn}
                                      onChange={(e) => handleFormChange('tab1_section_6_title_bn', e.target.value)} />
                                    <h3>Description</h3>
                                    <RichTextEditor editMode={editMode}
                                      defaultValue={healthnsafetyPage?.tab1_section_6_description_en}
                                      value={formData?.tab1_section_6_description_en}
                                      onChange={(value) => handleFormChange('tab1_section_6_description_en', value)} />
                                    <RichTextEditor editMode={editMode}
                                      defaultValue={healthnsafetyPage?.tab1_section_6_description_bn}
                                      value={formData?.tab1_section_6_description_bn}
                                      onChange={(value) => handleFormChange('tab1_section_6_description_bn', value)} />
                                    <h3>Icon List</h3>
                                    <div className="iconlist" style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                      alignItems: "center",
                                      textAlign: "center",
                                    }}>
                                      <Select
                                        mode="multiple"
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) =>
                                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        placeholder="Select Cards"
                                        value={formData?.tab1_section_6_iconlist}
                                        onChange={(value) => handleFormChange('tab1_section_6_iconlist', value)}
                                        style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                        {
                                          cards?.map((card) => (
                                            <Select.Option key={card.id} value={card.id}>
                                              {card.title_en}
                                            </Select.Option>
                                          ))
                                        }
                                      </Select>
                                    </div>
                                  </div>

                                  {/* ------------------- Tab 2 Section 1 ------------------- */}
                                  <div>
                                    <h2 style={{
                                      color: "var(--theme)",
                                      textAlign: "center",
                                    }}>{
                                        healthnsafetyPage?.tabs[1]?.title_en
                                      } Section 1</h2>
                                    <h3>Title</h3>
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_1_title_en}
                                      value={formData?.tab2_section_1_title_en}
                                      onChange={(e) => handleFormChange('tab2_section_1_title_en', e.target.value)} />
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_1_title_bn}
                                      value={formData?.tab2_section_1_title_bn}
                                      onChange={(e) => handleFormChange('tab2_section_1_title_bn', e.target.value)} />
                                    <h3>Description</h3>
                                    <RichTextEditor editMode={editMode}
                                      defaultValue={healthnsafetyPage?.tab2_section_1_description_en}
                                      value={formData?.tab2_section_1_description_en}
                                      onChange={(value) => handleFormChange('tab2_section_1_description_en', value)} />
                                    <RichTextEditor editMode={editMode}
                                      defaultValue={healthnsafetyPage?.tab2_section_1_description_bn}
                                      value={formData?.tab2_section_1_description_bn}
                                      onChange={(value) => handleFormChange('tab2_section_1_description_bn', value)} />
                                  </div>

                                  {/* ------------------- Tab 2 Section 2 ------------------- */}
                                  <div>
                                    <h2 style={{
                                      color: "var(--theme)",
                                      textAlign: "center",
                                    }}>{
                                        healthnsafetyPage?.tabs[1]?.title_en
                                      } Section 2</h2>
                                    <h3>Title</h3>
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_2_title_en}
                                      value={formData?.tab2_section_2_title_en}
                                      onChange={(e) => handleFormChange('tab2_section_2_title_en', e.target.value)} />
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_2_title_bn}
                                      value={formData?.tab2_section_2_title_bn}
                                      onChange={(e) => handleFormChange('tab2_section_2_title_bn', e.target.value)} />
                                    <h3>Description</h3>
                                    <RichTextEditor editMode={editMode}
                                      defaultValue={healthnsafetyPage?.tab2_section_2_description_en}
                                      value={formData?.tab2_section_2_description_en}
                                      onChange={(value) => handleFormChange('tab2_section_2_description_en', value)} />
                                    <RichTextEditor editMode={editMode}
                                      defaultValue={healthnsafetyPage?.tab2_section_2_description_bn}
                                      value={formData?.tab2_section_2_description_bn}
                                      onChange={(value) => handleFormChange('tab2_section_2_description_bn', value)} />
                                  </div>

                                  {/* ------------------- Tab 2 Section 3 ------------------- */}
                                  <div>
                                    <h2 style={{
                                      color: "var(--theme)",
                                      textAlign: "center",
                                    }}>{
                                        healthnsafetyPage?.tabs[1]?.title_en
                                      } Section 3</h2>
                                    <h3>Title</h3>
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_3_title_en}
                                      value={formData?.tab2_section_3_title_en}
                                      onChange={(e) => handleFormChange('tab2_section_3_title_en', e.target.value)} />
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_3_title_bn}
                                      value={formData?.tab2_section_3_title_bn}
                                      onChange={(e) => handleFormChange('tab2_section_3_title_bn', e.target.value)} />
                                    <h3>Cards</h3>
                                    <div className="cardlist" style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(3, 1fr)",
                                      paddingBottom: "2em",
                                      borderBottom: "1px solid var(--theme)",
                                    }}>
                                      <Select
                                        mode="multiple"
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) =>
                                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        placeholder="Select Cards"
                                        value={formData?.tab2_section_3_cards}
                                        onChange={(value) => handleFormChange('tab2_section_3_cards', value)}
                                        style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                        {
                                          cards?.map((card) => (
                                            <Select.Option key={card.id} value={card.id}
                                            >
                                              {card.title_en}
                                            </Select.Option>
                                          ))
                                        }
                                      </Select>
                                    </div>
                                  </div>

                                  {/* ------------------- Tab 2 Section 4 ------------------- */}
                                  <div>
                                    <h2 style={{
                                      color: "var(--theme)",
                                      textAlign: "center",
                                    }}>{
                                        healthnsafetyPage?.tabs[1]?.title_en
                                      } Section 4</h2>
                                    <h3>Title</h3>
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_4_title_en}
                                      value={formData?.tab2_section_4_title_en}
                                      onChange={(e) => handleFormChange('tab2_section_4_title_en', e.target.value)} />
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_4_title_bn}
                                      value={formData?.tab2_section_4_title_bn}
                                      onChange={(e) => handleFormChange('tab2_section_4_title_bn', e.target.value)} />
                                    <h3>Title 2</h3>
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_4_title_2_en}
                                      value={formData?.tab2_section_4_title_2_en}
                                      onChange={(e) => handleFormChange('tab2_section_4_title_2_en', e.target.value)} />
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_4_title_2_bn}
                                      value={formData?.tab2_section_4_title_2_bn}
                                      onChange={(e) => handleFormChange('tab2_section_4_title_2_bn', e.target.value)} />
                                    <h3>Icon List 2</h3>
                                    <div className="iconlist" style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                      alignItems: "center",
                                      textAlign: "center",
                                    }}>
                                      <Select
                                        mode="multiple"
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) =>
                                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        placeholder="Select Cards"
                                        value={formData?.tab2_section_4_iconlist_2}
                                        onChange={(value) => handleFormChange('tab2_section_4_iconlist_2', value)}
                                        style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                        {
                                          cards?.map((card) => (
                                            <Select.Option key={card.id} value={card.id}
                                            >
                                              {card.title_en}
                                            </Select.Option>
                                          ))
                                        }
                                      </Select>
                                    </div>
                                    <h3>Title 3</h3>
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_4_title_3_en}
                                      value={formData?.tab2_section_4_title_3_en}
                                      onChange={(e) => handleFormChange('tab2_section_4_title_3_en', e.target.value)} />
                                    <Input
                                      defaultValue={healthnsafetyPage?.tab2_section_4_title_3_bn}
                                      value={formData?.tab2_section_4_title_3_bn}
                                      onChange={(e) => handleFormChange('tab2_section_4_title_3_bn', e.target.value)} />
                                    <h3>Icon List 3</h3>
                                    <div className="iconlist" style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                      alignItems: "center",
                                      textAlign: "center",
                                    }}>
                                      <Select
                                        mode="multiple"
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) =>
                                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        placeholder="Select Cards"
                                        value={formData?.tab2_section_4_iconlist_3}
                                        onChange={(value) => handleFormChange('tab2_section_4_iconlist_3', value)}
                                        style={{ width: '100%', marginBottom: "2em", marginTop: "2em" }}>
                                        {
                                          cards?.map((card) => (
                                            <Select.Option key={card.id} value={card.id}

                                              showSearch
                                            >
                                              {card.title_en}
                                            </Select.Option>
                                          ))
                                        }
                                      </Select>
                                    </div>
                                    <RichTextEditor editMode={editMode}
                                      defaultValue={healthnsafetyPage?.tab2_section_4_description_2_en}
                                      value={formData?.tab2_section_4_description_2_en}
                                      onChange={(value) => handleFormChange('tab2_section_4_description_2_en', value)} />
                                    <RichTextEditor editMode={editMode}
                                      defaultValue={healthnsafetyPage?.tab2_section_4_description_2_bn}
                                      value={formData?.tab2_section_4_description_2_bn}
                                      onChange={(value) => handleFormChange('tab2_section_4_description_2_bn', value)} />
                                  </div>

                                </div>
                              </>
                            ) : (
                              <>
                                <h4>{healthnsafetyPage?.hero_title_en}</h4>
                                <br /><br /><h4>{healthnsafetyPage?.hero_title_bn}</h4>
                                <>
                                  {
                                    healthnsafetyPage?.hero_bg_mave?.file_type.startsWith('image') ? (
                                      <Image
                                        src={`${MEDIA_URL}/${healthnsafetyPage?.hero_bg_mave?.file_path}`}
                                        alt="Hero Image"
                                        style={{
                                          height: '200px',
                                          width: '18vw',
                                          objectFit: 'contain',
                                          borderRadius: 10,
                                        }}
                                      />
                                    ) : healthnsafetyPage?.hero_bg_mave?.file_type.startsWith('video') ? (
                                      <video
                                        autoPlay
                                        muted
                                        width="30%"
                                        height="auto"
                                        objectFit="contain"
                                        src={`${MEDIA_URL}/${healthnsafetyPage?.hero_bg_mave?.file_path}`}
                                      >
                                        Your browser does not support the video tag.
                                      </video>
                                    ) : (
                                      <img
                                        src="/images/Image_Placeholder.png"
                                        style={{
                                          height: "200px",
                                          width: "18vw",
                                          objectFit: 'cover',
                                          borderRadius: 10,
                                        }}
                                      />
                                    )
                                  }
                                </>
                                <>
                                  {/* Tabs */}
                                  <div style={{
                                    padding: "2em 0",
                                    borderBottom: "1px solid var(--theme)",
                                    borderTop: "1px solid var(--theme)",
                                    marginBottom: "2em",
                                  }}>

                                    <h2 style={{
                                      color: "var(--theme)",
                                      textAlign: "center",
                                    }}>Tabs</h2>

                                    <div className="tabsContainer" style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                      alignItems: "center",
                                      textAlign: "center",
                                    }}>
                                      {
                                        healthnsafetyPage?.tabs?.map((tab) => (
                                          <>
                                            {
                                              <div className="tab">
                                                <h3>{tab.title_en}</h3>
                                                <h3>{tab.title_bn}</h3>
                                              </div>
                                            }
                                          </>
                                        ))
                                      }
                                    </div>
                                  </div>

                                  {/* Second section */}
                                  <div style={{
                                    borderBottom: "1px solid var(--theme)",
                                  }}>
                                    <h2 style={{
                                      color: "var(--theme)",
                                      textAlign: "center",
                                    }}>
                                      {healthnsafetyPage?.tabs[0]?.title_en} Tab content
                                    </h2>

                                    <div dangerouslySetInnerHTML={{ __html: healthnsafetyPage?.tab1_section1_description_en }}
                                      style={{
                                        textAlign: "left",
                                        fontSize: "1em",
                                      }} />
                                    <div dangerouslySetInnerHTML={{ __html: healthnsafetyPage?.tab1_section1_description_bn }}
                                      style={{
                                        textAlign: "left",
                                        fontSize: "1em",
                                      }} />

                                    <div style={{
                                      borderTop: "1px solid var(--theme)",
                                      borderBottom: "1px solid var(--theme)",
                                    }}>
                                      <h3>
                                        Title: {healthnsafetyPage?.tab1_section2_title_en}
                                      </h3>
                                      <h3>
                                        Title BN: {healthnsafetyPage?.tab1_section2_title_bn}
                                      </h3>
                                      <div className="iconlist" style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        paddingBottom: "2em",
                                        borderBottom: "1px solid var(--theme)",
                                      }}>
                                        <div style={{
                                          display: "flex",
                                          justifyContent: "space-around",
                                          flexDirection: "column",
                                        }}>
                                          {
                                            healthnsafetyPage?.tab1_section_2_iconlist_mave?.map((icon) => (
                                              <>
                                                <div className="icon" style={{
                                                  display: "flex",
                                                  justifyContent: "space-between",
                                                  alignContent: "center",
                                                }}>
                                                  <Image
                                                    width={200}
                                                    height={200}
                                                    objectFit="conver"
                                                    preview={false}
                                                    src={`${MEDIA_URL}/${icon?.media_files?.file_path}`}
                                                    alt="Icon"
                                                  />
                                                  <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                  }}>
                                                    <h3>{icon?.title_en}</h3>
                                                    <h3>{icon?.title_bn}</h3>
                                                  </div>
                                                </div>
                                              </>
                                            ))
                                          }
                                        </div>

                                        {
                                          healthnsafetyPage?.tab1_section_2_media_mave && (
                                            <>
                                              <div className="icon" style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                              }}>
                                                <Image
                                                  width={500}
                                                  height={300}
                                                  preview={false}
                                                  objectFit="conver"
                                                  src={`${MEDIA_URL}/${healthnsafetyPage?.tab1_section_2_media_mave?.file_path}`} alt="Icon" />
                                              </div>
                                            </>
                                          )
                                        }
                                      </div>

                                      {/* Second Iconlist */}
                                      <h2 style={{
                                        textAlign: "center",
                                        color: "var(--theme)",
                                      }}>Second Icon List</h2>
                                      <h3>
                                        {healthnsafetyPage?.tab1_section_3_title_en}
                                      </h3>
                                      <h3>
                                        {healthnsafetyPage?.tab1_section_3_title_bn}
                                      </h3>
                                      <div className="iconlist" style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        paddingBottom: "2em",
                                        borderBottom: "1px solid var(--theme)",
                                      }}>

                                        {
                                          healthnsafetyPage?.tab1_section_3_media_mave && (
                                            <>
                                              <div className="icon" style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                              }}>
                                                <Image
                                                  width={500}
                                                  height={300}
                                                  preview={false}
                                                  objectFit="conver"
                                                  src={`${MEDIA_URL}/${healthnsafetyPage?.tab1_section_3_media_mave?.file_path}`} alt="Icon" />
                                              </div>
                                            </>
                                          )
                                        }

                                        <div style={{
                                          display: "flex",
                                          justifyContent: "space-around",
                                          flexDirection: "column",
                                        }}>
                                          {
                                            healthnsafetyPage?.tab1_section_3_iconlist_mave?.map((icon) => (
                                              <>
                                                <div className="icon" style={{
                                                  display: "flex",
                                                  justifyContent: "space-between",
                                                }}>
                                                  <Image
                                                    width={200}
                                                    height={200}
                                                    preview={false}
                                                    objectFit="conver"
                                                    src={`${MEDIA_URL}/${icon?.media_files?.file_path}`} alt="Icon" />
                                                  <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                  }}>
                                                    <h3>{icon?.title_en}</h3>
                                                    <h3>{icon?.title_bn}</h3>
                                                  </div>
                                                </div>
                                              </>
                                            ))
                                          }
                                        </div>
                                      </div>


                                      {/* Card List */}
                                      <h2 style={{
                                        textAlign: "center",
                                        color: "var(--theme)",
                                      }}>Card List</h2>
                                      <h3>
                                        Title: {healthnsafetyPage?.tab1_section_4_title_en}
                                      </h3>
                                      <h3>
                                        Title BN: {healthnsafetyPage?.tab1_section_4_title_bn}
                                      </h3>
                                      <div className="cardlist" style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        paddingBottom: "2em",
                                        borderBottom: "1px solid var(--theme)",
                                      }}>
                                        {
                                          healthnsafetyPage?.tab1_section_4_cards_mave?.map((card) => (
                                            <>
                                              <div className="icon" style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                paddingTop: "2em",
                                              }}>
                                                <Image
                                                  width={200}
                                                  height={200}
                                                  preview={false}
                                                  objectFit="conver"
                                                  src={`${MEDIA_URL}/${card?.media_files?.file_path}`} alt="Icon" />
                                                <div style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  justifyContent: "center",
                                                }}>
                                                  <h3>{card?.title_en}</h3>
                                                  <h3>{card?.title_bn}</h3>
                                                </div>
                                              </div>
                                            </>
                                          ))
                                        }
                                      </div>



                                      {/* Second Card List */}
                                      <h2 style={{
                                        textAlign: "center",
                                        color: "var(--theme)",
                                      }}>Card List 2</h2>
                                      <div className="cardlist" style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        paddingBottom: "2em",
                                        borderBottom: "1px solid var(--theme)",
                                      }}>
                                        {
                                          healthnsafetyPage?.tab1_section_5_cards_mave?.map((card) => (
                                            <>
                                              <div className="icon" style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                paddingTop: "2em",
                                              }}>
                                                <Image
                                                  width={200}
                                                  height={200}
                                                  preview={false}
                                                  objectFit="conver"
                                                  src={`${MEDIA_URL}/${card?.media_files?.file_path}`} alt="Icon" />
                                                <div style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  justifyContent: "center",
                                                }}>
                                                  <h3>{card?.title_en}</h3>
                                                  <h3>{card?.title_bn}</h3>
                                                </div>
                                              </div>
                                            </>
                                          ))
                                        }
                                      </div>


                                      {/* Section 6 iconlist */}

                                      {/* Card List */}
                                      <h2 style={{
                                        textAlign: "center",
                                        color: "var(--theme)",
                                      }}>Icon List</h2>
                                      <h3>
                                        Title: {healthnsafetyPage?.tab1_section_6_title_en}
                                      </h3>
                                      <h3>
                                        Title BN: {healthnsafetyPage?.tab1_section_6_title_bn}
                                      </h3>


                                      <div dangerouslySetInnerHTML={{ __html: healthnsafetyPage?.tab1_section_6_description_en }}
                                        style={{
                                          textAlign: "left",
                                          fontSize: "1em",
                                        }} />
                                      <div dangerouslySetInnerHTML={{ __html: healthnsafetyPage?.tab1_section_6_description_bn }}
                                        style={{
                                          textAlign: "left",
                                          fontSize: "1em",
                                        }} />
                                      <div className="iconlist" style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        paddingBottom: "2em",
                                        borderBottom: "1px solid var(--theme)",
                                      }}>
                                        {
                                          healthnsafetyPage?.tab1_section_6_iconlist_mave?.map((icon) => (
                                            <>
                                              <div className="icon" style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}>
                                                <Image
                                                  width={200}
                                                  height={200}
                                                  preview={false}
                                                  objectFit="conver"
                                                  src={`${MEDIA_URL}/${icon?.media_files?.file_path}`} alt="Icon" />
                                                <div style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  justifyContent: "center",
                                                }}>
                                                  <h3>{icon?.title_en}</h3>
                                                  <h3>{icon?.title_bn}</h3>
                                                </div>
                                              </div>
                                            </>
                                          ))
                                        }
                                      </div>

                                      {/* Tab 2 */}
                                      <h2 style={{
                                        textAlign: "center",
                                        color: "var(--theme)",
                                      }}>
                                        {healthnsafetyPage?.tabs[1]?.title_en} Tab content
                                      </h2>

                                      {/* Section 1 */}
                                      <h2 style={{
                                        textAlign: "center",
                                        color: "var(--theme)"
                                      }}>Section 1</h2>
                                      <div style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                      }}>
                                        <div>
                                          <h3>
                                            {healthnsafetyPage?.tab2_section_1_title_en}
                                          </h3>
                                          <h3>
                                            {healthnsafetyPage?.tab2_section_1_title_bn}
                                          </h3>
                                        </div>
                                        <div>
                                          <div dangerouslySetInnerHTML={{ __html: healthnsafetyPage?.tab2_section_1_description_en }}
                                            style={{
                                              textAlign: "left",
                                              fontSize: "1em",
                                            }} />
                                          <div dangerouslySetInnerHTML={{ __html: healthnsafetyPage?.tab2_section_1_description_bn }}
                                            style={{
                                              textAlign: "left",
                                              fontSize: "1em",
                                            }} />
                                        </div>
                                      </div>


                                      {/* Section 2 */}
                                      <h2 style={{
                                        textAlign: "center",
                                        color: "var(--theme)"
                                      }}>Section 2</h2>
                                      <div style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                      }}>
                                        <div>
                                          <h3>
                                            {healthnsafetyPage?.tab2_section_2_title_en}
                                          </h3>
                                          <h3>
                                            {healthnsafetyPage?.tab2_section_2_title_bn}
                                          </h3>
                                        </div>
                                        <div>
                                          <div dangerouslySetInnerHTML={{ __html: healthnsafetyPage?.tab2_section_2_description_en }}
                                            style={{
                                              textAlign: "left",
                                              fontSize: "1em",
                                            }} />
                                          <div dangerouslySetInnerHTML={{ __html: healthnsafetyPage?.tab2_section_2_description_bn }}
                                            style={{
                                              textAlign: "left",
                                              fontSize: "1em",
                                            }} />
                                        </div>
                                      </div>


                                      {/* Section 3 */}
                                      <h2 style={{
                                        textAlign: "center",
                                        color: "var(--theme)"
                                      }}>Section 3</h2>
                                      <h3>
                                        {healthnsafetyPage?.tab2_section_3_title_en}
                                      </h3>
                                      <h3>
                                        {healthnsafetyPage?.tab2_section_3_title_bn}
                                      </h3>


                                      {/* Section 3 cards */}
                                      <div className="cardlist" style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        paddingBottom: "2em",
                                        borderBottom: "1px solid var(--theme)",
                                      }}>
                                        {
                                          healthnsafetyPage?.tab2_section_3_cards_mave?.map((card) => (
                                            <div>
                                              <div className="icon" style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                paddingTop: "2em",
                                              }}>
                                                <Image
                                                  width={200}
                                                  height={200}
                                                  preview={false}
                                                  objectFit="conver"
                                                  src={`${MEDIA_URL}/${card?.media_files?.file_path}`} alt="Icon" />
                                                <div style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  justifyContent: "center",
                                                }}>
                                                  <h3>{card?.title_en}</h3>
                                                  <h3>{card?.title_bn}</h3>
                                                </div>
                                              </div>
                                            </div>
                                          ))
                                        }
                                      </div>


                                      {/* Section 4 */}
                                      <h2 style={{
                                        textAlign: "center",
                                        color: "var(--theme)"
                                      }}>Section 4</h2>
                                      <h3>
                                        {healthnsafetyPage?.tab2_section_4_title_en}
                                      </h3>
                                      <h3>
                                        {healthnsafetyPage?.tab2_section_4_title_bn}
                                      </h3>

                                      {/* Section 4 iconlist */}
                                      <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(2, 1fr)",
                                      }}>
                                        <div>
                                          <h3>
                                            {healthnsafetyPage?.tab2_section_4_title_2_en}
                                          </h3>
                                          <h3>
                                            {healthnsafetyPage?.tab2_section_4_title_2_bn}
                                          </h3>
                                          <div className="iconlist" style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-around",
                                            paddingBottom: "2em",
                                          }}>
                                            {
                                              healthnsafetyPage?.tab2_section_4_iconlist_2_mave?.map((icon) => (
                                                <>
                                                  <div className="icon" style={{
                                                    display: "flex",
                                                    gap: "2em",
                                                  }}>
                                                    <Image
                                                      width={200}
                                                      height={200}
                                                      preview={false}
                                                      objectFit="cover"
                                                      src={`${MEDIA_URL}/${icon?.media_files?.file_path}`} alt="Icon" />
                                                    <div style={{
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      justifyContent: "center",
                                                    }}>
                                                      <h3>{icon?.title_en}</h3>
                                                      <h3>{icon?.title_bn}</h3>
                                                    </div>
                                                  </div>
                                                </>
                                              ))
                                            }
                                          </div>
                                        </div>
                                        <div>
                                          <h3>
                                            {healthnsafetyPage?.tab2_section_4_title_3_en}
                                          </h3>
                                          <h3>
                                            {healthnsafetyPage?.tab2_section_4_title_3_bn}
                                          </h3>
                                          <div className="iconlist" style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-around",
                                            paddingBottom: "2em",
                                          }}>
                                            {
                                              healthnsafetyPage?.tab2_section_4_iconlist_3_mave?.map((icon) => (
                                                <>
                                                  <div className="icon" style={{
                                                    display: "flex",
                                                    gap: "2em",
                                                  }}>
                                                    <Image
                                                      width={200}
                                                      height={200}
                                                      preview={false}
                                                      objectFit="cover"
                                                      src={`${MEDIA_URL}/${icon?.media_files?.file_path}`} alt="Icon" />
                                                    <div style={{
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      justifyContent: "center",
                                                    }}>
                                                      <h3>{icon?.title_en}</h3>
                                                      <h3>{icon?.title_bn}</h3>
                                                    </div>
                                                  </div>
                                                </>
                                              ))
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div dangerouslySetInnerHTML={{ __html: healthnsafetyPage?.tab2_section_4_description_2_en }}
                                        style={{
                                          textAlign: "left",
                                          fontSize: "1em",
                                        }} />
                                      <div dangerouslySetInnerHTML={{ __html: healthnsafetyPage?.tab2_section_4_description_2_bn }}
                                        style={{
                                          textAlign: "left",
                                          fontSize: "1em",
                                        }} />
                                    </div>
                                  </div>
                                </>
                              </>
                            )
                          }
                        </div>
                      </div>
                    )
                  }
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
    </>
  );
}

export default HealthandSafety;