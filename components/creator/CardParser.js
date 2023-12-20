import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { Select } from "antd";

const CardParser = ({ item, editMode, onCardSelect }) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      console.log("Item: ", item);
      const response = await instance("/cards");
      if (response.data) {
        setCards(response.data);
        console.log("Cards: ", response.data);
        setLoading(false);
      } else {
        console.error("Error fetching card assets nn:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching card assets:", error);
    }
  };

  useEffect(() => {
    if (editMode) {
      fetchCards();
    }
  }, [editMode]);

  const handleCardChange = (value) => {
    setSelectedCard(value);
    onCardSelect(value);
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
            {cards?.map((card) => (
              <Option value={card?.id}>{card?.title_en}</Option>
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
