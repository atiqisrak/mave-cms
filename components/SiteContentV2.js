import React, { useContext, useEffect, useState } from "react";
import instance from "../axios";
import { useRouter } from "next/router";
import GLOBAL_CONTEXT from "../src/context/context";
import Changelog from "../pages/usermanual/changelog.json";
import Login from "./Login";
import { Image, Input, Layout, List, Menu, message, Radio, Tabs } from "antd";
const { Header, Sider, Content } = Layout;
import {
  BarChartOutlined,
  BellOutlined,
  BellTwoTone,
  CalculatorOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MessageOutlined,
  MessageTwoTone,
  NotificationFilled,
  ProfileTwoTone,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SideMenuItems from "./ui/SideMenuItems.js";
import NavItems from "./ui/NavItems.js";

const SiteContentV2 = ({ children }) => {
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
  const [sideMenuData, setSideMenuData] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("darkmode") === "true" ? "dark" : "light"
  );
  const router = useRouter();

  // Set Theme
  useEffect(() => {
    const interval = setInterval(() => {
      const theme =
        localStorage.getItem("darkmode") === "true" ? "dark" : "light";
      setTheme(theme);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
    setChangeLogs(Changelog);
  }, []);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // console.log("Side Menu Data: ", sideMenuData);

  return (
    <>
      <Layout
        hasSider
        style={{
          height: "100%",
        }}
      >
        <div
          className="collapse-button"
          style={{
            position: "fixed",
            top: 90,
            left: collapsed ? 30 : 250,
            cursor: "pointer",
            color: "#fff",
            zIndex: 1200,
            transition: "left 0.5s",
          }}
          onClick={() => handleCollapse(!collapsed)}
        >
          {/* {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} */}
          {collapsed ? (
            <Image
              src="/icons/mave_icons/expand.svg"
              alt="Mave Logo"
              preview={false}
              style={{
                height: "4vh",
                marginLeft: "10px",
                objectFit: "contain",
              }}
              onClick={() => handleCollapse(!collapsed)}
            />
          ) : (
            <Image
              src="/icons/mave_icons/collapse.svg"
              alt="Mave Logo"
              preview={false}
              style={{
                height: "4vh",
                marginLeft: "10px",
                objectFit: "contain",
                zIndex: 1201,
              }}
              onClick={() => handleCollapse(!collapsed)}
            />
          )}
        </div>
        <NavItems
          user={user}
          token={token}
          handleLogout={handleLogout}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          theme={theme}
          setTheme={setTheme}
        />
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
          theme={theme}
          collapsedWidth={130}
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          trigger={null}
          width={290}
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            padding: "0 1rem",
            border: "1px solid transparent",
            paddingTop: "7%",
            transition: "all 0.5s",
          }}
        >
          <SideMenuItems
            sideMenuData={sideMenuData}
            setLoading={setLoading}
            token={token}
            user={user}
            loading={loading}
            setSideMenuData={setSideMenuData}
            handleLogout={handleLogout}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            collapsed={collapsed}
            theme={theme}
            setTheme={setTheme}
          />
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
