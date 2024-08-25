import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Tabs } from "antd";
import Link from "next/link";
import router from "next/router";
import GeneralSetting from "../../components/settings/GeneralSetting";
import ContentManagement from "../../components/settings/contentManagement";
import UserManagement from "../../components/settings/UserManagement";

export default function Settings() {
  return (
    <div className="ViewContainer">
      {/* <h1>Settings Page</h1> */}
      <Breadcrumb
        items={[
          { title: <HomeOutlined style={{ fontSize: "1.2rem" }} />, link: "/" },
          { title: "Settings", link: "/settings" },
        ]}
        style={{
          marginBottom: "2rem",
          fontSize: "1.2rem",
        }}
      />

      <Tabs centered style={{ marginBottom: "5rem" }} type="card">
        <Tabs.TabPane tab="General Settings" key="1">
          <GeneralSetting />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Content Management" key="2">
          <ContentManagement />
        </Tabs.TabPane>
        <Tabs.TabPane tab="User Management" key="3">
          <UserManagement />
        </Tabs.TabPane>
        <Tabs.TabPane tab="API Monitoring" key="4">
          <p>API Monitoring</p>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
