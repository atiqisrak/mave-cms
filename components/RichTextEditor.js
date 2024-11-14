// components/RichTextEditor.js

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loader from "./Loader";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichTextEditor = ({ defaultValue, onChange, editMode }) => {
  const [editorHtml, setEditorHtml] = useState(defaultValue || "");
  const [isLoaded, setIsLoaded] = useState(false);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const handleChange = (html) => {
    setEditorHtml(html);
    if (onChange) {
      onChange(html);
    }
  };

  useEffect(() => {
    // Update editorHtml when defaultValue changes
    setEditorHtml(defaultValue || "");
  }, [defaultValue]);

  useEffect(() => {
    // Dynamically import the CSS files on the client side
    if (typeof window !== "undefined") {
      import("react-quill/dist/quill.snow.css");
      import("react-quill/dist/quill.bubble.css");
      import("react-quill/dist/quill.core.css");
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (!ReactQuill) {
    return null; // Return null or a loader if desired
  }

  return (
    <div>
      {editMode ? (
        <ReactQuill
          value={editorHtml}
          onChange={handleChange}
          modules={modules}
          theme="snow"
          className="bg-white"
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
      )}
    </div>
  );
};

export default RichTextEditor;
