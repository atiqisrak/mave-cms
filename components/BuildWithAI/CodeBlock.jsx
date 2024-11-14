import React from "react";
import dynamic from "next/dynamic";
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
);
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"; // Ensure CJS version
import { CopyOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function CodeBlock({ language, content }) {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        antdMessage.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
        antdMessage.error("Failed to copy!");
      });
  };

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={language || "text"}
        style={oneDark}
        showLineNumbers
        wrapLongLines={true}
        customStyle={{ borderRadius: "8px" }}
      >
        {content}
      </SyntaxHighlighter>
      <Button
        icon={<CopyOutlined />}
        size="small"
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-transparent text-white hover:text-gray-400"
      />
    </div>
  );
}
