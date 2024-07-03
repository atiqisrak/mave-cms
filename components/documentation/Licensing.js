import React from "react";
import { Typography, List } from "antd";

const { Title, Paragraph } = Typography;

const licensingType = [
  "Custom License Approach",
  "Base License: MIT License - Permissive and widely used, allowing extensive usage of the software.",
];

const customClauses = [
  "Contact Information Requirement: Users must provide contact information when downloading or modifying the software.",
  "License Key for Modifications: Users must obtain a license key to modify the software, allowing tracking of usage and modifications.",
];

const Licensing = () => (
  <div style={{ padding: "24px" }}>
    <Title level={2}>Licensing</Title>
    <Paragraph>
      Our licensing terms are designed to be flexible and fair:
    </Paragraph>

    <Title level={3}>Licensing Type</Title>
    <List
      size="large"
      bordered
      dataSource={licensingType}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />

    <Title level={3} style={{ marginTop: "24px" }}>
      Custom Clauses
    </Title>
    <List
      size="large"
      bordered
      dataSource={customClauses}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  </div>
);

export default Licensing;
