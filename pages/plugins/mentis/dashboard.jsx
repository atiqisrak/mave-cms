// pages/mentis/dashboard.jsx

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message, Space } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import instance from "../../../axios";
import Link from "next/link";
import UploadMediaModal from "../../../components/plugins/mentis/UploadMediaModal.jsx";

const DashboardPage = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/media");
      if (response.status === 200) {
        setMediaList(response.data);
      } else {
        message.error("Failed to fetch media.");
      }
    } catch (error) {
      console.error("Fetch Media Error:", error);
      message.error("An error occurred while fetching media.");
    }
    setLoading(false);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this media?",
      onOk: async () => {
        try {
          const response = await instance.delete(`/media/${id}`);
          if (response.status === 200) {
            message.success("Media deleted successfully!");
            fetchMedia();
          } else {
            message.error("Failed to delete media.");
          }
        } catch (error) {
          console.error("Delete Media Error:", error);
          message.error("An error occurred while deleting media.");
        }
      },
    });
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "file_path",
      key: "thumbnail",
      render: (text, record) =>
        record.file_type.startsWith("image/") ? (
          <img
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${record.file_path}`}
            alt={record.title}
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          <video
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${record.file_path}`}
            className="w-16 h-16 object-cover rounded"
            muted
          />
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "file_type",
      key: "type",
      render: (text) => (text.startsWith("image/") ? "Image" : "Video"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/mentis/edit/${record.id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Button
            icon={<EyeOutlined />}
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_MEDIA_URL}/${record.file_path}`,
                "_blank"
              )
            }
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Media Dashboard</h2>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => setIsUploadModalVisible(true)}
        >
          Upload New Media
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={mediaList}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        className="bg-white rounded shadow"
      />

      {/* Upload Media Modal */}
      <UploadMediaModal
        visible={isUploadModalVisible}
        onCancel={() => setIsUploadModalVisible(false)}
        onSuccess={() => {
          setIsUploadModalVisible(false);
          fetchMedia();
        }}
      />
    </div>
  );
};

export default DashboardPage;
