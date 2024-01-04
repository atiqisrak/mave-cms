import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState, useEffect } from "react";

const CardViewer = (card, editMode, viewDetails, setViewDetails) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "70%",
        left: "20%",
        backgroundColor: "white",
        padding: "2rem",
        // border: "4px solid var(--theme)",
        backgroundColor: "var(--themes)",
        color: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        width: "30vw",
        height: "30vh",
        overflow: "scroll",
        zIndex: 1,
      }}
    >
      {console.log("Card Details", card?.card)}
      <center>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Button
            icon={<CloseCircleOutlined />}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              color: "white",
              backgroundColor: "transparent",
              border: "none",
            }}
            onClick={() => setViewDetails(false)}
          /> */}
          <h2>Desctiption:</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: card?.card?.description_en,
            }}
          />
          <h2>Bornona: </h2>
          <p
            dangerouslySetInnerHTML={{
              __html: card?.card?.description_bn,
            }}
          />
        </div>
      </center>
    </div>
  );
};

export default CardViewer;
