import React from "react";
import { Typography, List } from "antd";

const { Title, Paragraph } = Typography;

const dataCollection = [
  "User Data: Collected for improving user experience.",
  "Operational Data: Used for system improvements and bug tracking.",
  "Report Logs: Maintained for auditing purposes.",
];

const dataUsage = [
  "Improvement: Used to enhance system performance and functionality.",
  "Bug Tracking: Helps in identifying and fixing issues.",
];

const userControl = [
  "Data Export: Users can request data export.",
  "Data Deletion: Users can request data deletion through admin.",
];

const compliance = [
  "GDPR: General Data Protection Regulation compliance.",
  "CCPA: California Consumer Privacy Act compliance.",
];

const Privacy = () => (
  <div style={{ padding: "24px" }}>
    <Title level={2}>Privacy</Title>
    <Paragraph>
      We take your privacy seriously. Here's how we handle your data:
    </Paragraph>

    <Title level={3}>Data Collection</Title>
    <List
      size="large"
      bordered
      dataSource={dataCollection}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />

    <Title level={3} style={{ marginTop: "24px" }}>
      Data Usage
    </Title>
    <List
      size="large"
      bordered
      dataSource={dataUsage}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />

    <Title level={3} style={{ marginTop: "24px" }}>
      User Control
    </Title>
    <List
      size="large"
      bordered
      dataSource={userControl}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />

    <Title level={3} style={{ marginTop: "24px" }}>
      Compliance
    </Title>
    <List
      size="large"
      bordered
      dataSource={compliance}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  </div>
);

export default Privacy;
