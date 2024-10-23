// components/slider/ImageSlider.jsx

import React from "react";
import { Carousel, Button, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Image from "next/image";

const ImageSlider = ({
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
        {slider.medias.map((media) => (
          <div key={media.id}>
            <Image
              src={`${MEDIA_URL}/${media.file_path}`}
              alt={media.file_name}
              width={800}
              height={400}
              objectFit="cover"
              className="rounded-md"
            />
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

export default ImageSlider;
