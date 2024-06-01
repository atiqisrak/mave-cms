import { Tabs } from "antd";
import YoutubeInfluencers from "../../../components/marketplace/influencermarketplace/YoutubeInfluencers";
import {
  FacebookFilled,
  FireFilled,
  InstagramFilled,
  LinkedinFilled,
  TikTokFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function InfluencerMarketplace() {
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
            Welcome to the Influencer Marketplace!
          </h1>
          <p
            style={{
              color: theme === "dark" ? "white" : "black",
              fontSize: "1.5rem",
              fontWeight: 400,
              margin: "2rem 0 4rem 0",
            }}
          >
            Find the best influencers for your next campaign!
          </p>
        </center>
        <div style={{ paddingBottom: "15vh" }}>
          <Tabs
            centered
            animated
            type="card"
            defaultActiveKey="1"
            tabBarStyle={{ fontWeight: 600 }}
          >
            <Tabs.TabPane tab="All Influencers" key="1">
              <p>All Influencers</p>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Top" key="2">
              <p>Top Influencers</p>
            </Tabs.TabPane>
            <Tabs.TabPane tab="New" key="3">
              <p>New Influencers</p>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="Trending"
              key="4"
              icon={<FireFilled style={{ color: "orangered" }} />}
            >
              <p>Trending</p>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="Youtube"
              key="5"
              icon={<YoutubeFilled style={{ color: "red" }} />}
            >
              <YoutubeInfluencers />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="Instagram"
              key="6"
              icon={<InstagramFilled style={{ color: "orangered" }} />}
            >
              <p>Instagram Influencers</p>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="Facebook"
              key="7"
              icon={<FacebookFilled style={{ color: "blue" }} />}
            >
              <p>Facebook Influencers</p>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="TiKTok"
              key="8"
              icon={<TikTokFilled style={{ color: "pink" }} />}
            >
              <p>TikTok Influencers</p>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="LinkedIn"
              key="9"
              icon={<LinkedinFilled style={{ color: "blue" }} />}
            >
              <p>LinkedIn Influencers</p>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
