import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

export default function FileToApi({ handleTransform, setText }) {
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setText(fileContent);
    };

    reader.onerror = (e) => {
      message.error("Failed to read file!");
    };

    reader.readAsText(file);
    return false; // Prevent upload
  };
  return (
    <div>
      <center>
        <h1>Doc to API</h1>
      </center>
      <div className="input-container">
        {/* <Upload beforeUpload={handleFileUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload> */}
        <Upload.Dragger
          name="file"
          multiple={false}
          beforeUpload={handleFileUpload}
          maxCount={1}
          listType="text"
          progress={{ strokeColor: { "0%": "#108ee9", "100%": "#87d068" } }}
          showUploadList={true}
          onRemove={() => {
            setText("");
          }}
          style={{
            padding: "2em",
            border: "2px dashed #eaeaea",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Upload.Dragger>

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
