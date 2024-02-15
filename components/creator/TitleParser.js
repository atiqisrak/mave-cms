import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { Form, Input } from "antd";

const TitleParser = ({ item, editMode, onTitleChange }) => {
  const [title, setTitle] = useState(item?.value || "Title");

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    setTitle(newValue);
    onTitleChange(newValue, item.type);
  }

  return (
    <>
      {editMode ? (
        <div className="titleContainer">
          <h1>Title</h1>
          {console.log("Getting Title: ", item)}
          <Input
            defaultValue={item?.value}
            value={title}
            style={{
              padding: "1em 2em",
              marginBottom: "1em",
              border: "1px solid var(--themes)",
              borderRadius: 10,
            }}
            placeholder={item?.value ? item?.value : "Title"}
            onChange={handleTitleChange} />
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
