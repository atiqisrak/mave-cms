import { AppstoreOutlined, FilterOutlined, PlusCircleOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Alert, Button, Col, message } from "antd";
import React, { useEffect, useState } from "react";
import instance from "../axios";
import Loader from "../components/Loader";
import CardGridView from "../components/CardGridView";
import CardListView from "../components/CardListView";
import CreateCardForm from "../components/CreateCardForm";

const Cards = () => {
  // UseStates
  const [loading, setLoading] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [media, setMedia] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [isCreateCardFormVisible, setIsCreateCardFormVisible] = useState(false);
  const [pages, setPages] = useState([]);

  // Fetch Cards
  const fetchCards = async () => {
    try {
      setLoading(true);
      const [cardsResponse, mediaResponse, pageResponse] = await Promise.all([
        instance.get("/cards"),
        instance.get("/media"),
        instance.get("/pages"),
      ]);

      if (cardsResponse.status === 200 && mediaResponse.status === 200 && pageResponse.status === 200) {
        const cards = cardsResponse.data;
        const media = mediaResponse.data;
        const pageData = pageResponse.data;

        const cardsData = cards.map((card) => {
          const cardMedia = media.find((m) => m.id === card.media_id);
          return {
            ...card,
            media: cardMedia,
          };
        }
        );
        setCardsData(cardsData);
        setMedia(cardMedia);
        setPages(pageData);

        setLoading(false);
        console.log("cardsData: ", cardsData)
        console.log("media: ", media)
      }

      else {
        message.error("Failed to fetch cards");
        setLoading(false);
      }
    }
    catch (error) {
      message.error("Failed to fetch cards");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCards();
  }, [setCardsData, setLoading]);

  // Pages names
  const pageNames = pages.map((page) => ({
    name: page?.page_name_en,
    value: page?.slug ? page?.slug : page?.page_name_en,
  }));

  // Create card
  const toggleCreateCardForm = () => {
    setIsCreateCardFormVisible(!isCreateCardFormVisible);
  };

  const handleCreateCard = (createdCard) => {
    setCardsData([...cardsData, createdCard]);
    setIsCreateCardFormVisible(false);
  };

  // Delete Card

  // Sort Cards

  // Filter Cards

  // Pagination

  // Render


  // Loading
  return (
    <div className="ViewContainer">
      <div className="ViewContentContainer">
        {
          loading ? <Loader /> : (
            <div>
              {/* Top Header */}
              <div>
                <h1>Cards</h1>
                <div>
                  <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    style={{ marginRight: "1rem" }}
                    onClick={toggleCreateCardForm}
                  >
                    Add Card
                  </Button>
                  <Button
                    type="primary"
                    icon={<FilterOutlined />}
                    style={{ marginRight: "1rem" }}
                  >
                    Filter
                  </Button>
                  <Button
                    type="primary"
                    icon={<UnorderedListOutlined />}
                    style={{ marginRight: "1rem" }}
                    onClick={() => setViewType("list")}
                  >
                    List View
                  </Button>
                  <Button
                    type="primary"
                    icon={<AppstoreOutlined />}
                    style={{ marginRight: "1rem" }}
                    onClick={() => setViewType("grid")}
                  >
                    Grid View
                  </Button>
                </div>
              </div>

              {/* Create Card */}
              {isCreateCardFormVisible && (
                <Col span={24}>
                  <CreateCardForm
                    onCreateCard={handleCreateCard}
                    onCancel={toggleCreateCardForm}
                    media={media}
                    pages={pageNames}
                  />
                </Col>
              )}
              {/* Cards Gallary */}
              {
                cardsData?.length > 0 ? (
                  <div>
                    {viewType === "grid" ? (
                      < CardGridView
                        cardData={cardsData}
                        editMode={editMode} />
                    ) : (
                      <CardListView
                        cardData={cardsData}
                        editMode={editMode} />
                    )}
                  </div>
                ) : (
                  <h2>No cards found</h2>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Cards;
