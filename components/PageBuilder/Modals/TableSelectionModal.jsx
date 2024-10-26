// components/PageBuilder/Modals/TableSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Typography, message, Drawer } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import HeadersSection from "./TableSelectionModal/HeadersSection";
import RowsSection from "./TableSelectionModal/RowsSection";
import StylingSection from "./TableSelectionModal/StylingSection";
import CSVImportSection from "./TableSelectionModal/CSVImportSection";

const { Title } = Typography;

const TableSelectionModal = ({
  isVisible,
  onClose,
  onSelectTable,
  initialTable,
}) => {
  const [form] = Form.useForm();
  const [headers, setHeaders] = useState(initialTable?.headers || ["Header 1"]);
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
      setHeaders(initialTable?.headers || ["Header 1"]);
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
    setHeaders(initialTable?.headers || ["Header 1"]);
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
    // <Modal
    //   title="Configure Table"
    //   open={isVisible}
    //   onOk={handleSave}
    //   onCancel={handleCancel}
    //   width={`calc(100% - 20vw)`}
    //   footer={[
    //     <Button key="back" onClick={handleCancel}>
    //       Cancel
    //     </Button>,
    //     <Button key="submit" type="primary" onClick={handleSave}>
    //       Save Table
    //     </Button>,
    //   ]}
    // >
    //   <Form form={form} layout="vertical">
    //     <HeadersSection headers={headers} setHeaders={setHeaders} />
    //     <CSVImportSection setHeaders={setHeaders} setRows={setRows} />
    //     <RowsSection headers={headers} rows={rows} setRows={setRows} />
    //     <StylingSection styles={styles} setStyles={setStyles} />
    //   </Form>
    // </Modal>
    <Drawer
      title="Configure Table"
      placement="right"
      closable={false}
      onClose={handleCancel}
      open={isVisible}
      width={`calc(100% - 20vw)`}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            onClick={handleCancel}
            style={{ marginRight: 8 }}
            className="mavecancelbutton"
          >
            Cancel
          </Button>
          <Button className="mavebutton" onClick={handleSave}>
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

export default TableSelectionModal;
