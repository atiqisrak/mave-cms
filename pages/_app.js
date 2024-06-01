import React, { useEffect, useState } from "react";
import Site from "../components/Site";
import { setPageTitle } from "../global/constants/pageTitle";
import { ContextProvider } from "../src/context/context";
import "../styles/globals.css";
import Head from "next/head";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Switch } from "antd";

function MyApp({ Component, pageProps }) {
  const [collapsed, setCollapsed] = useState(false);
  const [darkmode, setDarkmode] = useState(true);
  useEffect(() => {
    const currentPageName = "Home Page";
    setCollapsed(false);
    setPageTitle(currentPageName);
  }, []);
  return (
    <>
      <Head></Head>
      <ContextProvider>
        <div
          className="darkmode"
          style={{
            position: "fixed",
            top: "2rem",
            right: "1rem",
            zIndex: "1100",
          }}
        >
          <Switch
            size="large"
            checkedChildren={<SunFilled />}
            unCheckedChildren={<MoonFilled />}
            defaultChecked
            onChange={() => {
              setDarkmode(!darkmode);
              localStorage.setItem("darkmode", !darkmode);
            }}
          />
        </div>

        <Site collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          style={{
            paddingLeft: collapsed ? "2%" : "7%",
            transition: "margin-left 0.5s",
            // height: "100vh",
            overflow: "auto",
            backgroundColor: !darkmode ? "var(--notwhite)" : "#1e1e1e",
            color: !darkmode ? "black" : "white",
            marginTop: "5vh",
          }}
        >
          <Component {...pageProps} />
        </div>
        <footer className="mave-footer">
          <p>
            © 2024{" "}
            <a
              href="https://www.linkedin.com/in/atiq-israk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Atiq Israk Niloy
            </a>{" "}
            | All rights reserved | Powered by{" "}
            <a
              href="https://www.ethertech.ltd"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ether Technologies
            </a>
          </p>
        </footer>
      </ContextProvider>
    </>
  );
}

export default MyApp;
