import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";
import router from "next/router";

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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
        }}
      >
        <div
          className="Card"
          style={{
            backgroundColor: "#f0f0f0",
            padding: "4rem 1rem",
            borderRadius: "0.5rem",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/settings/general-settings");
          }}
        >
          <h2>General Settings</h2>
          <p>Configure general settings for your site.</p>
        </div>
        <div
          className="Card"
          style={{
            backgroundColor: "#f0f0f0",
            padding: "4rem 1rem",
            borderRadius: "0.5rem",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/settings/content-management");
          }}
        >
          <h2>Content Management</h2>
          <p>Configure content management settings.</p>
        </div>
        <div
          className="Card"
          style={{
            backgroundColor: "#f0f0f0",
            padding: "4rem 1rem",
            borderRadius: "0.5rem",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/settings/user-management");
          }}
        >
          <h2>User Management</h2>
          <p>Configure user management settings.</p>
        </div>
        <div
          className="Card"
          style={{
            backgroundColor: "#f0f0f0",
            padding: "4rem 1rem",
            borderRadius: "0.5rem",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/settings/seo-settings");
          }}
        >
          <h2>SEO Settings</h2>
          <p>Configure SEO settings for your site.</p>
        </div>
        {/* API Monitoring Tool */}
        <div
          className="Card"
          style={{
            backgroundColor: "#f0f0f0",
            padding: "4rem 1rem",
            borderRadius: "0.5rem",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/settings/api-monitoring");
          }}
        >
          <h2>API Monitoring</h2>
          <p>Monitor API usage and performance.</p>
        </div>
      </div>
    </div>
  );
}
