import React, { useState, useEffect, useMemo, memo } from "react";
import instance from "../../axios";
import { Image, Select } from "antd";

const CardParser = ({
  item,
  editMode,
  onCardSelect,
  onUpdateComponent,
  niloy,
}) => {
  // niloy = index of the component in the section
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardsFetched, setCardsFetched] = useState(false);
  const [localSelectedCards, setLocalSelectedCards] = useState([]);

  const fetchCards = async () => {
    try {
      setLoading(true);
      console.log("Item: ", item);
      const response = await instance("/cards");
      if (response.data) {
        setCards(response.data);
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

  const handleCardChange = (value) => {
    const selectedCard = JSON.parse(value);

    setSelectedCard(value);
    console.log("Selected Card: ", selectedCard);
    onCardSelect({
      _mave: selectedCard,
      type: "card",
      id: selectedCard?.id,
      niloy: niloy,
    });
    // setLocalSelectedCards(value);
    // onUpdateComponent(niloy, selectedCard);
  };

  return (
    <>
      {editMode ? (
        <div className="cardContainer">
          <Select
            showSearch
            style={{ width: "100%", height: "100px" }}
            placeholder="Select a card"
            optionFilterProp="children"
            onChange={handleCardChange}
          >
            {memoizedCards?.map((card, index) => (
              <Option key={index} value={JSON.stringify(card)}>
                {/* {card?.title_en} */}
                <div style={{
                  display: "flex",
                  gap: "1em",
                  alignItems: "center",
                }}>
                  {
                    card?.media_files && card?.media_files?.file_type.startsWith("image") ? (
                      <Image
                        width={100}
                        height={60}
                        src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                        alt={card?.media_files?.file_path}
                        style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <video
                        width={100}
                        height={60}
                        src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                        alt={card?.media_files?.file_path}
                        style={{ objectFit: "contain" }}
                      />
                    )
                  }
                  <h3>{card?.title_en}</h3>
                </div>
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
            gap: "3em",
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
                  muted
                  src={`${MEDIA_URL}/${item?._mave?.media_files?.file_path}`}
                  alt={item?._mave?.media_files?.file_path}
                  style={{ width: "15vw", height: "auto" }}
                />
              ))}
          </div>
          <div className="contentContainer" style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
          }}>
            <center>
              <h3>{item?._mave?.title_en} ( {item?._mave?.title_bn} )</h3>
            </center>

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
