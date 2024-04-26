import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Input, Button, Space, Popover, Select } from "antd";
import Markdown from "react-markdown";
import TextArea from "antd/es/input/TextArea";
import { CopyOutlined } from "@ant-design/icons";
import remarkGfm from "remark-gfm"; // GFM for markdown support
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function WriteWithAI() {
  const [GEMINI_API_KEY, setGEMINI_API_KEY] = useState("");

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    setGEMINI_API_KEY(apiKey);
  }, []);

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [responded, setResponded] = useState(false);
  const [lastPrompt, setLastPrompt] = useState(""); // State for last prompt
  const [theme, setTheme] = useState("dark");

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const response = await model.generateContent(prompt);
      response && setResponded(true);
      setContent(response);
      setLastPrompt(prompt);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPrompt = () => {
    setResponded(false);
    setPrompt(lastPrompt);
  };

  const handleCopy = () => {
    const contentElement = contentRef.current;
    if (contentElement) {
      const content = contentElement.innerText;
      navigator.clipboard.writeText(content);
    }
  };

  const copyPopoverContent = (
    <Space direction="vertical" size={8}>
      <p>Content copied!</p>
    </Space>
  );

  const contentText = content?.response?.candidates[0]?.content?.parts[0]?.text;

  const contentRef = React.createRef();

  const renderer = {
    pre: ({ children }) => {
      if (typeof children === "string") {
        const code = children.trim();
        const language = code.split("\n")[0].slice(3).trim(); // Extract language from code block (assuming JavaScript)
        return (
          <SyntaxHighlighter style={dark} language={language} PreTag="pre">
            {code.slice(code.indexOf("\n") + 1)}
          </SyntaxHighlighter>
        );
      } else {
        return <pre>{children}</pre>;
      }
    },
  };

  const themeOptions = [
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  const handleThemeChange = (value) => {
    setTheme(value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h1>Write with AI</h1>
      <TextArea
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "60vw", height: "10rem" }}
        autoSize={{ minRows: 5, maxRows: 10 }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "60vw",
        }}
      >
        <Button onClick={handleGenerate} loading={loading} disabled={!prompt}>
          Generate
        </Button>
        <Popover
          content={<p>Edit the last prompt you used.</p>}
          placement="top"
        >
          <Button onClick={handleEditPrompt} disabled={!lastPrompt}>
            Edit Prompt
          </Button>
        </Popover>
        <Select
          defaultValue={theme}
          options={themeOptions}
          onChange={handleThemeChange}
          style={{ width: 80 }}
        />
      </div>

      {responded && (
        <div>
          <h2>Content</h2>
          <div
            style={{
              padding: "1rem",
              border: "1px solid var(--theme)",
              borderRadius: "0.5rem",
              margin: "1rem 0",
              width: "60vw",
              backgroundColor: theme === "dark" ? "#2f3136" : "#fff",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            <Markdown
              ref={contentRef}
              remarkPlugins={[remarkGfm]}
              components={renderer}
            >
              {contentText}
            </Markdown>
            <Popover content={copyPopoverContent} placement="right">
              <Button
                type="text"
                icon={<CopyOutlined />}
                onClick={handleCopy}
              />
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
}
