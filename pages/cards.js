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
} from "antd";
import instance from "../axios";
import Site from "../components/Site";
import {
  AppstoreOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditFilled,
  EyeFilled,
  FilterOutlined,
  PlusCircleOutlined,
  RestOutlined,
  SelectOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Loader from "../components/Loader";
import SingleMediaSelect from "../components/SingleMediaSelect";
import CreateCardForm from "../components/CreateCardForm";
import { setPageTitle } from "../global/constants/pageTitle";
import Link from "next/link";
import RichTextEditor from "../components/RichTextEditor";
import CardViewer from "../components/CardViewer";

const Cards = () => {
  useEffect(() => {
    // Set the dynamic page title for the Home page
    setPageTitle("Cards");
  }, []);

  const { Meta } = AntCard;
  const { Option } = Select;
  const [media, setMedia] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [editMode, setEditMode] = useState(false);
  const [editedCard, setEditedCard] = useState(null);
  const [editedCardId, setEditedCardId] = useState(null);
  const [isCreateCardFormVisible, setIsCreateCardFormVisible] = useState(false);
  const { Search } = Input;

  const [searchText, setSearchText] = useState("");
  const [isEmptyInput, setIsEmptyInput] = useState(true);
  const [originalCardData, setOriginalCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfCardsPerPage = 6;
  const [sortBy, setSortBy] = useState("desc");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [displayMode, setDisplayMode] = useState(true);
  const [viewDetails, setViewDetails] = useState(false);

  const toggleDisplayMode = () => {
    setDisplayMode((prevMode) => !prevMode);
  };

  // Change media
  const [mediaSelectionVisible, setMediaSelectionVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedMediaForCard, setSelectedMediaForCard] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [mediaResponse, cardsResponse] = await Promise.all([
        instance("/media"),
        instance("/cards"),
      ]);

      if (mediaResponse.data && cardsResponse.data) {
        setMedia(mediaResponse.data);

        // Sort descending by ID
        const sortedCards = cardsResponse.data.sort((a, b) => b.id - a.id);
        setCardData(sortedCards);
        setOriginalCardData(cardsResponse.data);
      } else {
        console.error("Error fetching data");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [setCardData]);

  const [pages, setPages] = useState([]);
  useEffect(() => {
    // get pages
    instance.get("/pages").then((res) => {
      setPages(res.data);
      console.log("Pages: ", res.data);
    });
  }, []);

  // List options for page name Home : home
  // const pageNames = [
  //   { name: "Home", value: "home" },
  //   { name: "Corporate", value: "corporate" },
  //   { name: "Cylinder Gas", value: "cylindergas" },
  //   { name: "Autogas", value: "autogas" },
  //   { name: "Bulk Gas", value: "bulkgas" },
  //   { name: "News & Media", value: "newsmedia" },
  //   { name: "Health & Safety", value: "healthandsafety" },
  //   { name: "Career", value: "career" },
  //   { name: "Contact Us", value: "contactus" },
  //   { name: "F.A.Q", value: "faq" },
  //   { name: "Terms & Conditions", value: "termsandconditions" },
  //   { name: "Privacy Policy", value: "privacypolicy" },
  //   { name: "Cookies Policy", value: "cookiespolicy" },
  //   { name: "Sitemap", value: "sitemap" },
  // ];
  const pageNames = pages.map((page) => ({
    name: page?.page_name_en,
    value: page?.slug ? page?.slug : page?.page_name_en,
  }));

  const [viewCardId, setViewCardId] = useState(null);

  // List View
  const SingleColumnContent = ({
    displayCards,
    editMode,
    editedCardId,
    editedCard,
    handleOpenMediaSelectionModal,
    handleFieldChange,
    toggleEditMode,
    deleteCard,
    media,
    setMediaSelectionVisible,
    handleAddMediaToCard,
  }) => {
    return (
      <>
        {displayCards?.map((card) => {
          const mediaIds = card.media_ids
            ? card.media_ids.split(",")?.map(Number)
            : [];
          const mediaItems = media.filter((mediaItem) =>
            mediaIds.includes(mediaItem.id)
          );

          return (
            <Col span={24} key={card.id}>
              <Card
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  gap: "1rem",
                }}
              >
                <center>
                  <h2>
                    {card.title_en} ({card?.title_bn})
                  </h2>
                </center>
                {editMode && editedCardId === card.id ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                    }}
                  >
                    <div>
                      {/* single media selector */}
                      <SingleMediaSelect
                        visible={mediaSelectionVisible}
                        onCancel={() => setMediaSelectionVisible(false)}
                        onMediaSelect={handleAddMediaToCard}
                        media={media}
                      />
                      <div>
                        <center>
                          <Button
                            type="primary"
                            style={{
                              marginRight: "1rem",
                              backgroundColor: "var(--theme)",
                              display:
                                editMode && editedCardId === card.id
                                  ? "inline-block"
                                  : "none",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() =>
                              handleOpenMediaSelectionModal(card.id)
                            }
                          >
                            Change Media
                          </Button>
                        </center>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            marginTop: "1rem",
                          }}
                        >
                          {card?.media_files ? (
                            card?.media_files?.file_type == "image/jpeg" ||
                            "image/png" ||
                            "image/jpg" ||
                            "image/svg" ? (
                              <Image
                                src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                                height={150}
                                width={450}
                                style={{
                                  objectFit: "cover",
                                  borderRadius: 10,
                                  // filter: "blur(1.2px)",
                                }}
                              />
                            ) : (
                              <video
                                src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                                height={150}
                                width={150}
                                style={{
                                  objectFit: "cover",
                                  borderRadius: 10,
                                }}
                                muted
                                loop
                                autoPlay
                              />
                            )
                          ) : (
                            <img
                              src="/images/Image_Placeholder.png"
                              height={150}
                              width={150}
                              style={{
                                objectFit: "cover",
                                borderRadius: 10,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      {/* Description editor */}
                      <h3>Page:</h3>
                      <Select
                        showSearch
                        id="pageName"
                        style={{ width: 120 }}
                        onChange={(e) => handleFieldChange("page_name", e)}
                        value={editedCard?.page_name}
                      >
                        {pageNames.map((page) => (
                          <Option value={page.value}>{page.name}</Option>
                        ))}
                      </Select>
                      <br />
                      <br />
                      <h3>Description English:</h3>
                      <RichTextEditor
                        defaultValue={editedCard.description_en}
                        editMode={editMode}
                        onChange={(value) =>
                          (editedCard.description_en = value)
                        }
                      />
                      <br />
                      <h3>Description Bangla:</h3>
                      <RichTextEditor
                        defaultValue={editedCard.description_bn}
                        editMode={editMode}
                        onChange={(value) =>
                          (editedCard.description_bn = value)
                        }
                      />
                      <br />
                      <Button
                        type="primary"
                        style={{
                          marginRight: "1rem",
                          backgroundColor: "var(--theme)",
                          display:
                            editMode && editedCardId === card.id
                              ? "inline-block"
                              : "none",
                        }}
                        onClick={() => toggleEditMode(card)}
                      >
                        Save
                      </Button>
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "transparent",
                          color: "red",
                          borderRadius: "10px",
                          fontSize: "1.2em",
                          paddingBottom: "1.8em",
                        }}
                        icon={<CloseCircleOutlined />}
                        onClick={() => toggleEditMode(card)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "6fr 5fr 1fr",
                      gap: "1rem",
                      paddingTop: "1rem",
                    }}
                  >
                    {card?.media_files ? (
                      card?.media_files?.file_type == "image/jpeg" ||
                      "image/png" ||
                      "image/jpg" ||
                      "image/svg" ? (
                        <Image
                          src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                          height={150}
                          width={450}
                          style={{
                            objectFit: "cover",
                            borderRadius: 10,
                          }}
                        />
                      ) : (
                        <video
                          src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                          height={150}
                          width={150}
                          style={{
                            objectFit: "cover",
                            borderRadius: 10,
                          }}
                          muted
                          loop
                          autoPlay
                        />
                      )
                    ) : (
                      <img
                        src="/images/Image_Placeholder.png"
                        height={150}
                        width={150}
                        style={{
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                      />
                    )}
                    <div
                      style={{
                        paddingTop: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        // alignItems: "center",
                        gap: "2rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          fontSize: "1.8em",
                        }}
                      >
                        <h4 htmlFor="pageName">Page: </h4>
                        {/* {editMode && editedCardId === card.id ? (
                        <Select
                          showSearch
                          id="pageName"
                          style={{ width: 120 }}
                          onChange={(e) => handleFieldChange("page_name", e)}
                          value={editedCard?.page_name}
                        >
                          {pageNames.map((page) => (
                            <Option value={page.value}>{page.name}</Option>
                          ))}
                        </Select>
                      ) : ( */}
                        <h4>
                          {card?.page_name
                            ? pageNames.find(
                                (page) => page.value === card.page_name
                              )?.name
                            : "N/A"}
                        </h4>
                        {/* )} */}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          flexDirection: "column",
                        }}
                      >
                        <p
                          style={{
                            // text limit
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
                        <p
                          style={{
                            // text limit
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: card?.description_bn,
                          }}
                        />
                        {/* display card details only of which is clicked */}
                        {viewDetails && viewCardId == card?.id && (
                          // <CardViewer
                          //   card={card}
                          //   editMode={editMode}
                          //   viewDetails={viewDetails}
                          //   setViewDetails={setViewDetails}
                          // />
                          <Modal
                            title={card?.title_en + " Card Details"}
                            open={viewDetails}
                            onCancel={() => setViewDetails(false)}
                            footer={null}
                            width={700}
                          >
                            <center>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  style={{
                                    textAlign: "left",
                                  }}
                                >
                                  <h2>Desctiption:</h2>
                                  <p
                                    style={{
                                      textAlign: "left",
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: card?.description_en,
                                    }}
                                  />
                                </div>

                                <div
                                  style={{
                                    textAlign: "right",
                                  }}
                                >
                                  <h2>Bornona: </h2>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: card?.description_bn,
                                    }}
                                  />
                                </div>
                              </div>
                            </center>
                          </Modal>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "transparent",
                          color: editMode ? "green" : "var(--theme)",
                          borderRadius: "10px",
                          fontSize: "1.2em",
                          paddingBottom: "1.8em",
                        }}
                        icon={editMode ? <SelectOutlined /> : <EditFilled />}
                        onClick={() => toggleEditMode(card)}
                      >
                        {/* {editMode && editedCardId === card.id ? "Save" : "Edit"} */}
                      </Button>
                      {card?.description_en && (
                        <Button
                          style={{
                            color: "green",
                          }}
                          icon={
                            viewDetails ? (
                              <CloseCircleOutlined />
                            ) : (
                              <EyeFilled />
                            )
                          }
                          onClick={() => {
                            setViewDetails(!viewDetails);
                            // detailsViewer(card?.id, card);
                            console.log("Card Clicked: ", card?.id);
                            setViewCardId(card?.id);
                          }}
                        >
                          {/* {viewDetails ? "Close" : "View"} */}
                        </Button>
                      )}
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "transparent",
                          color: "red",
                          borderRadius: "10px",
                          fontSize: "1.2em",
                          paddingBottom: "1.8em",
                        }}
                        icon={
                          editMode ? (
                            <CloseCircleOutlined />
                          ) : (
                            <DeleteOutlined />
                          )
                        }
                        onClick={() => {
                          editMode ? toggleEditMode(card) : deleteCard(card.id);
                        }}
                      >
                        {/* {editMode ? "Cancel" : "Delete"} */}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </Col>
          );
        })}
      </>
    );
  };

  // Grid View
  const GridContent = ({
    displayCards,
    editMode,
    editedCardId,
    editedCard,
    handleOpenMediaSelectionModal,
    handleFieldChange,
    toggleEditMode,
    deleteCard,
    media,
    setMediaSelectionVisible,
    handleAddMediaToCard,
  }) => {
    return (
      <>
        {displayCards?.map((card) => {
          const mediaIds = card.media_ids
            ? card.media_ids.split(",")?.map(Number)
            : [];
          const mediaItems = media.filter((mediaItem) =>
            mediaIds.includes(mediaItem.id)
          );

          return (
            <Col span={8} key={card.id}>
              <Card
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  gap: "1rem",
                  //editmode conditional height
                  height:
                    editMode && editedCardId === card.id ? "auto" : "560px",
                }}
              >
                <center>
                  <h2
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {card.title_en} ({card?.title_bn})
                  </h2>
                </center>
                {editMode && editedCardId === card.id ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <SingleMediaSelect
                        visible={mediaSelectionVisible}
                        onCancel={() => setMediaSelectionVisible(false)}
                        onMediaSelect={handleAddMediaToCard}
                        media={media}
                      />
                      <div>
                        <center>
                          {/* Current Media and realtime show changed media */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "1rem",
                              margin: "1rem 0",
                            }}
                          >
                            {card?.media_files ? (
                              card?.media_files?.file_type == "image/jpeg" ||
                              "image/png" ||
                              "image/jpg" ||
                              "image/svg" ? (
                                <Image
                                  src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: 10,
                                    border: "2px solid var(--theme)",
                                    width: "100%",
                                    height: "250px",
                                    maxWidth: "350px",
                                    maxHeight: "250px",
                                  }}
                                />
                              ) : (
                                <video
                                  src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                                  height={150}
                                  width={150}
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: 10,
                                  }}
                                  muted
                                  loop
                                  autoPlay
                                />
                              )
                            ) : (
                              <img
                                src="/images/Image_Placeholder.png"
                                height={150}
                                width={150}
                                style={{
                                  objectFit: "cover",
                                  borderRadius: 10,
                                }}
                              />
                            )}
                          </div>
                          <Button
                            type="primary"
                            style={{
                              marginRight: "1rem",
                              backgroundColor: "var(--theme)",
                              display:
                                editMode && editedCardId === card.id
                                  ? "inline-block"
                                  : "none",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() =>
                              handleOpenMediaSelectionModal(card.id)
                            }
                          >
                            Change Media
                          </Button>
                        </center>
                      </div>
                    </div>
                    <div>
                      {/* Description editor */}
                      <h3>Page:</h3>
                      <Select
                        showSearch
                        id="pageName"
                        style={{ width: 120 }}
                        onChange={(e) => handleFieldChange("page_name", e)}
                        value={editedCard?.page_name}
                      >
                        {pageNames.map((page) => (
                          <Option value={page.value}>{page.name}</Option>
                        ))}
                      </Select>
                      <br />
                      <br />
                      <h3>Description English:</h3>
                      <RichTextEditor
                        defaultValue={editedCard.description_en}
                        editMode={editMode}
                        onChange={(value) =>
                          (editedCard.description_en = value)
                        }
                      />
                      <br />
                      <h3>Description Bangla:</h3>
                      <RichTextEditor
                        defaultValue={editedCard.description_bn}
                        editMode={editMode}
                        onChange={(value) =>
                          (editedCard.description_bn = value)
                        }
                      />
                      <br />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          type="primary"
                          style={{
                            marginRight: "1rem",
                            backgroundColor: "var(--theme)",
                            display:
                              editMode && editedCardId === card.id
                                ? "inline-block"
                                : "none",
                          }}
                          onClick={() => toggleEditMode(card)}
                        >
                          Save
                        </Button>
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: "transparent",
                            color: "red",
                            borderRadius: "10px",
                            fontSize: "1.2em",
                            paddingBottom: "1.8em",
                          }}
                          icon={<CloseCircleOutlined />}
                          onClick={() => toggleEditMode(card)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      padding: "2rem 0",
                    }}
                  >
                    <div>
                      {card?.media_files ? (
                        card?.media_files?.file_type == "image/jpeg" ||
                        "image/png" ||
                        "image/jpg" ||
                        "image/svg" ? (
                          <Image
                            src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                            style={{
                              objectFit: "cover",
                              borderRadius: 10,
                              width: "100%",
                              height: "250px",
                              maxWidth: "350px",
                              maxHeight: "250px",
                            }}
                          />
                        ) : (
                          <video
                            src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                            height={150}
                            width={150}
                            style={{
                              objectFit: "cover",
                              borderRadius: 10,
                            }}
                            muted
                            loop
                            autoPlay
                          />
                        )
                      ) : (
                        <img
                          src="/images/Image_Placeholder.png"
                          height={150}
                          width={150}
                          style={{
                            objectFit: "cover",
                            borderRadius: 10,
                          }}
                        />
                      )}

                      <div
                        style={{
                          paddingTop: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          // alignItems: "center",
                          gap: "2rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            fontSize: "1.8em",
                          }}
                        >
                          <h4 htmlFor="pageName">Page: </h4>
                          <h4>
                            {card?.page_name
                              ? pageNames.find(
                                  (page) => page.value === card.page_name
                                )?.name
                              : "N/A"}
                          </h4>
                          {/* )} */}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            flexDirection: "column",
                          }}
                        >
                          <p
                            style={{
                              // text limit
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
                          <p
                            style={{
                              // text limit
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: card?.description_bn,
                            }}
                          />
                          {/* display card details only of which is clicked */}
                          {viewDetails && viewCardId == card?.id && (
                            // <CardViewer
                            //   card={card}
                            //   editMode={editMode}
                            //   viewDetails={viewDetails}
                            //   setViewDetails={setViewDetails}

                            // />
                            <Modal
                              title={card?.title_en + " Card Details"}
                              open={viewDetails}
                              onCancel={() => setViewDetails(false)}
                              footer={null}
                              width={700}
                            >
                              <center>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <div
                                    style={{
                                      textAlign: "left",
                                    }}
                                  >
                                    <h2>Desctiption:</h2>
                                    <p
                                      style={{
                                        textAlign: "left",
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html: card?.description_en,
                                      }}
                                    />
                                  </div>

                                  <div
                                    style={{
                                      textAlign: "right",
                                    }}
                                  >
                                    <h2>Bornona: </h2>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: card?.description_bn,
                                      }}
                                    />
                                  </div>
                                </div>
                              </center>
                            </Modal>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      {/* Edit Button */}
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "transparent",
                          color: editMode ? "green" : "var(--theme)",
                          borderRadius: "10px",
                          fontSize: "1.2em",
                          paddingBottom: "1.8em",
                        }}
                        icon={
                          editMode && editedCardId === card.id ? (
                            <SelectOutlined />
                          ) : (
                            <EditFilled />
                          )
                        }
                        onClick={() => toggleEditMode(card)}
                      >
                        {/* {editMode && editedCardId === card.id ? "Save" : "Edit"} */}
                      </Button>
                      {/* Description Button */}
                      {card?.description_en && (
                        <Button
                          style={{
                            color: "green",
                          }}
                          icon={
                            viewDetails ? (
                              <CloseCircleOutlined />
                            ) : (
                              <EyeFilled />
                            )
                          }
                          onClick={() => {
                            setViewDetails(!viewDetails);
                            // detailsViewer(card?.id, card);
                            console.log("Card Clicked: ", card?.id);
                            setViewCardId(card?.id);
                          }}
                        >
                          {/* {viewDetails ? "Close" : "View"} */}
                        </Button>
                      )}
                      {/* Delete Button */}
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "transparent",
                          color: "red",
                          borderRadius: "10px",
                          fontSize: "1.2em",
                          paddingBottom: "1.8em",
                        }}
                        icon={
                          editMode && editedCardId === card.id ? (
                            <CloseCircleOutlined />
                          ) : (
                            <DeleteOutlined />
                          )
                        }
                        onClick={() => {
                          editMode ? toggleEditMode(card) : deleteCard(card.id);
                        }}
                      >
                        {/* {editMode ? "Cancel" : "Delete"} */}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </Col>
          );
        })}
      </>
    );
  };

  // Toggle edit mode for a card
  const toggleEditMode = (card) => {
    if (editedCardId === card.id) {
      instance.put(`/cards/${editedCard.id}`, editedCard).then((res) => {
        console.log("Update: ", res);
        // Reset edit mode state
        setEditedCard(null);
        setEditedCardId(null);
        setEditMode(false);
        const getData = async () => {
          try {
            const res = await instance.get("/cards");
            setCardData(res.data);
            setIsLoading(false);
          } catch (error) {}
        };
        // getData();
        // refresh page
        window.location.reload();
      });
    } else {
      setEditedCard(card);
      setEditedCardId(card.id);
      setEditMode(true);
    }
  };

  // Function to handle changes to the edited card fields
  const handleFieldChange = (fieldName, value) => {
    const updatedCard = {
      ...editedCard,
    };
    updatedCard[fieldName] = value;
    setEditedCard(updatedCard);
  };

  // Function to delete a card
  const deleteCard = (cardId) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete this card?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        instance.delete(`/cards/${cardId}`).then((res) => {
          console.log("Update: ", res);
          instance.get("/cards").then((res) => {
            setCardData(res.data);
          });
        });
      },
    });
  };

  // Update media for a card onselect
  const handleAddMediaToCard = (mediaId) => {
    const updatedCard = {
      ...editedCard,
    };
    updatedCard.media_ids = mediaId;
    setEditedCard(updatedCard);
    instance.put(`/cards/${editedCard.id}`, updatedCard).then((res) => {
      console.log("Update: ", res);
      // Reset edit mode state
      setEditedCard(null);
      setEditedCardId(null);
      setEditMode(false);
      const getData = async () => {
        try {
          const res = await instance.get("/cards");
          setCardData(res.data);
          setIsLoading(false);
        } catch (error) {}
      };
      getData();
    });
  };

  const handleOpenMediaSelectionModal = (cardId) => {
    setSelectedCardId(cardId);
    setMediaSelectionVisible(true);
  };

  const toggleCreateCardForm = () => {
    setIsCreateCardFormVisible(!isCreateCardFormVisible);
  };
  const handleCreateCard = (createdCard) => {
    setCardData([...cardData, createdCard]);
    setIsCreateCardFormVisible(false);
  };

  // Pagination
  useEffect(() => {
    const filteredCards = originalCardData.filter((card) =>
      card.title_en.toLowerCase().includes(searchText.toLowerCase())
    );
    setCardData(filteredCards);
  }, [searchText, originalCardData]);

  const handleSearch = (value) => {
    setSearchText(value);
    setIsEmptyInput(value.trim() === "");
    setCurrentPage(1); // Reset pagination when searching
  };

  const handleClear = () => {
    setSearchText("");
    setIsEmptyInput(true);
    setCurrentPage(1);
    setCardData(originalCardData);
  };

  const displayCards = cardData.slice(
    (currentPage - 1) * numberOfCardsPerPage,
    currentPage * numberOfCardsPerPage
  );

  const handleSortBy = (value) => {
    setSortBy(value);
    if (value === "asc") {
      setCardData([...cardData].sort((a, b) => a.id - b.id));
    } else if (value === "desc") {
      setCardData([...cardData].sort((a, b) => b.id - a.id));
    }
  };

  // Filter by page name from select option
  const handleFilterByPageName = (value) => {
    setCardData([...cardData].filter((card) => card.page_name === value));
  };

  // Sort by title
  const handleSortByTitle = (value) => {
    setSortBy(value);
    if (value === "asc") {
      setCardData(
        [...cardData].sort((a, b) => a.title_en.localeCompare(b.title_en))
      );
    } else if (value === "desc") {
      setCardData(
        [...cardData].sort((a, b) => b.title_en.localeCompare(a.title_en))
      );
    }
  };

  return (
    <>
      <div className="ViewContainer ViewContentContainer">
        <div
          className="TopbarContainer"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <h1 style={{ paddingBottom: "2em" }}>These are Cards</h1>

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
              onClick={toggleCreateCardForm}
            >
              Add New Card
            </Button>
          </div>
        </div>
        <div className="tableContainer">
          {isLoading && <Loader />}

          {/* Settings */}
          <div className="settingsContainer">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                  marginBottom: "2em",
                }}
                icon={<FilterOutlined />}
                onClick={() => setSettingsVisible(!settingsVisible)}
              >
                Filter
              </Button>
              {/* Toggler for grid view and list view */}
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <Switch
                  id="displayMode"
                  checkedChildren={<UnorderedListOutlined />}
                  unCheckedChildren={<AppstoreOutlined />}
                  defaultChecked={displayMode}
                  onChange={toggleDisplayMode}
                  size="large"
                  style={{
                    fontSize: "3.2em",
                  }}
                />
              </div> */}
            </div>

            <div
              className="settings"
              style={{
                display: settingsVisible ? "block" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <label htmlFor="sortBy">Sort by time</label>
                  <Select
                    showSearch
                    id="sortBy"
                    defaultValue={sortBy}
                    style={{ width: 120 }}
                    onChange={(e) => handleSortBy(e)}
                    value={sortBy}
                  >
                    <Option value="desc">Descending</Option>
                    <Option value="asc">Ascending</Option>
                  </Select>
                </div>
                {/* Filter by page name */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <label htmlFor="pageName">Filter by page name</label>
                  <Select
                    showSearch
                    id="pageName"
                    style={{ width: 120 }}
                    onChange={(e) => handleFilterByPageName(e)}
                  >
                    {pageNames.map((page) => (
                      <Option value={page.value}>{page.name}</Option>
                    ))}
                  </Select>
                </div>

                {/* {console.log(cardData)} */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <label htmlFor="search">Search</label>
                  {/* Search with ant design */}
                  <Search
                    id="search"
                    placeholder="Search by title"
                    onChange={(e) => handleSearch(e.target.value)}
                    enterButton
                    allowClear
                  />
                  <Button
                    type="primary"
                    onClick={handleClear}
                    // disabled={isEmptyInput}
                    danger
                    icon={<RestOutlined />}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Display mode UI */}
          <div
            className="displayModeContainer"
            style={{
              display: displayMode ? "block" : "none",
              paddingTop: "2rem",
            }}
          >
            <Row gutter={[16, 16]}>
              {isCreateCardFormVisible && (
                <Col span={24}>
                  <CreateCardForm
                    handleCreateCard={handleCreateCard}
                    toggleCreateCardForm={toggleCreateCardForm}
                    pages={pages}
                  />
                </Col>
              )}
              {displayMode ? (
                <GridContent
                  displayCards={displayCards}
                  editMode={editMode}
                  editedCardId={editedCardId}
                  editedCard={editedCard}
                  handleOpenMediaSelectionModal={handleOpenMediaSelectionModal}
                  handleFieldChange={handleFieldChange}
                  toggleEditMode={toggleEditMode}
                  deleteCard={deleteCard}
                  media={media}
                  setMediaSelectionVisible={setMediaSelectionVisible}
                  handleAddMediaToCard={handleAddMediaToCard}
                />
              ) : (
                <SingleColumnContent
                  displayCards={displayCards}
                  editMode={editMode}
                  editedCardId={editedCardId}
                  editedCard={editedCard}
                  handleOpenMediaSelectionModal={handleOpenMediaSelectionModal}
                  handleFieldChange={handleFieldChange}
                  toggleEditMode={toggleEditMode}
                  deleteCard={deleteCard}
                  media={media}
                  setMediaSelectionVisible={setMediaSelectionVisible}
                  handleAddMediaToCard={handleAddMediaToCard}
                />
              )}
            </Row>
          </div>

          <Pagination
            current={currentPage}
            total={cardData.length}
            pageSize={numberOfCardsPerPage}
            onChange={(page, pageSize) => {
              setCurrentPage(page);
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Cards;
