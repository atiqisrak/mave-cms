import React, { useContext, useEffect, useState } from "react";
import instance from "../axios";
import { useRouter } from "next/router";
import GLOBAL_CONTEXT from "../src/context/context";
import Changelog from "../pages/usermanual/changelog.json";
import Login from "./Login";
import { Image, Input, Layout, List, Menu, message, Radio, Tabs } from "antd";
const { Header, Sider, Content } = Layout;
import iconsNames from "../public/data.js";
import {
  BarChartOutlined,
  BellOutlined,
  BellTwoTone,
  CalculatorOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MessageTwoTone,
  NotificationFilled,
  ProfileTwoTone,
  SearchOutlined,
} from "@ant-design/icons";

const SiteContentV2 = ({ children, collapsed, setCollapsed }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [response, setResponse] = useState();
  const { setContextToken } = useContext(GLOBAL_CONTEXT);
  const [creatorMode, setCreatorMode] = useState(false);
  const [changeLogs, setChangeLogs] = useState([]);
  const [sideMenuData, setSideMenuData] = useState();
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  // Fetch User Data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("token");
      const users = localStorage.getItem("user");
      const user_Parse = JSON.parse(users);
      if (storedToken && user_Parse) {
        setToken(storedToken);
        setUser(user_Parse);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Fetch side menu data (Authorised)
  const fetchAuthorisedSideMenuData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/authorisedsidemenu");

      if (response?.status === 304 || response?.status === 200) {
        const data = await response.json();
        setSideMenuData(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Fetch side menu data (Unauthorised)
  const fetchUnauthorisedSideMenuData = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/unauthorisedsidemenu");
      setSideMenuData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Render side menu items
  const renderSideMenuItems = () => {
    return sideMenuData && sideMenuData.length > 0 ? (
      sideMenuData?.map((item, index) => {
        return item?.submenu?.length > 0 ? (
          <Menu.SubMenu
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
                  onClick={() => {
                    setSelectedMenuItem(subItem.subMenu);
                    router.push(subItem.link);
                  }}
                >
                  {subItem.title}
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
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
      })
    ) : (
      <Menu.Item key="no-data">No data found</Menu.Item>
    );
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    message.success("Logged out successfully!");
    router.push("/");
  };

  useEffect(() => {
    fetchUserData();
    fetchAuthorisedSideMenuData();
    setChangeLogs(Changelog);

    user?.role_id === 1
      ? fetchAuthorisedSideMenuData()
      : fetchUnauthorisedSideMenuData();
  }, []);

  console.log("Side Menu Data: ", sideMenuData);

  return (
    <>
      <Layout
        hasSider
        style={{
          height: "100%",
        }}
      >
        <Header
          className="site-layout-background"
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 3fr 2fr 2fr",
            gridGap: "3rem",
            backgroundColor: "white",
            boxShadow: "0 2px 8px #f0f1f2",
          }}
        >
          {/* Logo */}
          <div>
            <Image
              className="sitelogo"
              src="/images/mave_logo_horizontal_core.png"
              alt="Mave Logo"
              resizeMode="contain"
              preview={false}
              style={{
                width: "200px",
                height: "50px",
                marginLeft: "10px",
                objectFit: "contain",
              }}
            />
          </div>
          {/* Menu items tabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: "20px",
            }}
          >
            <List
              grid={{
                gutter: 40,
                column: 5,
              }}
              dataSource={[
                { name: "Home", link: "/" },
                { name: "Dashboard", link: "/dashboard" },
                { name: "Pages", link: "/creator/pages" },
                { name: "Posts", link: "/posts" },
                { name: "Files", link: "/files" },
              ]}
              renderItem={(item) => (
                <List.Item
                  style={{
                    fontSize: "1.1em",
                    color:
                      selectedMenuItem === item.name
                        ? "var(--theme)"
                        : "#6B7A99",
                    fontWeight: 600,
                    //   backgroundColor:
                    //     selectedMenuItem === item.name ? "#f0f1f2" : "white",
                    borderRadius: "5px",
                    padding: "5px",
                    cursor: "pointer",
                    //   border: "1px solid #f0f1f2",
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
                </List.Item>
              )}
            />
          </div>

          {/* Search bar */}
          <div
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
                width: "80%",
                height: "40px",
                borderRadius: "20px",
                padding: "0 20px",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #f0f1f2",
                boxShadow: "inset 0 0 10px #f0f1f280",
              }}
            />
          </div>

          {/* Notification bell, Messages, Analytics, Profile */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                gap: "10px",
              }}
            >
              <div
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
                <BellTwoTone
                  style={{
                    fontSize: "1.5em",
                    color: "#6B7A99",
                  }}
                />
              </div>
              <div
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
                <MessageTwoTone
                  style={{
                    fontSize: "1.5em",
                    color: "#6B7A99",
                  }}
                />
              </div>
              <div
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
                    fontSize: "1.5em",
                    color: "#6B7A99",
                  }}
                />
              </div>
              <div
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
                <ProfileTwoTone
                  style={{
                    fontSize: "1.5em",
                    color: "#6B7A99",
                  }}
                />
              </div>
            </div>
          </div>
        </Header>
        <Layout
          className="site-layout"
          style={{
            marginLeft: collapsed ? 80 : 200,
            transition: "margin-left 0.5s",
          }}
        >
          {children}
        </Layout>
        <Sider
          breakpoint="lg"
          theme="light"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          trigger={null}
          width={collapsed ? 80 : 250}
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            top: 60,
            bottom: 0,
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            // defaultSelectedKeys={["1"]}
            defaultSelectedKeys={selectedMenuItem?.id}
            selectedKeys={[selectedMenuItem]}
            style={{ marginTop: "10%" }}
          >
            <Menu.Item
              key="1"
              icon={<HomeOutlined />}
              onClick={() => {
                setSelectedMenuItem("1");
                router.push("/");
              }}
            >
              Home
            </Menu.Item>
            {renderSideMenuItems()}
            {user ? (
              <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            ) : (
              <Menu.Item
                key="login"
                icon={<LoginOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Login
              </Menu.Item>
            )}
          </Menu>
        </Sider>
      </Layout>
      <Login
        open={isModalOpen}
        setOpen={setIsModalOpen}
        response={response}
        setResponse={setResponse}
        setToken={setToken}
        setUser={setUser}
        setContextToken={setContextToken}
      />
    </>
  );
};

export default SiteContentV2;
