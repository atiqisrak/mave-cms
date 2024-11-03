// components/ImageDisplay.jsx

import Image from "next/image";
import React from "react";

const ImageDisplay = ({ src, alt }) => {
  return (
    <div className="mt-6">
      <Image src={src} alt={alt} width={512} height={512} />
    </div>
  );
};

export default ImageDisplay;
