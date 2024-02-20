import React from "react";

const Changelog = () => {
    return (
        <div className="ViewContainer ViewContentContainer">
            <h1>Changelog</h1>
            {/* v 0.1.96 */}
            <div style={
                {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "3em 0"
                }
            }>
                <center><h2>Version 0.1.96</h2></center>
                <ul style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                    margin: "2em 0"
                }}>
                    <li>
                        <strong>BugFix</strong> - Cancel Edit in Creator mode removes the Section
                    </li>
                    <li>
                        <strong>BugFix</strong> - After adding the first component, if user decides to cancel their creation  by pressing close then a error pops up
                    </li>
                    <li>
                        <strong>BugFix</strong> - User needs to refresh page after adding component to see the edit or delete Section option
                    </li>
                    <li>
                        <strong>BugFix</strong> - When Viewing Navbar nested Menus in cms, all the nested menus become opened and can only be closed by pressing the menu of the 1st Nav bar
                    </li>
                    <li>
                        <strong>BugFix</strong> - When creating new Navbar, it gets auto submitted when the menu is selected/clicked.
                    </li>
                    <li>
                        <strong>BugFix</strong> - When creating a new page, user needs to manually refresh the page to access/expand the newly made Page.
                    </li>
                    <li>
                        <strong>BugFix</strong> - User Cannot Delete Pages.
                    </li>
                    <li>
                        <strong>BugFix</strong> - When adding Images in a Section, User does not see media library but instead a drop down menu with Image IDs.
                    </li>
                    <li>
                        <strong>BugFix</strong> - When adding Forms in a Section, the drop down menu shows no data.
                    </li>
                    <li>
                        <strong>BugFix</strong> - When adding Events in a Section, the drop down menu shows no data.
                    </li>
                    <li>
                        <strong>BugFix</strong> - After Editing a Section, a new section is created but only visually created.
                    </li>
                    <li>
                        <strong>BugFix</strong> - After creating a card in a section, if User goes to Edit Mode and changes the card from the drop down menu, User gets redirected to a Application error page.
                    </li>
                </ul>
            </div>

            {/* v 0.1.95 */}
            <div style={
                {
                    display: "flex",
                    flexDirection: "column",
                    margin: "3em 0"
                }
            }>
                <center><h2>Version 0.1.95</h2></center>
                <ul style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                    margin: "2em 0"
                }}>
                    <li>
                        <strong>BugFix</strong> - Menu items are premade, addtional menu items cannot be created
                    </li>
                    <li>
                        <strong>BugFix</strong> - In the Navbar section, user is not able to update the menu of the Navbar.
                    </li>

                    <li>
                        {/* <strong>BugFix</strong> - Card-> Create New -> Select Media -> Unselect Media Option is not working. */}
                        <strong>BugFix</strong> - Card-{">"} Create New -{">"} Select Media -{">"} Unselect Media Option is not working.
                    </li>
                    <li>
                        <strong>BugFix</strong> - Need to Preview Media
                    </li>
                    <li>
                        <strong>BugFix</strong> - Need to Preview Slider
                    </li>
                    <li>
                        <strong>BugFix</strong> - Edit Section -{">"} Add Component is not working
                    </li>
                    <li>
                        <strong>BugFix</strong> - Edit Section -{">"} Add Section Not working
                    </li>
                    <li>
                        <strong>BugFix</strong> - Need to show "Page Name" along with "Page ID" in the pages list.
                    </li>
                    <li>
                        <strong>BugFix</strong> - Edit Section -{">"} Updating one paragraph changes all other paragraphs in same section
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Changelog;