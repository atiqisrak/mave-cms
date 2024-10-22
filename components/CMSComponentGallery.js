import React, { useContext, useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Image,
  Collapse,
  Avatar,
  message,
  Button,
  Switch,
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
  AppstoreOutlined,
  MailOutlined,
  ProfileOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import GLOBAL_CONTEXT from "../src/context/context";

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Panel } = Collapse;

const CMSComponentGallery = ({ children, router }) => {
  const [open, setOpen] = useState(false);
  const [creatormode, setCreatormode] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [response, setResponse] = useState();
  const { setContextToken } = useContext(GLOBAL_CONTEXT);
  useEffect(() => {
    // Check if a token is stored in localStorage when the component mounts
    const storedToken = localStorage.getItem("token");
    const users = localStorage.getItem("user");
    const user_Parse = JSON.parse(users);
    if (storedToken && user_Parse) {
      setToken(storedToken);
      setUser(user_Parse);
    }
  }, [response]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (item) => {
    setSelectedMenuItem(item.key);
  };

  // modal area

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

  // Toggle Creator Mode
  const toggleCreatorMode = () => {
    setCreatormode(!creatormode);
    localStorage.setItem("creatormode", !creatormode);
    creatormode ? router.push("/dashboard") : router.push("/pages");
  };

  return (
    <>
      <Sider
        trigger={null}
        collapsible
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
              v 1.1
            </h3>

            {/* Slider Switch Toggle for creator mode */}
            {token ? (
              <Switch
                style={{
                  width: "6vw",
                  background: "var(--themes)",
                }}
                checkedChildren="Creator"
                unCheckedChildren="Admin"
                onChange={() => toggleCreatorMode()}
                checked={creatormode ? true : false}
              />
            ) : null}

            {/* <Link href="/dashboard" className="sitelogo"> */}
            {collapsed ? (
              <Image
                className="sitelogo"
                src="/images/mave_logo.png"
                width={40} // Adjust the collapsed logo width
                height={40} // Adjust the collapsed logo height
                resizemode="contain"
                preview={false}
                onClick={() => {
                  router.push("/");
                }}
              />
            ) : (
              <Image
                className="sitelogo"
                // src="/images/mave_logo_horizontal.png"
                // width={629 / 4}
                // height={301 / 4}

                src="/images/mave_logo_vertical.png"
                width={950 / 4}
                height={871 / 4}
                resizemode="contain"
                preview={false}
                onClick={() => {
                  router.push("/");
                }}
              />
            )}
            {/* </Link> */}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[selectedMenuItem]}
            onClick={handleMenuClick}
            collapsible
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
                  <Menu.Item
                    key="99"
                    icon={<LoginOutlined />}
                    onClick={() => toggleCreatorMode()}
                  >
                    Create Page
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

                {/* Pages */}
                <SubMenu
                  key="pages"
                  icon={<DesktopOutlined />}
                  title="Pages"
                  style={{
                    marginTop: "10%",
                    fontSize: "1.1em",
                    fontWeight: "bold",
                  }}
                >
                  <Menu.Item
                    key="20"
                    icon={<FontSizeOutlined />}
                    onClick={() => router.push("/home")}
                  >
                    Home
                  </Menu.Item>
                  <Menu.Item
                    key="15"
                    icon={<FontSizeOutlined />}
                    onClick={() => router.push("/about")}
                  >
                    About
                  </Menu.Item>
                  <Menu.Item
                    key="16"
                    icon={<BoxPlotOutlined />}
                    onClick={() => router.push("/cylindergas")}
                  >
                    Cylinder Gas
                  </Menu.Item>
                  <Menu.Item
                    key="17"
                    icon={<BoxPlotOutlined />}
                    onClick={() => router.push("/autogas")}
                  >
                    Auto Gas
                  </Menu.Item>
                  <Menu.Item
                    key="18"
                    icon={<BoxPlotOutlined />}
                    onClick={() => router.push("/bulkgas")}
                  >
                    Bulk Gas
                  </Menu.Item>
                  <Menu.Item
                    key="21"
                    icon={<BoxPlotOutlined />}
                    onClick={() => router.push("/healthandsafety")}
                  >
                    Health & Safety
                  </Menu.Item>
                  <Menu.Item
                    key="22"
                    icon={<BoxPlotOutlined />}
                    onClick={() => router.push("/news")}
                  >
                    News & Media
                  </Menu.Item>
                </SubMenu>

                {/* Orders */}
                <SubMenu
                  key="orders"
                  icon={<AppstoreOutlined />}
                  title="Order Management"
                  style={{
                    marginTop: "10%",
                    fontSize: "1.1em",
                    fontWeight: "bold",
                  }}
                >
                  <Menu.Item
                    key="25"
                    icon={<AppstoreOutlined />}
                    onClick={() => router.push("/orders")}
                  >
                    All Orders
                  </Menu.Item>
                  <Menu.Item
                    key="26"
                    icon={<AppstoreOutlined />}
                    onClick={() => router.push("/gases")}
                  >
                    Gases
                  </Menu.Item>
                  <Menu.Item
                    key="27"
                    icon={<AppstoreOutlined />}
                    onClick={() => router.push("/dealership")}
                  >
                    Dealership Opportunities
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
              </>
            ) : (
              ""
            )}
          </Menu>
          {children}
        </div>
      </Sider>
    </>
  );
};

export default CMSComponentGallery;
