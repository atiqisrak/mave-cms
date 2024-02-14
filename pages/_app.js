import { useEffect } from "react";
import Site from "../components/Site";
import { setPageTitle } from "../global/constants/pageTitle";
import { ContextProvider } from "../src/context/context";
import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Use a state or context to track the current page name
    // This can be set whenever the page changes, e.g., in your route handling logic.
    const currentPageName = "Home Page";

    // Set the dynamic page title
    setPageTitle(currentPageName);
  }, []);

  return (
    <>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </Head>
      <ContextProvider>
        <Site />
        <Component {...pageProps} />
      </ContextProvider>
    </>
  );
}

export default MyApp;
