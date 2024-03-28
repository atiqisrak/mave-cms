import React, { useEffect, useState } from "react";
import changelog from "./changelog.json";
import moment from "moment";

const ChangelogItem = ({ version, date, changes }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "3em 0",
      }}
    >
      {console.log("Change: ", changes)}
      <h2>Version {version}</h2>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "2em 0",
        }}
      >
        {Object.entries(changes).map(([type, changeList]) =>
          changeList.map((change, index) => (
            <li
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 14fr",
                alignItems: "center",
                borderBottom: "2px solid var(--gray)",
                padding: "0.6em 0",
              }}
            >
              <strong
                style={{
                  color: "white",
                  backgroundColor:
                    type === "BugFix" ? "var(--themes)" : "var(--theme)",
                  border:
                    type === "BugFix"
                      ? "2px solid var(--themes)"
                      : "2px solid var(--theme)",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.3em",
                  fontSize: "0.9em",
                  fontWeight: "500",
                }}
              >
                {type}
              </strong>
              <span
                style={{
                  padding: "0 1em",
                  textWrap: "wrap",
                  wordWrap: "break-word",
                }}
              >
                {change}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const Changelog = () => {
  const [changeLogs, setChangeLogs] = useState();
  const formattedjson = JSON.stringify(changelog, null, 2);

  useEffect(() => {
    setChangeLogs(
      changelog.sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  }, []);

  return (
    <div className="ViewContainer ViewContentContainer">
      <h1
        style={{
          marginBottom: "2em",
        }}
      >
        Changelog
      </h1>
      {changeLogs?.map((change, index) => {
        return (
          <div
            style={{
              gap: "2em",
              display: "grid",
              gridTemplateColumns: "1fr 9fr",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--themes)",
                  textAlign: "center",
                  backgroundColor: "white",
                  zIndex: "1",
                  padding: "1.9em 1em",
                  borderRadius: "50%",
                  border: "2px solid var(--theme)",
                }}
              >
                <span
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "500",
                  }}
                >
                  {moment(change.date).format("DD MMM YYYY")}
                </span>
              </div>
              {index !== changeLogs.length - 1 && (
                <div
                  style={{
                    borderLeft: "2px solid var(--theme)",
                    height: "100%",
                  }}
                />
              )}
            </div>
            <ChangelogItem
              key={index}
              version={change.version}
              date={change.date}
              changes={change.changes}
            />
          </div>
        );
      })}
      {/* JSON Structure */}
      {/* <pre
                style={{
                    backgroundColor: "var(--black)",
                    color: "var(--white)",
                    padding: "1em",
                    borderRadius: "5px",
                    overflow: "auto",
                    margin: "2em 0",
                    textWrap: "wrap",
                }}
            >
                {formattedjson}
            </pre> */}
    </div>
  );
};

export default Changelog;
