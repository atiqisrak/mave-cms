import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Image,
  Carousel,
  message,
} from "antd";
import instance from "../axios";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteFilled,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import RichTextEditor from "../components/RichTextEditor";
import SingleMediaSelect from "../components/SingleMediaSelect";

const News = () => {
  const [loading, setLoading] = useState(false);
  const [newsPages, setNewsPages] = useState([]);
  const [updateResponse, setUpdateResponse] = useState(null);
  const [cards, setCards] = useState([]);
  const [media, setMedia] = useState([]);
  const [videos, setVideos] = useState([]);
  const [expandedNewsPageId, setExpandedNewsPageId] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [events, setEvents] = useState([]);
  const [pressRelease, setPressRelease] = useState([]);

  const fetchNewsPages = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/news");
      if (response.data) {
        setNewsPages(response.data);
        setLoading(false);
      } else {
        // console.log("No data was returned");
        message.error("No data was returned");
      }
    } catch (error) {
      // console.log(error);
      message.error(error);
    }
  };
  useEffect(() => {
    fetchNewsPages();
  }, [setUpdateResponse]);

  // Fetch Cards, media, events at a time

  const fetchData = async () => {
    try {
      setLoading(true);
      const eventsResponse = await instance.get("/events");
      const pressReleaseResponse = await instance.get("/press_release");
      const mediaResponse = await instance.get("/media");
      const cardsResponse = await instance.get("/cards");

      if (eventsResponse.data) {
        setEvents(eventsResponse.data);
      }
      if (pressReleaseResponse.data) {
        setPressRelease(pressReleaseResponse.data);
        // console.log("Press Release: ", pressReleaseResponse.data)
      }

      if (mediaResponse.data) {
        setMedia(mediaResponse.data);
      }
      if (cardsResponse.data) {
        setCards(cardsResponse.data);
      }
      setLoading(false);
    } catch (error) {
      // console.log(error);
      message.error(error);
    }
  };

  // expandedNewsPageId &&
  useEffect(() => {
    fetchData();
  }, [setUpdateResponse]);
  // expandedNewsPageId ? (
  //     editMode ? (
  //         fetchData()
  //     ) : null
  // )
  //     : null;

  // --------------- Page Operations --------------- //
  // Filter videos
  const video = media.filter((mediaItem) =>
    mediaItem.file_type.startsWith("video")
  );

  useEffect(() => {
    setVideos(video);
  }, [media]);

  const handleExpand = (newspageId) => {
    if (expandedNewsPageId === newspageId) {
      setExpandedNewsPageId(null);
    } else {
      setExpandedNewsPageId(newspageId);
    }
  };

  const handleEditPageClick = (pageId) => {
    setSelectedPageId(pageId);
    setEditMode(true);

    const selectedData = newsPages.find((newsPage) => newsPage.id === pageId);
    setFormData({
      //   Form Data
      title_en: selectedData.title_en,
      title_bn: selectedData.title_bn,
      description_en: selectedData.description_en,
      description_bn: selectedData.description_bn,
      event_ids: selectedData.event_ids,
      press_release_id: selectedData.press_release_id,
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
          instance.delete(`/news/${pageId}`).then((res) => {
            // Refresh card data after deletion
            instance.get("/news").then((res) => {
              setNewsPages(res.data);
            });
          });
        },
      });
    } catch (error) {
      console.error("Error deleting page:", error);
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
      const response = await instance.put(`/news/${selectedPageId}`, formData);
      if (response?.status === 200) {
        setUpdateResponse(response);
      }
      setFormData(null);
      fetchNewsPages();
      setEditMode(false);
      setSelectedPageId(null);
    } catch (error) {
      console.error("Error updating page:", error);
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
  };
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
      <div className="mavecontainer">
        <div
          className="PageHeader"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>News Page</h1>
          {createMode ? (
            <Button
              danger
              style={{
                borderRadius: "10px",
                fontSize: "1.2em",
                marginRight: "1em",
                // paddingBottom: "1.8em",
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
                // paddingBottom: "1.8em",
              }}
              icon={<CheckCircleFilled />}
              onClick={() => setCreateMode(true)}
            >
              Create New
            </Button>
          )}
        </div>

        {createMode ? <h3>Create mode on</h3> : null}

        <Row gutter={[16, 16]}>
          {newsPages?.map((newsPage) => (
            <Col key={newsPage?.id} xs={24} sm={24}>
              <Card
                title={`Page ID: ${newsPage?.id}`}
                extra={
                  <Button onClick={() => handleExpand(newsPage?.id)}>
                    {expandedNewsPageId === newsPage.id ? "Collapse" : "Expand"}
                  </Button>
                }
                style={{
                  marginBottom: "5em",
                  marginTop: "3em",
                  border: "1px solid var(--theme)",
                  borderRadius: 10,
                }}
              >
                {expandedNewsPageId === newsPage?.id && (
                  <div>
                    <center>
                      {editMode ? (
                        <>
                          <Button
                            danger
                            style={{
                              borderRadius: "10px",
                              fontSize: "1.2em",
                              marginRight: "1em",
                              // paddingBottom: "1.8em",
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
                              // paddingBottom: "1.8em",
                            }}
                            icon={<EditOutlined />}
                            onClick={() => {
                              handleEditPageClick(newsPage.id);
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
                              // paddingBottom: "1.8em",
                            }}
                            icon={<DeleteFilled />}
                            onClick={() => {
                              handleDeletePage(newsPage.id);
                            }}
                          >
                            Delete Page
                          </Button>
                        </>
                      )}
                    </center>
                    <div
                      className="pageContainer"
                      style={{
                        padding: "2em 0",
                      }}
                    >
                      <h2
                        style={{
                          marginTop: "2em",
                          color: "var(--theme)",
                          textAlign: "center",
                        }}
                      >
                        Hero Section
                      </h2>
                      {editMode ? (
                        <>
                          {/* Content goes here */}

                          <Input
                            placeholder="Title (English)"
                            style={{
                              marginBottom: "1em",
                            }}
                            defaultValue={formData?.title_en}
                            value={formData?.title_en}
                            onChange={(e) =>
                              handleFormChange("title_en", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Title (Bangla)"
                            style={{
                              marginBottom: "1em",
                            }}
                            defaultValue={formData?.title_bn}
                            value={formData?.title_bn}
                            onChange={(e) =>
                              handleFormChange("title_bn", e.target.value)
                            }
                          />
                          {/* <RichTextEditor
                                                                    placeholder="Description (English)"
                                                                    style={{
                                                                        marginBottom: "1em",
                                                                    }}
                                                                    editMode={editMode}
                                                                    defaultValue={formData?.description_en}
                                                                    value={formData?.description_en}
                                                                    onChange={(value) => handleFormChange('description_en', value)}
                                                                />
                                                                <RichTextEditor
                                                                    placeholder="Description (Bangla)"
                                                                    style={{
                                                                        marginBottom: "1em",
                                                                    }}
                                                                    editMode={editMode}
                                                                    defaultValue={formData?.description_bn}
                                                                    value={formData?.description_bn}
                                                                    onChange={(value) => handleFormChange('description_bn', value)}
                                                                /> */}
                          <h3
                            style={{
                              color: "var(--theme)",
                            }}
                          >
                            Events
                          </h3>
                          <Select
                            allowClear
                            showSearch
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Select Events"
                            defaultValue={formData?.event_ids}
                            value={formData?.event_ids}
                            onChange={(value) =>
                              handleFormChange("event_ids", value)
                            }
                          >
                            {events?.map((event) => (
                              <Select.Option key={event.id} value={event.id}>
                                {event.title_en}
                              </Select.Option>
                            ))}
                          </Select>

                          {/* <h3 style={{
                                                                    color: "var(--theme)",
                                                                }}>
                                                                    Press Release
                                                                </h3>
                                                                <Select
                                                                    allowClear
                                                                    showSearch
                                                                    style={{ width: '100%' }}
                                                                    placeholder="Select Press Release"
                                                                    defaultValue={formData?.press_release_id}
                                                                    value={formData?.press_release_id}
                                                                    onChange={(value) => handleFormChange('press_release_id', value)}
                                                                >
                                                                    {
                                                                        pressRelease?.map((press) => (
                                                                            <Select.Option key={press.id} value={press.id}>
                                                                                {press.title_en}
                                                                            </Select.Option>
                                                                        ))
                                                                    }
                                                                </Select> */}
                        </>
                      ) : (
                        <>
                          <h2>Title (English): {newsPage?.title_en}</h2>
                          <h2>Title (Bangla): {newsPage?.title_bn}</h2>

                          {/* <div dangerouslySetInnerHTML={{ __html: newsPage?.description_en }} />
                                                            <div dangerouslySetInnerHTML={{ __html: newsPage?.description_bn }} /> */}

                          <h3
                            style={{
                              color: "var(--theme)",
                            }}
                          >
                            Events
                          </h3>
                          <div>
                            {newsPage?.events_mave?.map((event) => (
                              <div
                                style={{
                                  padding: "2em 0",
                                  borderBottom: "1px solid var(--theme)",
                                }}
                              >
                                <h3>Event Title (English): {event.title_en}</h3>
                                <h3>Event Title (Bangla): {event.title_bn}</h3>
                                <h4>Event Date: {event.event_date}</h4>
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 1fr)",
                                    gridGap: "1em",
                                    paddingTop: "2em",
                                  }}
                                >
                                  {event?.medias_mave?.map((media) => (
                                    <div>
                                      {media?.file_type?.startsWith("image") ? (
                                        <Image
                                          src={`${MEDIA_URL}/${media?.file_path}`}
                                          style={{
                                            width: "12vw",
                                            height: "10vw",
                                            objectFit: "cover",
                                            borderRadius: 20,
                                          }}
                                          preview={false}
                                        />
                                      ) : (
                                        <video
                                          src={`${MEDIA_URL}/${media?.file_path}`}
                                          style={{
                                            width: "12vw",
                                            height: "10vw",
                                            objectFit: "cover",
                                          }}
                                          autoPlay
                                          loop
                                          muted
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Press Release */}
                          <div className="PressRelease">
                            <h3
                              style={{
                                color: "var(--theme)",
                                padding: "2em 0",
                              }}
                            >
                              Press Release Title (English):{" "}
                              {newsPage?.press_release_mave?.title_en}
                              Press Release Title (Bangla):{" "}
                              {newsPage?.press_release_mave?.title_bn}
                            </h3>
                            {newsPage?.press_release_mave?.cards_mave?.map(
                              (card) => (
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                  }}
                                >
                                  <div>
                                    <h3>
                                      Card Title (English): {card.title_en}
                                    </h3>
                                    <h3>
                                      Card Title (Bangla): {card.title_bn}
                                    </h3>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: card.description_en,
                                      }}
                                      style={{
                                        marginBottom: "1em",
                                      }}
                                    />
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: card.description_bn,
                                      }}
                                      style={{
                                        marginBottom: "1em",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <h3>Card Image</h3>
                                    {card?.media_files ? (
                                      <div>
                                        {card?.media_files?.file_type?.startsWith(
                                          "image"
                                        ) ? (
                                          <Image
                                            src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                                            style={{
                                              width: "12vw",
                                              height: "10vw",
                                              objectFit: "cover",
                                              borderRadius: 20,
                                            }}
                                            preview={false}
                                          />
                                        ) : (
                                          <video
                                            src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                                            style={{
                                              width: "12vw",
                                              height: "10vw",
                                              objectFit: "cover",
                                            }}
                                            autoPlay
                                            loop
                                            muted
                                          />
                                        )}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default News;
