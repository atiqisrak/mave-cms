// components/PageBuilder/Modals/TableSelectionModal/TableSelectionDrawer.jsx

import React, { useState, useEffect } from "react";
import { Drawer, Form, Button, Typography, message } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import HeadersSection from "./HeadersSection";
import RowsSection from "./RowsSection";
import StylingSection from "./StylingSection";
import CSVImportSection from "./CSVImportSection";

const { Title } = Typography;

const TableSelectionDrawer = ({
  isVisible,
  onClose,
  onSelectTable,
  initialTable,
}) => {
  const [form] = Form.useForm();
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
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, initialTable]);

  useEffect(() => {
    // Ensure that each row has the same number of cells as headers
    setRows((prevRows) => {
      return prevRows.map((row) => {
        const newRow = [...row];
        if (newRow.length > headers.length) {
          // Remove extra cells
          return newRow.slice(0, headers.length);
        } else if (newRow.length < headers.length) {
          // Add empty cells
          return [...newRow, ...Array(headers.length - newRow.length).fill("")];
        }
        return newRow;
      });
    });
  }, [headers]);

  useEffect(() => {
    form.setFieldsValue({
      headers: headers,
      rows: rows,
      borderStyle: styles.borderStyle,
      cellColor: styles.cellColor,
      textAlign: styles.textAlign,
    });
  }, [headers, rows, styles, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then(() => {
        // Validate that all rows have the correct number of columns
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].length !== headers.length) {
            message.error(`Row ${i + 1} does not match the number of headers.`);
            return;
          }
        }

        onSelectTable({ headers, rows, styles });
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
    onClose();
  };

  return (
    <Drawer
      title="Configure Table"
      placement="right"
      closable
      onClose={handleCancel}
      open={isVisible}
      width={`70vw`}
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
        <HeadersSection headers={headers} setHeaders={setHeaders} />
        <CSVImportSection setHeaders={setHeaders} setRows={setRows} />
        <RowsSection headers={headers} rows={rows} setRows={setRows} />
        <StylingSection styles={styles} setStyles={setStyles} />
      </Form>
    </Drawer>
  );
};

export default TableSelectionDrawer;
