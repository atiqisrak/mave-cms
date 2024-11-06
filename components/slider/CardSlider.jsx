// components/slider/CardSlider.jsx

import React from "react";
import { Carousel, Button, Popconfirm, Space, Typography, Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Image from "next/image";
import { capitalize } from "lodash";

const { Title } = Typography;

const CardSlider = ({
  slider,
  CustomNextArrow,
  CustomPrevArrow,
  MEDIA_URL,
  handleEditClick,
  handleDeleteSlider,
}) => {
  // Placeholder image path
  const cardPlaceholder = "/images/Image_Placeholder.png";

  // Actions for the slider card
  const actions = [
    <Button
      key="edit"
      icon={<EditOutlined />}
      onClick={() => handleEditClick(slider.id)}
      className="mavebutton"
    >
      Edit
    </Button>,
    <Popconfirm
      key="delete"
      title="Are you sure you want to delete this slider?"
      onConfirm={() => handleDeleteSlider(slider.id)}
      okText="Yes"
      cancelText="No"
    >
      <Button className="mavecancelbutton" icon={<DeleteOutlined />}>
        Delete
      </Button>
    </Popconfirm>,
  ];

  // Check if cards exist
  const hasCards = Array.isArray(slider.cards) && slider.cards.length > 0;

  return (
    <Card
      hoverable
      cover={
        hasCards ? (
          <Carousel autoplay className="mb-4">
            {slider?.cards?.map((card) => (
              <div key={card.id}>
                <div className="flex flex-col items-center justify-center h-64 bg-gray-200 pt-6">
                  <Title level={5}>
                    {card.title_en || "Title Unavailable"}
                  </Title>
                  <Image
                    src={
                      card.media_files && card.media_files.file_path
                        ? `${MEDIA_URL}/${card.media_files.file_path}`
                        : cardPlaceholder
                    }
                    alt={card.title_en || "Card Unavailable"}
                    width={400}
                    height={200}
                    objectFit="cover"
                    className="rounded-md"
                    fallback={cardPlaceholder}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-200">
            <Image
              src={cardPlaceholder}
              alt="Placeholder Card"
              width={400}
              height={200}
              objectFit="contain"
              className="rounded-md"
            />
          </div>
        )
      }
      actions={actions}
      className="slider-card shadow-md rounded-md"
    >
      <Space
        className="media-card-meta flex flex-col sm:flex-row justify-between items-start sm:items-center"
        direction="vertical"
      >
        <h3 className="text-lg font-semibold truncate max-w-xs">
          {slider.title_en || "Title Unavailable"}
        </h3>
        <h5 className="text-md text-gray-400 font-bold">
          {capitalize(slider.type) || "Type Unavailable"}
        </h5>
      </Space>
    </Card>
  );
};

export default CardSlider;
