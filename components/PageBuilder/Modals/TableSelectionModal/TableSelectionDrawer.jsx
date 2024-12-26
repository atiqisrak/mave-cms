// TableSelectionModal/TableSelectionDrawer.jsx

import React, { useState, useEffect } from "react";
import { Drawer, Form, Button, Typography, Select, message } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import CSVImportSection from "./CSVImportSection";
import HeadersSection from "./HeadersSection";
import RowsSection from "./RowsSection";
// import StylingSection from "./StylingSection"; // REMOVE or comment out
import PreviewTable from "./PreviewTable";

const { Title } = Typography;
const { Option } = Select;

const TableSelectionDrawer = ({
  isVisible,
  onClose,
  onSelectTable,
  initialTable,
}) => {
  const [form] = Form.useForm();

  // 1) Basic table data states
  const [headers, setHeaders] = useState(
    initialTable?.headers || ["Column 1 Heading"]
  );
  const [rows, setRows] = useState(
    initialTable?.rows || [Array(initialTable?.headers?.length || 1).fill("")]
  );

  // 2) Visibility array for toggling columns
  const [visibleColumns, setVisibleColumns] = useState(
    initialTable?.visibleColumns ||
      Array(initialTable?.headers?.length || 1).fill(true)
  );

  // 3) filterColumns: which columns to have filters
  const [filterColumns, setFilterColumns] = useState(
    initialTable?.filterColumns || []
  );

  // Lifecycle
  useEffect(() => {
    if (isVisible) {
      // If initialTable is provided, reset to that
      if (initialTable) {
        setHeaders(initialTable.headers || ["Column 1 Heading"]);
        setRows(
          initialTable.rows || [
            Array(initialTable?.headers?.length || 1).fill(""),
          ]
        );
        setVisibleColumns(
          initialTable.visibleColumns ||
            Array(initialTable?.headers?.length || 1).fill(true)
        );
        setFilterColumns(initialTable.filterColumns || []);
      }
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, initialTable]);

  // If user changes number of headers, keep rows synced in length
  useEffect(() => {
    setRows((prevRows) =>
      prevRows.map((r) => {
        const newRow = [...r];
        if (newRow.length < headers.length) {
          return [...newRow, ...Array(headers.length - newRow.length).fill("")];
        } else if (newRow.length > headers.length) {
          return newRow.slice(0, headers.length);
        }
        return newRow;
      })
    );
  }, [headers]);

  // If user changes number of headers, keep visibleColumns in sync
  useEffect(() => {
    if (visibleColumns.length < headers.length) {
      // add "true" for newly added columns
      setVisibleColumns([
        ...visibleColumns,
        ...Array(headers.length - visibleColumns.length).fill(true),
      ]);
    } else if (visibleColumns.length > headers.length) {
      // remove extra
      setVisibleColumns(visibleColumns.slice(0, headers.length));
    }
  }, [headers, visibleColumns]);

  // Keep the form in sync (minus styling)
  useEffect(() => {
    form.setFieldsValue({
      headers,
      rows,
    });
  }, [headers, rows, form]);

  // Handle Save
  const handleSave = () => {
    form
      .validateFields()
      .then(() => {
        // Validate row lengths
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].length !== headers.length) {
            message.error(`Row ${i + 1} does not match the number of headers.`);
            return;
          }
        }

        onSelectTable({
          headers,
          rows,
          visibleColumns,
          filterColumns,
        });
        message.success("Table saved successfully.");
        onClose();
      })
      .catch(() => {
        message.error("Please fix the errors in the form.");
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title="Configure Table"
      placement="right"
      closable
      onClose={handleCancel}
      open={isVisible}
      width="70vw"
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={handleSave} type="primary">
            Save Table
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        {/* 1) CSV Import */}
        <CSVImportSection setHeaders={setHeaders} setRows={setRows} />

        {/* 2) Headers + toggling + reordering actual table columns */}
        <HeadersSection
          headers={headers}
          setHeaders={setHeaders}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          rows={rows}
          setRows={setRows}
        />

        {/* 3) Rows */}
        <RowsSection headers={headers} rows={rows} setRows={setRows} />

        {/* 4) Multi-select to pick which columns get filter dropdowns */}
        <Title level={4}>Filterable Columns</Title>
        <Select
          mode="multiple"
          style={{ width: "100%", marginBottom: 16 }}
          placeholder="Select columns to enable text filtering"
          value={filterColumns}
          onChange={setFilterColumns}
        >
          {headers.map((h, idx) => (
            <Option key={`filtercol-${idx}`} value={h}>
              {h}
            </Option>
          ))}
        </Select>

        {/* 5) Preview */}
        <Title level={4}>Preview</Title>
        <PreviewTable
          headers={headers}
          rows={rows}
          visibleColumns={visibleColumns}
          filterColumns={filterColumns}
        />
      </Form>
    </Drawer>
  );
};

export default TableSelectionDrawer;
