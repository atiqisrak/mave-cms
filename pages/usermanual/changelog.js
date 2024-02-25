import React from "react";

const ChangelogItem = ({ version, date, type, changes }) => {
    return (
        <div style={
            {
                display: "flex",
                flexDirection: "column",
                margin: "3em 0"
            }
        }>
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
                    changes.map((change, index) => {
                        return (
                            <li key={index} style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 14fr",
                                alignItems: "center",
                                borderBottom: "2px solid var(--gray)",
                                padding: "0.6em 0",
                            }}>
                                <strong style={{
                                    color: "white",
                                    backgroundColor: change.type === "BugFix" ? "var(--theme)" : "var(--themes)",
                                    borderRadius: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0.3em",
                                    fontSize: "0.9em",
                                    fontWeight: "500",
                                }}>
                                    {change.type}
                                </strong>
                                <span style={{
                                    padding: "0 1em",
                                }}>
                                    {change.change}
                                </span>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

const Changelog = () => {
    return (
        <div className="ViewContainer ViewContentContainer">
            <h1>Changelog</h1>
            <ChangelogItem
                version={"0.1.97"}
                date={"2024-02-25"}
                changes={[
                    {
                        type: "BugFix",
                        change: "Cancel Edit in Creator mode removes the Section"
                    },
                    {
                        type: "Feature",
                        change: "After adding the first component, if user decides to cancel their creation  by pressing close then a error pops up"
                    },

                ]}
            />
            {/* <ChangelogItem
                version="0.1.96"
                date="2024-02-20"
                changes={[
                    "Cancel Edit in Creator mode removes the Section",
                    "After adding the first component, if user decides to cancel their creation  by pressing close then a error pops up",
                    "User needs to refresh page after adding component to see the edit or delete Section option",
                    "When Viewing Navbar nested Menus in cms, all the nested menus become opened and can only be closed by pressing the menu of the 1st Nav bar",
                    "When creating new Navbar, it gets auto submitted when the menu is selected/clicked.",
                    "When creating a new page, user needs to manually refresh the page to access/expand the newly made Page.",
                    "User Cannot Delete Pages.",
                    "When adding Images in a Section, User does not see media library but instead a drop down menu with Image IDs.",
                    "When adding Forms in a Section, the drop down menu shows no data.",
                    "When adding Events in a Section, the drop down menu shows no data.",
                    "After Editing a Section, a new section is created but only visually created.",
                    "After creating a card in a section, if User goes to Edit Mode and changes the card from the drop down menu, User gets redirected to a Application error page."
                ]}
            />
            <ChangelogItem
                version="0.1.95"
                date="2024-02-15"
                changes={[
                    "Menu items are premade, addtional menu items cannot be created",
                    "In the Navbar section, user is not able to update the menu of the Navbar.",
                    "Card-> Create New -> Select Media -> Unselect Media Option is not working.",
                    "Need to Preview Media",
                    "Need to Preview Slider",
                    "Edit Section -> Add Component is not working",
                    "Edit Section -> Add Section Not working",
                    "Need to show 'Page Name' along with 'Page ID' in the pages list.",
                    "Edit Section -> Updating one paragraph changes all other paragraphs in same section"
                ]}
            /> */}

            <ChangelogItem
                version="0.1.94"
                date="2024-02-10"
                changes={[
                    {
                        type: "BugFix",
                        change: "Menu items are premade, addtional menu items cannot be created"
                    },
                    {
                        type: "BugFix",
                        change: "In the Navbar section, user is not able to update the menu of the Navbar."
                    },
                    {
                        type: "BugFix",
                        change: "Card-> Create New -> Select Media -> Unselect Media Option is not working."
                    },
                    {
                        type: "Feature",
                        change: "Need to Preview Media"
                    },
                    {
                        type: "Feature",
                        change: "Need to Preview Slider"
                    },
                    {
                        type: "BugFix",
                        change: "Edit Section -> Add Component is not working"
                    },
                    {
                        type: "BugFix",
                        change: "Edit Section -> Add Section Not working"
                    },
                    {
                        type: "Feature",
                        change: "Need to show 'Page Name' along with 'Page ID' in the pages list."
                    },
                    {
                        type: "BugFix",
                        change: "Edit Section -> Updating one paragraph changes all other paragraphs in same section"
                    }
                ]}
            />

            <ChangelogItem
                version="0.1.93"
                date="2024-02-05"
                changes={[
                    {
                        type: "Feature",
                        change: "User needs to refresh page after adding component to see the edit or delete Section option"
                    },
                    {
                        type: "BugFix",
                        change: "When Viewing Navbar nested Menus in cms, all the nested menus become opened and can only be closed by pressing the menu of the 1st Nav bar"
                    },
                    {
                        type: "BugFix",
                        change: "When creating new Navbar, it gets auto submitted when the menu is selected/clicked."
                    },
                    {
                        type: "Feature",
                        change: "When creating a new page, user needs to manually refresh the page to access/expand the newly made Page."
                    },
                    {
                        type: "BugFix",
                        change: "User Cannot Delete Pages."
                    },
                    {
                        type: "BugFix",
                        change: "When adding Images in a Section, User does not see media library but instead a drop down menu with Image IDs."
                    },
                    {
                        type: "BugFix",
                        change: "When adding Forms in a Section, the drop down menu shows no data."
                    },
                    {
                        type: "BugFix",
                        change: "When adding Events in a Section, the drop down menu shows no data."
                    },
                    {
                        type: "BugFix",
                        change: "After Editing a Section, a new section is created but only visually created."
                    },
                    {
                        type: "BugFix",
                        change: "After creating a card in a section, if User goes to Edit Mode and changes the card from the drop down menu, User gets redirected to a Application error page."
                    }
                ]}
            />
        </div>
    );
}

export default Changelog;