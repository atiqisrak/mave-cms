// components/WriteWithAI/ChatHeader.jsx

import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-center mb-4">
      <Title level={2}>Conversational AI Assistant</Title>
    </div>
  );
};

export default ChatHeader;
