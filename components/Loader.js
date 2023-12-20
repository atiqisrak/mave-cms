import { Spin } from "antd";
import React from "react";

const Loader = () => {
  return (
    <div className="ViewContainer">
      <div
        className="ViewContentContainer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Spin size="large" />{" "}
      </div>
    </div>
  );
};

export default Loader;
