import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Spin, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchPages, deletePage } from "./utils/api";
import PageForm from "./forms/PageForm";

const PageList = ({ onEditPage }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch all pages
  const loadPages = async () => {
    try {
      setLoading(true);
      const response = await fetchPages();
      setPages(response);
    } catch (error) {
      message.error("Error loading pages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  // Open modal for editing
  const handleEdit = (page) => {
    setSelectedPage(page);
    setModalVisible(true);
  };

  // Handle page deletion
  const handleDelete = async (pageId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this page?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await deletePage(pageId);
          message.success("Page deleted successfully");
          loadPages(); // Refresh the page list
        } catch (error) {
          message.error("Error deleting page");
        }
      },
    });
  };

  // Close modal and reset selected page
  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedPage(null);
  };

  // Define table columns
  const columns = [
    {
      title: "Page Name (EN)",
      dataIndex: "page_name_en",
      key: "page_name_en",
    },
    {
      title: "Page Name (BN)",
      dataIndex: "page_name_bn",
      key: "page_name_bn",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, page) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(page)}
            style={{ marginRight: "8px" }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(page._id)}
          />
        </span>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={pages}
          columns={columns}
          rowKey={(page) => page._id}
          pagination={{ pageSize: 5 }}
        />
      )}

      {/* Modal for editing page */}
      <Modal
        title="Edit Page"
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <PageForm page={selectedPage} onClose={handleModalClose} />
      </Modal>
    </div>
  );
};

export default PageList;
