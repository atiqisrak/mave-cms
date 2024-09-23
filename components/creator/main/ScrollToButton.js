import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";

const ScrollToButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Function to handle scroll
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Scroll to the bottom of the page
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<ArrowDownOutlined />}
          onClick={scrollToBottom}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        />
      )}
    </>
  );
};

export default ScrollToButton;
