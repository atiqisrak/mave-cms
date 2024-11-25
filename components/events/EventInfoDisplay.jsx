import React from "react";
import { Descriptions, Image } from "antd";

const EventInfoDisplay = ({ event }) => {
  const additional = event.additional ? event.additional[0] : {};

  // Get the cover image from medias_mave
  const coverMediaId = additional.metaImage;
  const coverMedia = event.medias_mave.find(
    (media) => media.id === coverMediaId
  );

  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Event Name (EN)">
        {event.page_name_en}
      </Descriptions.Item>
      <Descriptions.Item label="Event Name (BN)">
        {event.page_name_bn}
      </Descriptions.Item>
      <Descriptions.Item label="Slug">{event.slug}</Descriptions.Item>
      <Descriptions.Item label="Meta Title">
        {additional.metaTitle}
      </Descriptions.Item>
      <Descriptions.Item label="Meta Description">
        {additional.metaDescription}
      </Descriptions.Item>
      {/* Display Cover Image */}
      {coverMedia && (
        <Descriptions.Item label="Cover Image">
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${coverMedia.file_path}`}
            alt={coverMedia.title}
            width={200}
          />
        </Descriptions.Item>
      )}
      {/* Add other event-specific fields as needed */}
    </Descriptions>
  );
};

export default EventInfoDisplay;
