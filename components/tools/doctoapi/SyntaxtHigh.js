import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
// import { twilight } from "react-syntax-highlighter/dist/cjs/styles/prism/twilight";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark";
export const SyntaxtHigh = ({ codeString }) => {
  //   const codeString = {
  //     name: "Game Shop",
  //     description: "A curated selection of video games",
  //     categories: ["Action", "Adventure", "Sports"],
  //   };
  return (
    <SyntaxHighlighter language="json" style={a11yDark}>
      {/* {JSON.stringify(codeString, null, 2)} */}
      {codeString}
    </SyntaxHighlighter>
  );
};
