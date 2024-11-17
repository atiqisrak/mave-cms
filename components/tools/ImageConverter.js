import React, { useState } from "react";
import { Button, Select, Spin, Table, Upload, message } from "antd";
import { LoadingOutlined, LockFilled } from "@ant-design/icons";

const ImageConverter = () => {
  const [images, setImages] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (text, record) => (
        <span>{Math.round(record.size / 1024)} KB</span>
      ),
    },
    {
      title: "Format",
      dataIndex: "format",
      key: "format",
    },
    {
      title: "Convert to",
      key: "action",
      render: (text, record) => (
        <>
          <Select
            defaultValue={record.format}
            style={{ width: 120 }}
            onChange={(value) => handleConvert(record, value)}
            disabled={record.converted || loading}
            showSearch
          >
            <Select.Option value="webp">WebP</Select.Option>
            <Select.Option value="png">PNG</Select.Option>
            <Select.Option value="jpg">JPG</Select.Option>
            <Select.Option value="svg">SVG</Select.Option>
          </Select>
        </>
      ),
    },
    {
      title: "Download",
      key: "download",
      render: (text, record) => (
        <>
          {record.converted ? (
            <Button
              onClick={() => handleDownload(record)}
              style={{
                backgroundColor: "var(--themes)",
                color: "white",
              }}
            >
              Download
            </Button>
          ) : (
            <Button
              loading={loading}
              style={{
                backgroundColor: "var(--themes)",
                color: "white",
              }}
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : (
                "Convert"
              )}
            </Button>
          )}
        </>
      ),
    },
  ];

  const handleClear = () => {
    setImages([]);
    setConvertedImages([]);
  };

  const handleUpload = (info) => {
    const files = info.fileList?.map((file) => {
      return {
        key: file.uid,
        name: file.name,
        size: file.size,
        format: file.type.split("/")[1],
        converted: false,
        file: file.originFileObj,
      };
    });
    setImages(files);
  };

  const handleConvert = (record, conversionType) => {
    setLoading(true);
    // Simulating conversion process with setTimeout
    setTimeout(() => {
      const updatedImages = images?.map((img) =>
        img.key === record.key
          ? { ...img, converted: true, format: conversionType }
          : img
      );
      setImages(updatedImages);
      setConvertedImages([
        ...convertedImages,
        { ...record, format: conversionType },
      ]);
      setLoading(false);
    }, 2000); // Simulating 2 seconds conversion time
  };

  const handleDownload = (record) => {
    // Generating a download link for the converted image
    const convertedImage = convertedImages.find(
      (img) => img.key === record.key
    );
    if (convertedImage) {
      const blob = new Blob([convertedImage.file], {
        type: "image/" + convertedImage.format,
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = record.name.split(".")[0] + "." + convertedImage.format;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      message.error("Download link not available.");
    }
  };

  return (
    <div className="mavecontainer">
      <h1>Image Converter</h1>
      <Upload.Dragger
        showUploadList={false}
        multiple={true}
        onChange={handleUpload}
      >
        <p className="ant-upload-drag-icon">Click or drag images to upload</p>
      </Upload.Dragger>
      <Table dataSource={images} columns={columns} pagination={false} />
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={handleClear}>Clear</Button>
        <Button
          danger
          style={{ marginLeft: 8 }}
          icon={<LockFilled />}
          disabled={images.length === 0}
          onClick={() => console.log("Contact Admin to unlock this feature")}
        >
          Convert All
        </Button>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ImageConverter;
