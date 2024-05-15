import React, { useEffect, useState } from "react";
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
  Card,
  Select,
  Checkbox,
  Pagination,
  message,
} from "antd";
import instance from "../axios";
import Site from "../components/Site";
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  EyeFilled,
  EyeOutlined,
  FilterOutlined,
  PlusCircleOutlined,
  RestOutlined,
} from "@ant-design/icons";
import Loader from "../components/Loader";
import SingleMediaSelect from "../components/SingleMediaSelect";
import CreateCardForm from "../components/CreateCardForm";
import { setPageTitle } from "../global/constants/pageTitle";
import Link from "next/link";
import RichTextEditor from "../components/RichTextEditor";
import CardGridView from "../components/CardGridView";
import MediaRenderEngine from "../components/MediaRenderEngine";

const PressRelease = () => {
  const [loading, setLoading] = useState(false);
  const [pressReleases, setPressReleases] = useState(null);
  const [updateResponse, setUpdateResponse] = useState(null);
  const [cards, setCards] = useState([]);
  const [media, setMedia] = useState([]);
  const [videos, setVideos] = useState([]);
  const [expandedPressRelease, setExpandedPressRelease] = useState(null);
  const [selectedPressReleaseId, setSelectedPressReleaseId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [cardsData, setCardsData] = useState([]);
  const [pages, setPages] = useState([]);

  const fetchPressReleases = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/press_release");
      if (response && response.data) {
        setPressReleases(response.data);
        console.log("Press Releases", response.data);
        // console.log("Press Releases fetched successfully");
        setLoading(false);
      } else {
        message.error("Press Releases couldn't be fetched");
      }
    } catch (error) {
      message.error("Press Releases couldn't be fetched");
    }
  };

  useEffect(() => {
    fetchPressReleases();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const [cardsResponse, mediaResponse, pageResponse] = await Promise.all([
        instance.get("/cards"),
        instance.get("/media"),
        instance.get("/pages"),
      ]);

      if (
        cardsResponse.status === 200 &&
        mediaResponse.status === 200 &&
        pageResponse.status === 200
      ) {
        setCardsData(cardsResponse.data);
        setCards(cardsResponse.data);
        setMedia(mediaResponse.data);
        setPages(pageResponse.data);
        setLoading(false);
      } else {
        // message.error("Failed to fetch cards");
        console.log("Failed to fetch cards");
        setLoading(false);
      }
    } catch (error) {
      // message.error("Failed to fetch cards");
      console.log("Failed to fetch cards", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [updateResponse]);

  const handleExpand = (pressReleaseId) => {
    if (expandedPressRelease === pressReleaseId) {
      setExpandedPressRelease(null);
    } else {
      setExpandedPressRelease(pressReleaseId);
    }
  };

  const handleEditPageClick = (pressReleaseId) => {
    setSelectedPressReleaseId(pressReleaseId);
    setEditMode(true);
    setCreateMode(false);

    const selectedPressRelease = pressReleases.find(
      (pressRelease) => pressRelease.id === pressReleaseId
    );

    if (selectedPressRelease) {
      setFormData({
        card_ids: selectedPressRelease?.card_ids,
      });
    }
  };

  // Delete Page
  const handleDeletePage = async (pressReleaseId) => {
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this press release?",
        icon: <DeleteOutlined />,
        content: "This action cannot be undone",
        okText: "Delete",
        okType: "danger",
        cancelText: "Cancel",
        onOk: async () => {
          const response = await instance.delete(
            `/press_release/${pressReleaseId}`
          );
          if (response && response.data) {
            setUpdateResponse(response.data);
            fetchPressReleases();
          }
        },
      });
    } catch (error) {
      message.error(error.message);
      // console.log("Error deleting press release", error);
    }
  };

  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedPressReleaseId || !formData) {
      return;
    }

    try {
      const response = await instance.put(
        `/press_release/${selectedPressReleaseId}`,
        formData
      );
      if (response?.status === 200) {
        setUpdateResponse(response.data);
        fetchPressReleases();
      }
      setEditMode(false);
      setCreateMode(false);
      setFormData(null);
    } catch (error) {
      message.error(error.message);
      // console.log("Error updating press release", error);
    }
  };

  const handleCreatePressRelease = async () => {
    if (!formData) {
      return;
    }

    try {
      const response = await instance.post("/press_release", formData);
      if (response?.status === 200) {
        setUpdateResponse(response.data);
        fetchPressReleases();
      }
      setEditMode(false);
      setCreateMode(false);
      setFormData(null);
      fetchPressReleases();
    } catch (error) {
      message.error(error.message);
      // console.log("Error creating press release", error);
    }
  };

  const PressReleaseViewer = ({ cardData, media, fetchCards }) => {
    // View card details in modal
    const [viewDetails, setViewDetails] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCardDetails = (card) => {
      setSelectedCard(card);
      setViewDetails(true);
    };

    // Media Select Modal
    const [mediaSelectionVisible, setMediaSelectionVisible] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [editedCardId, setEditedCardId] = useState(null);
    const [selectedMediaId, setSelectedMediaId] = useState(null);

    const handleOpenMediaSelectionModal = (cardId) => {
      setSelectedCardId(cardId);
      setMediaSelectionVisible(true);
    };

    // fetch updated card data
    const fetchUpdatedCardData = async () => {
      try {
        const res = await instance.get(`/cards/${selectedCard.id}`);
        setSelectedCard(res.data);
      } catch (error) {
        // console.log(error);
        message.error("Failed to fetch updated card data");
      }
    };

    // Card edit form
    const updateCard = async () => {
      try {
        setLoading(true);
        const requestedData = {
          title_en: selectedCard.title_en,
          title_bn: selectedCard.title_bn,
          description_en: selectedCard.description_en,
          description_bn: selectedCard.description_bn,
        };

        if (selectedMediaId !== null) {
          requestedData.media_ids = selectedMediaId;
        } else {
          requestedData.media_ids = selectedCard.media_files?.id;
        }

        const res = await instance.put(
          `/cards/${selectedCard.id}`,
          requestedData
        );

        setLoading(false);
        fetchUpdatedCardData();
      } catch (error) {
        // console.log(error);
        message.error("Failed to update card");
        setLoading(false);
      }
    };

    return (
      <div>
        <Row gutter={[16, 16]}>
          {console.log("Card Data gg: ", cardData)}
          {cardData?.map((card) => (
            <Col key={card.id}>
              <div
                style={{
                  textAlign: "center",
                  border: "1px solid var(--themes-light)",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                }}
              >
                {card?.media_files ? (
                  <MediaRenderEngine item={card?.media_files} />
                ) : (
                  <Image
                    preview={false}
                    src="/images/Image_Placeholder.png"
                    alt={card.title_en}
                    width={200}
                    height={200}
                  />
                )}
                <div
                  style={{
                    padding: "10px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <h2
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {card.title_en}
                  </h2>

                  <p
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: card?.description_en,
                    }}
                  />
                </div>

                {/* View Action Buttons (View Details, Edit, Delete) on card hover */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    gap: "10px",
                    padding: "10px 0",
                  }}
                >
                  <Button
                    icon={<EyeOutlined />}
                    style={{
                      backgroundColor: "var(--themes-light)",
                      color: "var(--themes)",
                      border: "1px solid transparent",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={() => handleCardDetails(card)}
                  />
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* View Card Details Modal */}
        <Modal
          width={800}
          title="Card Details"
          open={viewDetails}
          onCancel={() => setViewDetails(false)}
          footer={[
            // edit and close button
            <Button
              key="edit"
              style={{
                backgroundColor: "var(--theme)",
                color: "white",
              }}
              icon={editMode ? <CheckCircleFilled /> : <EditOutlined />}
              onClick={() => {
                if (editMode) {
                  updateCard();
                }
                setEditMode(!editMode);
              }}
            />,
            <Button
              key="close"
              style={{
                backgroundColor: "var(--themes)",
                color: "white",
              }}
              icon={<CloseCircleOutlined />}
              onClick={() => setViewDetails(false)}
            />,
          ]}
        >
          {<MediaRenderEngine item={selectedCard?.media_files} />}

          {
            <div>
              <h2>{selectedCard?.title_en}</h2>
              {selectedCard?.title_bn && <h2>{selectedCard?.title_bn}</h2>}
              <p
                dangerouslySetInnerHTML={{
                  __html: selectedCard?.description_en,
                }}
              />
              {selectedCard?.description_bn && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: selectedCard?.description_bn,
                  }}
                />
              )}
            </div>
          }
        </Modal>
      </div>
    );
  };

  return (
    <div className="ViewContainer">
      <div className="ViewContentContainer">
        <div
          className="PageHeader"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>Press Releases</h1>

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
        </div>

        <div className="pageContainers">
          {createMode ? (
            <div className="pageContainer">
              <div
                className="pageContainerHeader"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2em",
                }}
              >
                <h2>Create New Press Release</h2>
                <div
                  className="formGroup"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2em",
                  }}
                >
                  <label>Card IDs</label>
                  <Select
                    mode="multiple"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: "100%", height: "100px" }}
                    placeholder="Select Cards"
                    value={formData?.card_ids}
                    onChange={(value) => handleFormChange("card_ids", value)}
                  >
                    {cards?.map((card) => (
                      <Select.Option key={card.id} value={card.id}>
                        {
                          <div
                            style={{
                              display: "flex",
                              gap: "1em",
                            }}
                          >
                            <MediaRenderEngine item={card?.media_files} />
                            <h3>{card.title_en}</h3>
                          </div>
                        }
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <center>
                  <Button
                    type="primary"
                    style={{
                      width: "300px",
                      backgroundColor: "var(--theme)",
                      borderColor: "var(--theme)",
                      color: "white",
                      borderRadius: "10px",
                      fontSize: "1.2em",
                      marginRight: "1em",
                      paddingBottom: "1.8em",
                    }}
                    onClick={handleCreatePressRelease}
                  >
                    Create
                  </Button>
                </center>
              </div>
            </div>
          ) : null}

          <Row gutter={[16, 16]}>
            {pressReleases?.map((pressRelease) => (
              <Col key={pressRelease.id} span={24}>
                <Card
                  title={`Press Release ID: ${pressRelease.id}`}
                  extra={
                    <div>
                      <Button onClick={() => handleExpand(pressRelease?.id)}>
                        {expandedPressRelease === pressRelease.id
                          ? "Collapse"
                          : "Expand"}
                      </Button>
                    </div>
                  }
                  style={{
                    margin: "2em 0",
                    border: "1px solid var(--theme)",
                    borderRadius: 10,
                  }}
                >
                  {expandedPressRelease === pressRelease?.id && (
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
                                handleEditPageClick(pressRelease.id);
                              }}
                            >
                              Edit Press Release
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
                                handleDeletePage(pressRelease.id);
                              }}
                            >
                              Delete Press Release
                            </Button>
                          </>
                        )}
                      </center>
                      <div className="pageContainer">
                        {editMode ? (
                          <>
                            <div>
                              <h3>Card IDs</h3>
                              <Select
                                mode="multiple"
                                allowClear
                                showSearch
                                filterOption={(input, option) =>
                                  option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }
                                style={{
                                  width: "100%",
                                  borderRadius: 10,
                                }}
                                placeholder="Select Tabs"
                                defaultValue={formData?.card_ids}
                                value={formData?.card_ids}
                                onChange={(value) =>
                                  handleFormChange("card_ids", value)
                                }
                              >
                                {cards?.map((card) => (
                                  <Select.Option key={card.id} value={card.id}>
                                    {card.title_en}
                                  </Select.Option>
                                ))}
                              </Select>
                            </div>
                          </>
                        ) : (
                          <div
                            style={{
                              display: "grid",
                              gridAutoColumns: "1fr",
                              marginTop: "1em",
                            }}
                          >
                            {console.log("Press Release", pressRelease)}
                            {
                              <PressReleaseViewer
                                cardData={pressRelease?.cards_mave}
                                media={media}
                                fetchCards={fetchCards}
                              />
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PressRelease;
