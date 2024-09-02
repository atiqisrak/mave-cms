import { PlusCircleOutlined, UserSwitchOutlined } from "@ant-design/icons";
import RolePermission from "../../components/rolepermission/RolePermission";
import { Button, Menu, Modal } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CreatePermission from "../../components/rolepermission/permission/CreatePermission";
import CreateRole from "../../components/rolepermission/role/CreateRole";

export default function RolePermissionPage() {
  const [active, setActive] = useState("1");
  const [activeTab, setActiveTab] = useState("role");
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const menuItems = [
    {
      key: "1",
      title: "Users",
      link: "/settings/user-management",
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

  useEffect(() => {
    if (router.pathname === "/settings/role-permission") {
      setActive("4");
    }
  }, [router.pathname]);

  return (
    <div className="ViewContainer">
      <div
        className="top-nav"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 6fr 1fr",
          alignItems: "center",
          borderBottom: "4px solid #f0f0f0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <UserSwitchOutlined
            style={{
              fontSize: 30,
              border: "1px solid #f0f0f0",
              padding: 7,
              borderRadius: 5,
            }}
          />
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: 500,
            }}
          >
            User Management
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 40,
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            {menuItems?.map((item) => (
              <div
                style={{
                  color: active === item.key ? "var(--maveyellow)" : "black",
                  textDecoration: active === item.key ? "underline" : "none",
                  textUnderlineOffset: 20,
                }}
              >
                <Link href={item.link} key={item.key}>
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <Button
            type="primary"
            style={{
              marginBottom: 16,
              backgroundColor: "var(--maveyellow)",
              color: "white",
            }}
            icon={<PlusCircleOutlined />}
            onClick={() => setModalVisible(true)}
          >
            {activeTab === "role" ? "Add Role" : "Add Permission"}
          </Button>
          <Modal
            title={activeTab === "role" ? "Create Role" : "Create Permission"}
            open={modalVisible}
            footer={null}
            onCancel={() => {
              setModalVisible(false);
            }}
            width={700}
          >
            {activeTab === "role" ? <CreateRole /> : <CreatePermission />}
          </Modal>
        </div>
      </div>
      <RolePermission activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
