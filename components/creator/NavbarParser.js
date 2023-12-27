import { Select } from "antd";
import React, { useState, useEffect } from "react";
import instance from "../../axios";

const NavbarParser = ({
  item,
  editMode,
  onNavbarSelect,
  onUpdateComponent,
}) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [navbars, setNavbars] = useState([]);
  const [selectedNavbar, setSelectedNavbar] = useState(null);

  const fetchNavbars = async () => {
    try {
      setLoading(true);
      console.log("Item: ", item);
      const response = await instance("/navbars");
      if (response.data) {
        setNavbars(response.data);
        console.log("Navbars: ", response.data);
        setLoading(false);
      } else {
        console.error("Error fetching media assets:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching media assets:", error);
    }
  };

  useEffect(() => {
    if (editMode) {
      fetchNavbars();
    }
  }, [editMode]);

  const handleNavbarChange = (value) => {
    setSelectedNavbar(value);
    onNavbarSelect(value);

    // Call the function to update the section data in the parent component
    onUpdateComponent({
      ...item,
      type: "navbar",
      id: value,
    });
  };

  return (
    <>
      <div className="navbarContainer">
        {editMode ? (
          <div className="navbar">
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Select a navbar"
              optionFilterProp="children"
              onChange={handleNavbarChange}
            >
              {navbars?.map((navbar) => (
                <Option value={navbar?.id}>
                  {
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4em",
                        padding: "1em 0",
                        border: "1px solid var(--themes)",
                        borderRadius: 10,
                      }}
                    >
                      <img
                        src={`${MEDIA_URL}/${navbar?.logo?.file_path}`}
                        alt={navbar?.logo?.file_path}
                        style={{
                          width: "100px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                      <div>
                        <ul
                          style={{
                            display: "flex",
                            gap: "3em",
                            justifyContent: "center",
                            listStyle: "none",
                          }}
                        >
                          {navbar?.menu?.menu_items?.map((menuItem) => (
                            <li key={menuItem.id}>
                              <p>{menuItem.title}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  }
                </Option>
              ))}
            </Select>
          </div>
        ) : (
          <div
            className="column"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 5fr",
              padding: "1em 2em",
              marginBottom: "1em",
              border: "1px solid var(--themes)",
              borderRadius: 10,
            }}
          >
            <div className="logoColumn">
              <img
                src={`${MEDIA_URL}/${item?._mave?.logo?.file_path}`}
                alt={item?._mave?.logo?.file_path}
                style={{ maxWidth: "150px" }}
              />
            </div>
            <div
              className="menuColumn"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="menu"
                style={{
                  display: "flex",
                  gap: "1em",
                  justifyContent: "center",
                }}
              >
                {/* Render the menu items */}
                {item?._mave?.menu?.menu_items?.map((menuItem) => (
                  <div key={menuItem.id}>
                    <p>{menuItem.title}</p>
                  </div>
                ))}{" "}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavbarParser;
