// pages/generate-image/index.jsx

import React, { useState } from "react";
import { Input, Button, Spin, Alert } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Image from "next/image";

const GenerateImagePage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }
    setLoading(true);
    setError("");
    setImageUrl("");
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Generate Image from Prompt
      </h1>
      <div className="flex flex-col items-center">
        <Input
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full sm:w-2/3 lg:w-1/2 mb-4"
          onPressEnter={handleGenerate}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleGenerate}
          loading={loading}
          className="mb-6"
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
        {imageUrl && (
          <div className="mt-6">
            <Image src={imageUrl} alt="Generated" width={512} height={512} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImagePage;
