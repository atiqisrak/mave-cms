// TableSelectionModal/RowsSection.jsx

import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const RowsSection = ({ headers, rows, setRows }) => {
  const addRow = () => {
    // create a new row with empty cells matching # of headers
    const newRow = Array(headers.length).fill("");
    setRows([...rows, newRow]);
  };

  const removeRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  const updateCell = (value, rowIndex, colIndex) => {
    const updated = [...rows];
    updated[rowIndex][colIndex] = value;
    setRows(updated);
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
        <div key={rowIndex} style={{ display: "flex", marginBottom: 8 }}>
          {headers.map((colObj, colIndex) => (
            <Form.Item
              key={`${rowIndex}_${colIndex}`}
              style={{ marginRight: 8 }}
            >
              <Input
                placeholder={`Row ${rowIndex + 1} / ${colObj.name}`}
                value={row[colIndex]}
                onChange={(e) => updateCell(e.target.value, rowIndex, colIndex)}
                style={{ width: 120 }}
              />
            </Form.Item>
          ))}
          {rows.length > 1 && (
            <Button
              icon={<MinusOutlined />}
              danger
              type="text"
              onClick={() => removeRow(rowIndex)}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default RowsSection;
