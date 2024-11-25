// components/Blog/FeaturedImageSelector.jsx

import React, { useState } from "react";
import Image from "next/image";
import MediaSelectionModal from "../PageBuilder/Modals/MediaSelectionModal";

const FeaturedImageSelector = ({ featuredImage, setFeaturedImage }) => {
  const [mediaSelectionVisible, setMediaSelectionVisible] = useState(false);

  return (
    <div className="relative flex justify-center items-center">
      <Image
        src={
          featuredImage
            ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${featuredImage.file_path}`
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
        onSelectMedia={(selected) => {
          setFeaturedImage(selected);
          setMediaSelectionVisible(false);
        }}
        selectionMode="single"
      />
    </div>
  );
};

export default FeaturedImageSelector;
