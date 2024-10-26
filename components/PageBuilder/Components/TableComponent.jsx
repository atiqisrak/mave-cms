// components/PageBuilder/Components/TableComponent.jsx

import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, message, Input, Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import TableSelectionModal from "../Modals/TableSelectionModal";
import { Table } from "antd";

const { Paragraph } = Typography;
const { Option } = Select;

const TableComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState(component._mave);
  const [isEditing, setIsEditing] = useState(false);
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setTableData(component._mave);
    if (component._mave) {
      const cols = component._mave.headers.map((header, index) => ({
        title: header,
        dataIndex: `col${index}`,
        key: `col${index}`,
        editable: true,
      }));
      setColumns(cols);
      const rows = component._mave.rows.map((row, rowIndex) => {
        const rowData = { key: rowIndex };
        row.forEach((cell, colIndex) => {
          rowData[`col${colIndex}`] = cell;
        });
        return rowData;
      });
      setDataSource(rows);
    }
  }, [component._mave]);

  const handleSelectTable = (selectedTable) => {
    updateComponent({
      ...component,
      _mave: selectedTable,
      id: selectedTable.id,
    });
    setTableData(selectedTable);
    setIsEditing(false);
    message.success("Table updated successfully.");
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this component?",
      onOk: deleteComponent,
      okText: "Yes",
      cancelText: "No",
    });
  };

  const handleAddRow = () => {
    const newRow = {};
    columns.forEach((col) => {
      newRow[col.key] = "";
    });
    newRow.key = dataSource.length;
    setDataSource([...dataSource, newRow]);
    const updatedTable = { ...tableData, rows: [...tableData.rows, []] };
    setTableData(updatedTable);
    updateComponent({ ...component, _mave: updatedTable });
  };

  const handleRemoveRow = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    const updatedRows = tableData.rows.filter((_, index) => index !== key);
    const updatedTable = { ...tableData, rows: updatedRows };
    setTableData(updatedTable);
    updateComponent({ ...component, _mave: updatedTable });
  };

  const handleAddColumn = () => {
    const newColKey = `col${columns.length}`;
    const newCol = {
      title: `Header ${columns.length + 1}`,
      dataIndex: newColKey,
      key: newColKey,
      editable: true,
    };
    setColumns([...columns, newCol]);
    const updatedHeaders = [
      ...tableData.headers,
      `Header ${columns.length + 1}`,
    ];
    const updatedRows = tableData.rows.map((row) => [...row, ""]);
    const updatedTable = { headers: updatedHeaders, rows: updatedRows };
    setTableData(updatedTable);
    updateComponent({ ...component, _mave: updatedTable });
    const newDataSource = dataSource.map((row) => ({
      ...row,
      [newColKey]: "",
    }));
    setDataSource(newDataSource);
  };

  const handleRemoveColumn = (colKey, index) => {
    const newColumns = columns.filter((col) => col.key !== colKey);
    setColumns(newColumns);
    const updatedHeaders = tableData.headers.filter((_, i) => i !== index);
    const updatedRows = tableData.rows.map((row) =>
      row.filter((_, i) => i !== index)
    );
    const updatedTable = { headers: updatedHeaders, rows: updatedRows };
    setTableData(updatedTable);
    updateComponent({ ...component, _mave: updatedTable });
    const newDataSource = dataSource.map((row) => {
      const { [colKey]: removed, ...rest } = row;
      return rest;
    });
    setDataSource(newDataSource);
  };

  const handleCellChange = (value, record, column) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => record.key === item.key);
    const item = newData[index];
    item[column.key] = value;
    newData.splice(index, 1, { ...item });
    setDataSource(newData);

    // Update tableData.rows
    const rowIndex = index;
    const colIndex = columns.findIndex((col) => col.key === column.key);
    const updatedRows = [...tableData.rows];
    updatedRows[rowIndex][colIndex] = value;
    const updatedTable = { ...tableData, rows: updatedRows };
    setTableData(updatedTable);
    updateComponent({ ...component, _mave: updatedTable });
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Input
            value={record[dataIndex]}
            onChange={(e) =>
              handleCellChange(e.target.value, record, restProps.column)
            }
          />
        ) : (
          children
        )}
      </td>
    );
  };

  const mergedColumns = columns.map((col) => ({
    ...col,
    onCell: (record) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
    }),
  }));

  return (
    <div className="border p-4 rounded-md bg-gray-50">
      {/* Header with Component Title and Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Table Component</h3>
        <div>
          {!isEditing ? (
            <>
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsModalVisible(true)}
                className="mr-2"
              />
              <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
            </>
          ) : (
            <>
              <Button
                icon={<PlusOutlined />}
                onClick={handleAddRow}
                className="mr-2"
              >
                Add Row
              </Button>
              <Button
                icon={<PlusOutlined />}
                onClick={handleAddColumn}
                className="mr-2"
              >
                Add Column
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Table Display */}
      {tableData ? (
        <div className="overflow-x-auto">
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={dataSource}
            columns={mergedColumns}
            pagination={false}
            rowClassName={() => "editable-row"}
          />
        </div>
      ) : (
        <Paragraph>No table data available.</Paragraph>
      )}

      {/* Add/Remove Column Buttons */}
      {isEditing && (
        <div className="mt-2 flex space-x-2">
          {columns.map((col, index) => (
            <Button
              key={col.key}
              icon={<MinusOutlined />}
              onClick={() => handleRemoveColumn(col.key, index)}
              danger
            >
              Remove Column
            </Button>
          ))}
        </div>
      )}

      {/* Table Selection Modal */}
      <TableSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectTable={handleSelectTable}
        initialTable={tableData}
      />
    </div>
  );
};

export default TableComponent;
