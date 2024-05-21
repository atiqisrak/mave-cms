import {
  BarChartOutlined,
  BellOutlined,
  MessageOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Image, Input, List, Space, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
const { Header } = Layout;
import router from "next/router";
import Login from "../Login";

export default function NavItems({
  user,
  token,
  handleLogout,
  isModalOpen,
  setIsModalOpen,
}) {
  const [hovered, setHovered] = useState(false);
  const [topNavData, setTopNavData] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Home");

  useEffect(() => {
    fetch("/api/topnavdata")
      .then((res) => res.json())
      .then((data) => {
        setTopNavData(data);
      });
  }, []);

  // const handleMenuClick = (item) => {
  //   setSelectedMenuItem(item.key);
  //   const selectedItem = sideMenuData
  //     ? sideMenuData.find((menuItem) => menuItem.id === item.key)
  //     : null;
  //   if (selectedItem) {
  //     router.push(selectedItem.link);
  //   }
  // };

  return (
    <Header
      className="site-layout-background"
      style={{
        position: "fixed",
        width: "100vw",
        height: "8vh",
        display: "grid",
        // justifyContent: "space-between",
        alignItems: "center",
        gridTemplateColumns: "1fr 3fr 2fr 2fr",
        gridGap: "3rem",
        padding: "0 20px",
        backgroundColor: "white",
        boxShadow: "0 2px 8px #f0f1f2",
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Space
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image
          placeholder
          className="sitelogo"
          src="/images/mave_logo_horizontal_core.png"
          alt="Mave Logo"
          // resizeMode="contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/mave_logo_horizontal_core.png";
          }}
          preview={false}
          style={{
            height: "6vh",
            marginLeft: "10px",
            objectFit: "contain",
          }}
        />
      </Space>

      {user && token ? (
        <>
          {/* Menu items tabs */}
          <Space
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: "1vw",
              paddingTop: "1vh",
            }}
          >
            {topNavData &&
              topNavData.map((item) => (
                <div
                  key={item.id}
                  style={{
                    fontSize: "clamp(0.8em, 1.5vw, 1.1em)",
                    color:
                      selectedMenuItem === item.name
                        ? "var(--theme)"
                        : "#6B7A99",
                    fontWeight: 600,
                    borderRadius: "5px",
                    padding: "5px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setSelectedMenuItem(item.name);
                    router.push(item.link);
                  }}
                >
                  {item.name}
                </div>
              ))}
          </Space>

          {/* Search bar */}
          <Space
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Input
              placeholder="Try searching «Headless CMS»"
              suffix={<SearchOutlined />}
              style={{
                width: "100%",
                height: "4vh",
                borderRadius: "20px",
                padding: "0 20px",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #f0f1f2",
                boxShadow: "inset 0 0 10px #f0f1f280",
              }}
            />
          </Space>

          {/* Notification bell, Messages, Analytics, Profile */}
          <Space
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Space
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                gap: "10px",
              }}
            >
              <Space
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: hovered ? "#f6ebff" : "white",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <BellOutlined
                  style={{
                    fontSize: "clamp(1em, 2vw, 1.5em)",
                    color: "var(--iconmagic)",
                  }}
                />
              </Space>
              <Space
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: hovered ? "#f6ebff" : "white",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <MessageOutlined
                  style={{
                    fontSize: "clamp(1em, 2vw, 1.5em)",
                    color: "var(--iconmagic)",
                  }}
                />
              </Space>
              <Space
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: hovered ? "#f6ebff" : "white",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <BarChartOutlined
                  style={{
                    fontSize: "clamp(1em, 2vw, 1.5em)",
                    color: "var(--iconmagic)",
                  }}
                />
              </Space>
              <Space
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Menu
                  theme="light"
                  defaultSelectedKeys={[selectedMenuItem]}
                  // onClick={handleMenuClick}
                  collapsible={true}
                  collapsedWidth={80}
                  style={{ border: "none" }}
                >
                  {/* MAVE Admin */}
                  <Menu.SubMenu
                    key="mave-admin"
                    icon={
                      <Image
                        src="/icons/mave_icons/user.svg"
                        preview={false}
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                    }
                    style={{
                      width: "80px",
                      height: "auto",
                    }}
                  >
                    {token ? (
                      <>
                        {/* profile, dashboard, logout */}
                        <Menu.Item
                          key="1"
                          icon={<UserOutlined />}
                          onClick={() => router.push("/profile")}
                        >
                          Profile
                        </Menu.Item>
                        <Menu.Item
                          key="2"
                          icon={<UserOutlined />}
                          onClick={() => router.push("/dashboard")}
                        >
                          Dashboard
                        </Menu.Item>
                        <Menu.Item
                          key="3"
                          icon={<UserOutlined />}
                          onClick={() => null}
                        >
                          Settings
                        </Menu.Item>
                        <Menu.Item
                          key="4"
                          icon={<UserOutlined />}
                          onClick={() => null}
                        >
                          Help
                        </Menu.Item>

                        <Menu.Item
                          key="5"
                          icon={<UserOutlined />}
                          onClick={handleLogout}
                        >
                          Logout
                        </Menu.Item>
                      </>
                    ) : (
                      <>
                        <Menu.Item
                          key="6"
                          icon={<LoginOutlined />}
                          onClick={() => setIsModalOpen(true)}
                        >
                          Login
                        </Menu.Item>
                      </>
                    )}
                  </Menu.SubMenu>
                </Menu>
              </Space>
            </Space>
          </Space>
        </>
      ) : (
        <Space
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "1vw",
          }}
        >
          <div
            style={{
              fontSize: "clamp(0.8em, 1.5vw, 1.1em)",
              color: "#6B7A99",
              fontWeight: 600,
              borderRadius: "5px",
              padding: "5px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </div>
        </Space>
      )}
    </Header>
  );
}
