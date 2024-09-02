import { Table, Switch, Tooltip } from "antd";
import { useEffect, useState } from "react";
import instance from "../../../axios";

export default function PermissionTable() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchPermissions();
  }, []);

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
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
        dataSource={permissions}
        loading={loading}
        rowKey={(record) => record.id}
      />
    </div>
  );
}
