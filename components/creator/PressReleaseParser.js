import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import instance from "../../axios";
import moment from "moment";

const PressReleaseParser = ({ item, editMode, onPressReleaseSelect }) => {
  const { Option } = Select;
  const [pressReleases, setPressReleases] = useState([]);
  const [selectedPressRelease, setSelectedPressRelease] = useState(null);

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        const response = await instance.get("/press_release");
        if (response.data) setPressReleases(response.data);
      } catch {
        message.error("Error fetching press releases");
      }
    };

    if (editMode) fetchPressReleases();
  }, [editMode]);

  const handlePressReleaseChange = (value) => {
    const selectedPressRelease = pressReleases.find((pr) => pr.id === value);
    setSelectedPressRelease(value);
    onPressReleaseSelect({
      _mave: selectedPressRelease,
      type: "press_release",
      id: value,
    });
  };

  return editMode ? (
    <Select
      showSearch
      placeholder="Select a press release"
      onChange={handlePressReleaseChange}
      style={{ width: 200 }}
    >
      {pressReleases.map((pressRelease) => (
        <Option key={pressRelease.id} value={pressRelease.id}>
          {moment(pressRelease.created_at).format("Do MMMM YYYY")}
        </Option>
      ))}
    </Select>
  ) : (
    <div>
      {item?._mave?.cards_mave?.map((card) => (
        <div key={card.id} className="cardContainer">
          <div className="imageContainer">
            {card.media_files?.file_type.startsWith("image") && (
              <img
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${card.media_files.file_path}`}
                alt={card.media_files.file_path}
              />
            )}
          </div>
          <div className="contentContainer">
            <h3>{card.title_en}</h3>
            <p dangerouslySetInnerHTML={{ __html: card.description_en }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PressReleaseParser;
