import React, { useEffect, useState } from "react";
import { Image, Layout, message } from "antd";
import { useRouter } from "next/router";
import { useAuth } from "../src/context/AuthContext"; // Using centralized auth context
import NavItems from "./ui/NavItems";
import SideMenuItems from "./ui/SideMenuItems";
import Loader from "./Loader"; // Import Loader to show loading states

const { Sider, Content, Header } = Layout;

const SiteContent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Default theme
  const [changeLogs, setChangeLogs] = useState([]);
  const { user, token, logout, loading } = useAuth(); // Use auth context for user management
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    // Check localStorage availability and update theme state
    try {
      const storedTheme = localStorage.getItem("darkmode");
      if (storedTheme) {
        setTheme(storedTheme === "true" ? "dark" : "light");
      }
    } catch (error) {
      console.warn("localStorage is not available. Using default theme.");
    }

    // Update theme state based on local storage changes
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
    if (!loading && (!user || !token) && currentRoute !== "/login") {
      router.push("/login"); // Redirect to login page if not authenticated and not already on login page
    } else if (!loading && user && currentRoute === "/login") {
      router.push("/"); // Redirect to dashboard if authenticated and on login page
    }
  }, [user, token, router, loading, currentRoute]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  if (loading) return <Loader />; // Display loader if loading state is true

  // If on the login page, do not show top bar and sidebar
  if (currentRoute === "/login") {
    return <Content style={{ minHeight: "100vh" }}>{children}</Content>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Top Navigation Items */}
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
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          theme={theme}
          setTheme={setTheme}
        />
      </Header>

      {/* Sidebar Menu */}
      <Layout style={{ marginTop: "64px", padding: 0 }}>
        {" "}
        {/* Offset for fixed header */}
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
            top: 64, // Offset for the fixed header
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
            setIsModalOpen={setIsModalOpen}
            collapsed={collapsed}
            theme={theme}
            setTheme={setTheme}
          />
        </Sider>
        {/* Main Content Area */}
        <Layout
          className="site-layout"
          style={{
            transition: "margin-left 0.5s, padding-left 0.5s",
          }}
        >
          <Content
            style={{
              padding: "24px",
              marginTop: 0, // Remove unnecessary top margin
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
