import { message } from "antd";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import instance from "../../axios";
import UsersTopbar from "../../components/settings/user/UsersTopbar";
import RegistrationSettings from "../../components/settings/user/RegistrationSettings";

export default function UserRegistrationPage() {
  const router = useRouter();
  const [active, setActive] = useState("2");
  const menuItems = [
    {
      key: "1",
      title: "Users",
      link: "/settings/users-settings",
    },
    {
      key: "2",
      title: "Registration",
      link: "/settings/user-registration",
    },
    {
      key: "3",
      title: "Access Control",
      link: "/settings/access-control",
    },
    {
      key: "4",
      title: "Role Permission",
      link: "/settings/role-permission",
    },
  ];
  return (
    <div className="mavecontainer">
      <UsersTopbar
        menuItems={menuItems}
        active={active}
        setActive={setActive}
      />
      <RegistrationSettings />
    </div>
  );
}
