// components/BuildWithAI/ChatMessage.jsx

import React from "react";
import { Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import Image from "next/image";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
);
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"; // Ensure CJS version

const CodeBlock = ({ language, content }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        message.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
        message.error("Failed to copy!");
      });
  };

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={language || "text"}
        style={oneDark}
        showLineNumbers
        wrapLongLines={true}
        customStyle={{ borderRadius: "8px" }}
      >
        {content}
      </SyntaxHighlighter>
      <Button
        icon={<CopyOutlined />}
        size="small"
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-transparent text-white hover:text-gray-400"
      />
    </div>
  );
};

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  // Debugging: Log the message object to verify fields
  console.log("ChatMessage:", message);

  return (
    <div
      className={`chat-message flex gap-2 ${
        isUser ? "flex-row-reverse items-center" : "flex-row items-start"
      }`}
    >
      {/* Avatar */}
      <Image
        src={
          isUser ? "/icons/mave_icons/user.svg" : "/icons/mave/maveai.png" // Ensure these paths are correct
        }
        alt={message.role}
        width={30}
        height={30}
        objectFit="contain"
        className={`${isUser ? "rounded-full border-2 border-theme" : ""}`}
      />

      {/* Message Content */}
      <div
        className={`rounded-lg p-4 max-w-6xl ${
          isUser
            ? "bg-theme text-white font-semibold"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {isUser ? (
          <span>{message.content}</span>
        ) : (
          <>
            {/* Render Text Explanation */}
            {message.text && <p className="mb-6 text-xl">{message.text}</p>}

            {/* Render JSON Configuration */}
            {message.content && (
              <CodeBlock
                language="json"
                content={JSON.stringify(message.content, null, 2)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
