// pages/cards.jsx

import React, { useEffect, useState } from "react";
import { message, Spin, Pagination, Form } from "antd";
import instance from "../../axios";
import CardsHeader from "../../components/cards/CardsHeader";
import CardsList from "../../components/cards/CardsList";
import CreateCardForm from "../../components/cards/CreateCardForm";
import CardsPreviewModal from "../../components/cards/CardsPreviewModal";

const CardsPage = () => {
  const [loading, setLoading] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [pages, setPages] = useState([]);
  const [media, setMedia] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const [isCreateCardFormVisible, setIsCreateCardFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("desc");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPageFilter, setSelectedPageFilter] = useState(null);

  const [form] = Form.useForm();

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [cardsResponse, mediaResponse, pagesResponse] = await Promise.all([
        instance.get("/cards"),
        instance.get("/media"),
        instance.get("/pages"),
      ]);

      if (
        cardsResponse.status === 200 &&
        mediaResponse.status === 200 &&
        pagesResponse.status === 200
      ) {
        setCardsData(cardsResponse.data);
        setFilteredCards(cardsResponse.data);
        setMedia(mediaResponse.data);
        setPages(pagesResponse.data);
      } else {
        message.error("Failed to fetch data.");
      }
    } catch (error) {
      message.error("Failed to fetch data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers for header
  const handleAddCard = () => {
    setIsCreateCardFormVisible(true);
  };

  const onItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  const handlePageFilterChange = (value) => {
    setSelectedPageFilter(value);
  };

  // Handle search, sorting, and filtering
  useEffect(() => {
    let tempCards = [...cardsData];

    if (searchTerm) {
      tempCards = tempCards.filter((card) =>
        card.title_en.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedPageFilter) {
      tempCards = tempCards.filter(
        (card) => card.page_name === selectedPageFilter
      );
    }

    tempCards.sort((a, b) => {
      if (sortType === "asc") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else {
        return new Date(b.created_at) - new Date(a.created_at);
      }
    });

    setFilteredCards(tempCards);
    setCurrentPage(1);
  }, [cardsData, searchTerm, sortType, selectedPageFilter]);

  // Pagination
  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setItemsPerPage(pageSize);
  };

  // Handle delete
  const handleDeleteCard = async (cardId) => {
    try {
      await instance.delete(`/cards/${cardId}`);
      message.success("Card deleted successfully.");
      fetchData();
    } catch (error) {
      message.error("Failed to delete card.");
    }
  };

  // Handle preview and edit
  const handlePreviewCard = (card) => {
    setSelectedCard(card);
    setIsPreviewModalVisible(true);
    setIsEditing(false);
  };

  const handleEditCard = () => {
    setIsEditing(true);

    // Determine link type based on link_url
    const linkType =
      selectedCard.link_url &&
      (selectedCard.link_url.includes("page_id") ||
        selectedCard.link_url.includes("pageName"))
        ? "page"
        : "independent";

    // If link type is page, extract link_page_id from link_url
    let linkPageId = null;
    if (linkType === "page") {
      const urlParams = new URLSearchParams(
        selectedCard.link_url.split("?")[1]
      );
      linkPageId = urlParams.get("page_id");
    }

    form.setFieldsValue({
      ...selectedCard,
      status: selectedCard.status === 1,
      page_name: selectedCard.page_name || undefined, // Always present page field
      media_ids: selectedCard.media_ids,
      link_type: linkType,
      link_page_id: linkPageId ? Number(linkPageId) : undefined, // Conditional link page field
      link_url: linkType === "independent" ? selectedCard.link_url : undefined,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSaveEdit = async () => {
    try {
      const values = await form.validateFields();

      let link_url = values.link_url;
      let link_page_id = null;

      if (values.link_type === "page" && values.link_page_id) {
        const selectedPage = pages.find(
          (page) => page.id === values.link_page_id
        );
        if (selectedPage) {
          link_url = `/${selectedPage.slug}?page_id=${selectedPage.id}&pageName=${selectedPage.page_name_en}`;
          link_page_id = selectedPage.id;
        } else {
          message.error("Selected page not found.");
          return;
        }
      }

      // Exclude 'link_page_id' from payload
      const { link_page_id: _, ...restValues } = values;

      const payload = {
        ...restValues,
        media_ids: values.media_ids,
        status: values.status ? 1 : 0,
        link_url: link_url,
        // page_name is the always present field
        page_name: values.page_name,
      };

      await instance.put(`/cards/${selectedCard.id}`, payload);
      message.success("Card updated successfully.");
      setIsEditing(false);
      setIsPreviewModalVisible(false);
      fetchData();
    } catch (error) {
      message.error("Failed to update card.");
    }
  };

  return (
    <div className="mavecontainer bg-gray-50 rounded-xl p-4">
      <CardsHeader
        onAddCard={handleAddCard}
        sortType={sortType}
        setSortType={setSortType}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        onSearch={onSearch}
        pages={pages}
        selectedPageFilter={selectedPageFilter}
        handlePageFilterChange={handlePageFilterChange}
      />

      {isCreateCardFormVisible && (
        <CreateCardForm
          onSuccess={() => {
            fetchData();
            setIsCreateCardFormVisible(false);
          }}
          onCancel={() => setIsCreateCardFormVisible(false)}
          pages={pages}
          media={media}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : filteredCards.length > 0 ? (
        <CardsList
          cards={currentCards}
          viewType={viewType}
          media={media}
          pages={pages}
          onRefresh={fetchData}
          onDeleteCard={handleDeleteCard}
          onPreviewCard={handlePreviewCard}
        />
      ) : (
        <h2 className="text-center mt-8">No cards found</h2>
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredCards.length}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["12", "24", "48", "100"]}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
        />
      </div>

      <CardsPreviewModal
        visible={isPreviewModalVisible}
        onCancel={() => {
          setIsPreviewModalVisible(false);
          setIsEditing(false);
          form.resetFields();
        }}
        selectedCard={selectedCard}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        form={form}
        handleSaveEdit={handleSaveEdit}
        handleEditCard={handleEditCard}
        handleCancelEdit={handleCancelEdit}
        pages={pages}
        media={media}
      />
    </div>
  );
};

export default CardsPage;
