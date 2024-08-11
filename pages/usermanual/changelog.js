import React, { useEffect, useState } from "react";
import { Timeline, Tag, Button } from "antd";
import moment from "moment";
import changelog from "./changelog.json";
import { SwapOutlined } from "@ant-design/icons";

const Changelog = () => {
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
    <div style={{ padding: "20px" }} className="ViewContainer">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Changelog</h1>
        <Button
          icon={<SwapOutlined />}
          onClick={() => setReverse(!reverse)}
          style={{ marginBottom: "20px", transform: "rotate(90deg)" }}
        />
      </div>
      <Timeline mode="alternate" pending="More to come..." reverse={reverse}>
        {changeLogs.map((log, index) => (
          <Timeline.Item
            key={index}
            label={moment(log.date).format("DD MMM YYYY")}
            style={{ paddingBottom: "20px", fontSize: "1.1em" }}
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
              {Object.entries(log.changes).map(([type, changeList]) =>
                changeList.map((change, i) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
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
    </div>
  );
};

export default Changelog;
