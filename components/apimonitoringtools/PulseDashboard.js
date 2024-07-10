// components/PulseDashboard.js
import React from "react";

const PulseDashboard = () => {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
      }}
    >
      <iframe
        src="http://localhost:8000/pulse"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default PulseDashboard;
