// components/PageBuilder/Modals/TableSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, message, Input, Form } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Table } from "antd";

const { Title } = Typography;

const TableSelectionModal = ({
  isVisible,
  onClose,
  onSelectTable,
  initialTable,
}) => {
  const [headers, setHeaders] = useState(initialTable?.headers || ["Header 1"]);
  const [rows, setRows] = useState(
    initialTable?.rows || [Array(initialTable?.headers?.length || 1).fill("")]
  );
  const [editingKey, setEditingKey] = useState("");

  // Synchronize rows when headers change
  useEffect(() => {
    const adjustedRows = rows.map((row) => {
      if (row.length < headers.length) {
        return [...row, ...Array(headers.length - row.length).fill("")];
      } else if (row.length > headers.length) {
        return row.slice(0, headers.length);
      }
      return row;
    });
    setRows(adjustedRows);
  }, [headers]);

  // Initialize rows based on headers when modal opens
  useEffect(() => {
    if (isVisible) {
      if (initialTable) {
        setHeaders(initialTable.headers);
        setRows(
          initialTable.rows.length > 0
            ? initialTable.rows
            : [Array(initialTable.headers.length).fill("")]
        );
      } else {
        setHeaders(["Header 1"]);
        setRows([[""]]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const addHeader = () => {
    setHeaders([...headers, `Header ${headers.length + 1}`]);
  };

  const removeHeader = (index) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
    // Remove corresponding cell data in each row
    const newRows = rows.map((row) => row.filter((_, i) => i !== index));
    setRows(newRows);
  };

  const addRow = () => {
    const newRow = Array(headers.length).fill("");
    setRows([...rows, newRow]);
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleSave = () => {
    // Validate that all rows have the correct number of columns
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].length !== headers.length) {
        message.error(`Row ${i + 1} does not match the number of headers.`);
        return;
      }
    }

    onSelectTable({ headers, rows });
    message.success("Table saved successfully.");
    onClose();
  };

  const handleCancel = () => {
    setHeaders(initialTable?.headers || ["Header 1"]);
    setRows(
      initialTable?.rows || [Array(initialTable?.headers?.length || 1).fill("")]
    );
    onClose();
  };

  // Define columns for Ant Design's Table component
  const columns = headers.map((header, index) => ({
    title: (
      <div className="flex items-center">
        <span>{header}</span>
        <Button
          size="small"
          type="text"
          icon={<MinusOutlined />}
          onClick={() => removeHeader(index)}
          danger
          style={{ marginLeft: 8 }}
        />
      </div>
    ),
    dataIndex: `col${index}`,
    key: `col${index}`,
    editable: true,
    render: (text, record, rowIndex) => (
      <Input
        value={text}
        onChange={(e) => handleCellChange(e.target.value, rowIndex, index)}
      />
    ),
  }));

  const handleCellChange = (value, rowIndex, colIndex) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = value;
    setRows(newRows);
  };

  // Add a button to add new columns directly in the table
  const handleAddColumn = () => {
    setHeaders([...headers, `Header ${headers.length + 1}`]);
    const newRows = rows.map((row) => [...row, ""]);
    setRows(newRows);
  };

  return (
    <Modal
      title="Configure Table"
      visible={isVisible}
      onOk={handleSave}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save Table
        </Button>,
      ]}
    >
      <Title level={4}>Headers</Title>
      <div className="flex items-center mb-4">
        {headers.map((header, index) => (
          <div key={index} className="flex items-center mr-2">
            <Input
              value={header}
              onChange={(e) => {
                const newHeaders = [...headers];
                newHeaders[index] = e.target.value;
                setHeaders(newHeaders);
              }}
              placeholder={`Header ${index + 1}`}
              style={{ width: 150, marginRight: 8 }}
            />
            <Button
              icon={<MinusOutlined />}
              onClick={() => removeHeader(index)}
              danger
              type="text"
            />
          </div>
        ))}
        <Button
          type="dashed"
          onClick={addHeader}
          icon={<PlusOutlined />}
          style={{ width: 150 }}
        >
          Add Header
        </Button>
      </div>

      <Title level={4}>Rows</Title>
      <Button
        type="dashed"
        onClick={addRow}
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
      >
        Add Row
      </Button>
      <Table
        dataSource={rows.map((row, index) => ({ key: index, ...row }))}
        columns={columns}
        pagination={false}
        bordered
      />

      <Button
        type="dashed"
        onClick={handleAddColumn}
        icon={<PlusOutlined />}
        style={{ marginTop: 16 }}
      >
        Add Column
      </Button>
    </Modal>
  );
};

export default TableSelectionModal;
