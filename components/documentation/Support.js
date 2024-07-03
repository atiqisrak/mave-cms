import React from "react";
import { Typography, Row, Col, Card, List } from "antd";

const { Title, Paragraph } = Typography;

const supportChannels = [
  { title: "Email", description: "support@example.com" },
  { title: "Phone", description: "+123-456-7890" },
  { title: "Chat", description: "Available on our website" },
  { title: "Call", description: "Schedule a call through our support page" },
];

const additionalSupport = [
  "FAQ: Frequently Asked Questions available within the CMS.",
  "Community: Join our community on Reddit for discussions and support.",
];

const Support = () => (
  <div style={{ padding: "24px" }}>
    <Title level={2}>Support</Title>
    <Paragraph>
      We offer multiple support channels to assist you with any queries or
      issues you may encounter.
    </Paragraph>

    <Title level={3}>Support Channels</Title>
    <Row gutter={[16, 16]}>
      {supportChannels.map((channel, index) => (
        <Col xs={24} sm={12} md={12} lg={6} key={index}>
          <Card
            title={channel.title}
            bordered={false}
            hoverable
            style={{ height: "20vh" }}
          >
            <Paragraph>{channel.description}</Paragraph>
          </Card>
        </Col>
      ))}
    </Row>

    <Title level={3} style={{ marginTop: "24px" }}>
      Additional Support
    </Title>
    <List
      size="large"
      bordered
      dataSource={additionalSupport}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  </div>
);

export default Support;
