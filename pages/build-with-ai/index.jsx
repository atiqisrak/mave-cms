// pages/build-with-ai/index.jsx

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Avatar, Button, Input, message, Spin } from "antd";
import { SendOutlined, CopyOutlined } from "@ant-design/icons";
import axios from "axios";
import instance from "../../axios"; // Ensure this points to your Axios instance
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"; // Use CJS version to avoid SSR issues
import Image from "next/image";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
);

const { TextArea } = Input;

export default function BuildWithAI() {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creatingPage, setCreatingPage] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [modifyInput, setModifyInput] = useState("");

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const parseMessageContent = (content) => {
    const parts = [];
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        // Add text before the code block
        parts.push({
          type: "text",
          content: content.substring(lastIndex, match.index),
        });
      }
      // Add code block
      parts.push({ type: "code", lang: match[1], content: match[2] });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < content.length) {
      // Add remaining text
      parts.push({ type: "text", content: content.substring(lastIndex) });
    }
    return parts;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying to clipboard: ", err);
        message.error("Failed to copy to clipboard.");
      });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) {
      message.warning("Please enter a message.");
      return;
    }

    const newConversation = [
      ...conversation,
      { role: "user", content: userInput },
    ];

    setConversation(newConversation);
    setUserInput("");
    setLoading(true);

    try {
      const response = await axios.post("/api/conversational-json", {
        messages: newConversation,
      });

      if (response.status === 200) {
        const assistantMessage = response.data.json;
        setConversation([
          ...newConversation,
          { role: "assistant", content: assistantMessage },
        ]);
        message.success("JSON generated successfully!");
      } else {
        message.error(response.data.error || "Failed to generate JSON.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePage = async () => {
    const lastAssistantMessage = conversation[conversation.length - 1];
    if (!lastAssistantMessage || lastAssistantMessage.role !== "assistant") {
      message.warning("No JSON to create a page.");
      return;
    }

    setCreatingPage(true);

    try {
      // Extract the JSON code block from the message content
      const parts = parseMessageContent(lastAssistantMessage.content);
      const codePart = parts.find(
        (part) => part.type === "code" && part.lang === "json"
      );

      if (!codePart) {
        message.error("No JSON code block found in the assistant's message.");
        setCreatingPage(false);
        return;
      }

      const jsonPayload = JSON.parse(codePart.content);
      console.log("JSON Payload:", jsonPayload);
      const response = await instance.post("/pages", jsonPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201 || response.status === 200) {
        message.success("Page created successfully!");
        setConversation([]);
      } else {
        message.error("Failed to create page.");
      }
    } catch (error) {
      console.error("Error creating page:", error);
      message.error(
        `Failed to create page. ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setCreatingPage(false);
    }
  };

  const handleModify = () => {
    setIsModifying(true);
  };

  const handleSendModification = async () => {
    if (!modifyInput.trim()) {
      message.warning("Please enter a modification.");
      return;
    }

    const lastAssistantMessage = conversation[conversation.length - 1];
    if (!lastAssistantMessage || lastAssistantMessage.role !== "assistant") {
      message.warning("No JSON to modify.");
      return;
    }

    const newConversation = [
      ...conversation,
      { role: "user", content: modifyInput },
    ];

    setConversation(newConversation);
    setModifyInput("");
    setLoading(true);
    setIsModifying(false);

    try {
      const response = await axios.post("/api/conversational-json", {
        messages: newConversation,
      });

      if (response.status === 200) {
        const assistantMessage = response.data.json;
        setConversation([
          ...newConversation,
          { role: "assistant", content: assistantMessage },
        ]);
        message.success("JSON modified successfully!");
      } else {
        message.error(response.data.error || "Failed to modify JSON.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDiscardModification = () => {
    setIsModifying(false);
    setModifyInput("");
  };

  return (
    <div className="mavecontainer">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-theme">
          Build Page with AI
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Describe the page you want to create, and AI will generate the
          corresponding JSON configuration.
        </p>

        {/* Chat Container */}
        <div className="chat-container flex flex-col gap-4 mb-6 overflow-y-auto">
          {conversation?.map((msg, index) => (
            <div
              key={index}
              className={`chat-message flex gap-2 ${
                msg.role === "user"
                  ? "flex-row-reverse items-center"
                  : "flex-row items-end"
              }`}
            >
              <Image
                // src={`/icons/mave/maveai.png`}
                src={`${
                  msg.role === "user"
                    ? "/icons/mave_icons/user.svg"
                    : "/icons/mave/maveai.png"
                }`}
                alt={msg.role}
                width={30}
                height={30}
                objectFit="contain"
                className={`${
                  msg.role === "user"
                    ? "rounded-full border-2 border-theme"
                    : ""
                }`}
              />
              <div
                className={`rounded-lg p-4 max-w-6xl ${
                  msg.role === "user"
                    ? "bg-theme text-gray-600 font-semibold"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.role === "assistant" ? (
                  parseMessageContent(msg.content).map((part, idx) => {
                    if (part.type === "text") {
                      return <p key={idx}>{part.content}</p>;
                    } else if (part.type === "code") {
                      return (
                        <div key={idx} className="relative">
                          <SyntaxHighlighter
                            language={part.lang || "text"}
                            style={oneDark}
                            showLineNumbers
                            wrapLongLines={true}
                            customStyle={{ borderRadius: "8px" }}
                          >
                            {part.content}
                          </SyntaxHighlighter>
                          <Button
                            icon={<CopyOutlined />}
                            size="small"
                            className="absolute top-2 right-2 bg-transparent text-white hover:text-gray-400"
                            onClick={() => copyToClipboard(part.content)}
                          />
                        </div>
                      );
                    }
                  })
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex flex-col gap-4">
          {isModifying ? (
            <>
              <TextArea
                autoSize={{
                  minRows: 3,
                  maxRows: 9,
                }}
                allowClear
                ref={modifyInput ? (ref) => ref?.focus() : (ref) => ref?.blur()}
                placeholder="Modify the JSON..."
                value={modifyInput}
                onChange={(e) => setModifyInput(e.target.value)}
                className="resize-none border rounded-md p-2"
              />
              <div className="flex justify-end gap-4">
                <Button
                  onClick={handleDiscardModification}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={handleSendModification}
                  loading={loading}
                  className="bg-theme hover:bg-yellow-600 text-white"
                >
                  Send
                </Button>
              </div>
            </>
          ) : (
            <>
              <TextArea
                autoSize={{
                  minRows: 3,
                  maxRows: 9,
                }}
                allowClear
                ref={userInput ? (ref) => ref?.focus() : (ref) => ref?.blur()}
                placeholder="Make a homepage for my restaurant website..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="resize-none border rounded-md p-2"
              />
              <div className="flex justify-end">
                <Button
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  loading={loading}
                  className="bg-theme hover:bg-yellow-600 text-white"
                >
                  Send
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {conversation?.length > 0 && !isModifying && (
          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={handleModify}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Modify
            </Button>
            <Button
              type="primary"
              onClick={handleCreatePage}
              loading={creatingPage}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Create Page
            </Button>
          </div>
        )}

        {/* Loading Spinner */}
        {(loading || creatingPage) && (
          <div className="flex justify-center mt-4">
            <Spin tip={loading ? "Processing..." : "Creating Page..."} />
          </div>
        )}
      </div>
    </div>
  );
}
