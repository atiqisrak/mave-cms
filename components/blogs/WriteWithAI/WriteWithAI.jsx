// components/WriteWithAI.js

import React, { useState } from "react";
import { Button, Modal } from "antd";
import WriteWithAIChat from "./WriteWithAIChat";
import { RobotOutlined } from "@ant-design/icons";

const WriteWithAI = ({ visible, setVisible, setContent }) => {
  return (
    <Modal
      title="Write with AI"
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      width={"60vw"}
      centered
    >
      <WriteWithAIChat setVisible={setVisible} setContent={setContent} />
    </Modal>
  );
};

export default WriteWithAI;
