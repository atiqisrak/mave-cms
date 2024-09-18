import {
  Col,
  Modal,
  Row,
  Tabs,
  message,
  Button,
  Select,
  Input,
  Breadcrumb,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";
import { CopyOutlined, HomeFilled } from "@ant-design/icons";
import router from "next/router";
import instance from "../../axios";

const FormResponses = () => {
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/form_builder");
      if (response.status === 200) {
        setResponses(response.data);
        setLoading(false);
      } else {
        message.error("Error fetching data");
        setLoading(false);
      }
    } catch (error) {
      message.error("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  loading && responses.length === 0 && <Spin />;

  return (
    <div className="ViewContainer ViewContentContainer">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumb
          style={{
            fontSize: "1.2em",
            marginBottom: "1em",
          }}
          items={[
            {
              href: "/",
              title: <HomeFilled />,
            },
            {
              title: "Forms Responses",
            },
          ]}
        />
        <Button
          type="primary"
          style={{
            backgroundColor: "var(--theme)",
            borderColor: "var(--theme)",
            color: "white",
            borderRadius: "10px",
            fontSize: "1.2em",
          }}
          icon={<CopyOutlined />}
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/formdata`
            );
            message.success("API Endpoint Copied");
          }}
        >
          Copy API Endpoint
        </Button>
      </div>

      <div>
        <Tabs
          defaultActiveKey="1"
          style={{
            marginBottom: "1em",
          }}
          centered
          type="card"
          tabPosition="left"
        >
          {responses?.map((response) => (
            <Tabs.TabPane tab={response?.title} key={response?.id}>
              Niloy {response?.title}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FormResponses;
