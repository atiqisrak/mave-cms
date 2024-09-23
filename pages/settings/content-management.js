import React from "react";
import { Layout, Breadcrumb, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import ContentManagement from "../../components/settings/contentManagement";

const ContentManagementPage = () => {
  const { Content } = Layout;
  return (
    <div className="ViewContainer ViewContentContainer">
      <Layout
        style={{
          padding: "0 24px 24px",
          marginBottom: "2rem",
          backgroundColor: "transparent",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          <Breadcrumb.Item>
            <Button icon={<HomeOutlined />} type="link" href="/" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Settings</Breadcrumb.Item>
          <Breadcrumb.Item>Content Management</Breadcrumb.Item>
        </Breadcrumb>

        <Content
          style={{
            padding: "24px",
            margin: 0,
            minHeight: 280,
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Content Management Settings
          </h1>
          <ContentManagement />
        </Content>
      </Layout>
    </div>
  );
};

export default ContentManagementPage;
