import React, { useEffect, useState } from "react";
import { Layout, Timeline, Tag, Button, Breadcrumb } from "antd";
import moment from "moment";
import changelog from "./changelog.json";
import { HomeOutlined, SwapOutlined } from "@ant-design/icons";

const Changelog = () => {
  const { Content } = Layout;
  const [changeLogs, setChangeLogs] = useState([]);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    // Sort the changelog by date in descending order
    const sortedLogs = changelog.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setChangeLogs(sortedLogs);
  }, []);

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
          <Breadcrumb.Item>Changelog</Breadcrumb.Item>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "1.8rem",
                fontWeight: 600,
                marginBottom: "1.5rem",
                margin: "0 auto",
              }}
            >
              Changelogs
            </h1>
            <Button
              icon={<SwapOutlined />}
              onClick={() => setReverse(!reverse)}
              style={{ marginBottom: "20px", transform: "rotate(90deg)" }}
            />
          </div>

          <Timeline
            mode="alternate"
            pending="More to come..."
            reverse={reverse}
          >
            {changeLogs?.map((log, index) => (
              <Timeline.Item
                key={index}
                label={moment(log.date).format("DD MMM YYYY")}
                style={{
                  paddingBottom: "20px",
                  fontSize: "1.1em",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25em",
                    marginBottom: "10px",
                    color: "var(--theme)",
                  }}
                >
                  Version {log.version}
                </h3>
                <>
                  {Object.entries(log.changes)?.map(([type, changeList]) =>
                    changeList?.map((change, i) => (
                      <div
                        key={i}
                        style={{
                          marginBottom: "10px",
                          padding: "1rem 2rem",
                          borderRadius: "10px",
                          backgroundColor: "white",
                          boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Tag color={type === "BugFix" ? "red" : "green"}>
                          {type}
                        </Tag>
                        {change}
                      </div>
                    ))
                  )}
                </>
              </Timeline.Item>
            ))}
          </Timeline>
        </Content>
      </Layout>
    </div>
  );
};

export default Changelog;
