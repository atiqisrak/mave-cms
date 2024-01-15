import React, { useState, useEffect } from "react";
import {
  Image,
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
        console.log("Sliders: ", response.data);
        setLoading(false);
      } else {
        message.error("Error fetching sliders");
        console.error("Error fetching sliders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching sliders:", error);
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
        <div>
          <Carousel
            style={{ position: "relative" }}
            autoplay
            arrows
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
          >
            {item?._mave?.medias?.map((media, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                <Image
                  src={`${MEDIA_URL}/${media?.file_path}`}
                  alt={media?.file_path}
                  width={"100%"}
                  height={400}
                  style={{ objectFit: "cover", borderRadius: 10 }}
                />
              </div>
            ))}
          </Carousel>
          <Space
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Title level={4}>Title: {item?._mave?.title_en}</Title>
            <Title level={5}>শিরোনাম: {item?._mave?.title_bn}</Title>
          </Space>
        </div>
      )}
    </>
  );
};

export default SliderParser;
