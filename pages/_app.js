// pages/_app.js

import React from "react";
import Site from "../components/Site";
import "../styles/globals.css";
import Head from "next/head";
import { AuthProvider } from "../src/context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mave CMS</title>
      </Head>
      <AuthProvider>
        <Site>
          <Component {...pageProps} />
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
