// components/PageBuilder/Modals/IconListSelectionModal/IconListSelectionModal.jsx

import React, { useState } from "react";
import { Tabs, Input, List, Button, Drawer } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import mostusedicons from "./mostusedicons.json";
import fontawesomeIcons from "./icons.json";

const { TabPane } = Tabs;

const IconListSelectionModal = ({ isVisible, onClose, onSelectIcon }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredReactIcons = fontawesomeIcons
    .filter((icon) => icon.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((icon) => ({ className: icon }));

  const filteredMostUsedIcons = mostusedicons
    .filter((icon) => icon.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((icon) => ({ className: icon }));

  return (
    <Drawer
      title="Select Icon"
      placement="right"
      closable={true}
      onClose={onClose}
      open={isVisible}
      width={`60vw`}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Prebuilt Icons" key="1">
          <List
            grid={{ gutter: 16, column: 6 }}
            dataSource={filteredMostUsedIcons}
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
            allowClear
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
    </Drawer>
  );
};

export default IconListSelectionModal;
