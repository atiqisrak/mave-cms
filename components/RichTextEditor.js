import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import dynamic from "next/dynamic";
import Loader from "./Loader";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichTextEditor = ({ defaultValue, onChange, editMode }) => {
  const [editorHtml, setEditorHtml] = useState(defaultValue);
  const [renderedHtml, setRenderedHtml] = useState(defaultValue);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    // ,
    // handlers:
    // {
    //   'link': function (value) {
    //     if (value) {
    //       const url = prompt('Enter the URL');
    //       if (url) {
    //         this.quill.format('link', url);
    //       } else {
    //         this.quill.format('link', false);
    //       }
    //     }
    //   }
    // }
  };

  useEffect(() => {
    setRenderedHtml(editorHtml);
  }, [defaultValue, editorHtml]);

  const handleChange = (html) => {
    setEditorHtml(html);
    onChange(html);
  };

  !ReactQuill && <Loader />;

  return (
    <div>
      {editMode ? (
        <ReactQuill
          style={{
            height: "200px",
            marginBottom: "3rem",
            padding: "1rem",
            backgroundColor: "var(--bg)",
            color: "var(--textNormal)",
            borderRadius: "10px",
            border: "1px solid var(--borderNormal)",
          }}
          theme="snow"
          modules={modules}
          value={editorHtml}
          onChange={handleChange}
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      )}
    </div>
  );
};

export default RichTextEditor;
