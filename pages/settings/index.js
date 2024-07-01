import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";

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
        <Link href="/settings/general-settings">
          <div
            className="Card"
            style={{
              backgroundColor: "#f0f0f0",
              padding: "4rem 1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <h2>General Settings</h2>
            <p>Configure general settings for your site.</p>
          </div>
        </Link>
        <Link href="/settings/content-management">
          <div
            className="Card"
            style={{
              backgroundColor: "#f0f0f0",
              padding: "4rem 1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <h2>Content Management</h2>
            <p>Configure content management settings.</p>
          </div>
        </Link>
        <Link href="/settings/user-management">
          <div
            className="Card"
            style={{
              backgroundColor: "#f0f0f0",
              padding: "4rem 1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <h2>User Management</h2>
            <p>Configure user management settings.</p>
          </div>
        </Link>
        <Link href="/settings/seo-settings">
          <div
            className="Card"
            style={{
              backgroundColor: "#f0f0f0",
              padding: "4rem 1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <h2>SEO Settings</h2>
            <p>Configure SEO settings for your site.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
