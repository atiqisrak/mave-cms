// components/slider/CardSlider.jsx

import React from "react";
import { Carousel, Button, Popconfirm, Space, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Title } = Typography;

const CardSlider = ({
  slider,
  CustomNextArrow,
  CustomPrevArrow,
  MEDIA_URL,
  handleEditClick,
  handleDeleteSlider,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Carousel
        autoplay
        arrows
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
        className="mb-4"
      >
        {slider.cards.map((card) => (
          <div key={card.id}>
            <div className="flex flex-col items-center">
              <Title level={4}>{card.title_en}</Title>
              <Image
                src={`${MEDIA_URL}/${card.media_files.file_path}`}
                alt={card.title_en}
                width={400}
                height={200}
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
        ))}
      </Carousel>
      <Space className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{slider.title_en}</h3>
          <h5 className="text-md text-gray-500">{slider.title_bn}</h5>
        </div>
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditClick(slider.id)}
            className="bg-blue-500 text-white"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this slider?"
            onConfirm={() => handleDeleteSlider(slider.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      </Space>
    </div>
  );
};

export default CardSlider;
