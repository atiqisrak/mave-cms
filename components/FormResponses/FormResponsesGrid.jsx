// components/FormResponses/FormResponsesGrid.jsx

import React, { useState } from "react";
import { Card, Button, Row, Col, Popconfirm, Space, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ViewDetailsDrawer from "./ViewDetailsDrawer";
import EditResponseDrawer from "./EditResponseDrawer";
import instance from "../../axios";

const FormResponsesGrid = ({ responses, refreshData }) => {
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

  return (
    <>
      <Row gutter={[16, 16]}>
        {responses.map((response) => (
          <Col xs={24} sm={12} md={8} lg={6} key={response.id}>
            <Card
              title={`Submission ID: ${response.id}`}
              bordered={false}
              hoverable
              actions={[
                <EyeOutlined
                  key="view"
                  onClick={() => {
                    setSelectedResponse(response);
                    setViewDrawerVisible(true);
                  }}
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    setSelectedResponse(response);
                    setEditDrawerVisible(true);
                  }}
                />,
                <Popconfirm
                  title="Are you sure you want to delete this response?"
                  onConfirm={() => handleDelete(response.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" style={{ color: "red" }} />
                </Popconfirm>,
              ]}
            >
              <p>
                <strong>Form ID:</strong> {response.form_id}
              </p>
              <p>
                <strong>Submitted At:</strong>{" "}
                {new Date(response.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                {response.form_data.email_address || "N/A"}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

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

export default FormResponsesGrid;
