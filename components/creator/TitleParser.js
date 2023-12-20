import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { Form, Input } from "antd";

const TitleParser = ({ item, editMode, onTitleChange }) => {
  const handleTitleChange = (e) => {
    onTitleChange(e.target.value);
  };

  return (
    <>
      {editMode ? (
        <div className="titleContainer">
          <Input placeholder={item?.value} onChange={handleTitleChange} />
        </div>
      ) : (
        <div
          className="titleContainer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1em 2em",
            marginBottom: "1em",
            border: "1px solid var(--themes)",
            borderRadius: 10,
          }}
        >
          <h1>{item?.value}</h1>
        </div>
      )}
    </>
  );
};

export default TitleParser;
