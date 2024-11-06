// components/BuildWithAI/MessageInput.jsx

import React from "react";
import { Input, Button, Tooltip } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const MessageInput = ({
  userInput,
  setUserInput,
  handleSendMessage,
  loading,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <TextArea
        autoSize={{
          minRows: 3,
          maxRows: 6,
        }}
        allowClear
        placeholder="Describe the page you want to create..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="resize-none border rounded-md p-2"
      />
      <div className="flex justify-end">
        <Tooltip title="Click to send your message">
          <Button
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            loading={loading}
            className="bg-theme hover:bg-yellow-600 text-white"
          >
            Send
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default MessageInput;
