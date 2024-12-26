// components/PageBuilder/Modals/TableSelectionModal/CSVImportSection.jsx

import React from "react";
import { Upload, Button, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";

const { Title } = Typography;

const CSVImportSection = ({ setHeaders, setRows }) => {
  const handleCSVUpload = (file) => {
    Papa.parse(file, {
      skipEmptyLines: true, // helps ignore blank rows
      complete: (result) => {
        let { data } = result;
        if (data && data.length > 0) {
          // Clean/trims each header in the first row
          const rawHeaders = data[0].map((col) => col.trim());
          const rows = data.slice(1).map((row) => row);

          setHeaders(rawHeaders); // e.g. ["Sl.", "PROFILE_IMAGE", ...]
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
