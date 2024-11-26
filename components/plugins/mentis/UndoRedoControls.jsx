// components/mentis/UndoRedoControls.jsx
import React from "react";
import { Button } from "antd";
import { UndoOutlined, RedoOutlined } from "@ant-design/icons";

const UndoRedoControls = ({ onUndo, onRedo, canUndo, canRedo }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <Button icon={<UndoOutlined />} onClick={onUndo} disabled={!canUndo}>
        Undo
      </Button>
      <Button icon={<RedoOutlined />} onClick={onRedo} disabled={!canRedo}>
        Redo
      </Button>
    </div>
  );
};

export default UndoRedoControls;
