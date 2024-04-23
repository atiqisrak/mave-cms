import React, { useState, useEffect } from "react";
import instance from "../../axios";
import { Form, Input } from "antd";

const TitleParser = ({ item, editMode, onTitleChange }) => {
  const [title, setTitle] = useState(item?.value || "Title");
  const [titleBn, setTitleBn] = useState(item?.value_bn || "শিরোনাম");

  const handleTitleChange = (e) => {
    const newValue = e.target.value;
    setTitle(newValue);
    onTitleChange(newValue, titleBn, item.type);
  };

  const handleTitleBnChange = (e) => {
    const newValue = e.target.value;
    setTitleBn(newValue);
    onTitleChange(title, newValue, item.type);
  };

  return (
    <>
      {editMode ? (
        <div className="titleContainer">
          <h1>Title</h1>
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
            onChange={handleTitleChange}
          />

          <h1>শিরোনাম</h1>
          <Input
            defaultValue={item?.value_bn}
            value={titleBn}
            style={{
              padding: "1em 2em",
              marginBottom: "1em",
              border: "1px solid var(--themes)",
              borderRadius: 10,
            }}
            placeholder={item?.value_bn ? item?.value_bn : "শিরোনাম"}
            onChange={handleTitleBnChange}
          />
        </div>
      ) : (
        <div
          className="titleContainer"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            justifyContent: "center",
            alignItems: "center",
            padding: "1em 2em",
            marginBottom: "1em",
            border: "1px solid var(--themes)",
            borderRadius: 10,
          }}
        >
          <h1>{item?.value}</h1>
          <h1>{item?.value_bn}</h1>
        </div>
      )}
    </>
  );
};

export default TitleParser;
