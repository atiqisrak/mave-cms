import React, { useState, useEffect, useMemo } from "react";
import { Select, Image, message } from "antd";
import instance from "../../axios";
import Loader from "../Loader";

const { Option } = Select;

const CardParser = ({ item, editMode, onCardSelect, niloy }) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(item?._mave || null);

  useEffect(() => {
    if (editMode && !cards.length) {
      fetchCards();
    }
  }, [editMode]);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await instance("/cards");
      if (response.data) {
        setCards(response.data);
      } else {
        message.error("Error fetching card assets");
      }
    } catch (error) {
      message.error("Error fetching card assets");
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (value) => {
    const card = JSON.parse(value);
    setSelectedCard(card);
    onCardSelect({ _mave: card, type: "card", id: card.id, niloy });
  };

  return (
    <div>
      {editMode ? (
        <>
          <Select
            showSearch
            placeholder="Select a card"
            style={{ width: "100%" }}
            onChange={handleCardChange}
            value={JSON.stringify(selectedCard) || undefined}
          >
            {cards.map((card) => (
              <Option key={card.id} value={JSON.stringify(card)}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1em" }}
                >
                  <Image
                    width={100}
                    height={60}
                    src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                    alt={card?.media_files?.file_path}
                    style={{ objectFit: "contain" }}
                  />
                  <h3>{card?.title_en}</h3>
                </div>
              </Option>
            ))}
          </Select>

          {selectedCard && (
            <div
              style={{
                display: "grid",
                gap: "1em",
                border: "2px solid var(--themes)",
                padding: "1em",
                borderRadius: 10,
              }}
            >
              <Image
                width={150}
                height={100}
                src={`${MEDIA_URL}/${selectedCard?.media_files?.file_path}`}
                alt={selectedCard?.media_files?.file_path}
                style={{ objectFit: "cover" }}
              />
              <h3>{selectedCard?.title_en}</h3>
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1em",
            border: "1px solid var(--themes)",
            padding: "1em",
            borderRadius: 10,
          }}
        >
          <Image
            width={150}
            height={100}
            src={`${MEDIA_URL}/${item?._mave?.media_files?.file_path}`}
            alt={item?._mave?.media_files?.file_path}
            style={{ objectFit: "cover" }}
          />
          <h3>{item?._mave?.title_en}</h3>
          <div
            dangerouslySetInnerHTML={{ __html: item?._mave?.description_en }}
          />
        </div>
      )}
    </div>
  );
};

export default CardParser;
