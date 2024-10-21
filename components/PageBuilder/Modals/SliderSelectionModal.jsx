// components/PageBuilder/Modals/SliderSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, List, Button, Image, message } from "antd";
import instance from "../../../axios";

const SliderSelectionModal = ({ isVisible, onClose, onSelectSlider }) => {
  const [sliderList, setSliderList] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, [isVisible]);

  return (
    <Modal
      title="Select Slider"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <List
        loading={loading}
        grid={{ gutter: 16, column: 4 }}
        dataSource={sliderList}
        renderItem={(item) => (
          <List.Item>
            <Button
              type="link"
              onClick={() => onSelectSlider(item)}
              block
              className="text-left"
            >
              {item.images && item.images.length > 0 && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${item.images[0].file_path}`} // Preview first image
                  alt={item.name}
                  width={100}
                  preview={false}
                />
              )}
              <p>{item.name}</p>
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default SliderSelectionModal;
