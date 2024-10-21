// components/PageBuilder/Components/SliderComponent.jsx

import React, { useState } from "react";
import { Button, Modal, List, Image, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SliderSelectionModal from "../Modals/SliderSelectionModal";

const { Paragraph } = Typography;

const SliderComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sliderData, setSliderData] = useState(component._mave);

  const handleSelectSlider = (selectedSlider) => {
    updateComponent({
      ...component,
      _mave: selectedSlider,
      id: selectedSlider.id,
    });
    setSliderData(selectedSlider);
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this component?",
      onOk: deleteComponent,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3>Slider Component</h3>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mr-2"
          />
          <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
        </div>
      </div>
      {sliderData ? (
        <div className="p-4 border rounded-md">
          <Paragraph strong>Name: {sliderData.name}</Paragraph>
          {/* Display a preview of the slider if available */}
          {sliderData.images && sliderData.images.length > 0 && (
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={sliderData.images}
              renderItem={(image) => (
                <List.Item>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image.file_path}`}
                    alt={image.title}
                    width={100}
                    preview={false}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      ) : (
        <Paragraph>No slider selected.</Paragraph>
      )}
      <SliderSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectSlider={handleSelectSlider}
      />
    </div>
  );
};

export default SliderComponent;
