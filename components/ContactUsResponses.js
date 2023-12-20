import { Col, Modal, Row, Tabs, message, Button, Select, Input } from "antd";
import React, { useState, useEffect } from "react";
import instance from "../axios";
import moment from "moment";
import {
  CheckOutlined,
  CiCircleFilled,
  ClockCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const ContactUsResponses = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/formdata?form_id=3");
      if (response.status === 200) {
        setMessages(response.data);
        setLoading(false);
        console.log("Messages: ", response.data);
      } else {
        console.log("Error: ", response);
        message.error("Error fetching data");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      message.error("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMessageUpdate = async (messageid) => {
    try {
      setLoading(true);
      const response = await instance.put(
        "/formdata/" + messageid,
        selectedMessage
      );
      if (response.status === 200) {
        message.success("Message updated successfully");
        setModalVisible(false);
        fetchMessages();
        setLoading(false);
      } else {
        console.log("Error: ", response);
        message.error("Error updating message");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      message.error("Error updating message");
      setLoading(false);
    }
  };

  const handleStatusChange = async (value) => {
    try {
      setLoading(true);
      const response = await instance.put("/formdata/" + selectedMessage?.id, {
        status: value,
      });
      if (response.status === 200) {
        message.success("Status updated successfully");
        fetchMessages();
        setEditMode(false);
        setLoading(false);
      } else {
        console.log("Error: ", response);
        message.error("Error updating status");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      message.error("Error updating status");
      setLoading(false);
    }
  };

  // Function to convert data to CSV format
  const convertToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Email,Phone,Message,Date,Status\n" +
      messages
        .map(
          (message) =>
            `${message?.contact_person_mave?.full_name},${
              message?.contact_person_mave?.email
            },${message?.contact_person_mave?.phone},"${
              message?.message
            }",${moment(message.created_at).format("DD-MM-YYYY")},${
              message.status == 1 ? "Read" : "Unread"
            }`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contact_us_responses.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="">
      <h1>Contact Us</h1>
      <div
        style={{
          paddingTop: "3em",
        }}
      >
        <div className="TableContainer">
          <div className="TableHeaderActions">
            <Button type="primary" icon={<FilterOutlined />}>
              Filter
            </Button>
            <div>
              <Button type="primary" onClick={convertToCSV}>
                Export to CSV
              </Button>
            </div>
          </div>
          <div className="TableBody">
            <Row
              gutter={[16, 16]}
              style={{
                padding: "1em 0",
              }}
            >
              <Col span={5}>
                <h2>Name</h2>
              </Col>
              <Col span={5}>
                <h2>Email</h2>
              </Col>
              <Col span={4}>
                <h2>Phone</h2>
              </Col>
              <Col span={2}>
                <h2>Message</h2>
              </Col>
              <Col span={2}>
                <h2>Date</h2>
              </Col>
              <Col span={6}>
                <h2>Satus</h2>
              </Col>
            </Row>
            {messages?.map((message, index) => {
              return (
                <Row
                  gutter={[16, 16]}
                  key={index}
                  style={{
                    padding: "1em 0",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <Col span={5}>
                    <p
                      style={{
                        wordWrap: "break-word",
                      }}
                    >
                      {message?.contact_person_mave?.full_name}
                    </p>
                  </Col>
                  <Col span={5}>
                    <p
                      style={{
                        wordWrap: "break-word",
                      }}
                    >
                      {message?.contact_person_mave?.email}
                    </p>
                  </Col>
                  <Col span={4}>
                    <p>{message?.contact_person_mave?.phone}</p>
                  </Col>
                  <Col span={2}>
                    <EyeOutlined
                      onClick={() => {
                        setModalVisible(true);
                        setSelectedMessage(message);
                      }}
                    />
                  </Col>
                  <Col span={2}>
                    <p>{moment(message.created_at).format("DD-MM-YYYY")}</p>
                  </Col>
                  <Col span={6}>
                    {editMode ? (
                      <div
                        style={{
                          display: "flex",
                          gap: "1em",
                          alignItems: "center",
                        }}
                      >
                        <Select
                          defaultValue={message?.status}
                          style={{ width: 120 }}
                          onChange={handleStatusChange}
                        >
                          <Select.Option value="0">Unread</Select.Option>
                          <Select.Option value="1">Read</Select.Option>
                        </Select>
                        <Button
                          danger
                          onClick={() => {
                            setEditMode(false);
                          }}
                          style={{
                            marginLeft: "1em",
                          }}
                        >
                          <CloseCircleFilled /> Cancel
                        </Button>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          gap: "1em",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h3
                          style={{
                            color: message?.status == 1 ? "green" : "red",
                            backgroundColor:
                              message?.status == 1 ? "#e6ffe6" : "#ffe6e6",
                            padding: "0.5em 1em",
                            borderRadius: "1em",
                            width: "fit-content",
                          }}
                        >
                          {message?.status == 1 ? "Read" : "Unread"}
                        </h3>

                        <Button
                          type="primary"
                          onClick={() => {
                            setEditMode(true);
                            setSelectedMessage(message);
                          }}
                          style={{
                            marginRight: "1em",
                          }}
                        >
                          <CheckOutlined /> Change Status
                        </Button>
                      </div>
                    )}
                  </Col>
                </Row>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        title="Message Details"
        centered
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setModalVisible(false);
            }}
          >
            Ok
          </Button>,
        ]}
        width={1000}
      >
        <div className="flexed-center">
          <div
            style={{
              width: "50%",
              padding: "1em",
              border: "1px solid #ccc",
              borderRadius: "1em",
            }}
          >
            <h2>Name</h2>
            <p>{selectedMessage?.contact_person_mave?.full_name}</p>
            <br />
            <h2>Email</h2>
            <p>{selectedMessage?.contact_person_mave?.email}</p>
            <br />
            <h2>Phone</h2>
            <p>{selectedMessage?.contact_person_mave?.phone}</p>
            <br />
            <h2>Date</h2>
            <p>{moment(selectedMessage?.created_at).format("DD-MM-YYYY")}</p>
          </div>

          <div
            style={{
              width: "50%",
              height: "100%",
              padding: "1em",
              border: "1px solid #ccc",
              borderRadius: "1em",
            }}
          >
            <h2>Message</h2>
            <p>{selectedMessage?.message}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContactUsResponses;
