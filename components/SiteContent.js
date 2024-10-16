// components/SiteContent.js

import React, { useEffect, useState } from "react";
import { Image, Layout } from "antd";
import { useRouter } from "next/router";
import { useAuth } from "../src/context/AuthContext";
import NavItems from "./ui/NavItems";
import SideMenuItems from "./ui/SideMenuItems";
import Loader from "./Loader";

const { Sider, Content, Header } = Layout;

const SiteContent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");
  const { user, token, logout, loading } = useAuth();
  const router = useRouter();
  const currentRoute = router.pathname;

  const authPages = ["/login", "/signup", "/forgot-password"];

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("darkmode");
      if (storedTheme) {
        setTheme(storedTheme === "true" ? "dark" : "light");
      }
    } catch (error) {
      console.warn("localStorage is not available. Using default theme.");
    }

    const handleThemeChange = () => {
      try {
        const updatedTheme = localStorage.getItem("darkmode");
        if (updatedTheme) {
          setTheme(updatedTheme === "true" ? "dark" : "light");
        }
      } catch (error) {
        console.warn("localStorage is not available. Theme not updated.");
      }
    };

    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  useEffect(() => {
    if (loading) {
      // Do nothing while loading
      return;
    }
    if (!loading) {
      if (!token && !authPages.includes(currentRoute)) {
        router.push("/login");
      } else if (token && authPages.includes(currentRoute)) {
        router.push("/");
      }
    }
  }, [token, loading, currentRoute, router]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  if (loading) return <Loader />;
  if (authPages.includes(currentRoute)) {
    return <Content style={{ minHeight: "100vh" }}>{children}</Content>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          padding: 0,
          backgroundColor: theme === "dark" ? "#001529" : "#ffffff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <NavItems
          user={user}
          token={token}
          handleLogout={logout}
          theme={theme}
          setTheme={setTheme}
        />
      </Header>
      <Layout style={{ marginTop: "64px", padding: 0 }}>
        <div
          className="collapse-button"
          style={{
            position: "fixed",
            top: 90,
            left: collapsed ? 30 : 226,
            cursor: "pointer",
            color: "#fff",
            zIndex: 1200,
            transition: "left 0.5s",
          }}
          onClick={() => handleCollapse(!collapsed)}
        >
          {collapsed ? (
            <Image
              src="/icons/mave_icons/expand.svg"
              alt="Expand"
              preview={false}
              style={{
                height: "4vh",
                marginLeft: "10px",
                objectFit: "contain",
              }}
            />
          ) : (
            <Image
              src="/icons/mave_icons/collapse.svg"
              alt="Collapse"
              preview={false}
              style={{
                height: "4vh",
                marginLeft: "10px",
                objectFit: "contain",
                zIndex: 1201,
              }}
            />
          )}
        </div>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
          theme={theme}
          width={260}
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 64,
            bottom: 0,
            padding: "4rem 1.4rem 0 1.4rem",
            borderRight: "1px solid #f0f0f0",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)",
            transition: "all 0.5s",
          }}
        >
          <SideMenuItems
            token={token}
            user={user}
            handleLogout={logout}
            collapsed={collapsed}
            theme={theme}
            setTheme={setTheme}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            transition: "margin-left 0.5s, padding-left 0.5s",
          }}
        >
          <Content
            style={{
              padding: "24px",
              marginTop: 0,
              transition: "all 0.3s",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SiteContent;
