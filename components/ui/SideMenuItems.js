// components/ui/SideMenuItems.js

import { LoginOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
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
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [godfather, setGodfather] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (token && user) {
      setSideMenuData(AuthorizedSideMenuData);
      if (
        user?.email === "atiqisrak@niloy.com" ||
        user?.email === "Zeeshan.akhtar@webable.digital"
      ) {
        setGodfather(Godfather);
      }
    } else {
      setSideMenuData(UnAuthorizedSideMenuData);
    }
  }, [token, user]);

  useEffect(() => {
    if (router.isReady && (sideMenuData.length > 0 || godfather.length > 0)) {
      const allMenuData = [...sideMenuData, ...godfather];
      const currentPath = router.pathname;
      const selectedItem =
        allMenuData.find((item) => item.link === currentPath) ||
        allMenuData
          .flatMap((item) => item.submenu || [])
          .find((subItem) => subItem.link === currentPath) ||
        {};
      if (selectedItem.id !== undefined) {
        setSelectedMenuItem(selectedItem.id.toString());
      }
    }
  }, [router.pathname, sideMenuData, godfather]);

  const handleMenuClick = (item) => {
    setSelectedMenuItem(item.key);
    const key = item.key;
    const allMenuData = [...sideMenuData, ...godfather];
    const selectedItem =
      allMenuData.find((menuItem) => menuItem.id.toString() === key) ||
      allMenuData
        .flatMap((menuItem) => menuItem.submenu || [])
        .find((subItem) => subItem.id.toString() === key);

    if (selectedItem) {
      router.push(selectedItem.link);
    } else {
      console.log("Selected item not found for key:", key);
    }
    console.log("item", item);
    console.log("selectedItem", selectedItem);
  };

  return (
    <Menu
      theme={theme === "dark" ? "dark" : "light"}
      mode="inline"
      selectedKeys={[selectedMenuItem]}
      onClick={handleMenuClick}
      className="border-transparent"
    >
      {sideMenuData && sideMenuData.length > 0 ? (
        sideMenuData.map((item) =>
          item?.submenu?.length > 0 ? (
            <Menu.SubMenu
              key={item.id.toString()}
              title={
                <div className="flex items-center gap-2">
                  <Image src={item.icon} alt="logo" width={25} height={25} />
                  {!collapsed && <>{item.title}</>}
                </div>
              }
              className="font-bold mt-2 border-2 border-gray-200 rounded-md"
            >
              {item.submenu.map((subItem) => (
                <Menu.Item
                  key={subItem.id.toString()}
                  className="mt-2 font-bold"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={subItem.icon}
                      alt="logo"
                      width={25}
                      height={25}
                    />
                    <>{subItem.title}</>
                  </div>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={item.id.toString()}
              className={`mt-2 font-bold border-2 border-gray-200 rounded-md ${
                selectedMenuItem === item.id.toString()
                  ? "bg-theme text-white"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Image src={item.icon} alt="logo" width={25} height={25} />
                {!collapsed && <>{item.title}</>}
              </div>
            </Menu.Item>
          )
        )
      ) : (
        <Menu.Item key="no-data">No data found</Menu.Item>
      )}

      {/* Handle godfather menus */}
      {user &&
        godfather?.length > 0 &&
        godfather.map((item) =>
          item?.submenu?.length > 0 ? (
            <Menu.SubMenu
              key={item.id.toString()}
              title={
                <div className="flex items-center gap-2">
                  <Image src={item.icon} alt="logo" width={25} height={25} />
                  {!collapsed && <>{item.title}</>}
                </div>
              }
              className="font-bold mt-2 border-2 border-gray-200 rounded-md"
            >
              {item.submenu.map((subItem) => (
                <Menu.Item
                  key={subItem.id.toString()}
                  className="mt-2 font-bold"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={subItem.icon}
                      alt="logo"
                      width={25}
                      height={25}
                    />
                    <>{subItem.title}</>
                  </div>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={item.id.toString()}
              className={`mt-2 font-bold border-2 border-gray-700 rounded-md ${
                selectedMenuItem === item.id.toString()
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Image src={item.icon} alt="logo" width={25} height={25} />
                {!collapsed && <>{item.title}</>}
              </div>
            </Menu.Item>
          )
        )}

      {!user && (
        <Menu.Item
          key="login"
          icon={<LoginOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Login
        </Menu.Item>
      )}
    </Menu>
  );
};

export default SideMenuItems;
