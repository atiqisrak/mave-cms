// components/Blog/BlogEditor.jsx

import React, { useState } from "react";
import { Button } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import RichTextEditor from "../RichTextEditor";
import WriteWithAI from "./WriteWithAI/WriteWithAI";

const BlogEditor = ({ content, setContent }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="flex flex-col">
      {/* AI Assistance Button */}
      <div className="flex justify-end mb-2">
        <Button
          icon={<RobotOutlined />}
          className="mavebutton"
          onClick={() => setModalVisible(true)}
        >
          Write with AI
        </Button>
      </div>

      {/* Rich Text Editor */}
      <RichTextEditor
        editMode={true}
        defaultValue={content}
        onChange={handleContentChange}
        className="h-96 mb-6 p-4 bg-white text-gray-800 rounded-lg border border-gray-300"
      />

      {/* AI Chat Modal */}
      <WriteWithAI
        visible={modalVisible}
        setVisible={setModalVisible}
        setContent={(newContent) => {
          // Append the new content to existing content
          const updatedContent = content + "\n" + newContent;
          setContent(updatedContent);
        }}
      />
    </div>
  );
};

export default BlogEditor;
