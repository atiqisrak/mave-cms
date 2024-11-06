// pages/_app.js

import React from "react";
import Site from "../components/SiteContent"; // Adjust the import path if necessary
import "../styles/globals.css";
// Import React Quill CSS here
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Head from "next/head";
import { AuthProvider } from "../src/context/AuthContext";
import { MenuRefreshProvider } from "../src/context/MenuRefreshContext";
import { ThemeProvider } from "../src/context/ThemeContext";
import Link from "next/link";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MaveEventsPlugin from "../plugins/MaveEvents";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mave CMS</title>
      </Head>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <MaveEventsPlugin>
            <MenuRefreshProvider>
              <ThemeProvider>
                <Site>
                  <Component {...pageProps} />
                </Site>
              </ThemeProvider>
            </MenuRefreshProvider>
          </MaveEventsPlugin>
        </AuthProvider>
      </GoogleOAuthProvider>
      <footer className="mave-footer">
        © 2024{" "}
        <Link
          href="https://www.linkedin.com/in/atiq-israk/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MAVE CMS
        </Link>{" "}
        | All rights reserved | Powered by{" "}
        <Link
          href="https://www.ethertech.ltd"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ether Technologies
        </Link>
      </footer>
    </>
  );
}

export default MyApp;
