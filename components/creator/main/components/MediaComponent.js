import React from "react";
import { Image, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const MediaComponent = ({ data, editMode, onMediaChange }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {editMode ? (
        <Upload
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false} // Prevent auto-upload
          onChange={(info) => onMediaChange(info.file)}
        >
          <Button icon={<UploadOutlined />}>Upload Media</Button>
        </Upload>
      ) : (
        <Image
          src={data.src}
          alt={data.alt || "Media"}
          width="100%"
          style={{ borderRadius: "4px" }}
        />
      )}
    </div>
  );
};

export default MediaComponent;
