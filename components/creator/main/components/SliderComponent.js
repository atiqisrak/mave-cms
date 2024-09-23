import React from "react";
import { Carousel, Image, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const SliderComponent = ({ data, editMode, onSlideChange }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {editMode ? (
        <Upload
          multiple
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={(info) => onSlideChange(info.fileList)}
        >
          <Button icon={<UploadOutlined />}>Upload Slides</Button>
        </Upload>
      ) : (
        <Carousel autoplay>
          {data.slides.map((slide, index) => (
            <Image key={index} src={slide.src} alt={`slide-${index}`} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default SliderComponent;
