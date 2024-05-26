import React, { useState } from "react";
import Head from "next/head";
import { Button, Input, message, Tabs } from "antd";
import { Transformer } from "../../components/tools/doctoapi/Transformers";
import { CopyOutlined, CopyTwoTone } from "@ant-design/icons";
import TextToApi from "../../components/tools/doctoapi/TextToApi";
import FileToApi from "../../components/tools/doctoapi/FileToApi";

const DoctoAPI = () => {
  const [text, setText] = useState("");
  const [parsedData, setParsedData] = useState(null);

  const sampleData = `  type: section
  title: Section 1
  content: [
      {
          type: text
          content: "This is a text block"
      }
  ]
  type: section
  title: Section 2
  content: [
      {
          type: paragraph
          content: "<p>This is a paragraph</p>
          <ul>
              <li>Item 1</li>
              <li>Item 2</li>
          </ul>
          "
      }
  ]
  type: section
  title: Section 3
  content: [
      {
          type: image
          src: "http://example.com/image.jpg"
          alt: "An image"
      }
  ]`;

  const handleTransform = () => {
    try {
      const parsedJson = Transformer(text);
      setParsedData(parsedJson);
    } catch (error) {
      console.error("Error transforming data:", error);
      setParsedData(null);
    }
  };

  const handleCopy = () => {
    if (parsedData) {
      navigator.clipboard
        .writeText(JSON.stringify(parsedData, null, 2))
        .then(() => {
          message.success("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Error copying to clipboard: ", err);
          message.error("Failed to copy to clipboard.");
        });
    }
  };

  return (
    <div className="ViewContainer ViewContentContainer">
      <Head>
        <title>Doc to API</title>
      </Head>

      <div>
        <Tabs
          defaultActiveKey="1"
          animated={true}
          centered={true}
          tabPosition="top"
          type="card"
        >
          {/* Text to API, Doc to API, AI to API, Figma to API */}
          <Tabs.TabPane tab="Text to API" key="1">
            <TextToApi
              text={text}
              setText={setText}
              sampleData={sampleData}
              handleTransform={handleTransform}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Doc to API" key="2">
            <FileToApi handleTransform={handleTransform} setText={setText} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="AI to API" key="3">
            <h1>AI to API</h1>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Figma to API" key="4">
            <h1>Figma to API</h1>
          </Tabs.TabPane>
        </Tabs>
      </div>

      {parsedData && (
        <div
          style={{
            marginTop: "3em",
          }}
        >
          <h2
            style={{
              color: "var(--themes)",
              textAlign: "center",
              fontSize: "2em",
              fontWeight: "bold",
            }}
          >
            Rendered Data
          </h2>

          <div
            style={{
              padding: "1em",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              overflow: "auto",
              border: "1px solid #eaeaea",
              marginTop: "1em",
            }}
          >
            <Button
              onClick={handleCopy}
              icon={<CopyTwoTone />}
              style={{
                position: "relative",
                float: "right",
                top: "0",
                right: "0",
              }}
            ></Button>
            <pre>{JSON.stringify(parsedData, null, 2)}</pre>
          </div>
          <Button
            danger
            onClick={() => {
              setParsedData(null);
            }}
            style={{
              marginTop: "3em",
            }}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default DoctoAPI;
