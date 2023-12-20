import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { Select } from "antd";

const PressReleaseParser = ({ item, editMode, onPressReleaseSelect }) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [pressReleases, setPressReleases] = useState([]);
  const [selectedPressRelease, setSelectedPressRelease] = useState(null);

  const fetchPressReleases = async () => {
    try {
      setLoading(true);
      console.log("Item: ", item);
      const response = await instance("/press_release");
      if (response.data) {
        setPressReleases(response.data);
        console.log("Press Releases: ", response.data);
        setLoading(false);
      } else {
        console.error("Error fetching media assets:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching media assets:", error);
    }
  };

  useEffect(() => {
    if (editMode) {
      fetchPressReleases();
    }
  }, [editMode]);

  // if (editMode) {
  //   fetchPressReleases();
  // }

  const handlePressReleaseChange = (value) => {
    setSelectedPressRelease(value);
    onPressReleaseSelect(value);
  };

  return (
    <>
      {editMode ? (
        <div>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a press release"
            optionFilterProp="children"
            onChange={handlePressReleaseChange}
          >
            {pressReleases?.map((pressRelease) => (
              <Option value={pressRelease?.id}>{pressRelease?.title}</Option>
            ))}
          </Select>
        </div>
      ) : (
        <div>
          {item?._mave?.cards_mave?.map((card) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div
                className="cardContainer"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  padding: "1em",
                  marginBottom: "1em",
                  border: "1px solid var(--themes)",
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
                  {card?.media_files &&
                    (card?.media_files?.file_type.startsWith("image") ? (
                      <img
                        src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                        alt={card?.media_files?.file_path}
                        style={{ width: "10vw", height: "auto" }}
                      />
                    ) : (
                      <video
                        src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                        alt={card?.media_files?.file_path}
                        style={{ width: "10vw", height: "auto" }}
                      />
                    ))}
                </div>
                <div className="contentContainer">
                  <h3>{card?.title_en}</h3>
                  <h3>{card?.title_bn}</h3>

                  <div
                    dangerouslySetInnerHTML={{ __html: card?.description_en }}
                    style={{
                      textAlign: "left",
                      fontSize: "1em",
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: card?.description_bn }}
                    style={{
                      textAlign: "left",
                      fontSize: "1em",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
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
              {item?._mave?.media_files && (
                <img
                  src={`${MEDIA_URL}/${item?._mave?.media_files?.file_path}`}
                  alt={item?._mave?.media_files?.file_path}
                  style={{ width: "15vw", height: "auto" }}
                />
              )}
            </div>
            <div className="contentContainer">
              <h3>{item?._mave?.title_en}</h3>
              <h3>{item?._mave?.title_bn}</h3>
              <p>{item?._mave?.description_en}</p>
              <p>{item?._mave?.description_bn}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PressReleaseParser;
