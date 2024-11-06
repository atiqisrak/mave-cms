// components/UserList.js
import { Button, Popconfirm, Row, Col, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UserRow from "./UserRow";

const UserList = ({ users, roles, handleUserEdit, handleDeleteUser }) => {
  return (
    <div style={{ marginTop: "4rem" }}>
      <Col>
        <center>
          <h1>User Management</h1>
        </center>
        <Row
          gutter={16}
          style={{ backgroundColor: "#ceedff", padding: "1rem" }}
        >
          <Col span={6}>
            <h3>Name</h3>
          </Col>
          <Col span={6}>
            <h3>Email</h3>
          </Col>
          <Col span={4}>
            <h3>Role</h3>
          </Col>
          <Col span={6}>
            <h3>Permissions</h3>
          </Col>
          <Col span={2}>
            <h3>Actions</h3>
          </Col>
        </Row>
        {users?.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            roles={roles}
            handleUserEdit={handleUserEdit}
            handleDeleteUser={handleDeleteUser}
          />
        ))}
      </Col>
    </div>
  );
};

export default UserList;
