import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

function Blogger() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  });

  return (
    <div className="ViewContainer">
      {isBrowser && <FroalaEditorComponent />}
    </div>
  );
}

export default Blogger;
