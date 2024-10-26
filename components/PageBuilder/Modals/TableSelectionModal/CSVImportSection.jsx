// components/PageBuilder/Modals/TableSelectionModal/CSVImportSection.jsx

import React from "react";
import { Form, Button, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";

const { Title } = Typography;

const CSVImportSection = ({ setHeaders, setRows }) => {
  const handleCSVUpload = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const csvHeaders = results.meta.fields;
        const csvRows = results.data.map((row) =>
          csvHeaders.map((header) => row[header])
        );
        setHeaders(csvHeaders);
        setRows(
          csvRows.length > 0 ? csvRows : [Array(csvHeaders.length).fill("")]
        );
        message.success("CSV imported successfully.");
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
      <Form.Item>
        <Form.Item>
          <Button
            type="dashed"
            onClick={() => {}}
            icon={<UploadOutlined />}
            style={{ width: "100%" }}
          >
            <label htmlFor="csv-upload">Upload CSV</label>
          </Button>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                handleCSVUpload(file);
              }
            }}
          />
        </Form.Item>
      </Form.Item>
    </>
  );
};

export default CSVImportSection;
