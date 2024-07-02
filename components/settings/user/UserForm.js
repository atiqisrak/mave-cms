import React from "react";
import { Form, Input, Button, Select, Modal } from "antd";

const { Option } = Select;

const UserForm = ({ visible, onCreate, onCancel, initialValues }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="User Form"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="userForm"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input the email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select the role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="admin">Admin</Option>
            <Option value="editor">Editor</Option>
            <Option value="viewer">Viewer</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="permissions"
          label="Permissions"
          rules={[{ required: true, message: "Please select permissions!" }]}
        >
          <Select mode="multiple" placeholder="Select permissions">
            <Option value="create">Create</Option>
            <Option value="edit">Edit</Option>
            <Option value="delete">Delete</Option>
            <Option value="view">View</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
