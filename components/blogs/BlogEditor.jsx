// components/Blog/BlogEditor.jsx

import React, { useState } from "react";
import { Button, Modal } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import RichTextEditor from "../RichTextEditor";
import WriteWithAI from "./WriteWithAI/WriteWithAI";

const BlogEditor = ({ content, setContent, onContentChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
        editorHtml={content}
        onChange={onContentChange}
        className="h-48 mb-6 p-4 bg-white text-gray-800 rounded-lg border border-gray-300"
      />

      {/* AI Chat Modal */}
      <WriteWithAI
        visible={modalVisible}
        setVisible={setModalVisible}
        setContent={setContent}
      />
    </div>
  );
};

export default BlogEditor;
