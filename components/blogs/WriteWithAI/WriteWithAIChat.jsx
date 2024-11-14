// components/blogs/WriteWithAI/WriteWithAIChat.jsx

import React, { useState, useEffect, useRef } from "react";
import { Spin, message, Button, Popconfirm } from "antd";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { DeleteOutlined } from "@ant-design/icons";

const WriteWithAIChat = ({ setVisible, setContent }) => {
  const [conversation, setConversation] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Load conversation from localStorage on mount
    const storedConversation = localStorage.getItem("aiConversation");
    if (storedConversation) {
      setConversation(JSON.parse(storedConversation));
    }
  }, []);

  useEffect(() => {
    // Scroll to the bottom when the conversation updates
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // Save conversation to localStorage
    localStorage.setItem("aiConversation", JSON.stringify(conversation));
  }, [conversation]);

  const handleSend = async () => {
    if (!prompt.trim()) {
      message.warning("Please enter a prompt before sending.");
      return;
    }

    // Add user message to conversation
    const userMessage = { message: prompt, sender: "user" };
    setConversation((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ prompt }),
        body: JSON.stringify({
          prompt,
          history: conversation, // Include the conversation history
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiText = data.text; // The generated text from Gemini
        if (aiText === "No response generated.") {
          message.info("The AI could not generate a response.");
        }
        const aiMessage = { message: aiText, sender: "ai" };
        setConversation((prev) => [...prev, aiMessage]);
        setContent(aiText); // Optionally set the content in parent component
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Failed to get a response from AI.");
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

  const handleAddToBlog = (aiMessage) => {
    // Append the AI message to the existing content
    setContent((prevContent) => prevContent + "\n" + aiMessage);
    message.success("Content added to the blog editor.");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <ChatHeader />

      {/* Conversation Window */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg">
        {conversation?.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.message}
            sender={msg.sender}
            onAddToBlog={handleAddToBlog}
          />
        ))}
        <div ref={chatEndRef} />
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <Spin tip="AI is generating a response..." />
          </div>
        )}
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
