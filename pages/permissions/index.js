import { Breadcrumb, Button, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import CreatePermission from "../../components/rolepermission/permission/CreatePermission";
import PermissionTable from "../../components/rolepermission/permission/PermissionTable";
import instance from "../../axios";

export default function Permissions() {
  const [modalVisible, setModalVisible] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPermissions = async () => {
    try {
      const response = await instance.get("/permissions");
      console.log("Making request to fetch permissions", response);
      if (response.status === 200) {
        setPermissions(response.data);
        console.log("Response received", response.data);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

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

  permissions && console.log("Permissions received index");

  return (
    <div className="mavecontainer">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumb
          style={{ margin: "16px 0", fontWeight: "600" }}
          separator=">"
          className="mavecontainer"
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
      <PermissionTable
        permissions={permissions}
        fetchPermissions={fetchPermissions}
        loading={loading}
      />

      <Modal
        title="Create Permission"
        open={modalVisible}
        footer={null}
        onCancel={() => {
          setModalVisible(false);
        }}
        width={700}
      >
        <CreatePermission
          setModalVisible={setModalVisible}
          fetchPermissions={fetchPermissions}
          loading={loading}
        />
      </Modal>
    </div>
  );
}
