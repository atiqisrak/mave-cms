import { message } from "antd";
import React, { useEffect, useState } from "react";

export default function ParseData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/dummy.html")
      .then((response) => response.text())
      .then((htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const table = doc.querySelector(".table");
        const rows = table.querySelectorAll("tbody tr");

        const tableData = Array.from(rows).map((row) => {
          const cells = row.querySelectorAll("td");
          const topics = cells[5].innerText
            .trim()
            .split("\n")
            .map((topic) => topic.trim())
            .filter((topic) => topic !== "");

          return {
            rank: cells[0].innerText.trim(),
            name: cells[1].querySelector(".fw-bold").innerText.trim(),
            image: cells[1].querySelector("img").src,
            followers: cells[2].innerText.trim(),
            er: cells[3].innerText.trim(),
            country: cells[4].querySelector("a").innerText.trim(),
            topic: topics,
            potentialReach: cells[6].innerText.trim(),
          };
        });

        setData(tableData);
      })
      .catch((error) => console.error("Error fetching the HTML file:", error));
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    message.success("Data copied to clipboard");
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "1em",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "800px",
        margin: "1em auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      <button
        onClick={copyToClipboard}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "0.5em 1em",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
        }}
      >
        Copy Text
      </button>
      <h1>Table Data</h1>
      <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
