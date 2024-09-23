import React, { useState, useEffect } from "react";
import { Button, Image, Select, message } from "antd";
import instance from "../../axios";

const MediaParser = ({ item, editMode, onMediaSelect, setMediaId }) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [medias, setMedias] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const response = await instance.get("/media");
        if (response.data) setMedias(response.data);
      } catch {
        message.error("Error fetching media assets");
      }
    };
    if (editMode) fetchMedias();
  }, [editMode]);

  const handleMediaChange = (value) => {
    const selectedMedia = medias.find((media) => media.id === value);
    onMediaSelect({ _mave: selectedMedia, type: "media", id: value });
  };

  return editMode ? (
    <div>
      <Button onClick={() => setVisible(true)}>Select Media</Button>
      {visible && (
        <Select
          placeholder="Select media"
          style={{ width: 200 }}
          onChange={handleMediaChange}
        >
          {medias.map((media) => (
            <Select.Option key={media.id} value={media.id}>
              {media.title_en}
            </Select.Option>
          ))}
        </Select>
      )}
    </div>
  ) : (
    <Image
      src={`${MEDIA_URL}/${item?._mave?.file_path}`}
      alt="media"
      width={150}
    />
  );
};

export default MediaParser;
