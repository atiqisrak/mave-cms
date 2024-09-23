import React, { useState, useEffect } from "react";
import { Carousel, Select, message, Button } from "antd";
import instance from "../../axios";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";

const SliderParser = ({ item, editMode, onSliderSelect }) => {
  const [sliders, setSliders] = useState([]);
  const [selectedSlider, setSelectedSlider] = useState(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await instance("/sliders");
        if (response.data) setSliders(response.data);
      } catch {
        message.error("Error fetching sliders");
      }
    };
    if (editMode) fetchSliders();
  }, [editMode]);

  const handleSliderChange = (value) => {
    const selectedSlider = sliders.find((slider) => slider.id === value);
    setSelectedSlider(value);
    onSliderSelect({ _mave: selectedSlider, type: "slider", id: value });
  };

  return editMode ? (
    <Select
      placeholder="Select a slider"
      onChange={handleSliderChange}
      style={{ width: 200 }}
    >
      {sliders.map((slider) => (
        <Select.Option key={slider.id} value={slider.id}>
          {slider.title_en}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <div
      style={{
        padding: "2rem",
        border: "2px solid var(--themes)",
        marginBottom: "2rem",
        borderRadius: "1em",
      }}
    >
      <Carousel
        autoplay
        arrows
        prevArrow={<Button icon={<LeftOutlined />} />}
        nextArrow={<Button icon={<RightOutlined />} />}
      >
        {item?._mave?.medias?.map((media) => (
          <div key={media.id}>
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
              alt={media.file_name}
              width={900}
              height={400}
              objectFit="cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SliderParser;
