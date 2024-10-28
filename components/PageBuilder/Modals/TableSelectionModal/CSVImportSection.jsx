// components/PageBuilder/Modals/TableSelectionModal/CSVImportSection.jsx

import React from "react";
import { Upload, Button, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";

const { Title } = Typography;

const CSVImportSection = ({ setHeaders, setRows }) => {
  const handleCSVUpload = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        const { data } = result;
        if (data.length > 0) {
          const headers = data[0];
          const rows = data.slice(1).map((row) => row);
          setHeaders(headers);
          setRows(rows);
          message.success("CSV imported successfully.");
        } else {
          message.error("CSV file is empty.");
        }
      },
      error: () => {
        message.error("Failed to parse CSV file.");
      },
    });
    return false; // Prevent upload
  };

  return (
    <>
      <Title level={4}>Import CSV</Title>
      <Upload
        beforeUpload={handleCSVUpload}
        accept=".csv"
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Click to Import CSV</Button>
      </Upload>
    </>
  );
};

export default CSVImportSection;
