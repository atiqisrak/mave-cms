import React, { useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState } from "react";
import {
  TextTransformer,
  ImageTransformer,
  DesctiptionTransformer,
} from "./Transformers";

const UploadDoc = () => {
  const [uploadedData, setUploadedData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("uploadedData");
    if (storedData) {
      setUploadedData(JSON.parse(storedData));
    }
  }, []);

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const parsedData = JSON.parse(text); // Parse text as JSON
          localStorage.setItem("uploadedData", JSON.stringify(parsedData));
          setUploadedData(parsedData);
        } catch (error) {
          message.error("Error parsing uploaded file."); // Handle parsing errors
        }
      };
      reader.readAsText(info.file);
    }
  };

  const transformData = (parsedData) => {
    return parsedData?.map((section) => ({
      _id: "generated_id", // Replace with actual ID generation logic
      _category: "root",
      sectionTitle: section.title,
      data: section.content.map((contentItem) => {
        switch (contentItem.type) {
          case "image":
            return ImageTransformer({ contentItem });
          case "text":
            return TextTransformer({ contentItem });
          case "description":
            return DesctiptionTransformer({ contentItem });
          default:
            return contentItem; // Handle other types if needed
        }
      }),
    }));
  };

  const displayedData = transformData(uploadedData);

  const props = {
    name: "file",
    multiple: false,
    showUploadList: true,
    accept: ".json,.txt,.doc,.docx,.pdf",
    onchange: handleUpload,
    onchange(info) {
      handleUpload(info);
    },
  };

  return (
    <div>
      <Upload.Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Upload.Dragger>

      {displayedData && <pre>{JSON.stringify(displayedData, null, 2)}</pre>}
    </div>
  );
};

export default UploadDoc;
