import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { Select, message } from "antd";

const EventParser = ({ item, editMode, onEventSelect }) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await instance("/events");
      if (response.data) {
        setEvents(response.data);
        // console.log("Events: ", response.data);
        message.success("Events fetched successfully");
        setLoading(false);
      } else {
        // console.error("Error fetching events:", response.data.message);
        message.error("Error fetching events");
      }
    } catch (error) {
      // console.error("Error fetching events:", error);
      message.error("Error fetching events");
    }
  };

  useEffect(() => {
    if (editMode) {
      fetchEvents();
    }
  }, [editMode]);

  // if (editMode) {
  //   fetchPressReleases();
  // }

  const handleEventChange = (value) => {
    const selectedEvent = events.find((event) => event.id === value);
    setSelectedEvent(value);
    onEventSelect({ _mave: selectedEvent, type: "event", id: value });
  };

  return (
    <>
      {editMode ? (
        <div>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder={item?._mave?.title_en}
            optionFilterProp="children"
            onChange={handleEventChange}
          >
            {events?.map((event) => (
              <Option value={event?.id}>{<h3>{event?.title_en}</h3>}</Option>
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
          <h3>
            Event Name (English):{" "}
            <span
              style={{
                color: "var(--themes",
              }}
            >
              {item?._mave?.title_en}
            </span>
          </h3>
          <h3>
            Event Name (Bangla):{" "}
            <span
              style={{
                color: "var(--themes",
              }}
            >
              {item?._mave?.title_bn}
            </span>
          </h3>

          {item?._mave?.description_en && (
            <>
              <h3>Event Description (English): </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: item?._mave?.description_en,
                }}
              />
            </>
          )}
          {item?._mave?.description_bn && (
            <>
              <h3>Event Description (Bangla): </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: item?._mave?.description_bn,
                }}
              />
            </>
          )}
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
                          style={{
                            width: "250px",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <video
                          muted
                          src={`${MEDIA_URL}/${event?.file_path}`}
                          alt={event?.file_path}
                          style={{
                            width: "250px",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      ))}
                  </div>
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
