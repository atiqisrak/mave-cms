// components/PageBuilder/Modals/SliderSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, List, message, Carousel } from "antd";
import instance from "../../../axios";
import Image from "next/image";
import { CheckCircleOutlined } from "@ant-design/icons";

const SliderSelectionModal = ({ isVisible, onClose, onSelectSlider }) => {
  const [sliderList, setSliderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSliderId, setSelectedSliderId] = useState(null);

  useEffect(() => {
    if (isVisible) {
      const fetchSliders = async () => {
        setLoading(true);
        try {
          const response = await instance.get("/sliders"); // Replace with your actual API endpoint
          setSliderList(response.data);
        } catch (error) {
          message.error("Failed to fetch sliders");
        }
        setLoading(false);
      };
      fetchSliders();
    }
    // Reset selection when modal opens/closes
    setSelectedSliderId(null);
  }, [isVisible]);

  // Helper function to render slider images
  const renderSliderImages = (medias) => {
    return medias.map((media) => (
      <div key={media.id}>
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
          alt={media.title || "Slider Image"}
          width={200}
          height={150}
          objectFit="cover"
          className="rounded-lg"
          priority
        />
      </div>
    ));
  };

  // Handle slider selection
  const handleSliderSelect = (item) => {
    setSelectedSliderId(item.id);
    onSelectSlider(item); // Pass the selected slider back to the parent component
    onClose(); // Close the modal after selection
  };

  return (
    <Modal
      title="Select Slider"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={900}
      bodyStyle={{ padding: "20px" }}
    >
      <List
        loading={loading}
        dataSource={sliderList}
        renderItem={(item) => (
          <List.Item>
            <div
              className="relative w-full cursor-pointer border rounded-md overflow-hidden"
              onClick={() => handleSliderSelect(item)}
            >
              {/* Slider Preview */}
              <div className="p-4 bg-white">
                <Carousel autoplay>
                  {item.medias && item.medias.length > 0 ? (
                    renderSliderImages(item.medias)
                  ) : (
                    <div className="flex items-center justify-center h-40 bg-gray-200">
                      <span className="text-gray-500">No Images</span>
                    </div>
                  )}
                </Carousel>
              </div>

              {/* Selected Overlay */}
              {selectedSliderId === item.id && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <CheckCircleOutlined
                    style={{ fontSize: "48px", color: "#fff" }}
                  />
                  <span className="text-white text-xl font-bold ml-2">
                    Selected
                  </span>
                </div>
              )}
            </div>
          </List.Item>
        )}
        // Remove grid to have a vertical list with one slider per row
        grid={false}
      />
    </Modal>
  );
};

export default SliderSelectionModal;
