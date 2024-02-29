import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import changelog from "./changelog.json";

const ChangelogItem = ({ version, date, changes }) => {

    return (
        <div style={
            {
                display: "flex",
                flexDirection: "column",
                margin: "3em 0"
            }
        }>
            {console.log("Change: ", changes)}
            {/* <center> */}
            <h2>Version {version} <span style={{
                color: "var(--theme)"
            }}>({date})</span></h2>
            {/* </center> */}
            <ul style={{
                display: "flex",
                flexDirection: "column",
                margin: "2em 0"
            }}>
                {
                    Object.entries(changes).map(([type, changeList]) => (
                        changeList.map((change, index) => (
                            <li key={index} style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 14fr",
                                alignItems: "center",
                                borderBottom: "2px solid var(--gray)",
                                padding: "0.6em 0",
                            }}>
                                <strong style={{
                                    color: "white",
                                    backgroundColor: type === "BugFix" ? "var(--theme)" : "var(--themes)",
                                    borderRadius: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0.3em",
                                    fontSize: "0.9em",
                                    fontWeight: "500",
                                }}>
                                    {type}
                                </strong>
                                <span style={{
                                    padding: "0 1em",
                                }}>
                                    {change}
                                </span>
                            </li>
                        ))
                    ))
                }

            </ul>
        </div>
    );
}

const Changelog = () => {

    const [changeLogs, setChangeLogs] = useState(changelog);
    const formattedjson = JSON.stringify(changelog, null, 2);

    useEffect(() => {
        setChangeLogs(changelog);
    }, []);

    return (
        <div className="ViewContainer ViewContentContainer">
            <h1>Changelog</h1>
            {
                changeLogs?.map((change, index) => {
                    return (
                        <ChangelogItem
                            key={index}
                            version={change.version}
                            date={change.date}
                            changes={change.changes}
                        />
                    );
                })
            }

            {/* JSON Structure */}
            <pre
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
            </pre>
        </div>
    );
}

export default Changelog;