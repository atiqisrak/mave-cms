import React from "react";
import { Layout, Breadcrumb } from "antd";
import UserManagement from "../../components/settings/UserManagement";
import { HomeOutlined } from "@ant-design/icons";

const { Content } = Layout;

const UserManagementPage = () => {
  return (
    <div className="ViewContainer">
      <Layout
        style={{
          padding: "0 24px 24px",
          marginBottom: "2rem",
          backgroundColor: "transparent",
        }}
      >
        <Breadcrumb
          items={[
            {
              title: <HomeOutlined style={{ fontSize: "1.2rem" }} />,
              href: "/",
            },
            { title: "Settings", href: "/settings" },
            { title: "User Management" },
          ]}
          style={{ marginBottom: "2rem", fontSize: "1.2rem" }}
        />
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: "#fff",
          }}
        >
          <h1>User Management Settings</h1>
          <UserManagement />
        </Content>
      </Layout>
    </div>
  );
};

export default UserManagementPage;
