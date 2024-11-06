// components/Plugins/MaveEvents/EventList/EventList.jsx

import React, { useContext } from "react";
import { MaveEventsContext } from "../../../../src/context/Plugins/MaveEventsContext";
import { Table, Tag, Space, Spin, Button } from "antd";
import Link from "next/link";
import dayjs from "dayjs";

const EventList = () => {
  const { events, loading, deleteEvent } = useContext(MaveEventsContext);

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link href={`/plugins/mave-events/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => dayjs(text).format("MMMM D, YYYY h:mm A"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => dayjs(text).format("MMMM D, YYYY h:mm A"),
    },
    {
      title: "Type",
      dataIndex: "isOnline",
      key: "isOnline",
      render: (isOnline) =>
        isOnline ? (
          <Tag color="blue">Online</Tag>
        ) : (
          <Tag color="green">On-Site</Tag>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Scheduled"
              ? "green"
              : status === "Postponed"
              ? "orange"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/plugins/mave-events/edit/${record.id}`}>
            <Button type="link">Edit</Button>
          </Link>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Spin />;
  }

  return <Table columns={columns} dataSource={events} rowKey="id" />;
};

export default EventList;
