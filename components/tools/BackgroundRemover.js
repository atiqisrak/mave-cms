import React, { useState } from "react";
import axios from "axios";
import { Button, Image, Upload, message } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const BackgroundRemover = () => {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImage(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleRemoveBackground = () => {
    if (!image) {
      message.error("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", image);

    axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Api-Key": process.env.NEXT_PUBLIC_REMOVE_BG_API_KEY,
      },
      encoding: null,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.error("Error:", response.status, response.statusText);
          return;
        }
        const blob = new Blob([response.data], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        setConvertedImage(url);
        console.log("Background removed successfully.");
      })
      .catch((error) => {
        console.error("Request failed:", error);
        message.error("Failed to remove background.");
      });
  };

  const handleDownload = () => {
    if (convertedImage) {
      const a = document.createElement("a");
      a.href = convertedImage;
      a.download = "background_removed_image.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      message.error("No converted image available.");
    }
  };

  return (
    <div className="mavecontainer">
      <div>
        <Upload.Dragger
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          showUploadList={false}
        >
          <InboxOutlined />
          <p className="ant-upload-drag-icon">Click or drag image to upload</p>
        </Upload.Dragger>
        <Button
          type="primary"
          onClick={handleRemoveBackground}
          style={{
            marginTop: "2em",
            backgroundColor: "var(--theme)",
            borderColor: "var(--theme)",
            color: "white",
            fontSize: "1.5em",
            fontWeight: "bold",
            width: "100%",
            height: "3em",
          }}
        >
          Remove Background
        </Button>
      </div>
      <div
        className="ConvertedImages"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "3em",
        }}
      >
        <div>
          <h2
            style={{
              paddingBottom: "2em",
            }}
          >
            Uploaded Image
          </h2>
          {image && (
            <Image
              width={550}
              height={320}
              style={{
                objectFit: "cover",
                borderRadius: "20px",
              }}
              src={URL.createObjectURL(image)}
              alt="Uploaded"
            />
          )}
        </div>
        <div>
          <h2
            style={{
              paddingBottom: "2em",
            }}
          >
            Converted Image
          </h2>
          {convertedImage && (
            <Image
              width={550}
              height={320}
              style={{
                objectFit: "cover",
                borderRadius: "20px",
              }}
              src={convertedImage}
              alt="Converted"
            />
          )}
          {convertedImage && (
            <center>
              <Button
                style={{
                  marginTop: "2em",
                  padding: "1em 4em 3em 4em",
                  position: "relative",
                  marginTop: "-1em",
                  fontSize: "1.5em",
                }}
                icon={<DownloadOutlined />}
                onClick={handleDownload}
              >
                Download
              </Button>
            </center>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemover;
