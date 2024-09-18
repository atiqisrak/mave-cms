import React, { useEffect, useState } from "react";
import Site from "../components/Site";
import { setPageTitle } from "../global/constants/pageTitle";
import { ContextProvider } from "../src/context/context";
import "../styles/globals.css";
import Head from "next/head";
import { message, Switch } from "antd";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { AuthProvider } from "../src/context/AuthContext";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const [darkmode, setDarkmode] = useState(false);
  const [niloy, setNiloy] = useState(
    "y$vtw#*tPECXug7SBeUqNSMVd2!TS!YkjL%#sbtBEPkxS65NtDxm&F$5mKhX(kUP"
  );
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken && router.pathname !== "/login") {
      message.error("Please login to continue");
      router.push("/login");
    } else if (storedToken && router.pathname === "/login") {
      router.push("/home");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Mave CMS</title>
      </Head>
      <AuthProvider>
        <Site collapsed={collapsed} setCollapsed={setCollapsed}>
          <div
            style={{
              overflow: "auto",
              color: !darkmode ? "black" : "white",
            }}
          >
            <Component {...pageProps} />
          </div>
        </Site>
      </AuthProvider>

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
    </>
  );
}

export default MyApp;
