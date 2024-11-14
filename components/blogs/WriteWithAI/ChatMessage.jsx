// components/WriteWithAI/ChatMessage.jsx

import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { Button } from "antd";

const ChatMessage = ({ message, sender, onAddToBlog }) => {
  return (
    <div
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      {sender === "ai" && (
        <div className="mr-2">
          <Image
            src="/icons/mave/maveai.png"
            width={40}
            height={40}
            alt="AI Avatar"
            className="rounded-full"
          />
        </div>
      )}
      <div
        className={`max-w-full p-4 rounded-lg ${
          sender === "user"
            ? "bg-theme text-white"
            : "bg-gray-200 text-gray-800"
        } markdown-content`}
      >
        <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
          {message}
        </ReactMarkdown>
        {sender === "ai" && onAddToBlog && (
          <Button
            className="mavebutton mt-10"
            onClick={() => onAddToBlog(message)}
          >
            Add to Blog
          </Button>
        )}
      </div>
      {sender === "user" && (
        <div className="ml-2">
          <Image
            src="/icons/mave_icons/user.svg"
            width={40}
            height={40}
            alt="User Avatar"
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
