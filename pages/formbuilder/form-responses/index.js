// pages/form-responses/index.jsx

import React, { useEffect, useState } from "react";
import { Spin, Alert, Button, Space, Tooltip } from "antd";
import { TableOutlined, AppstoreOutlined } from "@ant-design/icons";
import FormResponsesTable from "../../../components/FormResponses/FormResponsesTable";
import FormResponsesGrid from "../../../components/FormResponses/FormResponsesGrid";
import instance from "../../../axios";

const FormResponsesIndexPage = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'table' or 'grid'

  // Function to fetch all form responses
  const fetchResponses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await instance.get(`/form-submission`);
      if (response.status === 200) {
        // Ensure that form_data is an object; if not, handle accordingly
        const sanitizedData = response.data.map((item) => ({
          ...item,
          form_data:
            item.form_data && typeof item.form_data === "object"
              ? item.form_data
              : {},
        }));
        setResponses(sanitizedData);
      } else {
        setError("Failed to fetch form responses.");
      }
    } catch (err) {
      console.error("Error fetching form responses:", err);
      setError("An error occurred while fetching form responses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  // Toggle view mode between 'table' and 'grid'
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "table" ? "grid" : "table"));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="mavecontainer p-8">
      <h1 className="text-3xl font-bold mb-6 text-theme">All Form Responses</h1>

      <Space className="mb-4">
        <Tooltip title="Toggle View">
          <Button
            onClick={toggleViewMode}
            icon={
              viewMode === "table" ? <AppstoreOutlined /> : <TableOutlined />
            }
          >
            {viewMode === "table" ? "Grid View" : "List View"}
          </Button>
        </Tooltip>
        <Button className="mavebutton" onClick={fetchResponses}>
          Refresh
        </Button>
      </Space>

      {viewMode === "table" ? (
        <FormResponsesTable
          responses={responses}
          refreshData={fetchResponses}
        />
      ) : (
        <FormResponsesGrid responses={responses} refreshData={fetchResponses} />
      )}
    </div>
  );
};

export default FormResponsesIndexPage;
