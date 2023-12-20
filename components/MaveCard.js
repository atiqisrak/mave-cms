import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const MaveCard = ({ media }) => {
  return (
    <Card
      hoverable
      style={{ width: 300, margin: '16px' }}
      cover={<img alt={media.title_en} src={`/path/to/images/${media.media_ids}.jpg`} />}
    >
      <Meta title={media.title_en} description={media.description_en} />
      <p>{media.page_name}</p>
      <a href={media.link_url} target="_blank" rel="noopener noreferrer">
        Visit
      </a>
      <p>Status: {media.status === '1' ? 'Active' : 'Not Active'}</p>
    </Card>
  );
};

export default MaveCard;
