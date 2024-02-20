import React from "react";
import { Button, Popconfirm } from "antd";

const NavbarDisplay = ({
    navbar,
    handleEditClick,
    handleDeleteNavbar,
    editMode,
}) => {
    return (
        <div className="navbarContainer">
            <div>
                <h3
                    style={{
                        textAlign: "center",
                        borderLeft: "1px solid var(--theme)",
                    }}
                >
                    {navbar.title_en ? navbar.title_en : "No Title"}
                    <br />
                    {navbar.title_bn ? navbar.title_bn : ""}
                </h3>
            </div>
            {/* Rest of the code for displaying menu and action buttons */}
        </div>
    );
};

export default NavbarDisplay;
