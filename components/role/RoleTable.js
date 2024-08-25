import { Table, Switch, Tooltip, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import instance from "../../axios";

export default function RoleTable() {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await instance.get("/roles");

      if (response.status === 200) {
        setRoles(response.data);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await instance.get("/permissions");

      if (response.status === 200) {
        setPermissions(response.data);
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
    fetchRoles();
    fetchPermissions();
  }, []);

  const expandPermissions = (role) => {
    // Filter permissions based on the role's permission_ids
    const rolePermissions = permissions.filter((permission) =>
      role.permission_ids.includes(permission.id)
    );
    setSelectedPermissions(rolePermissions);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <Tooltip title={description}>
          <span>
            {description?.length > 24
              ? description?.substring(0, 24) + "..."
              : description}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Permissions",
      key: "permissions",
      render: (record) => (
        <Button
          onClick={() => {
            expandPermissions(record);
          }}
        >
          Show Permissions
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Switch checked={status === 1} disabled />,
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={roles}
        loading={loading}
        rowKey={(record) => record.id}
      />

      {/* Modal for displaying permissions */}
      <Modal
        title="Permissions"
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={900}
      >
        <Table
          columns={[
            {
              title: "Title",
              dataIndex: "title",
              key: "title",
            },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
              render: (description) => (
                <Tooltip title={description}>
                  <span>
                    {description?.length > 24
                      ? description?.substring(0, 24) + "..."
                      : description}
                  </span>
                </Tooltip>
              ),
            },
          ]}
          dataSource={selectedPermissions}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </Modal>
    </div>
  );
}
