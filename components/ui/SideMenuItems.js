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
}) => {
  const [loading, setLoading] = useState(false);
  const [sideMenuData, setSideMenuData] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const router = useRouter();

  // const fetchAuthorisedSideMenuData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch("/api/authorisedsidemenu");

  //     if (response?.status === 304 || response?.status === 200) {
  //       const data = await response.json();
  //       setSideMenuData(data);
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // };

  // const fetchUnauthorisedSideMenuData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch("/api/unauthorisedsidemenu");
  //     setSideMenuData(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (token && user) {
  //     fetchAuthorisedSideMenuData();
  //   } else {
  //     fetchUnauthorisedSideMenuData();
  //   }
  // }, [token, user]);

  useEffect(() => {
    if (token && user) {
      setSideMenuData(AuthorizedSideMenuData);
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
        theme="light"
        mode="inline"
        collapsible
        collapsedWidth={collapsed ? 80 : 250}
        defaultSelectedKeys={[selectedMenuItem]}
        onClick={handleMenuClick}
        style={{ marginTop: "10%" }}
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
                        // alignItems: "center",
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
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    // alignItems: "center",
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
        {user &&
          user?.email === "atiqisrak@niloy.com" &&
          Godfather?.map((item) => (
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
                      // alignItems: "center",
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
                    <Popover
                      content={
                        <div className="flexed-between">
                          <Image
                            preview={false}
                            src={subItem?.icon}
                            alt="logo"
                            style={{
                              width: "30px",
                              height: "30px",
                              marginRight: "10px",
                            }}
                          />
                          <h4>{subItem.title}</h4>
                        </div>
                      }
                      trigger="hover"
                      placement="right"
                    >
                      <strong>
                        {/* {subItem.title} */}
                        {subItem.title.length > 10
                          ? subItem.title.substring(0, 10) + "..."
                          : subItem.title}
                      </strong>
                    </Popover>
                  </div>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}

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
