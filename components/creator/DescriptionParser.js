import React, { useState } from "react";
import RichTextEditor from "../RichTextEditor";

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

  return editMode ? (
    <div className="descriptionContainer">
      <RichTextEditor value={description} onChange={handleDescriptionChange} />
      <RichTextEditor
        value={descriptionBn}
        onChange={handleDescriptionBnChange}
      />
    </div>
  ) : (
    <div className="descriptionContainer">
      <div dangerouslySetInnerHTML={{ __html: item?.value }} />
      <div dangerouslySetInnerHTML={{ __html: item?.value_bn }} />
    </div>
  );
};

export default DescriptionParser;
