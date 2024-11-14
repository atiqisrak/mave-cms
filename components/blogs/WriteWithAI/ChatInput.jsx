// components/WriteWithAI/ChatInput.jsx

import React from "react";
import { Input, Button } from "antd";
import { RobotOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ChatInput = ({ prompt, setPrompt, onSend, loading }) => {
  return (
    <div className="flex items-center gap-2">
      <TextArea
        placeholder="Type your message..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        autoSize={{ minRows: 1, maxRows: 4 }}
        className="flex-1"
      />
      <Button
        type="primary"
        icon={<RobotOutlined />}
        onClick={onSend}
        loading={loading}
        disabled={!prompt.trim()}
        className="mavebutton"
      >
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
