// components/PageBuilder/Components/FooterComponent.jsx

import React, { useState } from "react";
import { Button, Modal, Typography, List, Image, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
} from "@ant-design/icons";
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
    deleteComponent();
  };

  console.log("Footer Component", footerData);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">Footer Component</h3>
        <div>
          <>
            {footerData && (
              <Button
                icon={<ExportOutlined />}
                onClick={() => setIsModalVisible(true)}
                className="mavebutton"
              >
                Change
              </Button>
            )}
            <Popconfirm
              title="Are you sure you want to delete this component?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} className="mavecancelbutton" />
            </Popconfirm>
          </>
        </div>
      </div>
      {footerData ? (
        <div className="p-4 border rounded-md">
          <Paragraph strong>{footerData.page_name_en}</Paragraph>
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
        // <Paragraph>No footer selected.</Paragraph>
        <Button
          icon={<EditOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="mavebutton w-fit"
        >
          Select Footer
        </Button>
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
