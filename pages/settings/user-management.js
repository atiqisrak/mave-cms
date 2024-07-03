import React from "react";
import { Layout, Breadcrumb } from "antd";
import UserManagement from "../../components/settings/UserManagement";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Content } = Layout;
const menuItems = [
  {
    key: "1",
    label: <Link href="/settings/general-settings">General Settings</Link>,
  },
  {
    key: "2",
    label: <Link href="/settings/content-management">Content Management</Link>,
  },
  { key: "3", label: <Link href="/settings/seo-settings">SEO Settings</Link> },
];

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
          separator=">"
          items={[
            {
              title: <HomeOutlined style={{ fontSize: "1.2rem" }} />,
              href: "/",
            },
            { title: "Settings", href: "/settings" },
            {
              title: "User Management",
              menu: {
                items: menuItems,
              },
            },
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
          <UserManagement />
        </Content>
      </Layout>
    </div>
  );
};

export default UserManagementPage;
