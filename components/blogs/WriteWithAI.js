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
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [responded, setResponded] = useState(false);
  const [lastPrompt, setLastPrompt] = useState(""); // State for last prompt
  const [theme, setTheme] = useState("dark");
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    setGEMINI_API_KEY(apiKey);

    // Load conversation history from local storage on initial render
    const storedConversation = localStorage.getItem("writeWithAIConversation");
    if (storedConversation) {
      setConversation(JSON.parse(storedConversation));
    }
  }, []);

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const response = await model.generateContent(prompt);
      response &&
        setConversation((prevConversation) => [
          ...prevConversation,
          { prompt, response },
        ]);
      setPrompt("");
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
        marginBottom: "5em",
      }}
    >
      <h1>Write with AI</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "70vw",
        }}
      >
        {conversation.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                color: "var(--theme)",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              You:{" "}
              <span
                style={{
                  color: "#333",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                {item.prompt}
              </span>
            </h2>
            <div
              style={{
                border: "1px solid #f0f0f0",
                padding: "2rem",
                borderRadius: "5px",
                marginTop: "0.3rem",
              }}
            >
              <Markdown
                ref={contentRef}
                remarkPlugins={[remarkGfm]}
                components={renderer}
              >
                {contentText}
              </Markdown>
            </div>
          </div>
        ))}
      </div>
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
        {/* <Popover
          content={<p>Edit the last prompt you used.</p>}
          placement="top"
        >
          <Button
            onClick={() =>
              setPrompt(conversation[conversation.length - 1]?.prompt)
            }
            disabled={!conversation.length}
          >
            Edit Prompt
          </Button>
        </Popover> */}
        <Select
          defaultValue={theme}
          options={themeOptions}
          onChange={handleThemeChange}
          style={{ width: 80 }}
        />
      </div>
    </div>
  );
}
