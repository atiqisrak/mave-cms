// components/WriteWithAI/WriteWithAIChat.jsx

import React, { useState, useEffect, useRef } from "react";
import { Spin, message } from "antd";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import instance from "../../../axios";

const WriteWithAIChat = ({ setVisible, setContent }) => {
  const [conversation, setConversation] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Load conversation from localStorage
    const storedConversation = localStorage.getItem("aiConversation");
    if (storedConversation) {
      setConversation(JSON.parse(storedConversation));
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when conversation updates
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // Save conversation to localStorage
    localStorage.setItem("aiConversation", JSON.stringify(conversation));
  }, [conversation]);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    const userMessage = { message: prompt, sender: "user" };
    setConversation((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      // Replace with your AI API endpoint
      const response = await instance.post("/ai/generate", { prompt });

      if (response.status === 200) {
        const aiText = response.data.text; // Adjust based on your API response
        const aiMessage = { message: aiText, sender: "ai" };
        setConversation((prev) => [...prev, aiMessage]);
        setContent(aiText); // Optionally set the content in parent
      } else {
        message.error("Failed to get response from AI.");
      }
    } catch (error) {
      console.error("Error communicating with AI:", error);
      message.error("An error occurred while communicating with AI.");
    }

    setLoading(false);
  };

  const handleClearConversation = () => {
    setConversation([]);
    localStorage.removeItem("aiConversation");
    message.success("Conversation cleared.");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <ChatHeader />

      {/* Conversation Window */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg">
        {conversation.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} sender={msg.sender} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Field */}
      <div className="mt-4">
        <ChatInput
          prompt={prompt}
          setPrompt={setPrompt}
          onSend={handleSend}
          loading={loading}
        />
      </div>

      {/* Clear Conversation Button */}
      {conversation.length > 0 && (
        <div className="mt-2 flex justify-end">
          <Popconfirm
            title="Are you sure you want to clear the conversation?"
            onConfirm={handleClearConversation}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} className="mavecancelbutton">
              Clear Conversation
            </Button>
          </Popconfirm>
        </div>
      )}
    </div>
  );
};

export default WriteWithAIChat;
