"use client";

import React, { Fragment, useContext, useEffect, useState } from "react";
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
import Icon, {
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
  FilePdfOutlined,
  RightCircleOutlined,
  ArrowRightOutlined,
  QuestionCircleOutlined,
  CalculatorOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import Login from "./Login";
import GLOBAL_CONTEXT from "../src/context/context";
import iconsNames from "../public/data.js";
const { Sider } = Layout;
const { SubMenu } = Menu;
const { Panel } = Collapse;
import Changelog from "../pages/usermanual/changelog.json";
import { renderToString } from "react-dom/server";
// import Icon from "@ant-design/icons/lib/components/Icon";

const SiteContent = ({ children, collapsed, setCollapsed }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [response, setResponse] = useState();
  const { setContextToken } = useContext(GLOBAL_CONTEXT);
  const [creatorMode, setCreatorMode] = useState(false);
  const [changeLogs, setChangeLogs] = useState([]);
  const [sideMenuData, setSideMenuData] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const users = localStorage.getItem("user");
    const user_Parse = JSON.parse(users);
    if (storedToken && user_Parse) {
      setToken(storedToken);
      setUser(user_Parse);
    }
    localStorage.setItem("creatorMode", creatorMode);

    setChangeLogs(Changelog);
  }, [response]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (item) => {
    setSelectedMenuItem(item.key);
  };

  const handleLogout = () => {
    console.log("Log out successfully");
    // Clear the token from state and localStorage
    setToken(null);
    setContextToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("creatormode");
    localStorage.removeItem("niloy");
  };

  const GoCreatorMode = () => {
    setCreatorMode(true);
    localStorage.setItem("creatorMode", true);
    router.push("/creator");
  };

  const renderUnAuthorizedMenuItems = () => {
    return (
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
          icon={<PicRightOutlined />}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<LoginOutlined />}
          onClick={() => handleLogout()}
        >
          Log out
        </Menu.Item>
      </>
    );
  };

  useEffect(() => {
    fetch("/api/authorisedsidemenu")
      .then((res) => res.json())
      .then((data) => {
        setSideMenuData(data);
      });
  }, []);

  const renderAuthorizedMenuItems = () => {
    return (
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
            Gallery
          </Menu.Item>
          {/* <Menu.Item
            key="32"
            icon={<FilePdfOutlined />}
            onClick={() => router.push("/documents")}
          >
            Documents
          </Menu.Item> */}

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
            }}
          >
            Blogs
          </Menu.Item>
          <Menu.Item
            key="56"
            icon={<PlusCircleOutlined />}
            onClick={() => router.push("/blogs/createblog")}
            style={{
              marginTop: "10%",
              fontSize: "1.1em",
              fontWeight: "bold",
            }}
          >
            Create Blog
          </Menu.Item>
          {/* Tools */}
          {/* <Menu.Item
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
          </Menu.Item> */}
          {/* Support */}
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
            key="21"
            icon={<QuestionCircleOutlined />}
            onClick={() => router.push("/usermanual/faq")}
          >
            FAQ
          </Menu.Item>
          <Menu.Item
            key="20"
            icon={<MessageOutlined />}
            onClick={() => router.push("/usermanual/support")}
          >
            Support
          </Menu.Item>
          <Menu.Item
            key="22"
            icon={<CompassOutlined />}
            onClick={() => router.push("/compare")}
          >
            Compare
          </Menu.Item>
        </SubMenu>

        {/* {sideMenuData &&
          sideMenuData.map((item, index) => {
            return item?.submenu?.length > 0 ? (
              <SubMenu
                key={item.menu}
                icon={<CalculatorOutlined />}
                title={item.menu}
                style={{
                  marginTop: "10%",
                  fontSize: "1.1em",
                  fontWeight: "bold",
                }}
              >
                {item?.submenu?.map((subItem, subIndex) => {
                  return (
                    <Menu.Item
                      key={subItem.subMenu}
                      icon={<CalculatorOutlined />}
                      onClick={() => router.push(subItem.url)}
                    >
                      {subItem.title}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            ) : item?.icon ? (
              <Menu.Item
                key={item.menu}
                // icon={<Icon component={item?.icon} />}
                onClick={() => router.push(item.url)}
                style={{
                  marginTop: "10%",
                  fontSize: "1.1em",
                  fontWeight: "bold",
                }}
              >
                {React.createElement(iconsNames[item.icon])}
                {console.log("Icon", item?.icon)}
                {item.menu}
              </Menu.Item>
            ) : (
              "not found"
            );
            // ""
          })} */}
      </>
    );
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
                // icon={<UserOutlined style={{ fontSize: "1.5rem" }} />}
                icon={
                  <Image
                    src="/images/profile_avatar.png"
                    preview={false}
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                }
                style={{
                  marginTop: "20%",
                  width: "100px",
                  height: "auto",
                }}
              >
                {token ? (
                  renderUnAuthorizedMenuItems()
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
              </SubMenu>
            </Menu>
          </div>
        </div>
        {creatorMode == false ? (
          <>
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
                zIndex: 9,
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
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Link href={"/usermanual/changelog"}>
                      <h3
                        style={{
                          color: "var(--theme)",
                          fontSize: collapsed ? "1em" : "1.2em",
                          fontWeight: "bold",
                          backgroundColor: "white",
                          padding: "8px 10px",
                          borderRadius: "5px 0 5px 0",
                          position: collapsed ? "relative" : "absolute",
                          zIndex: 1,
                          right: collapsed ? "" : 5,
                          top: collapsed ? "" : 70,
                          cursor: "pointer",
                        }}
                      >
                        {changeLogs && changeLogs.length > 0
                          ? changeLogs[0].version
                          : "v 1.0.0"}
                      </h3>
                    </Link>
                  </div>

                  <Link href="/dashboard" className="sitelogo">
                    {collapsed ? (
                      <Image
                        className="sitelogo"
                        // src="/images/mave_logo.png"
                        src="/images/mave_favicon.svg"
                        width={40}
                        height={40}
                        resizemode="contain"
                        preview={false}
                      />
                    ) : (
                      <Image
                        className="sitelogo"
                        // src="/images/mave_logo_horizontal.png"
                        // src="/images/mave_logo_horizontal_core.png"
                        // width={629 / 4}
                        // height={301 / 4}
                        src="/images/mave_logo_vertical.png"
                        width={950 / 4}
                        height={871 / 4}
                        resizemode="contain"
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
                      renderUnAuthorizedMenuItems()
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
                  </SubMenu>
                  {token ? renderAuthorizedMenuItems() : ""}
                </Menu>
                {children}
              </div>
            </Sider>
          </>
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
};
export default SiteContent;
