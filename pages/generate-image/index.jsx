import React, { useState } from "react";
import { Input, Button, Spin, Alert, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";
import Image from "next/image";

const { TextArea } = Input;
const { Option } = Select;

const GenerateImagePage = () => {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [quality, setQuality] = useState("standard");
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }
    setLoading(true);
    setError("");
    setImageUrls([]);
    try {
      const response = await axios.post("/api/generate-image", {
        prompt,
        size,
        n: 1, // Number of images to generate
      });
      if (response.status === 200) {
        setImageUrls(response.data.imageUrls);
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mavecontainer">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Generate Image from Prompt
      </h1>
      <div className="flex flex-col items-center">
        <TextArea
          rows={4}
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full sm:w-2/3 lg:w-1/2 mb-4"
          onPressEnter={handleGenerate}
        />
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 w-full sm:w-2/3 lg:w-1/2 mb-4">
          <Select
            value={size}
            onChange={(value) => setSize(value)}
            className="w-full sm:w-1/2 mb-4 sm:mb-0"
          >
            <Option value="1024x1024">1024x1024</Option>
            <Option value="1024x1792">1024x1792</Option>
            <Option value="1792x1024">1792x1024</Option>
          </Select>
          <Select
            value={quality}
            onChange={(value) => setQuality(value)}
            className="w-full sm:w-1/2"
          >
            <Option value="standard">Standard Quality</Option>
            <Option value="hd">HD Quality</Option>
          </Select>
        </div>
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleGenerate}
          loading={loading}
          className="mb-6"
          size="large"
        >
          Generate
        </Button>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4 w-full sm:w-2/3 lg:w-1/2"
          />
        )}
        {loading && <Spin size="large" />}
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Generated Image ${index + 1}`}
                width={512}
                height={512}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImagePage;
