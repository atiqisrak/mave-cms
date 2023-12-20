import React, { useState, useEffect } from "react";
import RichTextEditor from "../RichTextEditor";

const DescriptionParser = ({ item, editMode, onDescriptionChange }) => {
  const handleDescriptionChange = (e) => {
    onDescriptionChange(e.target.value);
  };

  return (
    <>
      {editMode ? (
        <div className="descriptionContainer">
          <RichTextEditor
            value={item?.value}
            onChange={handleDescriptionChange}
          />
        </div>
      ) : (
        <div
          className="descriptionContainer"
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
          <div dangerouslySetInnerHTML={{ __html: item?.value }}></div>
          {/* <p>{item?.value}</p> */}
        </div>
      )}
    </>
  );
};

export default DescriptionParser;
