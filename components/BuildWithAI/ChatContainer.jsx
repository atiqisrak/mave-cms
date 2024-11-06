// components/BuildWithAI/ChatContainer.jsx

import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

const ChatContainer = ({ conversation }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <div
      className="chat-container flex flex-col gap-4 mb-6 overflow-y-auto"
      style={{ maxHeight: "500px" }}
    >
      {conversation?.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatContainer;
