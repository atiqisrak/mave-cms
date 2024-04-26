import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Input, Button } from "antd"; // Assuming you're using Ant Design
import Markdown from "react-markdown";

export default function WriteWithAI() {
  const [GEMINI_API_KEY, setGEMINI_API_KEY] = useState(""); // Use state for API key (optional)

  useEffect(() => {
    // Fetch API key from environment variable (or secure storage)
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // Replace with your logic
    setGEMINI_API_KEY(apiKey);
  }, []);

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const response = await model.generateContent(prompt);
      setContent(response);
    } catch (error) {
      console.error("Error generating content:", error);
      // Optionally display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const niloy = content?.response?.candidates[0]?.content?.parts[0]?.text;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h1>Write with AI</h1>
      <Input
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={handleGenerate} loading={loading}>
        Generate
      </Button>
      <div>
        <h2>Content</h2>
        <div
          style={{
            padding: "1rem",
            border: "1px solid var(--theme)",
            borderRadius: "0.5rem",
            margin: "1rem 0",
            width: "80vw",
          }}
        >
          <Markdown>
            {content?.response?.candidates[0]?.content?.parts[0]?.text}
          </Markdown>
          {console.log(
            "Content: ",
            content?.response?.candidates &&
              content?.response?.candidates[0]?.content?.parts &&
              content?.response?.candidates[0]?.content?.parts[0]?.text
          )}
        </div>
      </div>
    </div>
  );
}
