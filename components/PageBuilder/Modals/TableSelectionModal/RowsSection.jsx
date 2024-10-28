// components/PageBuilder/Modals/TableSelectionModal/RowsSection.jsx

import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const RowsSection = ({ headers, rows, setRows }) => {
  const addRow = () => {
    const newRow = Array(headers.length).fill("");
    setRows([...rows, newRow]);
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const updateCell = (value, rowIndex, colIndex) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = value;
    setRows(newRows);
  };

  return (
    <>
      <Title level={4}>Rows</Title>
      <Button
        type="dashed"
        onClick={addRow}
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
      >
        Add Row
      </Button>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="mb-4 flex items-center">
          {headers.map((_, colIndex) => (
            <Form.Item
              key={`${rowIndex}_${colIndex}`}
              name={`row_${rowIndex}_col_${colIndex}`}
              initialValue={row[colIndex]}
              rules={[{ required: false }]}
              style={{
                display: "inline-block",
                width: `calc(100% / ${headers.length})`,
                marginRight: 8,
              }}
            >
              <Input
                placeholder={`Row ${rowIndex + 1} Column ${colIndex + 1}`}
                onChange={(e) => updateCell(e.target.value, rowIndex, colIndex)}
              />
            </Form.Item>
          ))}
          {rows.length > 1 && (
            <Button
              icon={<MinusOutlined />}
              onClick={() => removeRow(rowIndex)}
              danger
              type="text"
              style={{ marginTop: 8 }}
            />
          )}
        </div>
      ))}
      <Button
        type="dashed"
        onClick={addRow}
        block
        icon={<PlusOutlined />}
        className="mb-4"
      >
        Add Row
      </Button>
    </>
  );
};

export default RowsSection;
