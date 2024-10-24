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
  const [sortType, setSortType] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleFilter = () => {
    message.info("Filter functionality is not implemented yet.");
  };

  const onItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  // Handle search and sorting
  useEffect(() => {
    let tempCards = [...cardsData];

    if (searchTerm) {
      tempCards = tempCards.filter((card) =>
        card.title_en.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [cardsData, searchTerm, sortType]);

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
    form.setFieldsValue({
      ...selectedCard,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSaveEdit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        title_en: values.title_en,
        title_bn: values.title_bn,
        description_en: values.description_en,
        description_bn: values.description_bn,
        media_ids: values.media_ids,
        page_name: values.page_name,
        link_url: values.link_url,
        status: values.status,
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
        handleFilter={handleFilter}
        onSearch={onSearch}
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
