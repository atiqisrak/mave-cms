// components/cards/CardListView.jsx

import React from "react";
import CardItem from "./CardItem";
import { List } from "antd";

const CardListView = ({
  cards,
  media,
  pages,
  onRefresh,
  onDeleteCard,
  onPreviewCard,
}) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={cards}
      renderItem={(card) => (
        <CardItem
          key={card.id}
          card={card}
          media={media}
          pages={pages}
          viewType="list"
          onDeleteCard={onDeleteCard}
          onPreviewCard={onPreviewCard}
        />
      )}
    />
  );
};

export default CardListView;
