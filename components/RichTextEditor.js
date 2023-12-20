import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(
    () => import('react-quill'),
    { ssr: false }
  );

const RichTextEditor = ({ defaultValue, onChange, editMode }) => {
  const [editorHtml, setEditorHtml] = useState(defaultValue);
  const [renderedHtml, setRenderedHtml] = useState(defaultValue);

  useEffect(() => {
    setRenderedHtml(editorHtml);
  }, [defaultValue, editorHtml]);


  const handleChange = (html) => {
    setEditorHtml(html);
    onChange(html);
  };

  return (
    <div>
      {editMode ? (
        <ReactQuill value={editorHtml} onChange={handleChange} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      )}
    </div>
  );
};

export default RichTextEditor;
