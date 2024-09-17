import React, { useEffect, useState } from "react";
import Site from "../components/Site";
import { setPageTitle } from "../global/constants/pageTitle";
import { ContextProvider } from "../src/context/context";
import "../styles/globals.css";
import Head from "next/head";
import { message, Switch } from "antd";
import { MoonFilled, SunFilled } from "@ant-design/icons";

function MyApp({ Component, pageProps }) {
  const [collapsed, setCollapsed] = useState(true);
  const [darkmode, setDarkmode] = useState(false);
  const [niloy, setNiloy] = useState(
    "y$vtw#*tPECXug7SBeUqNSMVd2!TS!YkjL%#sbtBEPkxS65NtDxm&F$5mKhX(kUP"
  );

  useEffect(() => {
    const currentPageName = "Home Page";
    setPageTitle(currentPageName);

    if (
      localStorage.getItem("niloy") === null ||
      localStorage.getItem("niloy") !== niloy
    ) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("niloy");
      message.error("Please login to continue");
    } else if (localStorage.getItem("niloy") === niloy) {
      localStorage.setItem("niloy", niloy);
    } else {
      console.log("Error");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Mave CMS</title>
      </Head>
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
            defaultChecked={darkmode}
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
            // backgroundColor: !darkmode ? "var(--notwhite)" : "#1e1e1e",
            backgroundColor: "#E8E8E9",
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
              MAVE CMS
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
