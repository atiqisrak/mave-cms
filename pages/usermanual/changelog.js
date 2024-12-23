import React, { useEffect, useState } from "react";
import { Layout, Timeline, Tag, Button, Breadcrumb } from "antd";
import moment from "moment";
import changelog from "./changelog.json";
import { HomeOutlined, SwapOutlined } from "@ant-design/icons";
import NavItems from "../../components/ui/NavItems";

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
      {/* <NavItems /> */}
      <Layout className="site-layout-background pt-20 pr-10 pb-10 bg-transparent">
        <Content className="p-10 bg-white rounded-lg min-h-10">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-semibold text-theme text-center w-full mb-10">
              Mave Changelogs
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
                <h3 className="text-2xl font-semibold text-theme mb-10">
                  v {log.version}
                </h3>
                <>
                  {Object.entries(log.changes)?.map(([type, changeList]) =>
                    changeList?.map((change, i) => (
                      <div
                        key={i}
                        className="mb-2 p-4 rounded-lg bg-white shadow-sm border-2 border-gray-200 hover:border-theme hover:shadow-md hover:scale-105 transition-all duration-300"
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
