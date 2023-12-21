import React, { useState, useEffect, useMemo, memo } from "react";
import instance from "../../axios";
import { Select } from "antd";

const CardParser = ({ item, editMode, onCardSelect, onUpdateComponent }) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardsFetched, setCardsFetched] = useState(false);

  const fetchCards = async () => {
    try {
      setLoading(true);
      console.log("Item: ", item);
      const response = await instance("/cards");
      if (response.data) {
        setCards(response.data);
        // console.log("Cards: ", response.data);
        setCardsFetched(true);
        setLoading(false);
      } else {
        console.error("Error fetching card assets nn:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching card assets:", error);
    }
  };

  useEffect(() => {
    if (editMode && !cardsFetched) {
      fetchCards();
    }
  }, [editMode, cardsFetched]);

  const memoizedCards = useMemo(() => cards, [cards]);

  const handleCardChange = (values) => {
    onCardSelect(values);
    setSelectedCard(values);
    const updatedCardSection = {
      type: "card",
      _mave: {
        card_ids: values,
      },
    };
    onUpdateComponent(updatedCardSection);
  };

  return (
    <>
      {editMode ? (
        <div className="cardContainer">
          <Select
            mode="multiple"
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a card"
            optionFilterProp="children"
            onChange={handleCardChange}
          >
            {memoizedCards?.map((card, index) => (
              <Option key={index} value={JSON.stringify(card)}>
                {card?.title_en}
              </Option>
            ))}
          </Select>
        </div>
      ) : (
        <div
          className="cardContainer"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            padding: "1em 2em",
            marginBottom: "1em",
            border: "1px solid var(--themes)",
            borderRadius: 10,
          }}
        >
          <div
            className="imageContainer"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item?._mave?.media_files &&
              (item?._mave?.media_files?.file_type.startsWith("image") ? (
                <img
                  src={`${MEDIA_URL}/${item?._mave?.media_files?.file_path}`}
                  alt={item?._mave?.media_files?.file_path}
                  style={{ width: "15vw", height: "auto" }}
                />
              ) : (
                <video
                  src={`${MEDIA_URL}/${item?._mave?.media_files?.file_path}`}
                  alt={item?._mave?.media_files?.file_path}
                  style={{ width: "15vw", height: "auto" }}
                />
              ))}
          </div>
          <div className="contentContainer">
            <h3>{item?._mave?.title_en}</h3>
            <h3>{item?._mave?.title_bn}</h3>
            <div
              dangerouslySetInnerHTML={{ __html: item?._mave?.description_en }}
              style={{ textAlign: "left", fontSize: "1em" }}
            />
            <div
              dangerouslySetInnerHTML={{ __html: item?._mave?.description_bn }}
              style={{ textAlign: "left", fontSize: "1em" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CardParser;
