// components/doctoapi/FormComponents/YamlInputForm.js

import React, { useState } from "react";
import { Form, Tooltip, Button, Upload, message, Tabs } from "antd";
import {
  UploadOutlined,
  QuestionCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import AceEditor from "react-ace";
// import Dragger from "antd/es/upload/Dragger";

// Import Ace Editor modes and themes
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github"; // Choose your preferred theme
import "ace-builds/src-noconflict/ext-language_tools";
import TabPane from "antd/es/tabs/TabPane";

// Sample YAML as a string
const sampleData = `
title: "Demo Page"
slug: "demo-page"

metadata:
  metaTitle: "Demo Page"
  metaDescription: "This is a demo page for testing the Text to API feature."
  keywords:
    - "demo"
    - "testing"
    - "API"

sections:
  - sectionTitle: "New Section 1"
    data:
      - type: "title"
        value: "Demo Title"
      - type: "description"
        value: "<p>Demo <strong>Description</strong></p>"
      - type: "media"
        id: 427  # Reference to the media component by ID

  - sectionTitle: "New Section 2"
    data:
      - type: "menu"
        id: 2    # Reference to the menu component by ID
      - type: "navbar"
        id: 24   # Reference to the navbar component by ID
      - type: "slider"
        id: 36   # Reference to the slider component by ID
      - type: "card"
        id: 172  # Reference to the card component by ID
      - type: "footer"
        id: 36   # Reference to the footer component by ID

additional:
  - pageType: "Page"
    metaTitle: "Demo Page"
    metaDescription: null
    keywords: []
    metaImage: null
    metaImageAlt: null

status: 1
`;

const YamlInputForm = ({ onYamlChange, onFileUpload }) => {
  const [yamlValue, setYamlValue] = useState("");
  const { Dragger } = Upload;
  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const yamlText = e.target.result;
      setYamlValue(yamlText);
      onYamlChange(yamlText);
    };
    reader.onerror = () => {
      // Handle error
    };
    reader.readAsText(file);
    return false; // Prevent automatic upload
  };

  const handleEditorChange = (value) => {
    setYamlValue(value);
    onYamlChange(value);
  };

  const handleCopySample = () => {
    navigator.clipboard.writeText(sampleData);
    message.success("Sample YAML copied to clipboard!");
  };

  return (
    <Form layout="vertical">
      <Form.Item>
        <div className="grid grid-cols-3">
          {/* YAML Editor */}
          <div className="flex-1 mr-4 col-span-2">
            <label className="text-2xl font-bold text-theme flex items-center">
              Write your YAML
              <Tooltip title="Use the editor to write your YAML. Syntax highlighting and autocomplete are enabled.">
                <QuestionCircleOutlined className="ml-2" />
              </Tooltip>
            </label>
            <AceEditor
              mode="yaml"
              theme="github"
              onChange={handleEditorChange}
              name="yaml-editor"
              editorProps={{ $blockScrolling: true }}
              width="100%"
              height="70vh"
              fontSize={18}
              showPrintMargin={false}
              showGutter={true}
              highlightActiveLine={true}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
              className="mt-4 border rounded"
              placeholder="Write your YAML here..."
              value={yamlValue}
            />
          </div>

          {/* Sample YAML Display */}
          <div className="flex-1 mt-6 lg:mt-0 col-span-1">
            <div className="flex justify-between items-center">
              <label className="text-2xl font-bold text-theme">
                Sample YAML
              </label>
              <Tooltip title="Copy Sample YAML">
                <Button
                  icon={<CopyOutlined />}
                  size="small"
                  onClick={handleCopySample}
                />
              </Tooltip>
            </div>
            <div className="mt-4 p-4 bg-white rounded overflow-auto">
              <pre>{sampleData}</pre>
            </div>
          </div>
        </div>
      </Form.Item>
      {/* Upload YAML */}
      <Form.Item>
        <label className="text-2xl font-bold text-theme flex items-center">
          Or upload your YAML/YML file
          <Tooltip title="Upload a .yaml or .yml file to populate the editor.">
            <QuestionCircleOutlined className="ml-2" />
          </Tooltip>
        </label>
        <div className="mt-4">
          <Dragger
            name="file"
            multiple={false}
            beforeUpload={handleFile}
            accept=".yaml,.yml"
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibit from uploading
              company data or other banned files.
            </p>
          </Dragger>
        </div>
      </Form.Item>
    </Form>
  );
};

export default YamlInputForm;
