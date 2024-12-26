// TableSelectionModal/CSVImportSection.jsx

import React from "react";
import { Upload, Button, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";

const { Title } = Typography;

const CSVImportSection = ({ setHeaders, setRows }) => {
  const handleCSVUpload = (file) => {
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: (result) => {
        const { data } = result;
        if (data && data.length > 0) {
          // First row = CSV column names
          const csvHeaderStrings = data[0].map((h) => h.trim());
          // Convert each to { id, name }
          const csvHeaders = csvHeaderStrings.map((colName) => ({
            id: uuidv4(),
            name: colName,
          }));

          // Next rows = actual data
          const csvRows = data.slice(1);

          // Overwrite existing table data with CSV
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
    return false; // Prevent default upload
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
