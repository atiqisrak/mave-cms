import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

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
        {sender === "ai" && (
          <button
            onClick={() => onAddToBlog(message)}
            className="mt-2 text-theme underline"
          >
            Add to Blog
          </button>
        )}
      </div>
      {sender === "user" && (
        <div className="ml-2">
          <Image
            src="/icons/mave_icons/user.svg" // Ensure this path exists
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
