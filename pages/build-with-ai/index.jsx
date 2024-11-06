// pages/build-with-ai/index.jsx

import React, { useState, useEffect } from "react";
import { Button, message, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";
import instance from "../../axios"; // Ensure this points to your Axios instance
import Image from "next/image";

// Importing BuildWithAI Components
import ChatContainer from "../../components/BuildWithAI/ChatContainer";
import MessageInput from "../../components/BuildWithAI/MessageInput";
import ActionButtons from "../../components/BuildWithAI/ActionButtons";
import LoadingSpinner from "../../components/BuildWithAI/LoadingSpinner";

const { TextArea } = Input;

export default function BuildWithAI() {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creatingPage, setCreatingPage] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [modifyInput, setModifyInput] = useState("");

  useEffect(() => {
    const storedConversation = localStorage.getItem("conversation");
    if (storedConversation) {
      setConversation(JSON.parse(storedConversation));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation]);

  const handleClearConversation = () => {
    setConversation([]);
    localStorage.removeItem("conversation");
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
        const { text, json } = response.data;

        setConversation([
          ...newConversation,
          { role: "assistant", content: json, text },
        ]);
        message.success("JSON generated successfully!");
      } else {
        message.error(response.data.error || "Failed to generate JSON.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        message.error(`Error: ${error.response.data.error}`);
        if (error.response.data.details) {
          console.log("Validation Details:", error.response.data.details);
        }
      } else {
        message.error("An unexpected error occurred.");
      }
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
      const jsonPayload = JSON.parse(lastAssistantMessage.content);
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
        const { text, json } = response.data;
        setConversation([
          ...newConversation,
          { role: "assistant", content: json, text },
        ]);
        message.success("JSON modified successfully!");
      } else {
        message.error(response.data.error || "Failed to modify JSON.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        message.error(`Error: ${error.response.data.error}`);
        if (error.response.data.details) {
          console.log("Validation Details:", error.response.data.details);
        }
      } else {
        message.error("An unexpected error occurred.");
      }
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
        <ChatContainer conversation={conversation} />

        {/* Input Area */}
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
          <MessageInput
            userInput={userInput}
            setUserInput={setUserInput}
            handleSendMessage={handleSendMessage}
            loading={loading}
          />
        )}

        {/* Action Buttons */}
        <ActionButtons
          handleModify={handleModify}
          handleCreatePage={handleCreatePage}
          conversation={conversation}
          isModifying={isModifying}
          handleClearConversation={handleClearConversation}
        />

        {/* Loading Spinner */}
        <LoadingSpinner
          loading={loading || creatingPage}
          text={creatingPage ? "Creating Page..." : "Processing..."}
        />
      </div>
    </div>
  );
}
