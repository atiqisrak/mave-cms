import React, { useState } from "react";
import { Button, message } from "antd";
import { CopyTwoTone } from "@ant-design/icons";
import TextToApi from "../../components/tools/doctoapi/TextToApi";

const Doctoapi = () => {
  const [parsedData, setParsedData] = useState(null);

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
    <div className="mavecontainer">
      <TextToApi />
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

export default Doctoapi;
