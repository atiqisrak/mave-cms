// TableSelectionModal/RowsSection.jsx

import React from "react";
import { Form, Input, Button, Typography, Popconfirm } from "antd";
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
      <Title level={4} className="mt-10">
        Rows
      </Title>

      <div className="my-4 border-2 border-gray-300 rounded-md p-4">
        {rows?.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row items-center">
            {headers.map((colObj, colIndex) => (
              <Form.Item
                key={`${rowIndex}_${colIndex}`}
                className="mb-0 border-2 border-gray-300"
              >
                <Input
                  placeholder={`Row ${rowIndex + 1} / ${colObj.name}`}
                  value={row[colIndex]}
                  onChange={(e) =>
                    updateCell(e.target.value, rowIndex, colIndex)
                  }
                  className="w-full border-gray-50"
                />
              </Form.Item>
            ))}
            {rows.length > 1 && (
              <Popconfirm
                title="Are you sure you want to delete this row?"
                onConfirm={() => removeRow(rowIndex)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={<MinusOutlined />}
                  type="text"
                  // className="mavecancelbutton"
                />
              </Popconfirm>
            )}
          </div>
        ))}
      </div>

      <center>
        <Button
          className="mavebutton"
          onClick={addRow}
          icon={<PlusOutlined />}
          style={{ marginBottom: 16 }}
        >
          Add Row
        </Button>
      </center>
    </>
  );
};

export default RowsSection;
