import React, { useState } from "react";
import { Button, Upload, message } from "antd";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";

const ImageOptimizer = () => {
  const [optimizedImage, setOptimizedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setOptimizedImage(null);
  };

  const handleUpload = async (info) => {
    setLoading(true);
    try {
      const files = info.fileList.map((file) => file.originFileObj);
      const optimizedFiles = await optimizeImages(files);
      setOptimizedImage(optimizedFiles);
    } catch (error) {
      console.error("Error optimizing images:", error);
      message.error("Error optimizing images");
    } finally {
      setLoading(false);
    }
  };

  const optimizeImages = async (files) => {
    const optimizedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const optimizedBuffer = await imagemin.buffer(file, {
        plugins: [
          imageminMozjpeg({ quality: 75 }),
          imageminPngquant({ quality: [0.6, 0.8] }),
        ],
      });
      optimizedFiles.push(
        new File([optimizedBuffer], file.name, { type: file.type })
      );
    }
    return optimizedFiles;
  };

  return (
    <div className="mavecontainer">
      <h1>Image Optimizer</h1>
      <Upload.Dragger multiple={true} onChange={handleUpload}>
        <p className="ant-upload-drag-icon">Click or drag images to upload</p>
      </Upload.Dragger>
      {/* {optimizedImage && (
                <div>
                    <h2>Optimized Images</h2>
                    {optimizedImage.map((image, index) => (
                        <img key={index} src={URL.createObjectURL(image)} alt={`Optimized ${index + 1}`} style={{ maxWidth: '100%', marginBottom: 16 }} />
                    ))}
                </div>
            )} */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={handleClear}>Clear</Button>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ImageOptimizer;
