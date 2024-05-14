import React, { useState, useEffect } from "react";
import RichTextEditor from "../RichTextEditor";
import { Button } from "antd";

const DescriptionParser = ({ item, editMode, onDescriptionChange }) => {
  const [description, setDescription] = useState(item?.value || "Description");
  const [descriptionBn, setDescriptionBn] = useState(item?.value_bn || "বিবরণ");

  const handleDescriptionChange = (value) => {
    setDescription(value);
    onDescriptionChange(value, descriptionBn, item.type);
  };

  const handleDescriptionBnChange = (value) => {
    setDescriptionBn(value);
    onDescriptionChange(description, value, item.type);
  };

  return (
    <>
      {editMode ? (
        <div className="descriptionContainer">
          <h1>Description (English)</h1>
          <RichTextEditor
            defaultValue={item?.value}
            editMode={true}
            value={description}
            onChange={handleDescriptionChange}
          />
          <h1>বিবরণ (বাংলা)</h1>
          <RichTextEditor
            defaultValue={item?.value_bn}
            editMode={true}
            value={descriptionBn}
            onChange={handleDescriptionBnChange}
          />
        </div>
      ) : (
        <div
          className="descriptionContainer"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1em",
            padding: "1em 2em",
            marginBottom: "1em",
            border: "1px solid var(--themes)",
            borderRadius: 10,
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: item?.value }} />

          <div dangerouslySetInnerHTML={{ __html: item?.value_bn }} />
        </div>
      )}
    </>
  );
};

export default DescriptionParser;
