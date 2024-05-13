import React, { useState, useEffect } from "react";
import {
  Space,
  Typography,
  Button,
  Popconfirm,
  Carousel,
  Select,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CustomPrevArrow,
  CustomNextArrow,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import instance from "../../axios";
import Image from "next/image";

const SliderParser = ({ item, editMode, onSliderSelect }) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const { Title } = Typography;
  const { Option } = Select;
  const [sliders, setSliders] = useState([]);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [loading, setLoading] = useState(false);

  // get Sliders
  const fetchSliders = async () => {
    try {
      setLoading(true);
      const response = await instance("/sliders");
      if (response.data) {
        setSliders(response.data);
        setLoading(false);
      } else {
        message.error("Error fetching sliders");
      }
    } catch (error) {
      message.error("Error fetching sliders");
    }
  };

  useEffect(() => {
    if (editMode) {
      fetchSliders();
    }
  }, [editMode]);

  const handleSliderChange = (value) => {
    const selectedSlider = sliders.find((slider) => slider.id === value);
    setSelectedSlider(value);
    onSliderSelect({ _mave: selectedSlider, type: "slider", id: value });
  };

  const CustomPrevArrow = ({ onClick }) => (
    <Button
      icon={<LeftOutlined />}
      onClick={onClick}
      size="large"
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        zIndex: "1",
        backgroundColor: "transparent",
        border: "none",
      }}
    ></Button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <Button
      icon={<RightOutlined />}
      onClick={onClick}
      size="large"
      style={{
        position: "absolute",
        top: "50%",
        right: 0,
        zIndex: "1",
        backgroundColor: "transparent",
        border: "none",
      }}
    ></Button>
  );

  return (
    <>
      {editMode ? (
        <div>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a slider"
            optionFilterProp="children"
            onChange={handleSliderChange}
          >
            {sliders?.map((slider) => (
              <Option value={slider?.id}>{slider?.title_en}</Option>
            ))}
          </Select>
        </div>
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
            style={{ position: "relative" }}
            autoplay
            arrows
            effect="fade"
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
          >
            {item?._mave?.media_ids?.length > 0
              ? item?._mave?.medias?.map((media) => (
                  <div>
                    <Image
                      src={`${MEDIA_URL}/${media?.file_path}`}
                      alt={item?._mave?.file_name}
                      width={900}
                      height={400}
                      objectFit="cover"
                      style={{
                        borderRadius: "1em",
                      }}
                    />
                  </div>
                ))
              : item?._mave?.cards?.map((card) => (
                  <div>
                    <Image
                      src={`${MEDIA_URL}/${card?.media_files?.file_path}`}
                      alt={card?.media_files?.file_name}
                      width={900}
                      height={400}
                      objectFit="cover"
                      style={{
                        borderRadius: "1em",
                      }}
                    />
                  </div>
                ))}
          </Carousel>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div>
              <Title level={4}>Title: {item?._mave?.title_en}</Title>
              <Title level={5}>শিরোনাম: {item?._mave?.title_bn}</Title>
            </div>
            <div>
              <Title level={5}>
                Slider type:{" "}
                {item?._mave?.media_ids?.length > 0 ? "Media" : "Card"}
              </Title>
            </div>
          </Space>
        </div>
      )}
    </>
  );
};

export default SliderParser;
