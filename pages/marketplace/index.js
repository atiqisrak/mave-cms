import { Tabs } from "antd";
import Image from "next/image";
import WebsiteTemplatesMarketplace from "../../components/marketplace/webtemplates/WebsiteTemplatesMarketplace";
import CMSThemeMarketplace from "../../components/marketplace/CMSThemeMarketplace";
import ToolsMarketplace from "../../components/marketplace/ToolsMarketplace";
import { useEffect, useState } from "react";

export default function marketplace() {
  const [theme, setTheme] = useState();

  // Set Theme
  useEffect(() => {
    const interval = setInterval(() => {
      const theme =
        localStorage.getItem("darkmode") === "true" ? "dark" : "light";
      setTheme(theme);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: "url('/images/Shapes.png')",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
      }}
    >
      <img
        src="/images/herokitty.png"
        alt="Kit Hero"
        style={{
          width: "300px",
          height: "auto",
          position: "absolute",
          top: 80,
          right: 90,
        }}
      />
      <div
        className="ViewContainer"
        style={{
          width: "80%",
          maxWidth: "1500px",
          margin: "0 auto",
          marginTop: 0,
          paddingTop: "5rem",
        }}
      >
        <center>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "600",
              color: theme === "dark" ? "white" : "black",
              marginBottom: "1rem",
            }}
          >
            Welcome to the Marketplace!
          </h1>
          <p
            style={{
              color: theme === "dark" ? "white" : "black",
              fontSize: "1.5rem",
              fontWeight: 400,
              margin: "2rem 0 4rem 0",
            }}
          >
            Find the best templates and tools for your next project!
          </p>
        </center>
        <Tabs
          animated
          centered
          type="card"
          size="large"
          tabBarGutter={16}
          defaultActiveKey="4"
          tabBarStyle={{
            color: theme === "dark" ? "white" : "black",
            fontWeight: "500",
          }}
        >
          <Tabs.TabPane tab="Website Templates" key="1">
            <div>
              <WebsiteTemplatesMarketplace />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="CMS Themes" key="2">
            <CMSThemeMarketplace />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tools" key="3">
            <ToolsMarketplace />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Influencer" key="4">
            <div
              style={{
                paddingBottom: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Coming Soon!</h1>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
