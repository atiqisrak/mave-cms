import React, { useEffect, useState } from "react";
import Site from "../components/Site";
import { setPageTitle } from "../global/constants/pageTitle";
import { ContextProvider } from "../src/context/context";
import "../styles/globals.css";
import Head from "next/head";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Switch } from "antd";

function MyApp({ Component, pageProps }) {
  const [collapsed, setCollapsed] = useState(true);
  const [darkmode, setDarkmode] = useState(true);
  useEffect(() => {
    // Use a state or context to track the current page name
    // This can be set whenever the page changes, e.g., in your route handling logic.
    const currentPageName = "Home Page";

    // Set the dynamic page title
    setPageTitle(currentPageName);
  }, []);

  // if darkmode is true, set the theme to dark
  // if (darkmode) {
  //   document.body.style.backgroundColor = "#1e1e1e";
  //   document.body.style.color = "white";
  // } else {
  //   document.body.style.backgroundColor = "white";
  //   document.body.style.color = "black";
  // }

  return (
    <>
      <Head>
        
      </Head>
      <ContextProvider>
        <div
          className="darkmode"
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: "1000",
          }}
        >
          <Switch
            size="large"
            checkedChildren={<SunFilled />}
            unCheckedChildren={<MoonFilled />}
            defaultChecked
            onChange={() => setDarkmode(!darkmode)}
          />
        </div>

        <Site collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          style={{
            marginLeft: collapsed ? "2%" : "6%",
            transition: "margin-left 0.5s",
            height: "100vh",
            overflow: "auto",
            backgroundColor: darkmode ? "var(--notwhite)" : "#1e1e1e",
            color: darkmode ? "black" : "white",
          }}
        >
          <Component {...pageProps} />
        </div>
        <footer className="mave-footer">
          <p>
            © 2024{" "}
            <a
              href="https://www.ethertech.ltd"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ether Technologies
            </a>{" "}
            | All rights reserved | Powered by{" "}
            <a
              href="https://www.webable.digital"
              target="_blank"
              rel="noopener noreferrer"
            >
              Webable Digital
            </a>
          </p>
        </footer>
      </ContextProvider>
    </>
  );
}

export default MyApp;
