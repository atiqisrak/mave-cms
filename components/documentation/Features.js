import React from "react";
import { Typography, Row, Col, Card } from "antd";

const { Title, Paragraph } = Typography;

const features = [
  {
    title: "API First",
    description:
      "MAVE is built with an API-first approach, ensuring seamless integration.",
    color: "#e6f7ff",
  },
  {
    title: "MACH Architecture",
    description:
      "Microservices-based, API-first, Cloud-native SaaS, and Headless.",
    color: "#fff1e6",
  },
  {
    title: "Visual Page Builder",
    description:
      "A powerful tool to build pages visually, including API Builder.",
    color: "#e6ffe6",
  },
  {
    title: "Builder Components",
    description: "Gallery, Menu, Submenu, Rich Text Editor, AI Blog generator.",
    color: "#f9e6ff",
  },
  {
    title: "Order Tracking",
    description: "Efficiently track orders.",
    color: "#e6f7ff",
  },
  {
    title: "Dynamic Forms",
    description: "Create and manage dynamic forms.",
    color: "#fff1e6",
  },
  {
    title: "User Management",
    description: "Comprehensive user management with roles and permissions.",
    color: "#e6ffe6",
  },
  {
    title: "Scalable",
    description: "Built to scale with your needs.",
    color: "#f9e6ff",
  },
  {
    title: "Google Analytics",
    description: "Integration with Google Analytics for insightful data.",
    color: "#e6f7ff",
  },
];

const Features = () => (
  <div style={{ padding: "24px" }}>
    <Title level={2}>Features</Title>
    <Paragraph>Explore the core features of MAVE CMS:</Paragraph>
    <Row gutter={[16, 16]}>
      {features.map((feature, index) => (
        <Col xs={24} sm={12} md={8} key={index}>
          <Card
            title={feature.title}
            bordered={false}
            hoverable
            style={{ backgroundColor: feature.color, height: "20vh" }}
          >
            {feature.description}
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default Features;
