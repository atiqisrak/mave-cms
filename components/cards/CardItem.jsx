// components/cards/CardItem.jsx
import React from "react";
import { Card, Button, Popconfirm, List, Tag } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";

const tagColors = [
  "magenta",
  "purple",
  "orange",
  "lime",
  "red",
  "volcano",
  "gold",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "pink",
];

// Helper to get short description
function getExcerpt(html = "", length = 30) {
  if (html.length <= length) return html;
  return html.slice(0, length) + "...";
}

// Helper to render media
function renderMedia(card) {
  const src = card?.media_files?.file_path
    ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${card.media_files.file_path}`
    : "/images/Image_Placeholder.png";

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-200">
      <Image
        alt={card?.title_en || "No Title"}
        src={src}
        width={500}
        height={300}
        style={{ objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/Image_Placeholder.png";
        }}
      />
    </div>
  );
}

// Helper to render tags
function renderTags(card) {
  const tags = card?.additional?.tags || [];
  return tags.map((tag, i) => (
    <Tag color={tagColors[i % tagColors.length]} key={tag}>
      {tag}
    </Tag>
  ));
}

const CardItem = ({ card, viewType, onDeleteCard, onPreviewCard }) => {
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
      key="delete"
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
        cover={renderMedia(card)}
        actions={actions}
        className="flex flex-col"
      >
        <Card.Meta
          className="pt-10"
          title={card?.title_en || "Title Unavailable"}
          description={
            <>
              <div
                dangerouslySetInnerHTML={{
                  __html: getExcerpt(card?.description_en || "", 30),
                }}
              />
              <div className="mt-4 min-h-[24px] flex flex-wrap gap-2">
                {renderTags(card)}
              </div>
            </>
          }
        />
      </Card>
    );
  }

  // LIST VIEW
  return (
    <List.Item actions={actions}>
      <List.Item.Meta
        avatar={
          <div className="flex items-center justify-center bg-gray-200">
            <Image
              alt={card?.title_en || "No Title"}
              src={
                card?.media_files?.file_path
                  ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${card.media_files.file_path}`
                  : "/images/Image_Placeholder.png"
              }
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/Image_Placeholder.png";
              }}
            />
          </div>
        }
        title={card?.title_en || "Title Unavailable"}
        description={
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: getExcerpt(card?.description_en || "", 100),
              }}
            />
            {card?.additional?.tags?.length > 0 && (
              <div className="mt-2 min-h-[24px] flex flex-wrap gap-2">
                {renderTags(card)}
              </div>
            )}
          </>
        }
      />
    </List.Item>
  );
};

export default CardItem;
