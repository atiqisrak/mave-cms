import React, { useState } from "react";
import { Upload, Button, message, Table } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import UserList from "./UserList";

const ImportExportUsers = ({
  users,
  onImport,
  onExport,
  fetchUsers,
  onEdit,
  onDelete,
}) => {
  const [importedData, setImportedData] = useState([]);

  const handleUpload = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        setImportedData(result.data);
        onImport(result.data);
        message.success("Users imported successfully.");
      },
      error: (error) => {
        message.error(`Import failed: ${error.message}`);
      },
    });
    return false; // Prevent default upload behavior
  };

  const handleExport = () => {
    const csv = Papa.unparse(users);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Users exported successfully.");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions) => permissions.join(", "),
    },
  ];

  return (
    <div>
      <div className="flexed-between">
        <Upload beforeUpload={handleUpload}>
          <Button icon={<UploadOutlined />}>Import Users</Button>
        </Upload>
        <Button
          icon={<DownloadOutlined />}
          onClick={handleExport}
          style={{ marginLeft: 16 }}
        >
          Export Users
        </Button>
      </div>
      <UserList
        importedData={importedData}
        columns={columns}
        users={users}
        onEdit={onEdit}
        onDelete={onDelete}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};

export default ImportExportUsers;
