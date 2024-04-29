import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Input,
  Button,
  Space,
  Popover,
  Select,
  message,
  Popconfirm,
} from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyTwoTone, RobotOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function WriteWithAI() {
  const [GEMINI_API_KEY, setGEMINI_API_KEY] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [contentIsSafe, setContentIsSafe] = useState(true);

  // Load the GEMINI API key from environment variables
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    setGEMINI_API_KEY(apiKey);

    // Load conversation history from local storage on initial render
    const storedConversation = localStorage.getItem("writeWithAIConversation");
    if (storedConversation) {
      setConversation(JSON.parse(storedConversation));
    } else {
      setConversation([]);
    }
  }, []);

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  // Generate content based on the prompt
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const response = await model.generateContent(prompt);
      if (response) {
        const newConversation = { prompt, response };
        setConversation((prevConversation) => [
          ...prevConversation,
          newConversation,
        ]);
        localStorage.setItem(
          "writeWithAIConversation",
          JSON.stringify(conversation)
        );
        setLastPrompt(prompt);
      }
      setPrompt("");
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  // Save the conversation history to local storage on every update
  useEffect(() => {
    localStorage.setItem(
      "writeWithAIConversation",
      JSON.stringify(conversation)
    );
  }, [conversation]);

  // Get the last response content
  const contentRef = React.createRef();

  // Copy content to clipboard
  const copyContent = async (index) => {
    try {
      const con =
        conversation[index]?.response?.response?.candidates[0]?.content
          ?.parts[0]?.text || "";

      // Get the rendered content from the Markdown component
      const renderedContent = await renderMarkdown(con);
      // console.log("Rendered content:", renderedContent?.props?.children);

      await navigator.clipboard.writeText(renderedContent?.props?.children);
      console.log("Content copied to clipboard");
      message.success("Content copied to clipboard");
    } catch (error) {
      console.error("Error copying content to clipboard:", error);
    }
  };

  const renderMarkdown = async (content) => {
    return <Markdown remarkPlugins={[remarkGfm]} children={content} />;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "5em",
      }}
    >
      <h1>Write with AI</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "70vw",
        }}
      >
        {conversation?.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <Image
                src="/images/profile_avatar.png"
                alt="Google logo"
                width={50}
                height={50}
                style={{
                  borderRadius: "50%",
                  border: "1px solid #f0f0f0",
                }}
              />
              <h2
                style={{
                  color: "var(--theme)",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                {item.prompt}
              </h2>
            </div>
            <div
              style={{
                border: "1px solid #f0f0f0",
                padding: "1rem 2rem 2rem 2rem",
                borderRadius: "5px",
                marginTop: "0.3rem",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Popover content="Copy content" trigger="hover" placement="top">
                <Button
                  onClick={copyContent.bind(null, index)}
                  style={{
                    color: "white",
                    border: "2px solid #f0f0f0",
                    borderRadius: "5px",
                    marginBottom: "1rem",
                    position: "relative",
                    left: "98%",
                  }}
                  icon={<CopyTwoTone />}
                />
              </Popover>

              {/* {
                item?.response?.response?.finishReason === "SAFETY" ? (
                <p style={{ color: "red" }}>
                  The content generated is not safe for work. Please try again
                  with a different prompt.
                </p>
                ) : 
                item?.response?.response?.finishReason === "SAFETY" ?
                (
                  <Markdown
                ref={contentRef}
                remarkPlugins={[remarkGfm]}
                children={
                  item?.response?.response?.candidates[0]?.content?.parts[0]
                    ?.text
                }
              />
                )
              } */}
              {item?.response?.response?.candidates[0]?.content?.parts[0]
                ?.text ? (
                <Markdown
                  ref={contentRef}
                  remarkPlugins={[remarkGfm]}
                  children={
                    item?.response?.response?.candidates[0]?.content?.parts[0]
                      ?.text
                  }
                />
              ) : (
                <p style={{ color: "red" }}>
                  The content generated is not safe for work. Please try again
                  with a different prompt.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <Input.TextArea
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "60vw", height: "10rem" }}
        autoSize={{ minRows: 5, maxRows: 10 }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "40vw",
        }}
      >
        <Button
          onClick={handleGenerate}
          loading={loading}
          disabled={!prompt}
          icon={<RobotOutlined />}
          style={{
            backgroundColor: prompt ? "var(--themes)" : "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginBottom: "1rem",
          }}
        >
          Generate
        </Button>

        <Popconfirm
          title="Are you sure you want to clear the conversation?"
          onConfirm={() => {
            setConversation([]);
            localStorage.removeItem("writeWithAIConversation");
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button danger disabled={conversation.length === 0}>
            Clear conversation
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
}
