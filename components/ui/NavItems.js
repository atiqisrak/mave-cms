// components/ui/NavItems.js

import { SearchOutlined, LoginOutlined } from "@ant-design/icons";
import { Image, Input, Space, Layout, Dropdown, Button } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Changelog from "../../pages/usermanual/changelog.json";
import TopNavData from "../../src/data/topnavdata.json";
import Link from "next/link";

export default function NavItems({
  user,
  token,
  handleLogout,
  theme,
  setTheme,
}) {
  const [hovered, setHovered] = useState(false);
  const [topNavData, setTopNavData] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Home");
  const [changeLogs, setChangeLogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setTopNavData(TopNavData);
    setChangeLogs(Changelog);
  }, []);

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
      label: (
        <div onClick={handleLogout} className="cursor-pointer">
          Logout
        </div>
      ),
    },
  ];

  return (
    <Layout.Header
      className={`fixed w-full h-16 grid grid-cols-12 items-center
         ${theme === "dark" ? "bg-gray-900" : "bg-white"}  z-50`}
    >
      {/* Logo and Version */}
      <div
        className="flex items-center gap-2 cursor-pointer pl-16 col-span-2"
        onClick={() => router.push("/")}
      >
        <Image
          src="/images/ui/mave_new_logo.png"
          alt="Mave Logo"
          width={120}
          height={40}
          objectFit="contain"
          preview={false}
        />
        {/* Version */}
        <Link href={"/usermanual/changelog"}>
          <h3 className="px-2 py-1 rounded-md text-white text-sm font-bold bg-theme">
            {changeLogs && changeLogs.length > 0
              ? changeLogs[0].version
              : "v 1.0.0"}
          </h3>
        </Link>
      </div>

      {user && token ? (
        <>
          {/* Menu Items */}
          <div className="flex flex-1 justify-center items-center space-x-4  col-span-5">
            {topNavData &&
              topNavData.map((item) => (
                <div
                  key={item.id}
                  className={`text-base font-semibold px-4 py-2 rounded-md cursor-pointer ${
                    selectedMenuItem === item.name
                      ? "bg-transparent text-theme"
                      : theme === "dark"
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedMenuItem(item.name);
                    router.push(item.link);
                  }}
                >
                  {item.name}
                </div>
              ))}
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 justify-center items-center  col-span-3">
            <Input
              placeholder="Try searching «Headless CMS»"
              suffix={<SearchOutlined />}
              className="w-full max-w-md h-10 rounded-full px-4 shadow-inner"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4 col-span-2">
            {/* Notification Bell */}
            <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer">
              <Image
                src="/icons/mave_icons/bell-ring.svg"
                alt="Notifications"
                width={20}
                height={20}
              />
            </div>

            {/* Settings */}
            <div
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer"
              onClick={() => router.push("/settings")}
            >
              <Image
                src="/icons/mave_icons/wrench.svg"
                alt="Settings"
                width={20}
                height={20}
              />
            </div>

            {/* User Dropdown */}
            <Dropdown menu={{ items: userItems }} placement="bottomRight">
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer">
                <Image
                  src="/icons/mave_icons/user.svg"
                  alt="User"
                  width={20}
                  height={20}
                />
              </div>
            </Dropdown>
          </div>
        </>
      ) : (
        <div
          className="ml-auto text-base font-semibold text-gray-700 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </div>
      )}
    </Layout.Header>
  );
}
