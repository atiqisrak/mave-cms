// TableSelectionModal/CSVImportSection.jsx

import React from "react";
import { Upload, Button, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";

const { Title } = Typography;

const CSVImportSection = ({ setHeaders, setRows }) => {
  const handleCSVUpload = (file) => {
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: (result) => {
        const { data } = result;
        if (data && data.length > 0) {
          // data[0] -> array of column names
          const csvHeaders = data[0].map((h) => h.trim());
          // data.slice(1) -> subsequent rows
          const csvRows = data.slice(1);

          // Overwrite your existing headers/rows with the CSV
          setHeaders(csvHeaders);
          setRows(csvRows);

          message.success("CSV imported successfully.");
        } else {
          message.error("CSV file is empty or invalid.");
        }
      },
      error: () => {
        message.error("Failed to parse CSV file.");
      },
    });
    return false;
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
