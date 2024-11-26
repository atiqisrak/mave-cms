// components/mentis/MediaPreview.jsx

import React from "react";
import Image from "next/image";
import ReactPlayer from "react-player";

const MediaPreview = ({ media }) => {
  if (!media) return null;

  if (media.file_type.startsWith("image/")) {
    return (
      <div className="flex justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
          alt={media.title || "Media Preview"}
          width={500}
          height={375}
          objectFit="contain"
        />
      </div>
    );
  } else if (media.file_type.startsWith("video/")) {
    return (
      <div className="flex justify-center">
        <ReactPlayer
          url={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
          controls
          width="500px"
          height="375px"
        />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center">
        <p>Preview not available for this media type.</p>
      </div>
    );
  }
};

export default MediaPreview;
