import React from "react";
import { Table } from "antd";

const ActivityLog = ({ logs }) => {
  const columns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
  ];

  return <Table columns={columns} dataSource={logs} rowKey="id" />;
};

export default ActivityLog;
