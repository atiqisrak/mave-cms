import React from "react";
import { Typography, List, Button, message } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

const { Title } = Typography;

const dependencies = [
  "@ant-design/icons: ^5.2.6",
  "@google/generative-ai: ^0.8.0",
  "@react-pdf-viewer/core: ^3.12.0",
  "@react-pdf-viewer/thumbnail: ^3.12.0",
  "@tinymce/tinymce-react: ^5.0.1",
  "antd: ^5.17.2",
  "axios: ^1.6.7",
  "croppie: ^2.6.5",
  "dayjs: ^1.11.10",
  "dotenv: ^16.3.1",
  "form-data: ^4.0.0",
  "froala-editor: ^4.2.0",
  "http-proxy-middleware: ^3.0.0",
  "imagemin: ^8.0.1",
  "lottie-react: ^2.4.0",
  "lottie-web: ^5.12.2",
  "marked: ^12.0.2",
  "moment: ^2.29.4",
  "next: ^12.3.4",
  "prismjs: ^1.29.0",
  "quill: ^1.3.7",
  "react: 18.2.0",
  "react-beautiful-dnd: ^13.1.1",
  "react-countup: ^6.5.3",
  "react-dom: 18.2.0",
  "react-easy-crop: ^5.0.5",
  "react-froala-wysiwyg: ^4.2.0",
  "react-google-charts: ^4.0.1",
  "react-helmet: ^6.1.0",
  "react-markdown: ^9.0.1",
  "react-pdf: ^7.7.1",
  "react-quill: ^2.0.0",
  "react-syntax-highlighter: ^15.5.0",
  "react-text-to-speech: ^0.14.5",
  "react-to-print: ^2.14.15",
  "react-virtualized: ^9.22.5",
  "remark-gfm: ^4.0.0",
];

const Dependency = () => {
  const handleCopy = () => {
    message.success("Copied to clipboard!");
  };

  const installCommand = `npm i ${dependencies
    .map((dep) => dep.split(": ")[0])
    .join(" ")}`;

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Dependencies</Title>
      <List
        size="large"
        bordered
        dataSource={dependencies}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      <CopyToClipboard text={installCommand} onCopy={handleCopy}>
        <Button type="primary" style={{ marginTop: "16px" }}>
          Copy Install Command
        </Button>
      </CopyToClipboard>
    </div>
  );
};

export default Dependency;
