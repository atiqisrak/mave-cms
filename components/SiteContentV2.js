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
  const [sideMenuData, setSideMenuData] = useState(null);
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

  // console.log("Side Menu Data: ", sideMenuData);

  return (
    <>
      <Layout
        hasSider
        style={{
          height: "100%",
        }}
      >
        <NavItems />
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
            <SideMenuItems
              sideMenuData={sideMenuData}
              setSelectedMenuItem={setSelectedMenuItem}
              setLoading={setLoading}
              token={token}
              user={user}
              loading={loading}
              setSideMenuData={setSideMenuData}
              handleLogout={handleLogout}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
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
