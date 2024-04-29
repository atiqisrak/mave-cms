import React, { useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { Button, Modal } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import WriteWithAI from "./WriteWithAI";

export default function BlogEditor({ content, setContent, onContentChange }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          style={{
            backgroundColor: "var(--theme)",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginBottom: "1rem",
          }}
          onClick={() => setModalVisible(true)}
        >
          <RobotOutlined />
        </Button>
      </div>
      <RichTextEditor
        editMode={true}
        editorHtml={content}
        onChange={onContentChange}
        style={{
          height: "200px",
          marginBottom: "3rem",
          padding: "1rem",
          backgroundColor: "var(--bg)",
          color: "var(--textNormal)",
          borderRadius: "10px",
          border: "1px solid var(--borderNormal)",
        }}
      />
      {modalVisible && (
        <Modal
          title="Write with AI"
          open={modalVisible}
          footer={null}
          onCancel={() => setModalVisible(false)}
          width={"60vw"}
        >
          <WriteWithAI
            visible={modalVisible}
            setVisible={setModalVisible}
            setContent={setContent}
          />
        </Modal>
      )}
    </div>
  );
}
