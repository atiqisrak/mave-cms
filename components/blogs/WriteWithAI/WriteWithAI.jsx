// components/WriteWithAI.js

import React, { useState } from "react";
import { Button, Drawer, Modal } from "antd";
import WriteWithAIChat from "./WriteWithAIChat";
import { RobotOutlined } from "@ant-design/icons";

const WriteWithAI = ({ visible, setVisible, setContent }) => {
  return (
    <Drawer
      title="Write with AI"
      open={visible}
      onClose={() => setVisible(false)}
      footer={null}
      width={"60vw"}
      centered
    >
      <WriteWithAIChat setVisible={setVisible} setContent={setContent} />
    </Drawer>
  );
};

export default WriteWithAI;
