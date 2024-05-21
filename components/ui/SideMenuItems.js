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
import Image from "next/image.js";

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
      <Menu.Item
        key="home"
        onClick={() => router.push("/")}
        style={{
          marginTop: "10%",
          fontSize: "1.1em",
          fontWeight: "bold",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Image
            src="/icons/mave_icons/home.svg"
            alt="logo"
            width={30}
            height={30}
          />
          <strong>Home</strong>
        </div>
      </Menu.Item>
      {sideMenuData && sideMenuData?.length > 0 ? (
        sideMenuData?.map((item) =>
          item?.subMenu?.length > 0 ? (
            <Menu.Item
              key={item.id}
              onClick={() => setSelectedMenuItem(item.id)}
              style={{
                marginTop: "10%",
                fontSize: "1.1em",
                fontWeight: "bold",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Image
                  src={iconsNames[item.icon]}
                  alt="logo"
                  width={30}
                  height={30}
                />
                <strong>{item.name}</strong>
              </div>
            </Menu.Item>
          ) : (
            // sub menu under the main menu
            <Menu.SubMenu
              key={item.id}
              title={
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={iconsNames[item.icon]}
                    alt="logo"
                    width={30}
                    height={30}
                  />
                  <strong>{item.name}</strong>
                </div>
              }
            >
              {item?.subMenu?.map((subItem) => (
                <Menu.Item
                  key={subItem.id}
                  onClick={() => setSelectedMenuItem(subItem.id)}
                  style={{
                    marginTop: "10%",
                    fontSize: "1.1em",
                    fontWeight: "bold",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={iconsNames[subItem.icon]}
                      alt="logo"
                      width={30}
                      height={30}
                    />
                    <strong>{subItem.name}</strong>
                  </div>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          )
        )
      ) : (
        <Menu.Item key="no-data">No data found</Menu.Item>
      )}
      {user ? null : ( // </Menu.Item> //   Logout // > //   onClick={handleLogout} //   icon={<LogoutOutlined />} //   key="logout" // <Menu.Item
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
