// components/SiteContent.js

import React, { useEffect, useState } from "react";
import { Image, Layout } from "antd";
import { useRouter } from "next/router";
import NavItems from "./ui/NavItems";
import SideMenuItems from "./ui/SideMenuItems";
import Loader from "./Loader";
import { useAuth } from "../src/context/AuthContext";

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
      <Header className="fixed z-50 w-full p-0 bg-white shadow-md">
        <NavItems
          user={user}
          token={token}
          handleLogout={logout}
          theme={theme}
          setTheme={setTheme}
        />
      </Header>
      <Layout className="mt-16">
        <div
          className={`collapse-button fixed z-50 cursor-pointer text-white ${
            collapsed ? "left-0" : "left-64"
          } transition-all duration-700 top-20`}
          onClick={() => handleCollapse(!collapsed)}
        >
          {collapsed ? (
            <Image
              src="/icons/mave_icons/expand.svg"
              alt="Expand"
              preview={false}
              className="ml-16 duration-700"
              width={40}
              height={40}
            />
          ) : (
            <Image
              src="/icons/mave_icons/collapse.svg"
              alt="Collapse"
              preview={false}
              className="ml-4 duration-700"
              width={40}
              height={40}
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
            className="bg-bggray"
            style={{
              paddingTop: "5em",
              marginLeft: collapsed ? 0 : 120,
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
