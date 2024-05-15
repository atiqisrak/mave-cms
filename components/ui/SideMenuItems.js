import {
  CalculatorOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import router from "next/router";
import iconsNames from "../../public/data.js";
import Router from "next/router";

const SideMenuItems = ({
  setSelectedMenuItem,
  token,
  user,
  handleLogout,
  setIsModalOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const [sideMenuData, setSideMenuData] = useState([]);
  const router = Router;

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

  const fetchUnauthorisedSideMenuData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/unauthorisedsidemenu");
      setSideMenuData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user) {
      fetchAuthorisedSideMenuData();
    } else {
      fetchUnauthorisedSideMenuData();
    }
  }, [token, user]);

  console.log("Side menu data", sideMenuData);

  return (
    <div>
      {sideMenuData && sideMenuData?.length > 0 ? (
        sideMenuData?.map((item) => {
          return item?.submenu?.length > 0 ? (
            <Menu.SubMenu
              key={item?.menu}
              // icon={<CalculatorOutlined />}
              title={item?.menu}
              style={{
                marginTop: "10%",
                fontSize: "1.1em",
              }}
            >
              {item?.submenu?.map((subItem) => {
                return (
                  <Menu.Item
                    key={subItem.subMenu}
                    // icon={<CalculatorOutlined />}
                    onClick={() => {
                      setSelectedMenuItem(subItem.subMenu);
                      router.push(subItem.link);
                    }}
                  >
                    {React.createElement(iconsNames[subItem.icon])}
                    {subItem.title}
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          ) : item?.icon ? (
            <Menu.Item
              key={item.menu}
              onClick={() => router.push(item.url)}
              style={{
                marginTop: "10%",
                fontSize: "1.1em",
              }}
            >
              {React.createElement(iconsNames[item.icon])}
              {item.menu}
            </Menu.Item>
          ) : (
            "not found"
          );
        })
      ) : (
        <Menu.Item key="no-data">No data found</Menu.Item>
      )}
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
    </div>
  );
};

export default SideMenuItems;
