import {
  BarChartOutlined,
  BellOutlined,
  MessageOutlined,
  SearchOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Image, Input, List, Space, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
const { Header } = Layout;
import router from "next/router";
import Login from "../Login";

import TopNavData from "../../src/data/topnavdata.json";

export default function NavItems({
  user,
  token,
  handleLogout,
  isModalOpen,
  setIsModalOpen,
  theme,
  setTheme,
}) {
  const [hovered, setHovered] = useState(false);
  const [topNavData, setTopNavData] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Home");

  useEffect(() => {
    TopNavData && setTopNavData(TopNavData);
  }, [TopNavData]);

  return (
    <Header
      className="site-layout-background"
      style={{
        position: "fixed",
        width: "100vw",
        height: "8vh",
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "1fr 3fr 2fr 2fr",
        gridGap: "3rem",
        padding: "0 20px",
        backgroundColor: theme === "dark" ? "#001529" : "white",
        boxShadow:
          theme === "dark" ? "0 2px 8px #f0f1f250" : "0 2px 8px #f0f1f2",
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
          className="sitelogo"
          src={
            theme === "dark"
              ? "/images/Mave_Logo_Dark.png"
              : "/images/Mave_Logo_Lite.png"
          }
          alt="Mave Logo"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/mave_logo_horizontal_core.png";
          }}
          preview={false}
          style={{
            height: "3vh",
            marginLeft: "10px",
            objectFit: "contain",
            backgroundColor: theme === "dark" ? "#001529" : "white",
            marginLeft: "2vw",
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
              gap: "0.5vw",
              paddingTop: "1vh",
            }}
          >
            {topNavData &&
              topNavData.map((item) => (
                <div
                  key={item.id}
                  style={{
                    fontSize: "clamp(0.8em, 1.5vw, 1.1em)",
                    lineHeight: "1.5",
                    color:
                      theme === "dark"
                        ? selectedMenuItem === item.name
                          ? "#1677ff"
                          : "white"
                        : selectedMenuItem === item.name
                        ? "var(--theme)"
                        : "#6B7A99",
                    fontWeight: 600,
                    borderRadius: "16px",
                    padding: "5px 20px",
                    backgroundColor:
                      selectedMenuItem === item.name ? "white" : "",
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
                marginBottom: "10px",
                backgroundColor: theme === "dark" ? "#001529" : "white",
                color: theme === "dark" ? "white" : "black",
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
                  backgroundColor: theme === "dark" ? "#001529" : "white",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Image
                  src="/icons/mave_icons/bell-ring.svg"
                  preview={false}
                  style={{
                    width: "clamp(1em, 2vw, 2em)",
                    height: "clamp(1em, 2vw, 2em)",
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
                  backgroundColor: theme === "dark" ? "#001529" : "white",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Image
                  src="/icons/mave_icons/chatting.svg"
                  preview={false}
                  style={{
                    width: "clamp(1em, 2vw, 2em)",
                    height: "clamp(1em, 2vw, 2em)",
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
                  backgroundColor: theme === "dark" ? "#001529" : "white",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Image
                  src="/icons/mave_icons/wrench.svg"
                  preview={false}
                  style={{
                    width: "clamp(1em, 2vw, 1.6em)",
                    height: "clamp(1em, 2vw, 1.6em)",
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
                  backgroundColor: theme === "dark" ? "#001529" : "white",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Menu
                  theme={theme}
                  defaultSelectedKeys={[selectedMenuItem]}
                  collapsible={true}
                  collapsedWidth={80}
                  style={{ border: "none" }}
                  mode="vertical"
                >
                  <Menu.SubMenu
                    key="mave-admin"
                    icon={
                      <Image
                        src="/icons/mave_icons/user.svg"
                        preview={false}
                        style={{
                          width: "clamp(1em, 2vw, 1.6em)",
                          height: "clamp(1em, 2vw, 1.6em)",
                        }}
                      />
                    }
                    style={{
                      width: "80px",
                      height: "auto",
                      paddingTop: "10px",
                    }}
                  >
                    {token ? (
                      <>
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
