import React, { useState, useEffect, useMemo, memo } from "react";
import instance from "../../axios";
import { Image, Select, message } from "antd";
import Loader from "../Loader";

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
      // console.log("Item: ", item);
      const response = await instance("/cards");
      if (response.data) {
        setCards(response.data);
        setCardsFetched(true);
        setLoading(false);
        // console.log("Cards fetched successfully");
      } else {
        // console.error("Error fetching card assets nn:", response.data.message);
        message.error("Error fetching card assets");
      }
    } catch (error) {
      // console.error("Error fetching card assets:", error);
      message.error("Error fetching card assets");
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
    // console.log("Selected Card: ", selectedCard);
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
          <div className="flexed-between">
            <Select
              showSearch
              filterOption={(input, option) =>
                option?.children && input
                  ? option.children.toLowerCase().includes(input.toLowerCase())
                  : false
              }
              style={{
                width: "100%",
                height: "100px",
                marginBottom: "2em",
                marginRight: "1em",
              }}
              placeholder="Select a card"
              optionFilterProp="children"
              onChange={handleCardChange}
            >
              {memoizedCards?.map((card, index) => (
                <Option key={index} value={JSON.stringify(card)}>
                  {/* {card?.title_en} */}
                  <div
                    style={{
                      display: "flex",
                      gap: "1em",
                      alignItems: "center",
                    }}
                  >
                    {card?.media_files &&
                    card?.media_files?.file_type.startsWith("image") ? (
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
                    )}
                    <h3>{card?.title_en}</h3>
                  </div>
                </Option>
              ))}
            </Select>
            {/* Current Card */}
            <div
              className="cardContainer"
              style={{
                display: "grid",
                padding: "0.5em",
                marginBottom: "1em",
                border: "2px solid var(--themes)",
                borderRadius: 10,
                gap: "1em",
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
                {item._mave ? (
                  item?._mave?.media_files &&
                  (item?._mave?.media_files?.file_type.startsWith("image") ? (
                    <img
                      src={`${MEDIA_URL}/${item?._mave?.media_files?.file_path}`}
                      alt={item?._mave?.media_files?.file_path}
                      style={{
                        width: "10vw",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <video
                      muted
                      src={`${MEDIA_URL}/${item?._mave?.media_files?.file_path}`}
                      alt={item?._mave?.media_files?.file_path}
                      style={{
                        width: "10vw",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ))
                ) : (
                  <Loader />
                )}
              </div>

              {item ? (
                <div
                  className="contentContainer"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                  }}
                >
                  <center>
                    <h3>{item?._mave && item?._mave?.title_en}</h3>
                  </center>
                </div>
              ) : (
                <Loader />
              )}
            </div>
          </div>
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
            {item._mave ? (
              item?._mave?.media_files &&
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
              ))
            ) : (
              <Loader />
            )}
          </div>

          {item ? (
            <div
              className="contentContainer"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1em",
              }}
            >
              <center>
                <h3>
                  {item?._mave && item?._mave?.title_en}{" "}
                  {item?._mave?.title_bn && `(${item?._mave?.title_bn})`}
                </h3>
              </center>

              <div
                dangerouslySetInnerHTML={{
                  __html: item?._mave && item?._mave?.description_en,
                }}
                style={{ textAlign: "left", fontSize: "1em" }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: item?._mave && item?._mave?.description_bn,
                }}
                style={{ textAlign: "left", fontSize: "1em" }}
              />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      )}
    </>
  );
};

export default CardParser;
