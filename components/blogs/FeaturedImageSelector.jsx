// components/Blog/FeaturedImageSelector.jsx

import React, { useState } from "react";
import Image from "next/image";
import MediaSelectionModal from "../PageBuilder/Modals/MediaSelectionModal";

const FeaturedImageSelector = ({
  featuredImage,
  setFeaturedImage,
  mediaAssets,
}) => {
  const [hovered, setHovered] = useState(false);
  const [mediaSelectionVisible, setMediaSelectionVisible] = useState(false);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  return (
    <div className="relative flex justify-center items-center">
      {hovered && (
        <button
          className="absolute z-10 bg-white bg-opacity-90 px-4 py-2 rounded-md border border-gray-300 cursor-pointer"
          onClick={() => setMediaSelectionVisible(true)}
        >
          Select Featured Image
        </button>
      )}
      {featuredImage && console.log("featuredImage", featuredImage)}
      <Image
        src={
          // featuredImage
          //   ? `${MEDIA_URL}/${
          //       mediaAssets?.find((item) => item.id === featuredImage)
          //         ?.file_path
          //     }`
          featuredImage
            ? `${MEDIA_URL}/${featuredImage?.map((item) => item.file_path)}`
            : "/images/Image_Placeholder.png"
        }
        alt="Featured Image"
        width={600}
        height={300}
        objectFit="cover"
        className="rounded-lg border border-gray-300 cursor-pointer filter hover:brightness-75 transition duration-300"
        onClick={() => setMediaSelectionVisible(true)}
      />
      <MediaSelectionModal
        isVisible={mediaSelectionVisible}
        onClose={() => setMediaSelectionVisible(false)}
        onSelectMedia={(mediaId) => setFeaturedImage(mediaId)}
      />
    </div>
  );
};

export default FeaturedImageSelector;
