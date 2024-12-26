// components/PageBuilder/Modals/TableSelectionModal/TableSelectionDrawer.jsx

import React, { useState, useEffect } from "react";
import { Drawer, Form, Button, Typography, message, Select } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import HeadersSection from "./HeadersSection";
import RowsSection from "./RowsSection";
import StylingSection from "./StylingSection";
import CSVImportSection from "./CSVImportSection";

const { Title } = Typography;
const { Option } = Select;

const TableSelectionDrawer = ({
  isVisible,
  onClose,
  onSelectTable,
  initialTable,
}) => {
  const [form] = Form.useForm();

  // 1) Keep existing state shape
  const [headers, setHeaders] = useState(
    initialTable?.headers || ["Column 1 Heading"]
  );
  const [rows, setRows] = useState(
    initialTable?.rows || [Array(initialTable?.headers?.length || 1).fill("")]
  );
  const [styles, setStyles] = useState(
    initialTable?.styles || {
      borderStyle: "none",
      cellColor: "#ffffff",
      textAlign: "left",
    }
  );

  // 2) New: user-selected filter columns
  //    If you want to pass them back after re-opening the drawer,
  //    you can store them in initialTable?.filterColumns as well.
  const [filterColumns, setFilterColumns] = useState(
    initialTable?.filterColumns || []
  );

  useEffect(() => {
    if (isVisible) {
      setHeaders(initialTable?.headers || ["Column 1 Heading"]);
      setRows(
        initialTable?.rows || [
          Array(initialTable?.headers?.length || 1).fill(""),
        ]
      );
      setStyles(
        initialTable?.styles || {
          borderStyle: "none",
          cellColor: "#ffffff",
          textAlign: "left",
        }
      );
      setFilterColumns(initialTable?.filterColumns || []);
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, initialTable]);

  // Keep row length in sync with headers
  useEffect(() => {
    setRows((prevRows) => {
      return prevRows.map((row) => {
        const newRow = [...row];
        if (newRow.length > headers.length) {
          return newRow.slice(0, headers.length);
        } else if (newRow.length < headers.length) {
          return [...newRow, ...Array(headers.length - newRow.length).fill("")];
        }
        return newRow;
      });
    });
  }, [headers]);

  // Set form fields (still storing headers/rows to show them in the form—your original approach)
  useEffect(() => {
    form.setFieldsValue({
      headers,
      rows,
      borderStyle: styles.borderStyle,
      cellColor: styles.cellColor,
      textAlign: styles.textAlign,
      // We don't store filterColumns in the form, but you could if you want
    });
  }, [headers, rows, styles, form]);

  // ----------------
  // Save & Cancel
  // ----------------
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

        // 3) Include filterColumns in the final payload
        onSelectTable({ headers, rows, styles, filterColumns });
        message.success("Table saved successfully.");
        onClose();
      })
      .catch(() => {
        message.error("Please fix the errors in the form.");
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setHeaders(initialTable?.headers || ["Column 1 Heading"]);
    setRows(
      initialTable?.rows || [Array(initialTable?.headers?.length || 1).fill("")]
    );
    setStyles(
      initialTable?.styles || {
        borderStyle: "none",
        cellColor: "#ffffff",
        textAlign: "left",
      }
    );
    setFilterColumns(initialTable?.filterColumns || []);
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
        <div className="flex justify-end">
          <Button
            onClick={handleCancel}
            className="mavecancelbutton"
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} type="primary" className="mavebutton">
            Save Table
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        {/* Existing sections */}
        <HeadersSection headers={headers} setHeaders={setHeaders} />
        <CSVImportSection setHeaders={setHeaders} setRows={setRows} />
        <RowsSection headers={headers} rows={rows} setRows={setRows} />
        <StylingSection styles={styles} setStyles={setStyles} />

        {/* New: multiple column selection for filter */}
        <Title level={4} style={{ marginTop: 24 }}>
          Choose Columns to Filter
        </Title>
        <Select
          mode="multiple"
          style={{ width: "100%", marginBottom: 16 }}
          placeholder="Select which columns to filter"
          value={filterColumns}
          onChange={setFilterColumns}
        >
          {headers.map((colHeader, idx) => (
            <Option key={`${colHeader}-${idx}`} value={colHeader}>
              {colHeader}
            </Option>
          ))}
        </Select>
      </Form>
    </Drawer>
  );
};

export default TableSelectionDrawer;
