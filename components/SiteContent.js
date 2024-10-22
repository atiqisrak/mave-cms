// components/SiteContent.jsx

import React, { useEffect, useState } from "react";
import { Image, Layout, Button, Modal } from "antd";
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
    return <Content className="min-h-screen">{children}</Content>;
  }

  return (
    <Layout className="min-h-screen">
      {/* Fixed Header */}
      <Header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex items-center px-4 md:px-8">
        <NavItems
          user={user}
          token={token}
          handleLogout={logout}
          theme={theme}
          setTheme={setTheme}
        />
      </Header>

      <Layout className="pt-16">
        {/* Side Navigation */}
        <div className="fixed">
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            theme={theme}
            width={220}
            className="top-0 left-0 h-screen py-20 px-2 fixed z-40
          bg-white shadow-lg transition-all duration-300"
            breakpoint="lg"
            collapsedWidth={80}
            trigger={null}
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
        </div>
        {/* Main Content Area */}
        <Layout
          className={`transition-all duration-300 ${
            collapsed ? "lg:ml-[0px]" : "lg:ml-[200px]"
          }`}
        >
          {/* Collapse Button */}
          <div
            className={`hidden lg:flex fixed top-24 z-40
              ${
                collapsed
                  ? "left-[50px] lg:left-[52px]"
                  : "left-[160px] lg:left-[200px]"
              } transition-all duration-300
              `}
          >
            <Button
              onClick={handleCollapse}
              className={`bg-transparent border-0 rounded-full p-2 transition-all duration-300`}
            >
              <Image
                src={
                  collapsed
                    ? "/icons/mave_icons/expand.svg"
                    : "/icons/mave_icons/collapse.svg"
                }
                alt={collapsed ? "Expand" : "Collapse"}
                width={32}
                height={32}
                preview={false}
              />
            </Button>
          </div>

          <Content className="flex-1 py-4 md:py-8 bg-gray-100">
            {/* Responsive Container */}
            <div className="mx-auto">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SiteContent;
