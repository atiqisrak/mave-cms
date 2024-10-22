// components/ui/SideMenuItems.js

import { LoginOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import AuthorizedSideMenuData from "../../src/data/authorisedsidemenus.json";
import UnAuthorizedSideMenuData from "../../src/data/unauthorisedsidemenu.json";
import Godfather from "../../src/data/godfather.json";
import Image from "next/image";

const SideMenuItems = ({
  token,
  user,
  handleLogout,
  setIsModalOpen,
  collapsed,
  theme,
  setTheme,
}) => {
  const [sideMenuData, setSideMenuData] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [godfatherData, setGodfatherData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (token && user) {
      setSideMenuData(AuthorizedSideMenuData);
      if (
        user?.email === "atiqisrak@niloy.com" ||
        user?.email === "Zeeshan.akhtar@webable.digital"
      ) {
        setGodfatherData(Godfather);
      } else {
        setGodfatherData([]);
      }
    } else {
      setSideMenuData(UnAuthorizedSideMenuData);
      setGodfatherData([]);
    }
  }, [token, user]);

  const allMenuData = useMemo(() => {
    return [...sideMenuData, ...godfatherData];
  }, [sideMenuData, godfatherData]);

  useEffect(() => {
    if (router.isReady && allMenuData.length > 0) {
      const currentPath = router.pathname;
      const selectedItem =
        allMenuData.find((item) => item.link === currentPath) ||
        allMenuData
          .flatMap((item) => item.submenu || [])
          .find((subItem) => subItem.link === currentPath) ||
        {};
      if (selectedItem.id !== undefined) {
        setSelectedMenuItem(selectedItem.id.toString());
      } else {
        setSelectedMenuItem("");
      }
    }
  }, [router.pathname, allMenuData]);

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
    const selectedItem =
      allMenuData.find((menuItem) => menuItem.id.toString() === key) ||
      allMenuData
        .flatMap((menuItem) => menuItem.submenu || [])
        .find((subItem) => subItem.id.toString() === key);

    if (selectedItem) {
      router.push(selectedItem.link);
    }
  };

  return (
    <Menu
      theme={theme === "dark" ? "dark" : "light"}
      mode="inline"
      selectedKeys={[selectedMenuItem]}
      onClick={handleMenuClick}
      className="w-full h-full"
    >
      {allMenuData && allMenuData.length > 0 ? (
        allMenuData.map((item) =>
          item?.submenu?.length > 0 ? (
            <Menu.SubMenu
              key={item.id.toString()}
              title={
                <div className="flex items-center gap-2">
                  <Image
                    src={item.icon}
                    alt={`${item.title} icon`}
                    width={collapsed ? 50 : 40}
                    height={collapsed ? 50 : 40}
                  />
                  {!collapsed && <span>{item.title}</span>}
                </div>
              }
              className="border-2 border-gray-400 mb-2"
            >
              {item.submenu?.map((subItem) => (
                <Menu.Item
                  key={subItem.id.toString()}
                  className="border-2 border-gray-400"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={subItem.icon}
                      alt={`${subItem.title} icon`}
                      width={30}
                      height={30}
                    />
                    {/* {!collapsed && <span>{subItem.title}</span>} */}
                    <span className="text-sm">{subItem.title}</span>
                  </div>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={item.id.toString()}
              className="border-2 border-yellow-400"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={item.icon}
                  alt={`${item.title} icon`}
                  width={20}
                  height={20}
                />
                {!collapsed && <span>{item.title}</span>}
              </div>
            </Menu.Item>
          )
        )
      ) : (
        <Menu.Item key="no-data">No data found</Menu.Item>
      )}

      {/* Login Menu Item for Unauthorized Users */}
      {!token && (
        <Menu.Item
          key="login"
          icon={<LoginOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-gray-400 mt-4"
        >
          {!collapsed && <span>Login</span>}
        </Menu.Item>
      )}
    </Menu>
  );
};

export default SideMenuItems;
