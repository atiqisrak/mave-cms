import { Button } from "antd";
import React from "react";

const ScrollToButton = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Button
        style={{
          position: "fixed",
          bottom: "150px",
          right: "20px",
          padding: "5px 10px",
          backgroundColor: "var(--themes)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          marginBottom: "1em",
        }}
        onClick={scrollToTop}
      >
        &#9650;
      </Button>

      <Button
        style={{
          position: "fixed",
          bottom: "120px",
          right: "20px",
          padding: "5px 10px",
          backgroundColor: "var(--themes)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onClick={scrollToBottom}
      >
        &#9660;
      </Button>
    </div>
  );
};

export default ScrollToButton;
