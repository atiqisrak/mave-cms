// components/PageBuilder/Components/TableComponent.jsx

import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, message, Table as AntTable } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import TableSelectionModal from "../Modals/TableSelectionModal";

const { Paragraph } = Typography;

const TableComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableData, setTableData] = useState(component._mave);
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (tableData) {
      const cols = tableData.headers.map((header, index) => ({
        title: header,
        dataIndex: `col${index}`,
        key: `col${index}`,
      }));
      setColumns(cols);
      const rows = tableData.rows.map((row, rowIndex) => ({
        key: rowIndex,
        ...row.reduce((acc, cell, colIndex) => {
          acc[`col${colIndex}`] = cell;
          return acc;
        }, {}),
      }));
      setDataSource(rows);
    }
  }, [tableData]);

  const handleSelectTable = (selectedTable) => {
    updateComponent({
      ...component,
      _mave: selectedTable,
      id: selectedTable.id,
    });
    setTableData(selectedTable);
    setIsModalVisible(false);
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
    tableData.headers.forEach((_, index) => {
      newRow[`col${index}`] = "";
    });
    const newDataSource = [
      ...dataSource,
      { key: dataSource.length, ...newRow },
    ];
    setDataSource(newDataSource);

    const updatedRows = [
      ...tableData.rows,
      Array(tableData.headers.length).fill(""),
    ];
    const updatedTable = { ...tableData, rows: updatedRows };
    setTableData(updatedTable);
    updateComponent({ ...component, _mave: updatedTable });
  };

  const handleRemoveRow = (key) => {
    const newDataSource = dataSource.filter((item) => item.key !== key);
    setDataSource(newDataSource);

    const updatedRows = tableData.rows.filter((_, index) => index !== key);
    const updatedTable = { ...tableData, rows: updatedRows };
    setTableData(updatedTable);
    updateComponent({ ...component, _mave: updatedTable });
  };

  const handleAddColumn = () => {
    const newHeader = `Header ${tableData.headers.length + 1}`;
    const newColumns = [
      ...columns,
      {
        title: newHeader,
        dataIndex: `col${columns.length}`,
        key: `col${columns.length}`,
      },
    ];
    setColumns(newColumns);

    const updatedHeaders = [...tableData.headers, newHeader];
    const updatedRows = tableData.rows.map((row) => [...row, ""]);
    const updatedTable = { headers: updatedHeaders, rows: updatedRows };
    setTableData(updatedTable);
    updateComponent({ ...component, _mave: updatedTable });

    const newDataSource = dataSource.map((row, index) => ({
      ...row,
      [`col${columns.length}`]: "",
    }));
    setDataSource(newDataSource);
  };

  const handleRemoveColumn = (colIndex) => {
    const colKey = `col${colIndex}`;
    const newColumns = columns.filter((_, index) => index !== colIndex);
    setColumns(newColumns);

    const updatedHeaders = tableData.headers.filter(
      (_, index) => index !== colIndex
    );
    const updatedRows = tableData.rows.map((row) =>
      row.filter((_, index) => index !== colIndex)
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

  return (
    <div className="border p-4 rounded-md bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Table Component</h3>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mr-2"
          />
          <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
        </div>
      </div>

      {tableData ? (
        <div className="overflow-x-auto">
          <AntTable
            columns={columns.map((col, index) => ({
              ...col,
              title: (
                <div className="flex items-center">
                  {col.title}
                  {/* <Button
                    size="small"
                    type="text"
                    icon={<MinusOutlined />}
                    onClick={() => handleRemoveColumn(index)}
                    danger
                    style={{ marginLeft: 8 }}
                  /> */}
                </div>
              ),
            }))}
            dataSource={dataSource}
            pagination={false}
            bordered={tableData?.styles?.borderStyle !== "none"}
            style={{
              border:
                tableData?.styles?.borderStyle === "none"
                  ? "none"
                  : tableData?.styles?.borderStyle === "thin"
                  ? "1px solid #ddd"
                  : "2px solid #000",
              backgroundColor: tableData?.styles?.cellColor,
              textAlign: tableData?.styles?.textAlign,
            }}
          />
          {/* <div className="flex space-x-2 mt-4">
            <Button
              type="dashed"
              onClick={handleAddRow}
              icon={<PlusOutlined />}
            >
              Add Row
            </Button>
            <Button
              type="dashed"
              onClick={handleAddColumn}
              icon={<PlusOutlined />}
            >
              Add Column
            </Button>
          </div> */}
        </div>
      ) : (
        <Paragraph>No table data available.</Paragraph>
      )}

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
