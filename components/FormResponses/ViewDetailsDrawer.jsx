// components/FormResponses/ViewDetailsDrawer.jsx

import React from "react";
import { Drawer, Table, Empty } from "antd";

const ViewDetailsDrawer = ({ visible, onClose, data }) => {
  // Safely handle cases where data is not an object
  const isValidData = data && typeof data === "object" && !Array.isArray(data);

  // Convert the form_data object into an array of key-value pairs for the table
  const dataSource = isValidData
    ? Object.entries(data).map(([key, value], index) => ({
        key: index,
        field: key,
        value: Array.isArray(value)
          ? value.join(", ")
          : typeof value === "object"
          ? JSON.stringify(value)
          : value,
      }))
    : [];

  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
      width: "30%",
      //   render: (text) => <strong>{text}</strong>,
      render: (text) => (
        <strong>
          {text
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </strong>
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <Drawer
      title="Form Response Details"
      placement="right"
      onClose={onClose}
      open={visible}
      width={"50%"}
    >
      {isValidData && dataSource.length > 0 ? (
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey="key"
        />
      ) : (
        <Empty description="No Details Available" />
      )}
    </Drawer>
  );
};

export default ViewDetailsDrawer;
