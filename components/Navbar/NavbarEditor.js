import React from "react";
import { Input, Select, Button } from "antd";

const { Option } = Select;

const NavbarEditor = ({
    navbar,
    media,
    menus,
    selectedMediaId,
    setSelectedMediaId,
    selectedMenuId,
    setSelectedMenuId,
    navbarTitleEn,
    setNavbarTitleEn,
    navbarTitleBn,
    setNavbarTitleBn,
    handleUpdateNavbar,
    handleCancelEdit,
    handleOpenMediaSelectionModal2,
}) => {
    return (
        <div>
            <div style={{ marginBottom: "0.5em" }}>
                <label htmlFor={`title_en_${navbar.id}`}>Title (English):</label>
                <Input
                    allowClear
                    type="text"
                    id={`title_en_${navbar.id}`}
                    name="title_en"
                    placeholder="Enter English title"
                    value={navbarTitleEn}
                    onChange={(e) => setNavbarTitleEn(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: "0.5em" }}>
                <label htmlFor={`title_bn_${navbar.id}`}>Title (Bengali):</label>
                <Input
                    allowClear
                    type="text"
                    id={`title_bn_${navbar.id}`}
                    name="title_bn"
                    placeholder="Enter Bengali title"
                    value={navbarTitleBn}
                    onChange={(e) => setNavbarTitleBn(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: "1em" }}>
                <img
                    src={`${MEDIA_URL}/${navbar.logo.file_path}`}
                    alt={navbar.logo.file_name}
                    style={{ width: "150px" }}
                />
                {selectedMediaId && (
                    <img
                        src={`${MEDIA_URL}/${selectedMediaId}`}
                        alt="Changed Logo"
                        style={{ width: "150px" }}
                    />
                )}
                <Button
                    className="change-media-button"
                    style={{
                        fontSize: "1rem",
                        background: "rgba(0, 0, 0, 0.6)",
                        color: "#fff",
                        padding: "18px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "1em",
                    }}
                    onClick={handleOpenMediaSelectionModal2}
                >
                    Change Logo
                </Button>
            </div>
            <div style={{ marginBottom: "1em" }}>
                <label htmlFor="menu">Select Menu:</label>
                <Select
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select a menu"
                    onChange={(selectedMenuId) => setSelectedMenuId(selectedMenuId)}
                    value={selectedMenuId}
                >
                    {menus?.map((menu) => (
                        <Option key={menu.id} value={menu?.id}>
                            {menu.name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div>
                <Button
                    type="primary"
                    onClick={() => handleUpdateNavbar(navbar)}
                    style={{
                        backgroundColor: "var(--theme)",
                        borderColor: "var(--theme)",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                        marginRight: "0.5em",
                    }}
                >
                    Update
                </Button>
                <Button
                    type="default"
                    onClick={handleCancelEdit}
                    style={{
                        backgroundColor: "var(--themes)",
                        borderColor: "var(--themes)",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                    }}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default NavbarEditor;
