// components/FormResponses/FormResponsesTable.jsx

import React, { useState } from "react";
import { Table, Button, Popconfirm, Space, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ViewDetailsDrawer from "./ViewDetailsDrawer";
import EditResponseDrawer from "./EditResponseDrawer";
import instance from "../../axios";

const FormResponsesTable = ({ responses, refreshData }) => {
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);

  // Handle Delete Action
  const handleDelete = async (id) => {
    try {
      const response = await instance.delete(`/form-submission/${id}`);
      if (response.status === 200) {
        message.success("Form response deleted successfully.");
        refreshData();
      } else {
        message.error("Failed to delete the form response.");
      }
    } catch (error) {
      console.error("Error deleting form response:", error);
      message.error("An error occurred while deleting the form response.");
    }
  };

  // Generate dynamic columns
  const generateColumns = () => {
    if (!responses || responses.length === 0) return [];

    // Extract all unique keys from form_data where form_data is a valid object
    const allKeys = new Set();
    responses.forEach((response) => {
      if (
        response.form_data &&
        typeof response.form_data === "object" &&
        !Array.isArray(response.form_data)
      ) {
        Object.keys(response.form_data).forEach((key) => allKeys.add(key));
      }
    });

    const keysArray = Array.from(allKeys);
    const displayKeys = keysArray.slice(0, 3); // Show first 3 keys

    const columns = displayKeys.map((key) => ({
      title: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      dataIndex: ["form_data", key],
      key: key,
      render: (text) =>
        Array.isArray(text)
          ? text.join(", ")
          : typeof text === "object"
          ? JSON.stringify(text)
          : text,
    }));

    // Action Column
    columns.push({
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const totalFields =
          record.form_data &&
          typeof record.form_data === "object" &&
          !Array.isArray(record.form_data)
            ? Object.keys(record.form_data).length
            : 0;
        return (
          <Space size="middle">
            {totalFields > 3 && (
              <Button
                icon={<EyeOutlined />}
                onClick={() => {
                  setSelectedResponse(record);
                  setViewDrawerVisible(true);
                }}
              />
            )}
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedResponse(record);
                setEditDrawerVisible(true);
              }}
            />
            <Popconfirm
              title="Are you sure you want to delete this response?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Space>
        );
      },
    });

    return columns;
  };

  return (
    <>
      <Table
        dataSource={responses}
        columns={generateColumns()}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
      />

      {/* View Details Drawer */}
      <ViewDetailsDrawer
        visible={viewDrawerVisible}
        onClose={() => setViewDrawerVisible(false)}
        data={selectedResponse?.form_data}
      />

      {/* Edit Response Drawer */}
      <EditResponseDrawer
        visible={editDrawerVisible}
        onClose={() => setEditDrawerVisible(false)}
        data={selectedResponse}
        onUpdate={refreshData}
      />
    </>
  );
};

export default FormResponsesTable;
