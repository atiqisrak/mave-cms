import React, { useEffect } from "react";
import UploadDoc from "../../components/tools/doctoapi/UploadDoc";
import Head from "next/head";

const doctoapi = () => {
  // set title of the page to "Doc to API"

  return (
    <div>
      <Head>
        <title>Doc to API</title>
      </Head>
      <div className="ViewContainer">
        <div className="ViewContentContainer">
          {/* <h1>Welcome to the Doc to API page</h1> */}
          <UploadDoc />
        </div>
      </div>
    </div>
  );
};

export default doctoapi;
