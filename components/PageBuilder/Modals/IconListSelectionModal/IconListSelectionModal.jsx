// components/PageBuilder/Modals/IconListSelectionModal/IconListSelectionModal.jsx

import React, { useState } from "react";
import { Modal, Tabs, Input, List, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import prebuiltIcons from "./prebuiltIcons";
// Removed react-icons import as we're using FontAwesome classes

const { TabPane } = Tabs;

const IconListSelectionModal = ({ isVisible, onClose, onSelectIcon }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Since we're using FontAwesome class names, no need to import from react-icons
  // Optionally, you can define a list of searchable class names manually
  const filteredReactIcons = [
    // Example list; ideally, have a comprehensive list or implement a better search
    { name: "magnifying-glass", className: "fa-solid fa-magnifying-glass" },
    { name: "user", className: "fa-solid fa-user" },
    { name: "cog", className: "fa-solid fa-cog" },
    // Add more as needed
  ].filter((icon) =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      title="Select Icon"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Prebuilt Icons" key="1">
          <List
            grid={{ gutter: 16, column: 6 }}
            dataSource={prebuiltIcons}
            renderItem={(icon) => (
              <List.Item>
                <Button
                  type="text"
                  onClick={() => onSelectIcon(icon.className)}
                  icon={
                    <i className={icon.className} style={{ fontSize: 24 }}></i>
                  }
                  style={{ width: "100%", height: "100%", padding: 16 }}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Search Icons" key="2">
          <Input
            placeholder="Search icons"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: 16 }}
          />
          <List
            grid={{ gutter: 16, column: 6 }}
            dataSource={filteredReactIcons}
            renderItem={(icon) => (
              <List.Item>
                <Button
                  type="text"
                  onClick={() => onSelectIcon(icon.className)}
                  icon={
                    <i className={icon.className} style={{ fontSize: 24 }}></i>
                  }
                  style={{ width: "100%", height: "100%", padding: 16 }}
                />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default IconListSelectionModal;
