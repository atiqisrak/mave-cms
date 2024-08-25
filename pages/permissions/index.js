import { Breadcrumb, Button, Modal, Select } from "antd";
import PermissionTable from "../../components/permission/PermissionTable";
import { useState } from "react";
import CreatePermission from "../../components/permission/CreatePermission";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function Permissions() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    {
      key: "roles",
      value: "roles",
      label: <Link href="/roles">Roles</Link>,
    },
    {
      key: "permissions",
      value: "permissions",
      label: "Permissions",
    },
  ];

  return (
    <div className="ViewContainer">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumb
          style={{ margin: "16px 0" }}
          separator=">"
          className="ViewContainer"
          items={[
            {
              title: (
                <Link href="/">
                  <HomeOutlined />
                </Link>
              ),
            },
            // Settings
            {
              title: <Link href="/settings">Settings</Link>,
            },
            {
              title: "Permissions",
              menu: {
                items: menuItems,
              },
            },
          ]}
        />
        <Button
          onClick={() => {
            setModalVisible(true);
          }}
          style={{
            color: "white",
            backgroundColor: "var(--theme)",
            borderColor: "var(--theme)",
            marginBottom: "16px",
          }}
        >
          Create Permission
        </Button>
      </div>
      <PermissionTable />

      <Modal
        title="Create Permission"
        open={modalVisible}
        footer={null}
        onCancel={() => {
          setModalVisible(false);
        }}
        width={700}
      >
        <CreatePermission />
      </Modal>
    </div>
  );
}
