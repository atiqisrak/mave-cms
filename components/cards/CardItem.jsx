// components/cards/CardItem.jsx

import React from "react";
import { Card, Button, Popconfirm, List } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";

const CardItem = ({
  card,
  media,
  pages,
  viewType,
  onDeleteCard,
  onPreviewCard,
}) => {
  // Fetch the associated media file
  const cardMedia = media.find((m) => m.id === card.media_ids);

  const actions = [
    <Button
      key="preview"
      icon={<EyeOutlined />}
      onClick={() => onPreviewCard(card)}
      className="mavebutton"
    >
      Preview
    </Button>,
    <Popconfirm
      title="Are you sure you want to delete this card?"
      onConfirm={() => onDeleteCard(card.id)}
      okText="Yes"
      cancelText="No"
    >
      <Button className="mavecancelbutton" icon={<DeleteOutlined />}>
        Delete
      </Button>
    </Popconfirm>,
  ];

  if (viewType === "grid") {
    return (
      <Card
        hoverable
        cover={
          cardMedia ? (
            <Image
              alt={card.title_en}
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${cardMedia.file_path}`}
              width={500}
              height={300}
              objectFit="cover"
            />
          ) : (
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Image
                src="/images/Image_Placeholder.png"
                width={100}
                height={100}
                alt="Image Placeholder"
              />
            </div>
          )
        }
        actions={actions}
        className="flex flex-col"
      >
        <Card.Meta
          title={card.title_en || "Title Unavailable"}
          description={
            <div
              dangerouslySetInnerHTML={{
                __html: card.description_en.slice(0, 60) + "...",
              }}
            />
          }
        />
      </Card>
    );
  } else {
    return (
      <List.Item actions={actions}>
        <List.Item.Meta
          avatar={
            cardMedia ? (
              <Image
                alt={card.title_en}
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${cardMedia.file_path}`}
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="h-24 w-24 bg-gray-200 flex items-center justify-center">
                <Image
                  src="/images/Image_Placeholder.png"
                  width={50}
                  height={50}
                  alt="Image Placeholder"
                />
              </div>
            )
          }
          title={card.title_en || "Title Unavailable"}
          description={
            <div
              dangerouslySetInnerHTML={{
                __html: card.description_en.slice(0, 100) + "...",
              }}
            />
          }
        />
      </List.Item>
    );
  }
};

export default CardItem;
