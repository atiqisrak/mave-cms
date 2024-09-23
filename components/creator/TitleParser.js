import React, { useState } from "react";
import { Input } from "antd";

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

  return editMode ? (
    <div className="titleContainer">
      <Input
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter title"
      />
      <Input
        value={titleBn}
        onChange={handleTitleBnChange}
        placeholder="শিরোনাম লিখুন"
      />
    </div>
  ) : (
    <div className="titleContainer">
      <h1>{item?.value}</h1>
      <h1>{item?.value_bn}</h1>
    </div>
  );
};

export default TitleParser;
