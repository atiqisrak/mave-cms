import { Tabs } from "antd";
import WebsiteTemplatesMarketplace from "../../components/marketplace/WebsiteTemplatesMarketplace";
import Image from "next/image";

export default function marketplace() {
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
              color: "black",
              marginBottom: "1rem",
            }}
          >
            Welcome to the Marketplace!
          </h1>
          <p
            style={{
              color: "black",
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
          tabBarStyle={{ color: "black", fontWeight: "500" }}
        >
          <Tabs.TabPane tab="Website Templates" key="1">
            <div>
              <WebsiteTemplatesMarketplace />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="CMS Themes" key="2">
            <div>
              <h1>Welcome to the CMS Theme Marketplace!</h1>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tools" key="3">
            <div>
              <h1>Welcome to the Tools Marketplace!</h1>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
