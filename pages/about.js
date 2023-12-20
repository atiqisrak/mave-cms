import { CheckCircleFilled, CloseCircleFilled, DeleteFilled, EditOutlined } from "@ant-design/icons";
import { Button, message, Typography, Modal, Row, Card, Col, Image, Select } from "antd";
import React, { useState, useEffect } from "react";
import instance from "../axios";
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(
  () => import('../components/RichTextEditor'),
  { ssr: false }
);


const About = () => {

  const { Title } = Typography;
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [loading, setLoading] = useState(true);
  const [expandedAboutpageId, setExpandedAboutpageId] = useState(null);
  const [editmode, setEditMode] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [updateResponse, setUpdateResponse] = useState();
  const [videos, setVideos] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch Page Data
  const [aboutpages, setAboutpages] = useState([]);
  const fetchAboutPages = async () => {
    try {
      setLoading(true);
      const response = await instance.get('/about');
      if (response.data) {
        setAboutpages(response.data);
        setLoading(false);
      } else {
        console.error("Error fetching about pages:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching about pages:", error);
    }
  }

  useEffect(() => {
    fetchAboutPages();
  }, [updateResponse]);

  // Fetch Card Data
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await instance("/cards");
        if (response.data) {
          setCards(response.data);
          setLoading(false);
        }
        else {
          console.error("Error fetching media assets:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching media assets:", error);
      }
    };

    fetchCards();
  }, []);

  // Fetch Media Assets
  const [media, setMedia] = useState([]);
  useEffect(() => {
    const fetchMediaAssets = async () => {
      try {
        setLoading(true);
        const response = await instance("/media");
        if (response.data) {
          setMedia(response.data);
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

  const [aboutpage, setaboutpage] = useState({
    medias: [],
  });


  // Filter videos
  const video = media.filter((mediaItem) => mediaItem.file_type.startsWith('video'));

  useEffect(() => {
    setVideos(video);
  }, [media]);

  const handleExpand = (aboutpageId) => {
    if (expandedAboutpageId === aboutpageId) {
      setExpandedAboutpageId(null);
    } else {
      setExpandedAboutpageId(aboutpageId);
    }
  };

  const handleEditPageClick = (pageId) => {
    setSelectedPageId(pageId);
    setEditMode(true);
    const selectedData = aboutpages.find((aboutpage) => aboutpage.id === pageId);
    setFormData({
      media_id: selectedData.media_id,
      description_en: selectedData.description_en,
      description_bn: selectedData.description_bn,
      section3_cards: selectedData.section3_cards,
      section4_cards: selectedData.section4_cards,
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
          instance.delete(`/about/${pageId}`).then((res) => {
            // Refresh card data after deletion
            instance.get('/about').then((res) => {
              setAboutpages(res.data);
            });
          });
        }
      });
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  const handleFormChange = (fieldName, value) => {
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
      const response = await instance.put(`/about/${selectedPageId}`, formData);

      if (response?.status === 200) {
        setUpdateResponse(response)
      }

      // Disable edit mode and perform any other necessary actions
      setEditMode(false);
      setSelectedPageId(null);

    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

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

  const handleCreateAboutPage = async () => {
    try {
      setLoading(true);
      const response = await instance.post('/about', formData);

      if (response?.status === 200) {
        message.success('About Page created successfully');
        setUpdateResponse(response)
      }

      // Disable edit mode and perform any other necessary actions
      setCreateMode(false);
      setSelectedPageId(null);

    } catch (error) {
      message.error('Error creating page');
      console.error('Error creating page:', error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="ViewContainer">
        <div className="ViewContentContainer">
          <div className="PageHeader" style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
            <h1>About Page</h1>

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

          <div className="pageContainers">
            <div className="pageContainer">
              {
                createMode ? (
                  <>
                    <div className="createMode" style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      border: "3px solid var(--theme)",
                      borderRadius: 10,
                      backgroundColor: "#f0f0f0",
                      padding: "4em 1em",
                    }}>
                      <h1>Create Mode on</h1>
                      <div className="createModeContainer" style={{
                        padding: "2em 0",
                      }}>
                        {/* Content goes here */}
                        <h1>New page forms</h1>
                      </div>
                    </div>
                  </>
                ) : null
              }


              <Row gutter={[16, 16]}>
                {
                  aboutpages?.map((aboutpage) => (
                    <Col key={aboutpage?.id} xs={24}>
                      <Card
                        title={`Page ID: ${aboutpage?.id}`}
                        extra={
                          <Button onClick={() => handleExpand(aboutpage?.id)}>
                            {expandedAboutpageId === aboutpage.id ? 'Collapse' : 'Expand'}
                          </Button>
                        }
                        style={{ marginBottom: "5em", marginTop: "3em", border: "1px solid var(--theme)", borderRadius: 10, }}
                      >
                        {
                          expandedAboutpageId === aboutpage?.id && (
                            <div>
                              <center>
                                {
                                  editmode ?
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
                                            handleEditPageClick(aboutpage.id);
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
                                            handleDeletePage(aboutpage.id);
                                          }}>Delete Page</Button>
                                      </>
                                    )
                                }
                                <div className="pageContainer" style={{
                                  padding: "2em 0",
                                }}>
                                  {/* Hero Section */}
                                  <div className="hero_section" style={{

                                  }}>
                                    {
                                      editmode ? (

                                        <>
                                          <h1>Hero</h1>
                                          <>
                                            <Select
                                              showSearch
                                              value={formData?.media_id}
                                              onChange={(value) => handleFormChange('media_id', value)}
                                              style={{ width: '50vw' }}
                                              defaultValue="Select Video"
                                            >
                                              {videos?.map((video) => (
                                                <Option key={video.id} value={video.id}>
                                                  <div className="videoList" style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    width: "50vw",
                                                  }}>
                                                    {/* {video.file_name} */}
                                                    <video loop muted autoPlay width="100%" height="200" objectFit="cover" src={`${MEDIA_URL}/${video.file_path}`} />

                                                  </div>
                                                </Option>
                                              ))}
                                            </Select>
                                          </>
                                        </>
                                      ) : (

                                        <>
                                          {aboutpage?.media_mave?.file_type.startsWith('image') ? (
                                            <Image
                                              src={`${MEDIA_URL}/${aboutpage?.media_mave?.file_path}`}
                                              alt="Card Media"
                                              style={{
                                                height: '200px',
                                                width: '18vw',
                                                objectFit: 'contain',
                                                borderRadius: 10,
                                              }}
                                            />
                                          ) : aboutpage?.media_mave?.file_type.startsWith('video') ? (
                                            <video
                                              autoPlay
                                              muted
                                              width="100%"
                                              height="auto"
                                              objectFit="cover"
                                              src={`${MEDIA_URL}/${aboutpage?.media_mave?.file_path}`}
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
                                          )}
                                        </>
                                      )
                                    }

                                  </div>

                                  {/* Description Section */}
                                  <div className="description_section" style={{
                                    padding: "2em 0",
                                  }}>
                                    <h1>Description</h1>
                                    {
                                      editmode ? (
                                        <>
                                          <RichTextEditor
                                            defaultValue={aboutpage.description_en}
                                            editMode={editmode}
                                            onChange={(value) => handleFormChange('description_en', value)}
                                            style={{
                                              textAlign: "left",
                                              fontSize: "1.1rem",
                                            }}
                                          />
                                          <RichTextEditor
                                            defaultValue={aboutpage.description_bn}
                                            editMode={editmode}
                                            onChange={(value) => handleFormChange('description_bn', value)}
                                            style={{
                                              textAlign: "left",
                                              fontSize: "1.1rem",
                                            }}
                                          />
                                        </>
                                      ) :
                                        (
                                          <div style={{
                                            textAlign: "left",
                                          }}>
                                            <div dangerouslySetInnerHTML={{ __html: aboutpage.description_en }}
                                              style={{
                                                textAlign: "left",
                                                fontSize: "1.1rem",
                                              }} />
                                            <br /><br />
                                            <div dangerouslySetInnerHTML={{ __html: aboutpage.description_bn }}
                                              style={{
                                                textAlign: "left",
                                                fontSize: "1.1rem",
                                              }} />
                                          </div>
                                        )
                                    }

                                  </div>

                                  {/* Section 3 cards */}
                                  <h1>Section 3 Cards</h1>
                                  {
                                    editmode ? (
                                      <Select
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) =>
                                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        style={{ width: '50vw' }}
                                        mode="multiple"
                                        size="large"
                                        value={formData?.section3_cards}
                                        onChange={(value) => handleFormChange('section3_cards', value)}
                                      // defaultValue={aboutpage?.section3_cards_mave?.map((card) => card.title_en)}
                                      >
                                        {cards?.map((card) => (
                                          <Option key={card.id} value={card.id}>
                                            {card.title_en}
                                          </Option>
                                        ))}
                                      </Select>
                                    ) : (
                                      <>
                                        {aboutpage?.section3_cards_mave?.map((card) => (
                                          <div key={card?.id}>
                                            <Card
                                              title={card?.title_en}
                                            >
                                              <div className="cardContainer" style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}>
                                                {card?.media_files?.file_type.startsWith("image") ? (
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
                                                ) : card?.media_files?.file_type.startsWith("video") ? (
                                                  <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    width="450px"
                                                    height="450px"
                                                    objectFit="cover"
                                                    src={`${MEDIA_URL}/${card.media_files.file_path}`}
                                                  >
                                                    Your browser does not support the video tag.
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
                                                <div style={{
                                                  width: "35%",
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  padding: "1em",
                                                  backgroundColor: "var(--themes)",
                                                  color: "white",
                                                }}>
                                                  <h3 style={{
                                                    fontSize: "2.5em",
                                                    paddingBottom: "1em",
                                                  }}>{card.title_en}</h3>
                                                  <p style={{
                                                    fontSize: "1.2rem",

                                                  }}>{card?.description_en}</p>
                                                </div>
                                              </div>
                                            </Card>
                                          </div>
                                        ))}
                                      </>
                                    )
                                  }


                                  {/* Section 4 cards */}
                                  <h1>Section 4 Cards</h1>
                                  {
                                    editmode ? (
                                      <Select
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) =>
                                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        style={{ width: '50vw' }}
                                        mode="multiple"
                                        size="large"
                                        value={formData?.section4_cards}
                                        onChange={(value) => handleFormChange('section4_cards', value)}
                                      // defaultValue={aboutpage?.section4_cards_mave?.map((card) => card.title_en)}
                                      >
                                        {cards?.map((card) => (
                                          <Option key={card.id} value={card.id} style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "50vw",
                                          }}>
                                            {card.title_en}
                                          </Option>
                                        ))}
                                      </Select>
                                    ) : (
                                      <>
                                        {aboutpage?.section4_cards_mave?.map((card) => (
                                          <div key={card?.id}>
                                            <Card
                                              title={card?.title_en}
                                            >
                                              <div className="cardContainer" style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}>
                                                {card?.media_files?.file_type.startsWith("image") ? (
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
                                                ) : card?.media_files?.file_type.startsWith("video") ? (
                                                  <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    width="450px"
                                                    height="450px"
                                                    objectFit="cover"
                                                    src={`${MEDIA_URL}/${card.media_files.file_path}`}
                                                  >
                                                    Your browser does not support the video tag.
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
                                                <div style={{
                                                  width: "35%",
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  padding: "1em",
                                                  backgroundColor: "var(--themes)",
                                                  color: "white",
                                                }}>
                                                  <h3 style={{
                                                    fontSize: "2.5em",
                                                    paddingBottom: "1em",
                                                  }}>{card.title_en}</h3>
                                                  <p style={{
                                                    fontSize: "1.2rem",

                                                  }}>{card?.description_en}</p>
                                                </div>
                                              </div>
                                            </Card>
                                          </div>
                                        ))}
                                      </>
                                    )
                                  }

                                </div>
                              </center>
                            </div>
                          )}
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;