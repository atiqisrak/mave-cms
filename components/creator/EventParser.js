import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { Select } from "antd";

const EventParser = ({ item, editMode, onPressReleaseSelect }) => {
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
        <div
          style={{
            margin: "2em 1em",
            border: "2px solid var(--theme)",
            borderRadius: 10,
            padding: "2em 1em",
          }}
        >
          <h3>Event Name (English): {item?._mave?.title_en}</h3>
          <h3>Event Name (Bangla): {item?._mave?.title_bn}</h3>
          <h3>Event Description (English): {item?._mave?.description_en}</h3>
          <h3>Event Description (Bangla): {item?._mave?.description_bn}</h3>
          <h3>Event Date: {item?._mave?.event_date}</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: "1em",
              marginTop: "1em",
            }}
          >
            {item?._mave?.medias_mave?.map((event) => (
              <div>
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
                    {event &&
                      (event?.file_type.startsWith("image") ? (
                        <img
                          src={`${MEDIA_URL}/${event?.file_path}`}
                          alt={event?.file_path}
                          style={{ width: "10vw", height: "auto" }}
                        />
                      ) : (
                        <video
                          src={`${MEDIA_URL}/${event?.file_path}`}
                          alt={event?.file_path}
                          style={{ width: "10vw", height: "auto" }}
                        />
                      ))}
                  </div>
                  {/* <div className="contentContainer">
                  <h3>{event?.title_en}</h3>
                  <h3>{event?.title_bn}</h3>

                  <div
                    dangerouslySetInnerHTML={{ __html: event?.description_en }}
                    style={{
                      textAlign: "left",
                      fontSize: "1em",
                    }}
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: event?.description_bn }}
                    style={{
                      textAlign: "left",
                      fontSize: "1em",
                    }}
                  />
                </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EventParser;
