// components/PageBuilder/Modals/FooterSelectionModal.jsx

import React, { useState, useEffect } from "react";
import { Modal, List, Button, Image, Typography, message } from "antd";
import instance from "../../../axios";

const { Paragraph } = Typography;

const FooterSelectionModal = ({ isVisible, onClose, onSelectFooter }) => {
  const [footerList, setFooterList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const fetchFooters = async () => {
        setLoading(true);
        try {
          const response = await instance.get("/footers"); // Replace with your actual API endpoint
          setFooterList(response.data);
        } catch (error) {
          message.error("Failed to fetch footers");
        }
        setLoading(false);
      };
      fetchFooters();
    }
  }, [isVisible]);

  return (
    <Modal
      title="Select Footer"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <List
        loading={loading}
        grid={{ gutter: 16, column: 3 }}
        dataSource={footerList}
        renderItem={(item) => (
          <List.Item>
            <Button
              type="link"
              onClick={() => onSelectFooter(item)}
              block
              className="text-left"
            >
              {item.logo && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${item.logo.file_path}`}
                  alt="Footer Logo"
                  width={100}
                  preview={false}
                />
              )}
              <Paragraph ellipsis={{ rows: 2 }}>{item.text}</Paragraph>
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default FooterSelectionModal;
