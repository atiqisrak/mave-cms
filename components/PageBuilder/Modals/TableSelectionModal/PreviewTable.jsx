// TableSelectionModal/PreviewTable.jsx

import React, { useMemo, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const PreviewTable = ({ headers, visibleColumns, rows, filterColumns }) => {
  // For the text filter in antd
  const [searchText, setSearchText] = useState("");
  const [searchedColIndex, setSearchedColIndex] = useState(null);

  const handleSearch = (selectedKeys, confirm, colIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColIndex(colIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    setSearchedColIndex(null);
  };

  // Build columns for antd <Table>
  const columns = useMemo(() => {
    return headers
      .map((colHeader, colIndex) => {
        // Hide if not visible
        if (!visibleColumns[colIndex]) return null;

        // Basic column object
        const colObj = {
          title: colHeader,
          dataIndex: String(colIndex), // We'll transform row arrays into objects
          key: `col-${colIndex}`,
        };

        // If this column is in filterColumns, add a filter dropdown
        if (filterColumns.includes(colHeader)) {
          colObj.filterDropdown = ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
          }) => (
            <div style={{ padding: 8 }}>
              <Input
                placeholder={`Search ${colHeader}`}
                value={selectedKeys[0]}
                onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() =>
                  handleSearch(selectedKeys, confirm, colIndex)
                }
                style={{ marginBottom: 8, display: "block" }}
              />
              <Space>
                <Button
                  type="primary"
                  onClick={() => handleSearch(selectedKeys, confirm, colIndex)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  Search
                </Button>
                <Button
                  onClick={() => {
                    handleReset(clearFilters);
                    confirm({ closeDropdown: true });
                  }}
                  size="small"
                  style={{ width: 90 }}
                >
                  Reset
                </Button>
              </Space>
            </div>
          );

          colObj.onFilter = (value, record) => {
            const cellVal = (record[String(colIndex)] || "").toLowerCase();
            return cellVal.includes(value.toLowerCase());
          };

          // Show current filtered value if this is the column being searched
          if (searchedColIndex === colIndex && searchText) {
            colObj.filteredValue = [searchText];
          } else {
            colObj.filteredValue = null;
          }
        }

        return colObj;
      })
      .filter(Boolean); // Remove null columns
  }, [headers, visibleColumns, filterColumns, searchedColIndex, searchText]);

  // Build the data for <Table>
  const dataSource = useMemo(() => {
    return rows.map((rowArray, rowIndex) => {
      const rowObj = { key: `row-${rowIndex}` };
      rowArray.forEach((cellVal, colIdx) => {
        rowObj[String(colIdx)] = cellVal;
      });
      return rowObj;
    });
  }, [rows]);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      // You can add pagination or sorting props here if you want
    />
  );
};

export default PreviewTable;
