import React, { useState, useEffect } from "react";
import RichTextEditor from "../RichTextEditor";
import { Button } from "antd";

const DescriptionParser = ({ item, editMode, setEditMode, onDescriptionChange }) => {
  const [description, setDescription] = useState(item?.value || "Description");

  const handleDescriptionChange = (value) => {
    setDescription(value);
    onDescriptionChange(value, item.type);
  };

  return (
    <>
      {editMode ? (
        <div className="descriptionContainer">
          {/* <Button
            style={{ marginBottom: "1em" }}
            onClick={() => {
              setEditMode(false);
              onDescriptionChange(description, item.type);
            }}
          >Save</Button> */}
          <RichTextEditor
            defaultValue={item?.value}
            editMode={true}
            value={description}
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
        </div>
      )}
    </>
  );
};

export default DescriptionParser;
