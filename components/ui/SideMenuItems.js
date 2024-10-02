import {
  CalculatorOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Image, Menu, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthorizedSideMenuData from "../../src/data/authorisedsidemenus.json";
import UnAuthorizedSideMenuData from "../../src/data/unauthorisedsidemenu.json";
import Godfather from "../../src/data/godfather.json";

const SideMenuItems = ({
  token,
  user,
  handleLogout,
  setIsModalOpen,
  collapsed,
  theme,
  setTheme,
}) => {
  const [loading, setLoading] = useState(false);
  const [sideMenuData, setSideMenuData] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [godfather, setGodfather] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (token && user) {
      setSideMenuData(AuthorizedSideMenuData);
      if (
        user?.email == "atiqisrak@niloy.com" ||
        user?.email == "Zeeshan.akhtar@webable.digital"
      ) {
        setGodfather(Godfather);
      }
    } else {
      setSideMenuData(UnAuthorizedSideMenuData);
    }
  }, [token, user]);

  useEffect(() => {
    if (router.isReady && sideMenuData?.length > 0) {
      const currentPath = router.pathname;
      const selectedItem =
        sideMenuData.find((item) => item.link === currentPath) || {};
      setSelectedMenuItem(selectedItem.id);
    }
  }, [router.pathname, sideMenuData]);

  const handleMenuClick = (item) => {
    setSelectedMenuItem(item.key);
    const selectedItem = sideMenuData.find(
      (menuItem) => menuItem.id === item.key
    );
    if (selectedItem) {
      router.push(selectedItem.link);
    }
  };

  // console.log("Side menu data", sideMenuData);

  return (
    <div>
      <Menu
        theme={theme === "dark" ? "dark" : "light"}
        mode="inline"
        collapsible
        collapsedWidth={collapsed ? 80 : 250}
        defaultSelectedKeys={[selectedMenuItem]}
        onClick={handleMenuClick}
        style={{ margin: 0, border: "1px solid transparent" }}
      >
        {sideMenuData && sideMenuData?.length > 0 ? (
          sideMenuData?.map((item) =>
            item?.submenu?.length > 0 ? (
              <Menu.SubMenu
                key={item.id}
                onClick={() => {
                  setSelectedMenuItem(item.id);
                }}
                title={
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    {collapsed ? (
                      <Image
                        className="sidebaricon"
                        preview={false}
                        src={item.icon
                          .replace("collapsed", "expand")
                          .replace("dark", "light")}
                        alt="logo"
                        width={25}
                        height={25}
                      />
                    ) : (
                      <Image
                        className="sidebaricon"
                        preview={false}
                        src={item.icon
                          .replace("expand", "collapsed")
                          .replace("light", "dark")}
                        alt="logo"
                        width={25}
                        height={25}
                      />
                    )}
                    {!collapsed && <strong>{item.title}</strong>}
                  </div>
                }
                style={{
                  fontSize: "1.1em",
                  fontWeight: "bold",
                  marginTop: "10%",
                  border: "2px solid var(--gray-dark)",
                  borderRadius: "10px",
                }}
              >
                {item?.submenu?.map((subItem) => (
                  <Menu.Item
                    key={subItem.id}
                    onClick={() => router.push(subItem.link)}
                    style={{
                      marginTop: "10%",
                      fontSize: "1.1em",
                      fontWeight: "bold",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      <Image
                        className="sidebaricon"
                        preview={false}
                        src={subItem.icon}
                        alt="logo"
                        width={25}
                        height={25}
                      />
                      <strong>{subItem.title}</strong>
                    </div>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={item.id}
                onClick={() => {
                  setSelectedMenuItem(item.id);
                  router.push(item.link);
                }}
                style={{
                  marginTop: "10%",
                  fontSize: "1.1em",
                  fontWeight: "bold",
                  border: "2px solid var(--gray-dark)",
                  borderRadius: "10px",
                  width: "100%",
                  padding: "24px 24px",
                  marginLeft: "-1px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Image
                    className="sidebaricon"
                    preview={false}
                    src={item.icon}
                    alt="logo"
                    width={25}
                    height={25}
                  />
                  {!collapsed && <strong>{item.title}</strong>}
                </div>
              </Menu.Item>
            )
          )
        ) : (
          <Menu.Item key="no-data">No data found</Menu.Item>
        )}
        {user && godfather?.length > 0 ? (
          godfather?.map((item) =>
            item?.submenu?.length > 0 ? (
              <Menu.SubMenu
                key={item.id}
                onClick={() => {
                  setSelectedMenuItem(item.id);
                }}
                title={
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    {collapsed ? (
                      <Image
                        className="sidebaricon"
                        preview={false}
                        src={item.icon
                          .replace("collapsed", "expand")
                          .replace("dark", "light")}
                        alt="logo"
                        width={25}
                        height={25}
                      />
                    ) : (
                      <Image
                        className="sidebaricon"
                        preview={false}
                        src={item.icon
                          .replace("expand", "collapsed")
                          .replace("light", "dark")}
                        alt="logo"
                        width={25}
                        height={25}
                      />
                    )}
                    {!collapsed && <strong>{item.title}</strong>}
                  </div>
                }
                style={{
                  fontSize: "1.1em",
                  fontWeight: "bold",
                  marginTop: "10%",
                  border: "2px solid var(--gray-dark)",
                  borderRadius: "10px",
                }}
              >
                {item?.submenu?.map((subItem) => (
                  <Menu.Item
                    key={subItem.id}
                    onClick={() => router.push(subItem.link)}
                    style={{
                      marginTop: "10%",
                      fontSize: "1.1em",
                      fontWeight: "bold",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      <Image
                        className="sidebaricon"
                        preview={false}
                        src={subItem.icon}
                        alt="logo"
                        width={25}
                        height={25}
                      />
                      <strong>{subItem.title}</strong>
                    </div>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={item.id}
                onClick={() => {
                  setSelectedMenuItem(item.id);
                  router.push(item.link);
                }}
                style={{
                  marginTop: "10%",
                  fontSize: "1.1em",
                  fontWeight: "bold",
                  border: "2px solid var(--gray-dark)",
                  borderRadius: "10px",
                  width: "100%",
                  padding: "24px 24px",
                  marginLeft: "-1px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Image
                    className="sidebaricon"
                    preview={false}
                    src={item.icon}
                    alt="logo"
                    width={25}
                    height={25}
                  />
                  {!collapsed && <strong>{item.title}</strong>}
                </div>
              </Menu.Item>
            )
          )
        ) : (
          <Menu.Item key="no-data">No data found</Menu.Item>
        )}
        {user ? null : (
          <Menu.Item
            key="login"
            icon={<LoginOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default SideMenuItems;
