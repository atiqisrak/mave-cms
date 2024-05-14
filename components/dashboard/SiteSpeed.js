import { MoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";

export const siteSpeedData = {
  responseTime: 631,
  grade: "75",
  pageSize: "1.2mb",
  loadTime: "2.5s",
  requests: 89,
};

export default function SiteSpeed() {
  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "1rem",
        backgroundColor: "white",
      }}
    >
      <div
        className="flexed-between"
        style={{
          borderBottom: "1px solid var(--gray)",
          marginBottom: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: 500,
            color: "var(--black)",
          }}
        >
          Site Speed
        </h4>
        <MoreOutlined />
      </div>

      {/* Speed Data */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
              width: "16em",
              height: "16em",
              backgroundColor: "#F5F7FF",
              borderRadius: "50%",
              border: "2px solid blue",
              color: "blue",
            }}
          >
            <h1>{siteSpeedData.responseTime}</h1>
            <p>mc</p>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          {/* Grade, Page Size, Load Time, Requests */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
              color: "blue",
              backgroundColor: "#F5F7FF",
              borderRadius: "2rem",
              padding: "3rem 2rem",
            }}
          >
            <h2>{siteSpeedData.grade}</h2>
            <p>Grade</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
              color: "blue",
              backgroundColor: "#F5F7FF",
              borderRadius: "2rem",
              padding: "3rem 2rem",
            }}
          >
            <h2>{siteSpeedData.pageSize}</h2>
            <p>Page Size</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
              color: "blue",
              backgroundColor: "#F5F7FF",
              borderRadius: "2rem",
              padding: "3rem 2rem",
            }}
          >
            <h2>{siteSpeedData.loadTime}</h2>
            <p>Load Time</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
              color: "blue",
              backgroundColor: "#F5F7FF",
              borderRadius: "2rem",
              padding: "3rem 2rem",
            }}
          >
            <h2>{siteSpeedData.requests}</h2>
            <p>Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
}
