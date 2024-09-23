import React from "react";
import { Layout, Breadcrumb, Button } from "antd";
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";

const { Content } = Layout;

const PageListLayout = ({ children, onCreateNewPage }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "20px", background: "#fff" }}>
        {/* Breadcrumb Navigation */}
        <Breadcrumb style={{ marginBottom: "16px" }}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Creator Studio</Breadcrumb.Item>
          <Breadcrumb.Item>Pages</Breadcrumb.Item>
        </Breadcrumb>

        {/* Create New Page Button */}
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={onCreateNewPage}
          style={{ marginBottom: "16px" }}
        >
          Create New Page
        </Button>

        {/* Children - Page List Content */}
        <div>{children}</div>
      </Content>
    </Layout>
  );
};

export default PageListLayout;
