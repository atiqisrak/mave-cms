import {
  BarChartOutlined,
  BellOutlined,
  MessageOutlined,
  SearchOutlined,
  UserOutlined,
  LoginOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Image,
  Input,
  List,
  Space,
  Layout,
  Menu,
  Dropdown,
  Button,
} from "antd";
import { useEffect, useState } from "react";
const { Header } = Layout;
import router from "next/router";
import Login from "../Login";
import Changelog from "../../pages/usermanual/changelog.json";
import TopNavData from "../../src/data/topnavdata.json";
import Link from "next/link";

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
  const [itemType, setItemType] = useState(null);
  const [changeLogs, setChangeLogs] = useState([]);

  useEffect(() => {
    TopNavData && setTopNavData(TopNavData);
    setChangeLogs(Changelog);
  }, [TopNavData]);

  const settingItems = [
    {
      key: "sub1",
      label: "General Settings",
      items: [
        {
          key: "1-1",
          label: <Link href="/settings/general">General</Link>,
        },
        {
          key: "1-2",
          label: (
            <Link href="/settings/email-notification">
              Email & Notification
            </Link>
          ),
        },
        {
          key: "1-3",
          label: (
            <Link href="/settings/licensing-updates">Licensing & Updates</Link>
          ),
        },
      ],
    },
    {
      key: "sub2",
      label: "User and Content Management",
      items: [
        {
          key: "2-1",
          label: <Link href="/settings/user-management">User Management</Link>,
        },
        {
          key: "2-2",
          label: (
            <Link href="/settings/content-management">Content Management</Link>
          ),
        },
        {
          key: "2-3",
          label: (
            <Link href="/settings/social-media-integration">
              Social Media Integration
            </Link>
          ),
        },
      ],
    },
    {
      key: "sub3",
      label: "API and System Settings",
      items: [
        {
          key: "3-1",
          label: <Link href="/settings/api-settings">API Settings</Link>,
        },
        {
          key: "3-2",
          label: <Link href="/settings/server-system">Server & System</Link>,
        },
        {
          key: "3-3",
          label: <Link href="/settings/cdn">CDN</Link>,
        },
        {
          key: "3-4",
          label: <Link href="/settings/ai-analytics">AI & Analytics</Link>,
        },
        {
          key: "3-5",
          label: <Link href="/settings/security">Security</Link>,
        },
      ],
    },
    {
      key: "sub4",
      label: "Customization and Integration",
      items: [
        {
          key: "4-1",
          label: (
            <Link href="/settings/plugins-extensions">
              Plugins & Extensions
            </Link>
          ),
        },
        {
          key: "4-2",
          label: <Link href="/settings/customization">Customization</Link>,
        },
      ],
    },
  ];
  const userItems = [
    {
      key: "1",
      label: <Link href="/user/profile">Profile</Link>,
    },
    {
      key: "2",
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "3",
      label: "Help",
    },
    {
      key: "4",
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ];

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
          gap: "0.5vw",
        }}
        onClick={() => router.push("/")}
      >
        <Image
          className="sitelogo"
          // src={
          //   theme === "dark"
          //     ? "/images/Mave_Logo_Dark.png"
          //     : "/images/Mave_Logo_Lite.png"
          // }
          src="/images/ui/mave_new_logo.png"
          alt="Mave Logo"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/mave_logo_horizontal_core.png";
          }}
          preview={false}
          style={{
            height: "5vh",
            marginLeft: "10px",
            objectFit: "contain",
            backgroundColor: theme === "dark" ? "#001529" : "white",
            marginLeft: "1vw",
          }}
        />
        {/* Version */}
        <Link href={"/usermanual/changelog"}>
          <h3
            style={{
              color: "white",
              fontSize: "1em",
              backgroundColor: theme === "dark" ? "#001529" : "var(--theme)",
              height: "2.5vh",
              fontWeight: "bold",
              padding: "8px 10px",
              borderRadius: "5px 0 5px 0",
              position: "absolute",
              zIndex: 1,
              left: "11.5vw",
              top: 26,
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {changeLogs && changeLogs.length > 0
              ? changeLogs[0].version
              : "v 1.0.0"}
          </h3>
        </Link>
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
              {/* <Space
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
              </Space> */}

              {/* Settings */}
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
              >
                <Button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme === "dark" ? "#001529" : "white",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "none",
                  }}
                  onClick={() => router.push("/settings")}
                >
                  <Image
                    src="/icons/mave_icons/wrench.svg"
                    preview={false}
                    style={{
                      width: "clamp(1em, 2vw, 1.6em)",
                      height: "clamp(1em, 2vw, 1.6em)",
                    }}
                  />
                </Button>
              </Space>
              {/* <Space
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: theme === "dark" ? "#001529" : "white",
                }}
                onMouseEnter={() => {
                  setHovered(true);
                }}
                onMouseLeave={() => {
                  setHovered(false);
                }}
                onClick={() => router.push("/settings")}
              >
                <Dropdown
                  menu={{
                    items: settingItems,
                  }}
                  placement="bottomLeft"
                  overlayStyle={{
                    backgroundColor: theme === "dark" ? "#001529" : "white",
                    color: theme === "dark" ? "white" : "black",
                  }}
                >
                  <Space>
                    <Image
                      src="/icons/mave_icons/wrench.svg"
                      preview={false}
                      style={{
                        width: "clamp(1em, 2vw, 1.6em)",
                        height: "clamp(1em, 2vw, 1.6em)",
                      }}
                    />
                  </Space>
                </Dropdown>
              </Space> */}

              {/* User */}
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
                <Dropdown
                  menu={{
                    items: userItems,
                  }}
                  placement="bottom"
                >
                  <Space>
                    <Image
                      src="/icons/mave_icons/user.svg"
                      preview={false}
                      style={{
                        width: "clamp(1em, 2vw, 1.6em)",
                        height: "clamp(1em, 2vw, 1.6em)",
                      }}
                    />
                  </Space>
                </Dropdown>
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
