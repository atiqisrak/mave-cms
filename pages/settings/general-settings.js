import React from "react";
import { Layout, Breadcrumb, Button } from "antd";
import GeneralSetting from "../../components/settings/GeneralSetting";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Content } = Layout;
const menuItems = [
  {
    key: "1",
    label: <Link href="/settings/content-management">Content Management</Link>,
  },
  {
    key: "2",
    label: <Link href="/settings/user-management">User Management</Link>,
  },
  { key: "3", label: <Link href="/settings/seo-settings">SEO Settings</Link> },
];

const GeneralSettingsPage = () => {
  return (
    <div className="mavecontainer">
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
          <Breadcrumb.Item>General Settings</Breadcrumb.Item>
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
            General Settings
          </h1>
          <GeneralSetting />
        </Content>
      </Layout>
    </div>
  );
};

export default GeneralSettingsPage;
