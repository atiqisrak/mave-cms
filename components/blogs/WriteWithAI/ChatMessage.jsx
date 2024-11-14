// components/WriteWithAI/ChatMessage.jsx

import React from "react";
import Image from "next/image";

const ChatMessage = ({ message, sender }) => {
  return (
    <div
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      {sender === "ai" && (
        <div className="mr-2">
          <Image
            src="/images/ai_avatar.png" // Ensure this path exists
            width={40}
            height={40}
            alt="AI Avatar"
            className="rounded-full"
          />
        </div>
      )}
      <div
        className={`max-w-md p-4 rounded-lg ${
          sender === "user"
            ? "bg-theme text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {message}
      </div>
      {sender === "user" && (
        <div className="ml-2">
          <Image
            src="/images/user_avatar.png" // Ensure this path exists
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
