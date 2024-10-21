// components/PageBuilder/Components/FooterComponent.jsx

import React, { useState } from "react";
import { Button, Modal, Typography, List, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import FooterSelectionModal from "../Modals/FooterSelectionModal";

const { Paragraph } = Typography;

const FooterComponent = ({ component, updateComponent, deleteComponent }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [footerData, setFooterData] = useState(component._mave);

  const handleSelectFooter = (selectedFooter) => {
    updateComponent({
      ...component,
      _mave: selectedFooter,
      id: selectedFooter.id,
    });
    setFooterData(selectedFooter);
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this component?",
      onOk: deleteComponent,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">Footer Component</h3>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mr-2"
          />
          <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
        </div>
      </div>
      {footerData ? (
        <div className="p-4 border rounded-md">
          <Paragraph strong>{footerData.text}</Paragraph>
          {footerData.logo && (
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${footerData.logo.file_path}`}
              alt="Footer Logo"
              width={100}
              preview={false}
            />
          )}
          {/* You can display more footer details if available */}
        </div>
      ) : (
        <Paragraph>No footer selected.</Paragraph>
      )}
      <FooterSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectFooter={handleSelectFooter}
      />
    </div>
  );
};

export default FooterComponent;
