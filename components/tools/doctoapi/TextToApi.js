import { CopyTwoTone } from "@ant-design/icons";
import { Button, Input, message } from "antd";

export default function TextToApi({
  text,
  setText,
  sampleData,
  handleTransform,
}) {
  const handleCopy = () => {
    if (sampleData) {
      navigator.clipboard
        .writeText(sampleData)
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
    <div>
      <center>
        <h1>Text to API</h1>
      </center>
      <div className="input-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "1em",
          }}
        >
          <div>
            <h3>Write your page data</h3>
            <Input.TextArea
              rows={31}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text data here"
            />
          </div>
          {/* Sample data */}
          <div>
            <center>
              <h3>Sample Data</h3>
            </center>
            <div
              style={{
                padding: "1em",
                backgroundColor: "#333",
                color: "#fff",
                borderRadius: "5px",
                overflow: "auto",
                border: "1px solid #eaeaea",
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
              />
              <pre>{sampleData}</pre>
            </div>
          </div>
        </div>

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
    </div>
  );
}
