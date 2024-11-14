// components/BuildWithAI/ChatContainer.jsx

import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

const ChatContainer = ({ conversation, handleResend, handleRegenerate }) => {
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
        // <ChatMessage key={index} message={msg} />
        <ChatMessage
          key={index}
          message={msg}
          onResend={() => handleResend(index)}
          onRegenerate={() => handleRegenerate(index)}
        />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatContainer;
