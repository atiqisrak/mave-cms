"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Image,
  Collapse,
  Avatar,
  message,
  Switch,
  Button,
  Modal,
} from "antd";
import {
  UserOutlined,
  LoginOutlined,
  DesktopOutlined,
  BlockOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  PicRightOutlined,
  FileImageOutlined,
  MenuOutlined,
  PicCenterOutlined,
  SlidersOutlined,
  IdcardOutlined,
  FormOutlined,
  FontSizeOutlined,
  BoxPlotOutlined,
  SettingOutlined,
  AppstoreOutlined,
  MailOutlined,
  ProfileOutlined,
  SwitcherOutlined,
  FormatPainterOutlined,
  DollarCircleOutlined,
  AlignLeftOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  VideoCameraOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import Login from "./Login";
import GLOBAL_CONTEXT from "../src/context/context";

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Panel } = Collapse;

export default function SiteContent({ children }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [response, setResponse] = useState();
  const { setContextToken } = useContext(GLOBAL_CONTEXT);
  const [creatorMode, setCreatorMode] = useState(false);
  // const localCreatormode = localStorage.getItem("creatorMode");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const users = localStorage.getItem("user");
    const user_Parse = JSON.parse(users);
    if (storedToken && user_Parse) {
      setToken(storedToken);
      setUser(user_Parse);
    }
    localStorage.setItem("creatorMode", creatorMode);
  }, [response]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (item) => {
    setSelectedMenuItem(item.key);
  };

  // modal area

  const handleLogout = () => {
    message.success("Log out successfully");
    // Clear the token from state and localStorage
    setToken(null);
    setContextToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const GoCreatorMode = () => {
    setCreatorMode(true);
    localStorage.setItem("creatorMode", true);
    router.push("/creator");
  };

  return (
    <>
      <Layout>
        <div
          className="header-area"
          style={{
            position: "fixed",
            top: 0,
            right: 200,
            cursor: "pointer",
            zIndex: 99,
          }}
        >
          {creatorMode == true ? (
            ""
          ) : (
            <div
              className="collapse-button"
              style={{
                position: "fixed",
                top: 20,
                left: collapsed ? 20 : 230,
                cursor: "pointer",
                zIndex: 999,
                background: "var(--theme)",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "0 10px 0 10px",
              }}
              onClick={() => handleCollapse(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          )}

          <div className="sider-area">
            <Menu
              theme="light"
              // mode="inline"
              defaultSelectedKeys={[selectedMenuItem]}
              onClick={handleMenuClick}
              collapsible={true}
              collapsedWidth={80}
              style={{ border: "none" }}
            >
              {/* MAVE Admin */}
              <SubMenu
                key="mave-admin"
                icon={<UserOutlined style={{ fontSize: "1.5rem" }} />}
                // title="MAVE Admin"
                style={{
                  marginTop: "20%",
                  fontSize: "1.1em",
                  fontWeight: "bold",
                }}
              >
                {token ? (
                  <>
                    <Menu.Item
                      icon={<UserOutlined />}
                      key="1"
                      onClick={() => router.push("/profile")}
                    >
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      key="2"
                      icon={<PicRightOutlined />}
                      onClick={() => router.push("/dashboard")}
                    >
                      Dashboard
                    </Menu.Item>
                  </>
                ) : (
                  <Menu.Item
                    key="6"
                    icon={<LoginOutlined />}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Login
                  </Menu.Item>
                )}

                {token ? (
                  <Menu.Item
                    icon={<LoginOutlined />}
                    key="3"
                    onClick={() => handleLogout()}
                  >
                    Log out
                  </Menu.Item>
                ) : (
                  ""
                )}
              </SubMenu>
            </Menu>
          </div>
        </div>

        {creatorMode == false ? (
          <Sider
            trigger={null}
            collapsible={true}
            collapsed={collapsed}
            onCollapse={handleCollapse}
            breakpoint="md"
            collapsedWidth={80}
            width={260}
            theme="lite"
            style={{
              overflow: "auto",
              position: "fixed",
              zIndex: 1,
              height: "100%",
              left: 0,
              top: 0,
              borderRadius: "0 10px 10px 0",
              paddingTop: 30,
            }}
          >
            <div>
              <div
                className="logoholder"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 30,
                  paddingTop: 40,
                }}
              >
                <h3
                  style={{
                    color: "var(--gray)",
                  }}
                >
                  v 0.1.96
                </h3>
                <Link href="/dashboard" className="sitelogo">
                  {collapsed ? (
                    <Image
                      className="sitelogo"
                      src="/images/mave_logo.png"
                      width={40} // Adjust the collapsed logo width
                      height={40} // Adjust the collapsed logo height
                      resizeMode="contain"
                      preview={false}
                    />
                  ) : (
                    <Image
                      className="sitelogo"
                      src="/images/mave_logo_horizontal.png"
                      width={629 / 4}
                      height={301 / 4}
                      resizeMode="contain"
                      preview={false}
                    />
                  )}
                </Link>
              </div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[selectedMenuItem]}
                onClick={handleMenuClick}
                collapsible={true}
                collapsedWidth={80}
              >
                {/* MAVE Admin */}
                <SubMenu
                  key="mave-admin"
                  icon={<UserOutlined />}
                  title="MAVE Admin"
                  style={{
                    marginTop: "20%",
                    fontSize: "1.1em",
                    fontWeight: "bold",
                  }}
                >
                  {token ? (
                    <>
                      <Menu.Item
                        key="4"
                        icon={<PicRightOutlined />}
                        onClick={() => router.push("/dashboard")}
                      >
                        Dashboard
                      </Menu.Item>
                      <Menu.Item
                        key="5"
                        icon={<LoginOutlined />}
                        onClick={() => router.push("/profile")}
                      >
                        {user.name}
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
                  {token ? (
                    <Menu.Item
                      key="7"
                      icon={<LogoutOutlined />}
                      onClick={() => handleLogout()}
                    >
                      Log out
                    </Menu.Item>
                  ) : (
                    ""
                  )}
                </SubMenu>
                {token ? (
                  <>
                    {/* Components */}
                    <SubMenu
                      key="components"
                      icon={<BlockOutlined />}
                      title="Components"
                      style={{
                        marginTop: "10%",
                        fontSize: "1.1em",
                        fontWeight: "bold",
                      }}
                    >
                      <Menu.Item
                        key="8"
                        icon={<FileImageOutlined />}
                        onClick={() => router.push("/gallery")}
                      >
                        Media Library
                      </Menu.Item>
                      <Menu.Item
                        key="9"
                        icon={<MenuOutlined />}
                        onClick={() => router.push("/menuitems")}
                      >
                        Menu Items
                      </Menu.Item>
                      <Menu.Item
                        key="10"
                        icon={<MenuOutlined />}
                        onClick={() => router.push("/menus")}
                      >
                        Menus
                      </Menu.Item>
                      <Menu.Item
                        key="11"
                        icon={<PicCenterOutlined />}
                        onClick={() => router.push("/navbars")}
                      >
                        Navbars
                      </Menu.Item>
                      <Menu.Item
                        key="12"
                        icon={<SlidersOutlined />}
                        onClick={() => router.push("/sliders")}
                      >
                        Sliders
                      </Menu.Item>
                      <Menu.Item
                        key="13"
                        icon={<IdcardOutlined />}
                        onClick={() => router.push("/cards")}
                      >
                        Cards
                      </Menu.Item>
                      <Menu.Item
                        key="23"
                        icon={<ProfileOutlined />}
                        onClick={() => router.push("/pressrelease")}
                      >
                        Press Release
                      </Menu.Item>
                      <Menu.Item
                        key="24"
                        icon={<SwitcherOutlined />}
                        onClick={() => router.push("/events")}
                      >
                        Events
                      </Menu.Item>
                      <Menu.Item
                        key="14"
                        icon={<FormOutlined />}
                        onClick={() => router.push("/forms")}
                      >
                        Forms
                      </Menu.Item>
                      <Menu.Item
                        key="19"
                        icon={<BoxPlotOutlined />}
                        onClick={() => router.push("/footer")}
                      >
                        Footers
                      </Menu.Item>
                    </SubMenu>

                    {/* Form Responses */}
                    <Menu.Item
                      key="28"
                      icon={<MailOutlined />}
                      onClick={() => router.push("/formresponses")}
                      style={{
                        marginTop: "10%",
                        fontSize: "1.1em",
                        fontWeight: "bold",
                      }}
                    >
                      Form Responses
                    </Menu.Item>


                    {/* only admin can see this */}
                    <SubMenu
                      key="creatortools"
                      icon={<FormatPainterOutlined />}
                      title="Creator Studio"
                      style={{
                        marginTop: "10%",
                        fontSize: "1.1em",
                        fontWeight: "bold",
                      }}
                    >
                      <Menu.Item
                        key="29"
                        icon={<DollarCircleOutlined />}
                        onClick={() => router.push("/creator/pages")}
                        style={{
                          marginTop: "10%",
                          fontSize: "1.1em",
                          fontWeight: "bold",
                        }}
                      >
                        Pages
                      </Menu.Item>
                      <Menu.Item
                        key="30"
                        icon={<AlignLeftOutlined />}
                        onClick={() => router.push("/blogs")}
                        style={{
                          marginTop: "10%",
                          fontSize: "1.1em",
                          fontWeight: "bold",
                        }}>
                        Blogs
                      </Menu.Item>
                      {/* Tools */}
                      <Menu.Item
                        key="15"
                        icon={<SettingOutlined />}
                        style={{
                          marginTop: "10%",
                          fontSize: "1.1em",
                          fontWeight: "bold",
                        }}
                        onClick={() => router.push("/tools")}
                      >
                        Tools
                      </Menu.Item>
                    </SubMenu>

                    {/* Manual */}
                    <SubMenu
                      key="manual"
                      icon={<FileTextOutlined />}
                      title="User Manual"
                      style={{
                        marginTop: "10%",
                        fontSize: "1.1em",
                        fontWeight: "bold",
                      }}
                    >
                      <Menu.Item
                        key="16"
                        icon={<ClockCircleOutlined />}
                        onClick={() => router.push("/usermanual/changelog")}
                      >
                        Changelog
                      </Menu.Item>
                      <Menu.Item
                        key="17"
                        icon={<FileTextOutlined />}
                        onClick={() => router.push("/usermanual/documentation")}
                      >
                        Documentation
                      </Menu.Item>
                      <Menu.Item
                        key="18"
                        icon={<VideoCameraOutlined />}
                        onClick={() => router.push("/usermanual/userguide")}
                      >
                        User Guide
                      </Menu.Item>
                      <Menu.Item
                        key="20"
                        icon={<MessageOutlined />}
                        onClick={() => router.push("/usermanual/support")}
                      >
                        Support
                      </Menu.Item>
                    </SubMenu>
                  </>
                ) : (
                  ""
                )}
              </Menu>
              {children}
            </div>
          </Sider>
        ) : (
          ""
        )}
      </Layout>
      <Login
        open={isModalOpen}
        setOpen={setIsModalOpen}
        response={response}
        setResponse={setResponse}
      />
    </>
  );
}
