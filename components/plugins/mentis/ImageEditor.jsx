// components/mentis/ImageEditor.jsx

import React, { useState, useRef } from "react";
import { Button, Slider, InputNumber, Form, message } from "antd";
import { RotateLeftOutlined, RotateRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";

const ImageEditor = ({ imageSrc, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const inputRef = useRef(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSave = async () => {
    try {
      const cropped = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(cropped);
      onSave(cropped);
      message.success("Image edited successfully!");
    } catch (e) {
      console.error(e);
      message.error("Failed to edit image.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-96 bg-gray-200">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="w-full mt-4">
        <Form layout="vertical">
          <Form.Item label="Zoom">
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={setZoom}
            />
          </Form.Item>
          <Form.Item label="Rotation">
            <Slider
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={setRotation}
            />
          </Form.Item>
          <div className="flex justify-between">
            <Button
              icon={<RotateLeftOutlined />}
              onClick={() => setRotation(rotation - 90)}
            >
              Rotate Left
            </Button>
            <Button
              icon={<RotateRightOutlined />}
              onClick={() => setRotation(rotation + 90)}
            >
              Rotate Right
            </Button>
          </div>
          <Button type="primary" className="mt-4 w-full" onClick={handleSave}>
            Save Changes
          </Button>
        </Form>
      </div>
      {croppedImage && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Cropped Image Preview:</h3>
          <Image
            src={croppedImage}
            alt="Cropped"
            width={300}
            height={225}
            objectFit="cover"
          />
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
