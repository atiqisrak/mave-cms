import {
  AppstoreOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  FilterOutlined,
  FontColorsOutlined,
  HomeFilled,
  PlusCircleOutlined,
  SortAscendingOutlined,
  SyncOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Breadcrumb,
  Button,
  Col,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import instance from "../axios";
import Loader from "../components/Loader";
import CardGridView from "../components/CardGridView";
import CardListView from "../components/CardListView";
import CreateCardForm from "../components/CreateCardForm";
import router from "next/router";

const Cards = () => {
  // UseStates
  const [loading, setLoading] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [media, setMedia] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const [isCreateCardFormVisible, setIsCreateCardFormVisible] = useState(false);
  const [pages, setPages] = useState([]);
  const [pageNames, setPageNames] = useState([]);

  // Fetch Cards
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
        // setFilteredCards(cardsResponse.data);
        setFilteredCards(cardsResponse?.data?.sort((a, b) => b.id - a.id));
        setMedia(mediaResponse.data);
        setPages(pageResponse.data);
        setLoading(false);
      } else {
        message.error("Failed to fetch cards");
        setLoading(false);
      }
    } catch (error) {
      message.error("Failed to fetch cards");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [setCardsData, setLoading, setIsCreateCardFormVisible]);

  useEffect(() => {
    setPageNames(
      pages?.map((page) => ({
        name: page?.page_name_en,
        value: page?.slug ? page?.slug : page?.page_name_en,
      }))
    );
  }, [pages]);

  // Create card
  const toggleCreateCardForm = () => {
    setIsCreateCardFormVisible(!isCreateCardFormVisible);
  };

  const handleCreateCard = (createdCard) => {
    setLoading(true);
    setCardsData([...cardsData, createdCard]);
    console.log("Card created successfully");
    // setIsCreateCardFormVisible(false);
    setLoading(false);
  };

  // Sort Cards
  const [sortMode, setSortMode] = useState(false);
  const handleSortCards = (sortType) => {
    setSortMode(true);
    setSortActivated(true);

    let sortedCards = [];

    if (sortType === "name") {
      sortedCards = [...filteredCards].sort((a, b) =>
        a.title_en.localeCompare(b.title_en)
      );
    } else if (sortType === "date") {
      sortedCards = [...filteredCards].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }

    setFilteredCards(sortedCards);
  };

  // Ascending & Descending
  const [sortActivated, setSortActivated] = useState(false);
  const handleOrderCards = (orderType) => {
    let orderedCards = [];

    if (orderType === "asc") {
      orderedCards = [...filteredCards].sort((a, b) => a.id - b.id);
    } else if (orderType === "desc") {
      orderedCards = [...filteredCards].sort((a, b) => b.id - a.id);
    }

    setFilteredCards(orderedCards);
  };

  // Search Cards on type and reset on clear
  const [filteredCards, setFilteredCards] = useState(cardsData);
  const handleSearchCards = (searchText) => {
    if (searchText) {
      const searchedCards = cardsData.filter((card) =>
        card?.title_en?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCards(searchedCards);
    } else {
      setFilteredCards(cardsData);
    }
  };

  // Filter by page
  const handleFilterByPage = (pageSlug) => {
    const filteredCards = cardsData.filter(
      (card) => card.page_slug === pageSlug
    );
    setFilteredCards(filteredCards);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCardsPerPage, setNumberOfCardsPerPage] = useState(12);
  const totalNumberOfCards = filteredCards.length;
  const [displayedCards, setDisplayedCards] = useState([]);

  const onPageSizeOptionsChange = (current, pageSize) => {
    setCurrentPage(current);
    setNumberOfCardsPerPage(pageSize);
  };

  useEffect(() => {
    const start = (currentPage - 1) * numberOfCardsPerPage;
    const end = start + numberOfCardsPerPage;
    setDisplayedCards(filteredCards.slice(start, end));
  }, [currentPage, filteredCards, numberOfCardsPerPage]);

  return (
    <div className="ViewContainer">
      <div className="ViewContentContainer">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div>
              {/* Top Header */}
              <Row
                justify="space-between"
                align="middle"
                gutter={16}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <Breadcrumb
                  style={{
                    fontSize: "1.2em",
                    marginBottom: "1em",
                  }}
                  items={[
                    {
                      href: "/",
                      title: <HomeFilled />,
                    },
                    {
                      title: "Components",
                    },
                    {
                      title: "Cards",
                      menu: {
                        items: [
                          {
                            title: "Gallery",
                            onClick: () => router.push("/gallery"),
                          },
                          {
                            title: "Menus Items",
                            onClick: () => router.push("/menuitems"),
                          },
                          {
                            title: "Menus",
                            onClick: () => router.push("/menus"),
                          },
                          {
                            title: "Navbars",
                            onClick: () => router.push("/navbars"),
                          },
                          {
                            title: "Sliders",
                            onClick: () => router.push("/sliders"),
                          },
                          {
                            title: "Cards",
                            onClick: () => router.push("/cards"),
                          },
                          {
                            title: "Forms",
                            onClick: () => router.push("/forms"),
                          },
                          {
                            title: "Footers",
                            onClick: () => router.push("/footer"),
                          },
                        ],
                      },
                    },
                  ]}
                />
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
                      backgroundColor: "var(--theme)",
                      borderColor: "var(--theme)",
                      color: "white",
                      borderRadius: "10px",
                      fontSize: "1.2em",
                    }}
                    icon={<CopyOutlined />}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cards`
                      );
                      message.success("API Endpoint Copied");
                    }}
                  >
                    Copy API Endpoint
                  </Button>
                </div>
              </Row>
              <Row
                justify="space-between"
                align="middle"
                gutter={16}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 3fr 2fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  style={{ backgroundColor: "var(--themes)" }}
                  onClick={toggleCreateCardForm}
                >
                  Add Card
                </Button>
                <Button
                  type="primary"
                  icon={<FilterOutlined />}
                  style={{ backgroundColor: "var(--themes)" }}
                  onClick={() => setSortMode(!sortMode)}
                >
                  Sort
                </Button>
                <Input
                  allowClear
                  placeholder="Search Cards"
                  onChange={(e) => handleSearchCards(e.target.value)}
                />
                <Select
                  allowClear
                  placeholder="Filter by page"
                  onChange={handleFilterByPage}
                >
                  {pageNames?.map((page) => (
                    <Select.Option key={page.value} value={page.value}>
                      {page.name}
                    </Select.Option>
                  ))}
                </Select>
                <Button
                  type="primary"
                  icon={<UnorderedListOutlined />}
                  style={{
                    backgroundColor: "var(--themes)",
                    display: viewType === "list" ? "none" : "block",
                  }}
                  onClick={() => setViewType("list")}
                >
                  List View
                </Button>
                <Button
                  type="primary"
                  icon={<AppstoreOutlined />}
                  style={{
                    backgroundColor: "var(--themes)",
                    display: viewType === "grid" ? "none" : "block",
                  }}
                  onClick={() => setViewType("grid")}
                >
                  Grid View
                </Button>

                <Button
                  icon={<SyncOutlined />}
                  style={{
                    backgroundColor: "var(--themes)",
                    color: "white",
                    position: "absolute",
                    right: "10%",
                  }}
                  onClick={fetchCards}
                >
                  Sync
                </Button>
              </Row>

              {/* Filter */}
              <Row
                style={{
                  display: sortMode ? "block" : "none",
                  marginBottom: "2em",
                }}
              >
                <center
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Select
                    placeholder="Sort by"
                    style={{ width: "30%", marginRight: "1rem" }}
                    onChange={handleSortCards}
                  >
                    <Select.Option value="name">
                      <FontColorsOutlined
                        style={{
                          paddingRight: "1rem",
                        }}
                      />
                      Name
                    </Select.Option>
                    <Select.Option value="date">
                      <ClockCircleOutlined
                        style={{
                          paddingRight: "1rem",
                        }}
                      />
                      Date
                    </Select.Option>
                  </Select>
                  <Select
                    placeholder="Order"
                    style={{
                      width: "30%",
                      marginRight: "1rem",
                      display: sortActivated ? "block" : "none",
                    }}
                    onChange={handleOrderCards}
                  >
                    <Select.Option value="asc">
                      <SortAscendingOutlined
                        style={{
                          paddingRight: "1rem",
                        }}
                      />
                      Added First
                    </Select.Option>
                    <Select.Option value="desc">
                      <SortAscendingOutlined
                        style={{
                          paddingLeft: "1rem",
                          transform: "rotate(180deg)",
                        }}
                      />
                      Added Last
                    </Select.Option>
                  </Select>
                </center>
              </Row>

              {/* Create Card */}
              {isCreateCardFormVisible && (
                <Col span={24}>
                  <CreateCardForm
                    onCreateCard={handleCreateCard}
                    onCancel={toggleCreateCardForm}
                    media={media}
                    pages={pages}
                    pageNames={pageNames}
                    fetchCards={fetchCards}
                    setIsCreateCardFormVisible={setIsCreateCardFormVisible}
                  />
                </Col>
              )}
              {/* Cards Gallary */}
              {filteredCards?.length > 0 ? (
                <div>
                  {viewType === "grid" ? (
                    <CardGridView
                      cardData={displayedCards}
                      media={media}
                      fetchCards={fetchCards}
                      pages={pages}
                    />
                  ) : (
                    <CardListView
                      cardData={filteredCards}
                      media={media}
                      fetchCards={fetchCards}
                      pages={pages}
                      pagesNames={pageNames}
                    />
                  )}
                </div>
              ) : (
                <h2>No cards found</h2>
              )}
            </div>
            {/* Pagination */}
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              defaultPageSize={numberOfCardsPerPage}
              hideOnSinglePage={true}
              pageSizeOptions={["12", "24", "36", "48"]}
              responsive={true}
              showPrevNextJumpers={true}
              showQuickJumper={true}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              onChange={onPageSizeOptionsChange}
              total={totalNumberOfCards}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Cards;
