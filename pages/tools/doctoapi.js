import React, { useState } from "react";
import Head from "next/head";
import { Button, Input } from "antd";
import { Transformer } from "../../components/tools/doctoapi/Transformers";

const DoctoAPI = () => {
  const [text, setText] = useState("");
  const [parsedData, setParsedData] = useState(null);

  const handleTransform = () => {
    try {
      const parsedJson = Transformer(text);
      setParsedData(parsedJson);
    } catch (error) {
      console.error("Error transforming data:", error);
      setParsedData(null);
    }
  };

  return (
    <div className="ViewContainer ViewContentContainer">
      <Head>
        <title>Doc to API</title>
      </Head>
      <div className="input-container">
        <Input.TextArea
          rows={24}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text data here"
        />
        <Button
          type="primary"
          onClick={handleTransform}
          style={{
            marginTop: "3em",
          }}
        >
          Submit
        </Button>
      </div>

      {parsedData && (
        <div>
          <h2>Rendered Data</h2>
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
